import { Request, Response } from 'express'
import shortid from 'shortid'
import Url from '../database/models/url-model'
import { BASE_URL, PORT } from '../config/load-env'
import { getFromCache, setToCache, deleteFromCache } from '../services/redis-service'

interface CreateUrlRequestBody {
  original_url: string;
  slug?: string;
  expires_at?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface ShortenedUrl {
  shortened_url: string;
}

export const createShortUrl = async (
  req: Request<{}, {}, CreateUrlRequestBody>,
  res: Response<ShortenedUrl | { message: string }>
): Promise<void> => {
  const currentDate = new Date()
  const {
    original_url,
    slug,
    expires_at,
    utm_source,
    utm_medium,
    utm_campaign
  } = req.body

  if (!original_url) {
    res.status(400).json({ message: 'Please provide a URL.' })
    return
  }

  let utmParameters: string | null = null;

  if (utm_source || utm_medium || utm_campaign) {
    const params = new URLSearchParams();
    if (utm_source) params.append('utm_source', utm_source)
    if (utm_medium) params.append('utm_medium', utm_medium)
    if (utm_campaign) params.append('utm_campaign', utm_campaign)

    utmParameters = params.toString()
  }

  let finalUrl = original_url
  if (utmParameters) {
    const separator = finalUrl.includes('?') ? '&' : '?'
    finalUrl += `${separator}${utmParameters}`
  }

  const cachedUrl = await getFromCache(finalUrl)
  if (cachedUrl) {
    const dbUrl = await Url.findOne({ where: { original_url: finalUrl }})
    if (dbUrl && dbUrl.expires_at && currentDate > new Date(dbUrl.expires_at)) {
      dbUrl.is_active = false;
      await dbUrl.save()
      await deleteFromCache(finalUrl)
      res.status(410).json({ message: 'This URL has expired.' })
      return
    }

    // TODO: Redirection works, but find a way to remove :PORT/api/
    res.json({ shortened_url: BASE_URL! + ':' + PORT! + '/' + 'api/' + cachedUrl })
    return
  }

  const generatedSlug = slug ? slug?.slice(0, 8) : shortid.generate().slice(0, 8)
  const existingSlug = await Url.findOne({ where: { shortened_url: generatedSlug }})
  if (existingSlug) {
    res.status(400).json({ message: 'Slug already taken. Please choose another one. '})
  }

  let parsedExpirationDate: Date | null = null
  if (expires_at) {
    parsedExpirationDate = new Date(expires_at)
    if (isNaN(parsedExpirationDate.getTime())) {
      res.status(400).json({ message: 'Invalid expiration date. '})
    }
  }

  try {
    const newUrl: Url = await Url.create({
      original_url: finalUrl,
      shortened_url: generatedSlug,
      expires_at: parsedExpirationDate,
      utm_parameters: utmParameters,
      is_active: true
    })

    await setToCache(finalUrl, newUrl.shortened_url, 60 * 60 * 24);

    // TODO: Redirection works, but find a way to remove :PORT/api/
    res.status(201).json({
      shortened_url: BASE_URL! + ':' + PORT! + '/' + 'api/' + newUrl.shortened_url
    })
  } catch (error) {
    console.error('Failed to shorted URL: ', error)
    res.status(500).json({ message: 'An error occured while shortening the URL.' })
  }
}

export const redirectUrl = async (
  req: Request<ShortenedUrl>,
  res: Response
): Promise<void> => {
  const { shortened_url } = req.params
  const currentDate = new Date()

  const cachedUrl = await getFromCache(shortened_url);
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  const url: Url | null = await Url.findOne({
    where: { shortened_url, is_active: true }
  })
  if (!url) {
    res.status(404).json({ message: "URL not found or is inactive" })
    return
  }

  if (url.expires_at && currentDate > new Date(url.expires_at)) {
    url.is_active = false
    await url.save()
    res.status(410).json({ message: 'This URL has expired.' })
  }

  await setToCache(shortened_url, url.original_url, 60 * 60 * 24);

  return res.redirect(url.original_url)
}

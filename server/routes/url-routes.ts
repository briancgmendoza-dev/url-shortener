import express from 'express'
import { createShortUrl, redirectUrl } from '../controllers/url-controller'
import { handleValidationErrors, validateShortenRequest } from '../middleware/validate-url'

const router = express.Router()

router.post('/shorten', validateShortenRequest, handleValidationErrors, createShortUrl)
router.get('/:shortened_url', redirectUrl)

export default router

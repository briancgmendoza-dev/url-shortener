import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { postRequest } from "../../service/request"

const formSchema = z.object({
  original_url: z.string().url('Please enter a valid URL').nonempty('URL is required'),
  slug: z
    .string()
    .max(8, "Slug must be 8 characters or less")
    .regex(/^[a-zA-Z0-9-_]*$/, "Slug can only contain letters, numbers, hyphens and underscores")
    .optional(),
  expires_at: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional()
})

export type FormData = z.infer<typeof formSchema>

export function Form () {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })
  const [isLoading, setIsLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // In backend, validate-url, we are only accepting isISO8601 for expires_at
    // Maybe convert to timestamp??
    if (data.expires_at) {
      const [month, day, year] = data.expires_at.split('-')
      if (
        month &&
        day &&
        year &&
        month.length === 2 &&
        day.length === 2 &&
        year.length === 4
      ) {
        const isoDate = new Date(`${year}-${month}-${day}`).toISOString()
        data.expires_at = isoDate
      }
    }

    const URL = '/shorten'
    const params = {
      "original_url": data?.original_url,
      "slug": data?.slug || undefined,
      "expires_at": data?.expires_at || undefined,
      "utm_source": data?.utm_source || undefined,
      "utm_medium": data?.utm_medium || undefined,
      "utm_campaign": data?.utm_campaign || undefined
    }

    try {
      setIsLoading(true)
      const response = await postRequest(URL, params)
      if (response?.shortened_url) {
        // Adding setTimeout to mimic a loading when sending an API
        setTimeout(() => {
          setShortUrl(response?.shortened_url)
          setIsLoading(false)
        }, 1000)
        reset()
        setCopied(false)
      } else {
        throw new Error()
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'Validation Failed') {
        const backendErrors = error?.response?.data?.errors
        backendErrors.forEach((err: any) => {
          setError(err.path as keyof FormData, {
            type: 'server',
            message: err.msg,
          })
        })
      } else if (error?.response?.data?.message.toLowerCase().includes('slug')) {
        setError('slug', {
          type: 'server',
          message: error?.response?.data?.message
        })
      } else {
        console.log("Error onSubmit: ", error)
      }
    } // Finally would be a better way to stop the loading in real scenario
    // finally {
    //   setIsLoading(false)
    // }
  };

  const copyToclipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            Enter your long URL
          </label>
          <div className="relative">
            <input
              {...register('original_url')}
              type="text"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                errors.original_url ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          {errors.original_url && <p className="text-sm text-red-500">{errors.original_url.message}</p>}
        </div>

        <input
          {...register('slug')}
          type="text"
          placeholder="Url Identifier"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            errors.slug ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}

        <input
          {...register('expires_at')}
          type="text"
          placeholder="Expiration date: MM-DD-YYYY"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            errors.expires_at ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
          {errors.expires_at && <p className="text-sm text-red-500">{errors.expires_at.message}</p>}

        <input
          {...register('utm_source')}
          type="text"
          placeholder="Utm source"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            errors.utm_source ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
          {errors.utm_source && <p className="text-sm text-red-500">{errors.utm_source.message}</p>}

        <input
          {...register('utm_medium')}
          type="text"
          placeholder="Utm medium"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            errors.utm_medium ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
          {errors.utm_medium && <p className="text-sm text-red-500">{errors.utm_medium.message}</p>}

        <input
          {...register('utm_campaign')}
          type="text"
          placeholder="Utm Campaign"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            errors.utm_campaign ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
          {errors.utm_campaign && <p className="text-sm text-red-500">{errors.utm_campaign.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
              </svg>
              Shortening...
            </span>
          ) : (
            <span className="flex items-center">
              Shorten URL
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          )}
        </button>
      </form>
      {shortUrl && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Your shortened URL</h3>
          <div className="flex items-center">
            <div className="w-[100%] flex items-center justify-between bg-gray-50 p-2 rounded-md border truncate">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate block"
              >
                {shortUrl}
              </a>
              <button
                type="button"
                onClick={copyToclipboard}
                className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {shortUrl && <Toaster />} */}
    </>
  )
}

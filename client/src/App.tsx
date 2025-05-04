import { useEffect, useState } from "react"
import { postRequest } from "./service/request"

function App() {
  const [shortenedUrl, setShortenedUrl] = useState('')
  useEffect(() => {
    (async () => {
      const URL = '/shorten'
      const PARAMS = {
        "original_url": "https://www.youtube.com",
        "slug": "ytmasta",
        "expires_at": "2025-12-31T23:59:59.999Z",
        "utm_source": "google",
        "utm_medium": "cpc",
        "utm_campaign": "test"
      }
      const response = await postRequest(URL, PARAMS)
      setShortenedUrl(response?.shortened_url)
    })()
  }, [])

  return (
    <div className="text-3xl font-bold underline text-red-500">
      <a href={shortenedUrl}>{shortenedUrl}</a>
    </div>
  )
}

export default App

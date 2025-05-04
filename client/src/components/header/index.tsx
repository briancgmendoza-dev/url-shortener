export function Header () {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="w-[98%] sm:w-[90%] mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="h-6 w-6 text-blue-600"
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
            <h1 className="text-2xl font-bold text-gray-900">URL Shortener</h1>
          </div>
          <a
            href="https://github.com/briancgmendoza-dev/url-shortener"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span>GitHub</span>
            <svg
              className="ml-1 h-4 w-4"
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
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

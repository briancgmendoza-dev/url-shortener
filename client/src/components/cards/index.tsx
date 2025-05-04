export function Cards () {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <svg
            className="h-5 w-5 text-blue-600"
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Easy to Use</h3>
        <p className="text-gray-600 text-sm">
          Simply paste your long URL and click the button to get your shortened link instantly.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg
            className="h-5 w-5 text-green-600"
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Reliable</h3>
        <p className="text-gray-600 text-sm">
          Our shortened URLs never expire and are always available when you need them.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <svg
            className="h-5 w-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Fast</h3>
        <p className="text-gray-600 text-sm">
          Lightning-fast redirection ensures your users get to their destination without delays.
        </p>
      </div>
    </div>
  )
}

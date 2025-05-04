export function Toaster ({ toasts }: any) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: any) => (
        <div
          key={toast.id}
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-fade-in-up"
        >
          <svg
            className="h-4 w-4 text-green-400"
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
          {toast.message}
        </div>
      ))}
    </div>
  )
}

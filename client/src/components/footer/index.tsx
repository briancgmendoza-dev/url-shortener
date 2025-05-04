export function Footer () {
  return (
    <footer className="py-6 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-center">
            Developed by Brian Christopher G. Mendoza
          </div>
        </div>
      </div>
    </footer>
  )
}

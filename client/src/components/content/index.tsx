import { Form } from "../form"
import { Cards } from "../cards"

export function Content () {
  return (
    <section className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shorten Your Long URLs</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Paste your long URL below, click the button, and get a short link that never expires.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <Form />
        </div>
        <Cards />
      </div>
    </section>
  )
}

import { Container } from "./components/container"
import { Header } from "./components/header"
import { Content } from "./components/content"
import { Footer } from "./components/footer"

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    </main>
  )
}

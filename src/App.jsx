import Header from './components/Header'
import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <About />
      <SelectedWork />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LazySection from './components/LazySection'
import { initPerformanceOptimizations } from './utils/performance'

// Lazy load components that are below the fold for better performance
const About = lazy(() => import('./components/About'))
const SelectedWork = lazy(() => import('./components/SelectedWork'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Optimized loading component
const SectionLoader = ({ minHeight = "400px" }) => (
  <div className="flex items-center justify-center" style={{ minHeight }}>
    <div className="relative">
      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-blue-200"></div>
      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
)

function App() {
  // Initialize performance optimizations
  useEffect(() => {
    initPerformanceOptimizations()
  }, [])

  // Check for Intersection Observer support
  const [supportsIntersectionObserver, setSupportsIntersectionObserver] = useState(true)

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setSupportsIntersectionObserver(false)
      console.warn('IntersectionObserver not supported. Lazy loading disabled.')
    }
  }, [])

  // If no Intersection Observer support, render all components immediately
  if (!supportsIntersectionObserver) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <Suspense fallback={<SectionLoader minHeight="600px" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader minHeight="500px" />}>
          <SelectedWork />
        </Suspense>
        <Suspense fallback={<SectionLoader minHeight="600px" />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader minHeight="200px" />}>
          <Footer />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Above the fold - load immediately */}
      <Header />
      <Hero />
      
      {/* Load all components to ensure animations work */}
      <Suspense fallback={<SectionLoader minHeight="600px" />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader minHeight="500px" />}>
        <SelectedWork />
      </Suspense>
      
      <Suspense fallback={<SectionLoader minHeight="600px" />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<SectionLoader minHeight="200px" />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

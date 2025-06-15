import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for lazy loading components using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Array} - [ref, isVisible, hasLoaded]
 */
export const useLazyLoad = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef()

  const { threshold = 0.1, rootMargin = '50px' } = options

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported, loading content immediately')
      setIsVisible(true)
      setHasLoaded(true)
      return
    }

    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        setHasLoaded(true)
        // Once loaded, we can stop observing
        if (currentRef) {
          observer.unobserve(currentRef)
        }
      }
    }, { threshold, rootMargin })

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return [ref, isVisible, hasLoaded]
}

/**
 * Custom hook for lazy loading images
 * @param {string} src - Image source URL
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - { ref, imageSrc, isLoaded, isError }
 */
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [ref, isVisible] = useLazyLoad(options)

  useEffect(() => {
    if (isVisible && src && !imageSrc) {
      const img = new Image()
      
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      
      img.onerror = () => {
        setIsError(true)
      }
      
      img.src = src
    }
  }, [isVisible, src, imageSrc])

  return { ref, imageSrc, isLoaded, isError }
}

/**
 * Higher-order component for lazy loading
 * @param {React.Component} Component - Component to lazy load
 * @param {Object} options - Intersection Observer options
 * @returns {React.Component} - Wrapped component with lazy loading
 */
export const withLazyLoad = (Component, options = {}) => {
  return function LazyComponent(props) {
    const [ref, , hasLoaded] = useLazyLoad(options)

    return (
      <div ref={ref}>
        {hasLoaded ? <Component {...props} /> : <div style={{ minHeight: '200px' }} />}
      </div>
    )
  }
}

/**
 * Preload critical resources for better performance
 */

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/photo_profile.png', // Hero section profile image
]

// Preload critical images
export const preloadCriticalImages = () => {
  CRITICAL_IMAGES.forEach(imageSrc => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = imageSrc
    document.head.appendChild(link)
  })
}

// Preload non-critical images with low priority
export const preloadImages = (imageSrcs = []) => {
  imageSrcs.forEach(imageSrc => {
    const img = new Image()
    img.src = imageSrc
  })
}

// Lazy load images with Intersection Observer
export const lazyLoadImage = (img) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove('lazy')
        observer.unobserve(img)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  observer.observe(img)
}

// Resource hints for better performance
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const externalDomains = [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com'
  ]

  externalDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Preload critical resources
  preloadCriticalImages()
  
  // Add resource hints
  addResourceHints()
  
  // Preload critical CSS if needed
  // This can be extended for critical CSS loading
}

export default {
  preloadCriticalImages,
  preloadImages,
  lazyLoadImage,
  addResourceHints,
  initPerformanceOptimizations
}

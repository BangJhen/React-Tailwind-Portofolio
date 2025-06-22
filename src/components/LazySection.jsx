import { memo } from 'react'
import { useLazyLoad } from '../hooks/useLazyLoad.jsx'

const LazySection = memo(({ 
  children, 
  fallback = null, 
  className = '',
  minHeight = '200px',
  options = {},
  preloadForAnimations = false,
  ...props 
}) => {
  const lazyOptions = {
    threshold: 0.1,
    rootMargin: preloadForAnimations ? '400px' : '100px', // Larger margin for animations
    ...options
  }
  
  const [ref, , hasLoaded] = useLazyLoad(lazyOptions)

  const defaultFallback = (
    <div 
      className="flex items-center justify-center"
      style={{ minHeight }}
    >
      <div className="relative">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-blue-200"></div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className={className || ''} {...props}>
      {hasLoaded ? children : (fallback || defaultFallback)}
    </div>
  )
})

LazySection.displayName = 'LazySection'

export default LazySection

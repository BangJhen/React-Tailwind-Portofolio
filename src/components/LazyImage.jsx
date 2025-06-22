import { memo } from 'react'
import { useLazyImage } from '../hooks/useLazyLoad.jsx'

const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const { ref, imageSrc, isLoaded, isError } = useLazyImage(src, {
    threshold: 0.1,
    rootMargin: '50px'
  })

  const handleLoad = () => {
    onLoad()
  }

  const handleError = () => {
    onError()
  }

  return (
    <div ref={ref} className={`lazy-image-container ${className}`.trim()} {...props}>
      {isError ? (
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 h-full min-h-[150px] sm:min-h-[200px] text-xs sm:text-sm">
          Failed to load image
        </div>
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      ) : (
        placeholder || (
          <div className="flex items-center justify-center bg-gray-100 h-full min-h-[150px] sm:min-h-[200px]">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage

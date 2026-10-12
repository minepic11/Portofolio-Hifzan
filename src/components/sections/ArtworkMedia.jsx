import { useEffect, useRef, useState } from 'react'

export default function ArtworkMedia({ artwork }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const isVideo = artwork.mediaType === 'video'
  const hasPreview = artwork.previewSrc && ['image', 'video', 'model'].includes(artwork.mediaType)

  useEffect(() => {
    if (!isVideo) return
    const video = videoRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNearViewport(true)
    }, { rootMargin: '200px 0px' })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video?.pause()
    })
    const pauseWhenHidden = () => {
      if (document.hidden) video?.pause()
    }

    observer.observe(containerRef.current)
    visibilityObserver.observe(containerRef.current)
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      video?.pause()
    }
  }, [isVideo, artwork.id, attempt])

  function retry() {
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  return (
    <>
      <div
        ref={containerRef}
        className="artwork-media"
        style={{ aspectRatio: artwork.width && artwork.height ? `${artwork.width} / ${artwork.height}` : '4 / 3' }}
        aria-busy={hasPreview && !isVideo && status === 'loading'}
      >
        {!hasPreview ? (
          <div className="artwork-media-message" role="status">
            <p>Pratinjau karya ini belum tersedia.</p>
          </div>
        ) : status === 'error' ? (
          <div className="artwork-media-message" role="status">
            <p>Pratinjau tidak dapat dimuat.</p>
            <button type="button" onClick={retry}>Coba lagi</button>
          </div>
        ) : (
          <>
            {isVideo ? (
              <video
                ref={videoRef}
                key={attempt}
                className="artwork-video"
                src={nearViewport ? artwork.previewSrc : undefined}
                poster={nearViewport ? artwork.posterSrc || undefined : undefined}
                preload="none"
                controls
                playsInline
                width={artwork.width || undefined}
                height={artwork.height || undefined}
                aria-label={artwork.title ? `Animasi ${artwork.title}` : 'Pratinjau animasi 3D'}
                onLoadedData={() => setStatus('ready')}
                onError={() => setStatus('error')}
              >
                {artwork.captionsSrc && (
                  <track kind="captions" src={artwork.captionsSrc} srcLang="id" label="Bahasa Indonesia" default />
                )}
                Browser Anda tidak mendukung video. Gunakan tautan file animasi di bawah.
              </video>
            ) : (
              <>
                <img
                  key={attempt}
                  className="artwork-image"
                  src={artwork.previewSrc}
                  srcSet={artwork.previewSrcSet || undefined}
                  sizes="(min-width: 1024px) 60vw, (min-width: 768px) 70vw, 100vw"
                  alt={artwork.alt || artwork.title || 'Pratinjau karya 3D'}
                  loading="lazy"
                  decoding="async"
                  width={artwork.width || undefined}
                  height={artwork.height || undefined}
                  onLoad={() => setStatus('ready')}
                  onError={() => setStatus('error')}
                />
                {status === 'loading' && (
                  <p className="artwork-loading" role="status">Memuat pratinjau...</p>
                )}
              </>
            )}
            {artwork.mediaType === 'model' && (
              <p className="artwork-model-note">Pratinjau statis. Model interaktif belum tersedia.</p>
            )}
          </>
        )}
      </div>
      {isVideo && hasPreview && (
        <a className="artwork-video-fallback" href={artwork.previewSrc} target="_blank" rel="noopener noreferrer">
          Buka file animasi
        </a>
      )}
    </>
  )
}

import { lazy, Suspense, useCallback, useEffect, useId, useRef, useState } from 'react'
import ViewerBoundary from '../ui/ViewerBoundary'

const ModelViewer = lazy(() => import('../ui/ModelViewer'))

export default function ModelArtwork({ artwork, active, onActivate, onDeactivate }) {
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const activateRef = useRef(null)
  const actionsRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [previewFailed, setPreviewFailed] = useState(false)
  const helpId = useId()
  const label = artwork.title || artwork.fileName
  const ready = status === 'ready'
  const handleReady = useCallback(() => setStatus('ready'), [])
  const handleError = useCallback(() => setStatus('error'), [])

  useEffect(() => {
    if (active) stageRef.current?.focus({ preventScroll: true })
  }, [active])

  useEffect(() => {
    if (!active || status !== 'ready') return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) onDeactivate()
    }, { rootMargin: '200px 0px' })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [active, status, onDeactivate])

  function activate() {
    setStatus('loading')
    onActivate()
  }

  function close() {
    onDeactivate()
    requestAnimationFrame(() => activateRef.current?.focus({ preventScroll: true }))
  }

  function retry() {
    setStatus('loading')
    setAttempt((value) => value + 1)
    requestAnimationFrame(() => stageRef.current?.focus({ preventScroll: true }))
  }

  function handleKey(event) {
    if (!active || event.target !== event.currentTarget) return
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (!ready) return
    const actions = actionsRef.current
    const shortcuts = {
      ArrowLeft: () => actions?.rotate(-1, 0),
      ArrowRight: () => actions?.rotate(1, 0),
      ArrowUp: () => actions?.rotate(0, -1),
      ArrowDown: () => actions?.rotate(0, 1),
      '+': () => actions?.zoom(1),
      '=': () => actions?.zoom(1),
      '-': () => actions?.zoom(-1),
      r: () => actions?.reset(),
      R: () => actions?.reset(),
    }
    if (shortcuts[event.key]) {
      event.preventDefault()
      shortcuts[event.key]()
    }
  }

  return (
    <div ref={containerRef} className="model-artwork">
      <div
        ref={stageRef}
        className="model-stage"
        role="group"
        aria-label={`Model 3D ${label}`}
        aria-describedby={active ? helpId : undefined}
        aria-busy={active && status === 'loading'}
        tabIndex={active ? 0 : undefined}
        onKeyDown={handleKey}
        style={{ aspectRatio: `${artwork.width || 960} / ${artwork.height || 720}` }}
      >
        {active ? (
          <ViewerBoundary
            key={attempt}
            onError={handleError}
            fallback={(error) => {
              const reloadRequired = /dynamically imported|importing a module|loading chunk|module script|preload CSS/i.test(error.message)
              return (
                <div className="model-message" role="status">
                  <p>Model 3D tidak dapat ditampilkan.</p>
                  <p>Periksa koneksi atau dukungan WebGL pada browser Anda.</p>
                  <button type="button" onClick={reloadRequired ? () => window.location.reload() : retry}>
                    {reloadRequired ? 'Muat ulang halaman' : 'Coba lagi'}
                  </button>
                </div>
              )
            }}
          >
            <Suspense fallback={null}>
              <ModelViewer
                src={attempt ? `${artwork.modelSrc}?retry=${attempt}` : artwork.modelSrc}
                actionsRef={actionsRef}
                onReady={handleReady}
              />
            </Suspense>
          </ViewerBoundary>
        ) : artwork.previewSrc && !previewFailed ? (
          <img
            className="model-preview-image"
            src={artwork.previewSrc}
            alt={`Pratinjau render model ${label}`}
            width={artwork.width || 960}
            height={artwork.height || 720}
            loading="lazy"
            decoding="async"
            onError={() => setPreviewFailed(true)}
          />
        ) : (
          <div className="model-message">
            <p>{label}</p>
            <p>Buka viewer untuk melihat model 3D asli.</p>
          </div>
        )}
        {active && status === 'loading' && (
          <div className="model-message model-loading" role="status">Memuat viewer dan model 3D...</div>
        )}
      </div>
      {active ? (
        <div className="model-interface">
          <div className="model-controls" role="group" aria-label={`Kontrol model ${label}`}>
            <button type="button" disabled={!ready} onClick={() => actionsRef.current?.rotate(-1, 0)}>Putar kiri</button>
            <button type="button" disabled={!ready} onClick={() => actionsRef.current?.rotate(1, 0)}>Putar kanan</button>
            <button type="button" disabled={!ready} onClick={() => actionsRef.current?.zoom(1)} aria-label="Perbesar model">+</button>
            <button type="button" disabled={!ready} onClick={() => actionsRef.current?.zoom(-1)} aria-label="Perkecil model">−</button>
            <button type="button" disabled={!ready} onClick={() => actionsRef.current?.reset()}>Reset tampilan</button>
            <button type="button" className="model-close" onClick={close}>Tutup viewer</button>
          </div>
          <p id={helpId} className="model-help">
            Geser untuk memutar. Scroll atau cubit untuk zoom.
            <span>Keyboard: panah untuk memutar, +/− untuk zoom, R untuk reset.</span>
          </p>
        </div>
      ) : (
        <div className="model-open-row">
          <button ref={activateRef} type="button" className="model-open" onClick={activate}>
            Lihat model 3D<span className="sr-only"> {label}</span>
          </button>
          <a href={artwork.modelSrc} download={artwork.fileName}>Unduh GLB<span className="sr-only"> {label}</span></a>
        </div>
      )}
    </div>
  )
}

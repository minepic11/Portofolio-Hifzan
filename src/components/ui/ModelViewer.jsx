import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Bounds, Center, OrbitControls, useBounds, useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'

const initialDirection = new Vector3(4, 3, 6).normalize()

function ModelScene({ src, actionsRef, controlsRef, onReady }) {
  const { scene } = useGLTF(src, false, false)
  const model = useMemo(() => scene.clone(true), [scene])
  const bounds = useBounds()
  const get = useThree((state) => state.get)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    const { camera, invalidate, gl } = get()
    if (!gl.domElement.isConnected) return
    const distance = bounds.getSize().distance
    controls.minDistance = distance * 0.25
    controls.maxDistance = distance * 3
    const actions = {
      rotate(horizontal, vertical) {
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() + horizontal * Math.PI / 12)
        controls.setPolarAngle(controls.getPolarAngle() + vertical * Math.PI / 12)
        controls.update()
        invalidate()
      },
      zoom(direction) {
        const zoom = direction > 0 ? controls.dollyIn : controls.dollyOut
        zoom(1 / 1.15)
        controls.update()
        invalidate()
      },
      reset() {
        const fitted = bounds.refresh().getSize()
        camera.position.copy(fitted.center).addScaledVector(initialDirection, fitted.distance)
        controls.target.copy(fitted.center)
        controls.update()
        bounds.clip()
        controls.maxDistance = fitted.distance * 3
        invalidate()
      },
    }
    actionsRef.current = actions
    onReady()
    return () => {
      if (actionsRef.current === actions) actionsRef.current = null
    }
  }, [actionsRef, bounds, controlsRef, get, onReady])

  return (
    <Center>
      <primitive object={model} dispose={null} />
    </Center>
  )
}

export default function ModelViewer({ src, actionsRef, onReady }) {
  const [contextLost, setContextLost] = useState(false)
  const [dpr] = useState(() => window.matchMedia('(max-width: 767px), (pointer: coarse)').matches ? 1 : [1, 1.5])
  const [canvasElement, setCanvasElement] = useState(null)
  const controlsRef = useRef(null)
  const handleCreated = useCallback(({ gl }) => {
    setCanvasElement(gl.domElement)
  }, [])

  useEffect(() => {
    if (!canvasElement) return
    const handleLoss = (event) => {
      event.preventDefault()
      setContextLost(true)
    }
    canvasElement.addEventListener('webglcontextlost', handleLoss)
    return () => canvasElement.removeEventListener('webglcontextlost', handleLoss)
  }, [canvasElement])
  if (contextLost) throw new Error('WebGL context lost')

  return (
    <Canvas
      className="model-canvas"
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [4, 3, 6], fov: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
      onCreated={handleCreated}
      aria-hidden="true"
      fallback={<p className="model-message">Canvas 3D tidak didukung browser Anda.</p>}
    >
      <color attach="background" args={['#f7f6f2']} />
      <hemisphereLight args={['#ffffff', '#c7c4b7', 1.8]} />
      <directionalLight position={[4, 6, 5]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1} />
      <OrbitControls ref={controlsRef} makeDefault enablePan={false} enableDamping={false} autoRotate={false} zoomSpeed={0.7} rotateSpeed={0.7} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.45} maxDuration={0}>
          <ModelScene src={src} actionsRef={actionsRef} controlsRef={controlsRef} onReady={onReady} />
        </Bounds>
      </Suspense>
    </Canvas>
  )
}

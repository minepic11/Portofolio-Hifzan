import { m, useReducedMotion } from 'motion/react'

export default function Reveal({ children, className = '', delay = 0, hero = false }) {
  const reducedMotion = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={false}
      {...(hero ? { animate: { opacity: reducedMotion ? 1 : [0, 1], y: reducedMotion ? 0 : [16, 0] } } : {
        whileInView: { y: reducedMotion ? 0 : [16, 0] },
        viewport: { once: true, amount: 0.15 },
      })}
      transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

import { useCallback, useRef } from 'react'

/**
 * Efeito de inclinação 3D que acompanha o ponteiro.
 * Retorna ref + handlers para espalhar no elemento.
 */
export function useTilt({ max = 12, scale = 1.02, perspective = 1000 } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el || e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale(${scale})`
        el.style.setProperty('--gx', `${px * 100}%`)
        el.style.setProperty('--gy', `${py * 100}%`)
      })
    },
    [max, scale, perspective],
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transform = ''
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}

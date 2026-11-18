import { useEffect, useState } from 'react'

/** Anima um número de 0 até `end` quando `start` vira true. */
export function useCountUp(end, { start = true, duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(+(end * eased).toFixed(decimals))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, start, duration, decimals])
  return value
}

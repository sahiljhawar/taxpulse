import { useEffect, useRef, useState } from 'react'

// Tweens a numeric value from its previous value to a new one using rAF.
export function useCountUp(target, duration = 700, initialValue) {
  const start0 = initialValue !== undefined ? initialValue : target
  const [display, setDisplay] = useState(start0)
  const fromRef = useRef(start0)
  const rafRef = useRef(null)

  useEffect(() => {
    const from = fromRef.current
    const to = target
    if (from === to) return

    const start = performance.now()
    cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      const value = from + (to - from) * eased
      setDisplay(value)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return display
}

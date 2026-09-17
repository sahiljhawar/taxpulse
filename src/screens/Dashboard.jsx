import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useAppState, CATEGORY_ORDER } from '../state/AppState.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

const LONG_PRESS_MS = 900

const CATEGORY_ICONS = {
  'Work equipment': '🖥️',
  Travel: '🚆',
  'Home office': '🏠',
  Education: '🎓',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const { treasure, previousTreasure, readiness, previousReadiness, categories } = state
  const pressTimer = useRef(null)

  const animatedTreasure = useCountUp(treasure, 900, previousTreasure)
  const animatedReadiness = useCountUp(readiness, 900, previousReadiness)

  function startPress() {
    pressTimer.current = setTimeout(() => {
      dispatch({ type: 'RESET_DEMO' })
    }, LONG_PRESS_MS)
  }

  function cancelPress() {
    clearTimeout(pressTimer.current)
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-6">
      <p
        className="text-sm text-ink/60 select-none"
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
      >
        Hi Alex
      </p>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-8">
        <p className="text-sm text-ink/50 uppercase tracking-wide font-medium">
          Your Tax Treasure 2026
        </p>
        <span className="tabular text-6xl font-semibold text-accent-dark">
          {Math.round(animatedTreasure)} EUR
        </span>

        <div className="w-full max-w-[220px] mt-4">
          <div className="flex justify-between text-xs text-ink/50 mb-2">
            <span>Tax Readiness</span>
            <span className="tabular font-semibold text-ink/70">
              {Math.round(animatedReadiness)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-ink/10 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${animatedReadiness}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {CATEGORY_ORDER.map((cat) => (
          <div
            key={cat}
            className="flex flex-col gap-1 rounded-card bg-white border border-ink/5 px-4 py-3"
          >
            <span className="text-xl leading-none">{CATEGORY_ICONS[cat]}</span>
            <span className="text-sm text-ink/70">{cat}</span>
            <span className="tabular text-base font-semibold text-ink">
              {categories[cat]} EUR
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/upload')}
        className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4"
      >
        Find money in a receipt
      </button>
    </div>
  )
}

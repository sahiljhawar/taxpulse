import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useAppState, CATEGORIES } from '../state/AppState.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

const LONG_PRESS_MS = 900

export default function Dashboard() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const { estimate, loggedItems, frequency } = state
  const pressTimer = useRef(null)

  const isGain = estimate >= 0
  const animated = useCountUp(estimate)
  const displayAmount = Math.round(Math.abs(animated))

  const loggedCount = loggedItems.filter(Boolean).length

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

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-8">
        <div className="flex items-center gap-2">
          <span
            className={
              'text-6xl leading-none ' + (isGain ? 'text-accent-dark' : 'text-loss')
            }
          >
            {isGain ? '↑' : '↓'}
          </span>
          <span
            className={
              'tabular text-6xl font-semibold ' +
              (isGain ? 'text-accent-dark' : 'text-loss')
            }
          >
            {displayAmount} EUR
          </span>
        </div>
        <p className="text-base text-ink/70 max-w-xs">
          {isGain
            ? `You could gain ${displayAmount} EUR this period`
            : `You're leaving ${displayAmount} EUR unclaimed`}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-ink/50 mb-2">
          <span>
            {loggedCount} of {CATEGORIES.length} items logged this period
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink/10 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(loggedCount / CATEGORIES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat}
            className="flex items-center gap-2 rounded-card bg-white border border-ink/5 px-4 py-3"
          >
            <span
              className={
                'flex items-center justify-center w-5 h-5 rounded-full text-[11px] flex-shrink-0 ' +
                (loggedItems[i]
                  ? 'bg-accent text-white'
                  : 'border-2 border-ink/15 text-transparent')
              }
            >
              {loggedItems[i] ? '✓' : '•'}
            </span>
            <span className="text-sm text-ink/80">{cat}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/checkin')}
        className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4 shadow-none"
      >
        Log now
      </button>

      <button
        onClick={() => navigate('/settings')}
        className="mt-4 text-sm text-ink/50 underline underline-offset-2 self-center"
      >
        Change frequency ({frequency})
      </button>
    </div>
  )
}

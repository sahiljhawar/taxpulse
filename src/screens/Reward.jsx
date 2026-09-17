import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

export default function Reward() {
  const navigate = useNavigate()
  const { state } = useAppState()
  const { treasure, previousTreasure, readiness, previousReadiness, lastClaim } = state

  const animatedTreasure = useCountUp(treasure, 900, previousTreasure)
  const animatedReadiness = useCountUp(readiness, 900, previousReadiness)

  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-6 items-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <span className="text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 bg-accent/15 text-accent-dark">
          Found
        </span>

        <span className="tabular text-6xl font-semibold text-accent-dark">
          +{lastClaim?.impact ?? 0} EUR
        </span>

        <p className="text-sm text-ink/60">{lastClaim?.category}</p>

        <div className="w-full max-w-xs flex flex-col gap-4 mt-4">
          <div className="rounded-card bg-white border border-ink/5 px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-ink/60">Tax Treasure</span>
            <span className="tabular text-lg font-semibold text-ink">
              {Math.round(animatedTreasure)} EUR
            </span>
          </div>
          <div className="rounded-card bg-white border border-ink/5 px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-ink/60">Tax Readiness</span>
            <span className="tabular text-lg font-semibold text-ink">
              {Math.round(animatedReadiness)}%
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/opportunity')}
        className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4"
      >
        See what else we found
      </button>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useAppState, CATEGORIES } from '../state/AppState.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

function buildExplanation(sessionAnswers) {
  const entries = Object.entries(sessionAnswers).filter(([, a]) => a.delta !== 0)
  if (entries.length === 0) {
    return 'No changes logged this period. Your estimate stays the same.'
  }
  const [topCategory, top] = entries.sort(
    (a, b) => Math.abs(b[1].delta) - Math.abs(a[1].delta)
  )[0]
  const verb = top.delta >= 0 ? 'added' : 'reduced'
  const label = {
    Income: 'Freelance income logged',
    Purchase: 'Purchase logged',
    'Job change': 'Job change logged',
    Donation: 'Donation logged',
  }[topCategory]
  return `${label}. This ${verb} ${Math.abs(top.delta)} EUR to your estimate.`
}

export default function Result() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const { estimate, previousEstimate, sessionAnswers, sessionReceipts } = state

  const isGain = estimate >= 0
  const animated = useCountUp(estimate, 900, previousEstimate)
  const displayAmount = Math.round(Math.abs(animated))

  const explanation = buildExplanation(sessionAnswers)

  function handleDone() {
    dispatch({ type: 'CLEAR_SESSION' })
    navigate('/')
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-6 items-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <span
          className={
            'text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 ' +
            (isGain ? 'bg-accent/15 text-accent-dark' : 'bg-loss/15 text-loss')
          }
        >
          Updated
        </span>

        <div className="flex items-center gap-2">
          <span
            className={
              'text-2xl ' + (isGain ? 'text-accent-dark' : 'text-loss')
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

        <p className="text-base text-ink/70 max-w-xs">{explanation}</p>

        {sessionReceipts.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex -space-x-2">
              {sessionReceipts.slice(0, 3).map((r, i) => (
                <img
                  key={i}
                  src={r.url}
                  alt=""
                  className="w-8 h-8 rounded-lg object-cover border-2 border-bg"
                />
              ))}
            </div>
            <span className="text-sm text-ink/50">
              {sessionReceipts.length} receipt
              {sessionReceipts.length > 1 ? 's' : ''} saved
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleDone}
        className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4"
      >
        Done
      </button>
    </div>
  )
}

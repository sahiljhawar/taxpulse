import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'

const OPTIONS = [
  {
    label: 'Weekly',
    description: 'Smaller check-ins, always up to date.',
  },
  {
    label: 'Biweekly',
    description: 'A balance of frequency and effort.',
  },
  {
    label: 'Monthly',
    description: 'Fewer check-ins, bigger updates each time.',
  },
]

export default function FrequencySettings() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()

  function select(label) {
    dispatch({ type: 'SET_FREQUENCY', frequency: label })
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-6">
      <button
        onClick={() => navigate('/')}
        className="self-start text-sm text-ink/50 mb-8 flex items-center gap-1"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-8 leading-snug">
        How often do you want to check in?
      </h1>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => {
          const active = state.frequency === opt.label
          return (
            <button
              key={opt.label}
              onClick={() => select(opt.label)}
              className={
                'text-left rounded-card px-5 py-4 border transition-all ' +
                (active
                  ? 'border-accent bg-accent/10'
                  : 'border-ink/10 bg-white hover:border-ink/20')
              }
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-base">{opt.label}</span>
                {active && <span className="text-accent-dark text-sm">✓ Selected</span>}
              </div>
              <p className="text-sm text-ink/60">{opt.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

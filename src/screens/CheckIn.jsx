import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState, CATEGORIES, SCENARIOS, BAND_LABELS } from '../state/AppState.jsx'

const BANDS = ['No change', 'Under 500 EUR', '500 to 2000 EUR', '2000+ EUR']

export default function CheckIn() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const [step, setStep] = useState(0)
  const [selectedBand, setSelectedBand] = useState(null)
  const [receiptForStep, setReceiptForStep] = useState(null)
  const fileInputRef = useRef(null)

  const category = CATEGORIES[step]
  const isLast = step === CATEGORIES.length - 1

  function selectBand(band) {
    setSelectedBand(band)
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setReceiptForStep({ name: file.name, url })
  }

  function handleNext() {
    if (!selectedBand) return

    dispatch({ type: 'ANSWER_QUESTION', category, band: selectedBand })
    if (receiptForStep) {
      dispatch({ type: 'ADD_RECEIPT', receipt: receiptForStep })
    }

    if (isLast) {
      dispatch({ type: 'COMMIT_CHECKIN' })
      navigate('/result')
    } else {
      setStep(step + 1)
      setSelectedBand(null)
      setReceiptForStep(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-6">
      <div className="flex items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((_, i) => (
          <span
            key={i}
            className={
              'h-2 rounded-full transition-all ' +
              (i === step
                ? 'w-6 bg-accent'
                : i < step
                ? 'w-2 bg-accent-dark'
                : 'w-2 bg-ink/15')
            }
          />
        ))}
      </div>

      <p className="text-xs text-ink/40 mb-1">
        Question {step + 1} of {CATEGORIES.length}
      </p>
      <h1 className="text-2xl font-semibold mb-8 leading-snug">
        {BAND_LABELS[category]}
      </h1>

      <div className="flex flex-col gap-3 mb-8">
        {BANDS.map((band) => {
          const active = selectedBand === band
          return (
            <button
              key={band}
              onClick={() => selectBand(band)}
              className={
                'w-full text-left rounded-card px-5 py-4 border transition-all ' +
                (active
                  ? 'border-accent bg-accent/10 text-ink font-semibold'
                  : 'border-ink/10 bg-white text-ink/80 hover:border-ink/20')
              }
            >
              {band}
            </button>
          )
        })}
      </div>

      <div className="mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-card border border-ink/10 bg-white px-5 py-3 text-sm text-ink/70"
        >
          <CameraIcon />
          Add receipt
        </button>
        {receiptForStep && (
          <div className="mt-3 flex items-center gap-3">
            <img
              src={receiptForStep.url}
              alt="receipt thumbnail"
              className="w-12 h-12 rounded-lg object-cover border border-ink/10"
            />
            <span className="text-sm text-ink/60 flex items-center gap-1">
              <span className="text-accent-dark">✓</span> Saved
            </span>
          </div>
        )}
      </div>

      <div className="flex-1" />

      <button
        onClick={handleNext}
        disabled={!selectedBand}
        className={
          'w-full rounded-card font-semibold text-base py-4 transition-all ' +
          (selectedBand
            ? 'bg-accent hover:bg-accent-dark active:scale-[0.98] text-white'
            : 'bg-ink/10 text-ink/30 cursor-not-allowed')
        }
      >
        {isLast ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

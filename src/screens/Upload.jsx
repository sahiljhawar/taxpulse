import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState, DEMO_RECEIPT, AGENT_STEPS } from '../state/AppState.jsx'

const STEP_DELAY_MS = 650

export default function Upload() {
  const navigate = useNavigate()
  const { dispatch } = useAppState()
  const fileInputRef = useRef(null)

  const [thumbnail, setThumbnail] = useState(null)
  const [stage, setStage] = useState('idle') // idle | scanning | result
  const [completedSteps, setCompletedSteps] = useState(0)

  useEffect(() => {
    if (stage !== 'scanning') return
    if (completedSteps >= AGENT_STEPS.length) {
      const t = setTimeout(() => setStage('result'), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCompletedSteps((n) => n + 1), STEP_DELAY_MS)
    return () => clearTimeout(t)
  }, [stage, completedSteps])

  function startScan(file) {
    if (file) {
      const url = URL.createObjectURL(file)
      setThumbnail(url)
      dispatch({ type: 'ADD_SESSION_RECEIPT', receipt: { name: file.name, url } })
    }
    setCompletedSteps(0)
    setStage('scanning')
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) startScan(file)
  }

  function handleClaim() {
    dispatch({ type: 'CLAIM_RECEIPT' })
    navigate('/reward')
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-6">
      <button
        onClick={() => navigate('/')}
        className="self-start text-sm text-ink/50 mb-6"
      >
        ← Back
      </button>

      {stage === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <div className="text-5xl">🧾</div>
          <div>
            <h1 className="text-2xl font-semibold mb-2">Scan a receipt</h1>
            <p className="text-sm text-ink/60 max-w-xs">
              Snap a photo and our agents will find out what it's worth.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold px-6 py-4"
          >
            <CameraIcon />
            Add receipt photo
          </button>
          <button
            onClick={() => startScan(null)}
            className="text-sm text-ink/50 underline underline-offset-2"
          >
            Use demo receipt instead
          </button>
        </div>
      )}

      {stage === 'scanning' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="receipt"
              className="w-24 h-24 rounded-card object-cover border border-ink/10"
            />
          ) : (
            <div className="w-24 h-24 rounded-card bg-white border border-ink/10 flex items-center justify-center text-3xl">
              🧾
            </div>
          )}
          <p className="text-sm text-ink/50">
            {DEMO_RECEIPT.name} — {DEMO_RECEIPT.amount} EUR
          </p>

          <div className="w-full max-w-xs flex flex-col gap-3">
            {AGENT_STEPS.map((step, i) => {
              const done = i < completedSteps
              const active = i === completedSteps
              return (
                <div
                  key={step}
                  className={
                    'flex items-center gap-3 rounded-card border px-4 py-3 transition-all ' +
                    (done
                      ? 'border-accent bg-accent/10'
                      : active
                      ? 'border-ink/20 bg-white'
                      : 'border-ink/5 bg-white/50')
                  }
                >
                  <span
                    className={
                      'flex items-center justify-center w-6 h-6 rounded-full text-xs flex-shrink-0 ' +
                      (done
                        ? 'bg-accent text-white'
                        : active
                        ? 'border-2 border-ink/30 animate-pulse'
                        : 'border-2 border-ink/10')
                    }
                  >
                    {done ? '✓' : ''}
                  </span>
                  <span
                    className={
                      'text-sm ' + (done ? 'text-ink font-medium' : 'text-ink/50')
                    }
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="receipt"
              className="w-16 h-16 rounded-card object-cover border border-ink/10"
            />
          ) : (
            <div className="text-4xl">🧾</div>
          )}
          <p className="text-lg font-semibold">
            {DEMO_RECEIPT.name} — {DEMO_RECEIPT.amount} EUR
          </p>
          <p className="text-sm text-ink/60">{DEMO_RECEIPT.reason}</p>

          <div className="rounded-card bg-accent/10 border border-accent/30 px-6 py-4 mt-2">
            <p className="text-xs text-ink/50 uppercase tracking-wide mb-1">
              Estimated tax impact
            </p>
            <p className="tabular text-3xl font-semibold text-accent-dark">
              ~{DEMO_RECEIPT.impact} EUR
            </p>
          </div>

          <button
            onClick={handleClaim}
            className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4 mt-6"
          >
            Claim {DEMO_RECEIPT.impact} EUR
          </button>
        </div>
      )}
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

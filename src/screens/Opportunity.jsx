import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState, TRIP_OPPORTUNITY } from '../state/AppState.jsx'

export default function Opportunity() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const fileInputRef = useRef(null)

  function handleAddInvoice(e) {
    const file = e.target.files?.[0]
    if (!file) return
    dispatch({ type: 'ADD_HOTEL_INVOICE' })
  }

  const items = TRIP_OPPORTUNITY.items.map((item) =>
    item.name === 'Hotel invoice' && state.hotelInvoiceAdded
      ? { ...item, found: true }
      : item
  )

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-6">
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="text-center">
          <p className="text-sm text-ink/50 uppercase tracking-wide font-medium mb-2">
            Context Agent
          </p>
          <h1 className="text-2xl font-semibold leading-snug">
            We found something else.
          </h1>
        </div>

        <div className="rounded-card bg-white border border-ink/5 px-5 py-5">
          <p className="text-sm text-ink/60 mb-1">Possible work trip detected</p>
          <p className="text-lg font-semibold mb-4">{TRIP_OPPORTUNITY.title}</p>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      'flex items-center justify-center w-5 h-5 rounded-full text-[11px] flex-shrink-0 ' +
                      (item.found
                        ? 'bg-accent text-white'
                        : 'border-2 border-loss text-loss')
                    }
                  >
                    {item.found ? '✓' : '✕'}
                  </span>
                  <span className={item.found ? 'text-ink' : 'text-loss'}>
                    {item.name}
                  </span>
                </div>
                <span className="tabular text-sm text-ink/70">
                  {item.amount ? `${item.amount} EUR` : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-ink/60 text-center max-w-xs mx-auto">
          Potential additional value detected. Add the hotel invoice to unlock it.
        </p>

        {!state.hotelInvoiceAdded && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddInvoice}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto text-sm text-accent-dark underline underline-offset-2"
            >
              Add hotel invoice
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full rounded-card bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-semibold text-base py-4"
      >
        Back to Treasure
      </button>
    </div>
  )
}

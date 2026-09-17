import React, { createContext, useContext, useMemo, useReducer } from 'react'

export const CATEGORIES = ['Income', 'Purchase', 'Job change', 'Donation']

// Amount-band -> dollar delta per category. Hardcoded so the demo always
// produces believable, consistent numbers.
export const SCENARIOS = {
  Income: {
    'No change': 0,
    'Under 500 EUR': 40,
    '500 to 2000 EUR': 210,
    '2000+ EUR': 480,
  },
  Purchase: {
    'No change': 0,
    'Under 500 EUR': 25,
    '500 to 2000 EUR': 95,
    '2000+ EUR': 260,
  },
  'Job change': {
    'No change': 0,
    'Under 500 EUR': -60,
    '500 to 2000 EUR': -150,
    '2000+ EUR': -320,
  },
  Donation: {
    'No change': 0,
    'Under 500 EUR': 15,
    '500 to 2000 EUR': 70,
    '2000+ EUR': 180,
  },
}

export const BAND_LABELS = {
  Income: 'Did your income change this period?',
  Purchase: 'Any notable purchases this period?',
  'Job change': 'Did your job situation change?',
  Donation: 'Did you make any donations?',
}

const initialState = {
  estimate: -120, // loss state to start, matches the pitch copy
  loggedItems: [false, false, false, true], // 3 of 4 logged
  frequency: 'Biweekly',
  receipts: [], // persistent thumbnails across sessions
  sessionReceipts: [], // receipts added during current check-in flow
  sessionAnswers: {}, // category -> { band, delta }
  previousEstimate: -120,
  lastDelta: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { category, band } = action
      const delta = SCENARIOS[category][band]
      return {
        ...state,
        sessionAnswers: {
          ...state.sessionAnswers,
          [category]: { band, delta },
        },
      }
    }
    case 'ADD_RECEIPT': {
      return {
        ...state,
        sessionReceipts: [...state.sessionReceipts, action.receipt],
      }
    }
    case 'COMMIT_CHECKIN': {
      const deltaSum = Object.values(state.sessionAnswers).reduce(
        (sum, a) => sum + a.delta,
        0
      )
      const answeredCategories = Object.keys(state.sessionAnswers)
      const newLoggedItems = CATEGORIES.map((cat, i) =>
        answeredCategories.includes(cat) ? true : state.loggedItems[i]
      )
      return {
        ...state,
        estimate: state.estimate + deltaSum,
        previousEstimate: state.estimate,
        lastDelta: deltaSum,
        loggedItems: newLoggedItems,
        receipts: [...state.receipts, ...state.sessionReceipts],
      }
    }
    case 'CLEAR_SESSION': {
      return {
        ...state,
        sessionAnswers: {},
        sessionReceipts: [],
      }
    }
    case 'SET_FREQUENCY': {
      return { ...state, frequency: action.frequency }
    }
    case 'RESET_DEMO': {
      return initialState
    }
    default:
      return state
  }
}

const StateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(StateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}

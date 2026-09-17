import React, { createContext, useContext, useMemo, useReducer } from 'react'

// Category breakdown of the treasure. Order matters for the dashboard grid.
export const CATEGORY_ORDER = ['Work equipment', 'Travel', 'Home office', 'Education']

// The single hardcoded receipt scenario used for the MVP demo. One clear
// end-to-end flow beats several half-built ones.
export const DEMO_RECEIPT = {
  name: 'Monitor',
  amount: 189,
  category: 'Work equipment',
  reason: 'Likely work equipment',
  impact: 57,
}

// The Context Agent's "wow moment": a partially-documented trip it noticed
// from calendar + receipts, with one item still missing.
export const TRIP_OPPORTUNITY = {
  title: 'AI Conference Hamburg',
  items: [
    { name: 'Train ticket', amount: 89, found: true },
    { name: 'Conference ticket', amount: 79, found: true },
    { name: 'Hotel invoice', amount: null, found: false },
  ],
}

const AGENT_STEPS = ['Receipt Agent', 'Tax Agent', 'Treasure Agent']

const initialCategories = {
  'Work equipment': 210,
  Travel: 168,
  'Home office': 48,
  Education: 0,
}

function sumCategories(categories) {
  return Object.values(categories).reduce((a, b) => a + b, 0)
}

const initialState = {
  categories: initialCategories,
  treasure: sumCategories(initialCategories), // 426
  previousTreasure: sumCategories(initialCategories),
  readiness: 72,
  previousReadiness: 72,
  lastClaim: null, // { category, impact }
  hotelInvoiceAdded: false,
  sessionReceipt: null, // thumbnail added during upload, for display only
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_SESSION_RECEIPT': {
      return { ...state, sessionReceipt: action.receipt }
    }
    case 'CLAIM_RECEIPT': {
      const { category, impact } = DEMO_RECEIPT
      const newCategories = {
        ...state.categories,
        [category]: state.categories[category] + impact,
      }
      return {
        ...state,
        categories: newCategories,
        previousTreasure: state.treasure,
        treasure: sumCategories(newCategories),
        previousReadiness: state.readiness,
        readiness: Math.min(100, state.readiness + 6),
        lastClaim: { category, impact },
      }
    }
    case 'ADD_HOTEL_INVOICE': {
      return { ...state, hotelInvoiceAdded: true }
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

export { AGENT_STEPS }

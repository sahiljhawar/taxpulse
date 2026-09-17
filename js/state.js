'use strict';

/* ---------- One coherent fictional demo state ---------- */

const samples = {
  monitor: {
    id: 'monitor', title: 'External monitor', merchant: 'MediaMarkt',
    amount: 189, impact: 57, icon: 'monitor', date: '12 Sep 2026'
  },
  laptop: {
    id: 'laptop', title: 'Work laptop', merchant: 'MediaMarkt',
    amount: 899, impact: 210, icon: 'laptop', date: '12 Sep 2026'
  }
};

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const state = {
  route: 'home',
  selected: 'monitor',
  saved: [],
  scanRunning: false,
  scanFinished: false,
  rewardBefore: 426,
  readinessBefore: 72,
  lastSaved: null,
  septemberChecked: false,
  hotelResolved: false,
  homeOfficeReviewed: false,
  draftPrepared: false,
  reminders: false,
  analysisCategory: 'Work equipment'
};

const initialState = JSON.parse(JSON.stringify(state));

// Mutable run counter shared across screens so a stale async scan can
// detect it's been superseded (route change, new sample selected, etc).
let scanRun = 0;

function totalTreasure() {
  return 426 + state.saved.reduce((sum, item) => sum + item.impact, 0);
}
function completedReadinessItems() {
  return Math.min(18, 13 + Number(state.saved.length > 0) +
    Number(state.septemberChecked) + Number(state.hotelResolved) +
    Number(state.homeOfficeReviewed));
}
function readiness() { return Math.round(completedReadinessItems() / 18 * 100); }
function trackedMonths() { return state.septemberChecked ? 9 : 8; }
function sample() { return samples[state.selected]; }
function alreadySaved() { return state.saved.some(item => item.id === state.selected); }

const navigation = [
  ['home', 'home', 'Home'],
  ['receipts', 'receipt', 'Receipts'],
  ['salary', 'plus', 'Gehaltsplus'],
  ['agent', 'spark', 'AI Agent'],
  ['profile', 'user', 'Profile']
];
const routeGroups = {
  scan: 'receipts', analysis: 'receipts', reward: 'receipts',
  opportunity: 'agent', payday: 'salary', breakdown: 'salary'
};

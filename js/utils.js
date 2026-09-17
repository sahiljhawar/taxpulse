'use strict';

/* ---------- Shared utilities ---------- */

const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const eur = value => new Intl.NumberFormat('en-IE', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
}).format(value);
const num = value => new Intl.NumberFormat('en-GB').format(value);

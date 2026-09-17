'use strict';

/* ---------- Icon system ---------- */

const iconPaths = {
  pulse: '<path d="M2 12h5l3-7 4 14 3-7h5"/>',
  home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
  receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2z"/><path d="M8 7h8M8 11h8M8 15h4"/>',
  plus: '<rect x="3" y="4" width="18" height="16" rx="5"/><path d="M12 8v8M8 12h8"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="m14 6-6 6 6 6"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  circle: '<circle cx="12" cy="12" r="7"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  train: '<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M5 10h14M9 3v7M15 3v7M8 21l2-3m6 3-2-3M8 14h1m6 0h1"/>',
  laptop: '<rect x="5" y="4" width="14" height="12" rx="2"/><path d="M3 20h18l-2-4H5z"/>',
  monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4M8 21h8"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5zM6 11v6c4 3 8 3 12 0v-6M22 9v8"/>',
  wallet: '<path d="M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7"/><path d="M20 11h-6v6h6M16 14h.1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  camera: '<path d="M8 5h8l2 3h3v12H3V8h3z"/><circle cx="12" cy="13" r="4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18M7 15h3M14 15h3"/>',
  hotel: '<path d="M4 21V3h16v18M2 21h20M9 21v-5h6v5M8 7h1m6 0h1M8 11h1m6 0h1"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  document: '<path d="M14 3H5v18h14V8z"/><path d="M14 3v5h5M8 12h8M8 16h6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  sprout: '<path d="M12 21v-9M12 15C5 15 3 10 3 5c6 0 9 4 9 10zM12 12c0-6 4-9 9-9 0 6-3 9-9 9z"/>',
  flag: '<path d="M5 22V3c5-4 9 4 15 0v11c-6 4-10-4-15 0"/>',
  warning: '<path d="m12 3 10 18H2zM12 9v5M12 17h.01"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-4M9 14l6 4"/>'
};

function icon(name, small = false) {
  return `<svg class="tp-icon${small ? ' tp-icon-sm' : ''}" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="1.65"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${iconPaths[name] || iconPaths.spark}</svg>`;
}
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = icon(el.dataset.icon, el.classList.contains('tp-icon-sm'));
  });
}
function box(name, type = '') {
  return `<span class="tp-icon-box ${type ? `tp-icon-box-${type}` : ''}">${icon(name)}</span>`;
}
function badge(text, name = '', type = '') {
  return `<span class="tp-badge ${type ? `tp-badge-${type}` : ''}">${name ? icon(name) : ''}${text}</span>`;
}

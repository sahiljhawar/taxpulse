'use strict';

/* ---------- Small reusable markup builders ---------- */

function button(text, action, type = '', wide = true, arrow = true) {
  return `<button class="tp-button ${type ? `tp-button-${type}` : ''} ${wide ? 'tp-button-wide' : ''}"
    data-action="${action}">${text}${arrow ? icon('arrow', true) : ''}</button>`;
}
function routeButton(text, route, type = '', wide = true) {
  return `<button class="tp-button ${type ? `tp-button-${type}` : ''} ${wide ? 'tp-button-wide' : ''}"
    data-go="${route}">${text}${icon('arrow', true)}</button>`;
}
function textButton(text, action, name = 'arrow') {
  return `<button class="tp-text-button" data-action="${action}">${text}${icon(name, true)}</button>`;
}
function back(route) {
  return `<button class="tp-text-button tp-back" data-go="${route}">${icon('back', true)} Back</button>`;
}
function heading(title, subtitle, eyebrow = '', action = '') {
  return `<header class="tp-page-heading">
    <div>${eyebrow ? `<div class="tp-eyebrow">${eyebrow}</div>` : ''}
    <h1 tabindex="-1">${title}</h1><p>${subtitle}</p></div>
    ${action ? `<div class="tp-page-heading-action">${action}</div>` : ''}
  </header>`;
}
function counter(value, from = value) {
  return `<span data-counter="${value}" data-from="${from}">${num(value)}</span>`;
}
function progress(percent, label) {
  return `<div class="tp-progress-track" role="progressbar" aria-label="${label}"
    aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">
    <div class="tp-progress-fill" style="--progress:${percent}%"></div>
  </div>`;
}
function ring(percent) {
  const circumference = 201.06;
  return `<div class="tp-ring">
    <svg viewBox="0 0 74 74" role="img" aria-label="${percent} percent ready">
      <circle class="tp-ring-track" cx="37" cy="37" r="32"/>
      <circle class="tp-ring-fill" cx="37" cy="37" r="32"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference * (1 - percent / 100)}"/>
    </svg>
    <span class="tp-ring-label">${percent}%</span>
  </div>`;
}
function agentRow(agent, index, status) {
  return `<div class="tp-agent-step" id="agent-${index}" data-status="${status}">
    ${icon(agent.icon, true)}
    <div class="tp-grow"><div class="tp-agent-step-title">${agent.title}</div>
      <div class="tp-agent-step-detail">${status === 'done' ? agent.done : agent.detail}</div></div>
    <div class="tp-agent-status">${status === 'done' ? icon('check', true) : 'Waiting'}</div>
  </div>`;
}
function mission(title, done, detail, action) {
  return `<div class="tp-mission">
    <span class="tp-mission-state ${done ? 'tp-mission-state-done' : ''}">${done ? icon('check') : ''}</span>
    <div class="tp-grow"><h3>${title}</h3><p>${detail}</p>
      ${textButton(done ? 'Review' : 'Take a look', action)}
    </div>
  </div>`;
}

/* ---------- Shared financial components ---------- */

function salaryHero() {
  return `<section class="tp-hero">
    <div class="tp-row tp-between">
      <span class="tp-eyebrow">Your Gehaltsplus</span>
      ${badge('Potential', 'spark', 'dark')}
    </div>
    <div class="tp-hero-amount">+€${counter(87, 0)} <span class="tp-hero-unit">/ month</span></div>
    <p class="tp-hero-copy">Your estimated potential additional net income.</p>
    <div class="tp-hero-bottom">
      <div><div class="tp-hero-annual">€1,044</div>
        <div class="tp-hero-caption">illustrative annual tax benefit</div></div>
      ${routeButton('How it works', 'salary', 'lime', false)}
    </div>
  </section>`;
}
function treasureCard() {
  return `<section class="tp-treasure">
    <div class="tp-row tp-between">
      <span class="tp-eyebrow">Your Tax Treasure</span>${icon('spark')}
    </div>
    <div class="tp-treasure-value">€${counter(totalTreasure())}<span style="font-size:20px;color:#9aad87">.</span></div>
    <p class="tp-small tp-mt8">Estimated potential tax impact captured.</p>
    <div class="tp-treasure-footer">
      <div><h3>Your year is taking shape</h3><p class="tp-tiny tp-mt8">${completedReadinessItems()} of 18 preparation tasks done</p>
        ${textButton('What counts as ready?', 'readiness-info')}</div>
      ${ring(readiness())}
    </div>
  </section>`;
}
function receiptRow(item, saved = true) {
  return `<div class="tp-receipt-row">
    ${box(item.icon, item.icon === 'train' ? 'peach' : 'purple')}
    <div class="tp-grow">
      <div class="tp-receipt-title">${item.title}</div>
      <div class="tp-receipt-meta">${eur(item.amount)} purchase · ${saved ? 'Saved' : 'Demo example'}</div>
    </div>
    <div class="tp-receipt-impact">~${eur(item.impact)}<small>potential impact</small></div>
  </div>`;
}
function monthGrid() {
  return `<div class="tp-months">${months.map((month, i) => `
    <div class="tp-month ${i < trackedMonths() ? 'tp-month-done' : i === trackedMonths() ? 'tp-month-next' : ''}">
      <span>${month}</span>${icon(i < trackedMonths() ? 'check' : 'circle')}
    </div>`).join('')}</div>`;
}

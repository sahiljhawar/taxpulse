'use strict';

let previousFocus = null;
let toastTimer = null;

/* ---------- Render loop ---------- */

function navigate(route) {
  if (!screens[route]) return;
  scanRun += 1;
  state.scanRunning = false;
  closeDialog(false);
  state.route = route;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('main').querySelector('h1')?.focus({ preventScroll: true });
}
function render() {
  const active = routeGroups[state.route] || state.route;
  const navMarkup = navigation.map(([route, name, label]) =>
    `<button data-go="${route}" data-route="${route}" aria-label="${label}"
      ${active === route ? 'aria-current="page"' : ''}>
      <span class="tp-nav-icon">${icon(name)}</span><span class="tp-nav-label">${label}</span>
    </button>`
  ).join('');

  $('desktop-nav').innerHTML = navMarkup;
  $('mobile-nav').innerHTML = navMarkup;
  $('main').innerHTML = `<div class="tp-page">${screens[state.route]()}</div>
    <div class="tp-demo-note">
      ${icon('shield')}
      <span>TaxPulse is a Taxfix hackathon concept. Fictional data and simulated AI.
      Estimates are not a refund, salary promise, or tax advice. Nothing is submitted.</span>
    </div>`;

  hydrateIcons($('main'));
  animateCounters();
}
function animateCounters() {
  $('main').querySelectorAll('[data-counter]').forEach(el => {
    const to = Number(el.dataset.counter);
    const from = Number(el.dataset.from);
    if (reducedMotion || from === to) {
      el.textContent = num(to);
      return;
    }
    const started = performance.now();
    function tick(now) {
      if (!el.isConnected) return;
      const p = Math.min((now - started) / 850, 1);
      el.textContent = num(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- Dialogs, accessibility, feedback ---------- */

function openDialog(title, content) {
  if ($('overlay').hidden) previousFocus = document.activeElement;
  $('dialog-title').textContent = title;
  $('dialog-body').innerHTML = content;
  $('overlay').hidden = false;
  $('app-content').inert = true;
  document.body.style.overflow = 'hidden';
  hydrateIcons($('overlay'));
  document.querySelector('.tp-dialog').scrollTop = 0;
  document.querySelector('.tp-close').focus();
}
function closeDialog(restoreFocus = true) {
  const wasOpen = !$('overlay').hidden;
  $('overlay').hidden = true;
  $('app-content').inert = false;
  document.body.style.overflow = '';
  if (restoreFocus && wasOpen && previousFocus?.isConnected) previousFocus.focus();
}
function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').classList.add('tp-toast-visible');
  toastTimer = setTimeout(() => $('toast').classList.remove('tp-toast-visible'), 3800);
}
function celebrate() {
  $('announcer').textContent = 'Meaningful task completed. Your preparation progress is updated.';
  if (reducedMotion) return;
  $('confetti').innerHTML = Array.from({ length: 20 }, (_, i) =>
    `<span class="tp-confetti-piece" style="
      --piece-x:${(Math.random() - .5) * 400}px;
      --piece-y:${90 + Math.random() * 230}px;
      --piece-r:${Math.random() * 500}deg;
      --piece-color:${['#b5d889', '#d4c4ed', '#85a36e', '#e0cc9a'][i % 4]};
      animation-delay:${Math.random() * .09}s"></span>`
  ).join('');
  setTimeout(() => { $('confetti').innerHTML = ''; }, 1300);
}

/* ---------- Central event handling ---------- */

const actions = {
  'open-scanner': openScanner,
  'start-scan': startScan,
  'save-receipt': saveReceipt,
  'not-tax-related': () => {
    navigate('receipts');
    toast('Not saved. No amount was added to your treasure.');
  },
  'open-opportunity': () => navigate('opportunity'),
  'open-payday': () => navigate('payday'),
  'go-home': () => navigate('home'),
  'complete-payday': completePayday,
  'estimate-info': estimateInfo,
  'readiness-info': () => openDialog('Readiness is preparation, not a score.', `
    <p>Your percentage is the share of 18 fictional preparation tasks completed: ${completedReadinessItems()} / 18, rounded to ${readiness()}%.</p>
    <p class="tp-mt12">Completing the first missing receipt task moves the example from 13 / 18 (72%) to 14 / 18 (78%). More receipts do not keep earning readiness points.</p>
    <p class="tp-mt12">No leaderboard, income comparison, filing guarantee, or reward for opening the app.</p>
    <div class="tp-mt20">${button('Understood', 'close-dialog')}</div>`),
  'agent-workflow': workflow,
  'hotel-invoice': hotelInvoice,
  'link-hotel': () => {
    if (!$('hotel-confirm')?.checked) return;
    state.hotelResolved = true;
    closeDialog();
    render();
    toast('Demo hotel invoice linked. No financial estimate added.');
  },
  'home-office': homeOffice,
  'save-home-office': () => {
    const field = $('home-days');
    if (!field || field.value.trim() === '' || !field.checkValidity()) {
      field?.reportValidity();
      return;
    }
    state.homeOfficeReviewed = true;
    closeDialog();
    render();
    toast('Home-office review completed. Estimate unchanged.');
  },
  'application': application,
  'prepare-draft': () => {
    if (!$('draft-consent')?.checked) return;
    state.draftPrepared = true;
    closeDialog();
    render();
    toast('Fictional draft prepared. Nothing was submitted.');
  },
  'payslip': payslip,
  'close-dialog': () => closeDialog(),
  'reset': () => {
    Object.assign(state, JSON.parse(JSON.stringify(initialState)));
    navigate('home');
    toast('Demo reset. Ready to discover again.');
  }
};

document.addEventListener('click', event => {
  const routeTarget = event.target.closest('[data-go]');
  if (routeTarget) {
    navigate(routeTarget.dataset.go);
    return;
  }
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget && !actionTarget.disabled) {
    actions[actionTarget.dataset.action]?.();
  }
});

document.addEventListener('change', event => {
  const { id } = event.target;

  if (id === 'sample-select') {
    scanRun += 1;
    state.selected = event.target.value;
    state.scanRunning = false;
    state.scanFinished = false;
    state.analysisCategory = 'Work equipment';
    render();
  }
  if (id === 'confirm-use') {
    $('save-receipt').disabled = !event.target.checked || alreadySaved();
  }
  if (id === 'receipt-category') state.analysisCategory = event.target.value;
  if (id === 'hotel-confirm') $('link-hotel').disabled = !event.target.checked;
  if (id === 'draft-consent') $('prepare-draft').disabled = !event.target.checked;
  if (id === 'reminders') {
    state.reminders = event.target.checked;
    toast(state.reminders ? 'Demo preference enabled. No actual notifications.' : 'Demo reminders disabled.');
  }
});

$('overlay').addEventListener('click', event => {
  if (event.target === $('overlay')) closeDialog();
});

document.addEventListener('keydown', event => {
  if ($('overlay').hidden) return;
  if (event.key === 'Escape') closeDialog();

  if (event.key === 'Tab') {
    const focusable = [...$('overlay').querySelectorAll(
      'button, input, select, textarea, a[href], summary'
    )].filter(el => !el.disabled && el.getClientRects().length > 0);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* ---------- Start ---------- */
hydrateIcons();
render();

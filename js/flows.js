'use strict';

/* ---------- Multi-agent receipt workflow ---------- */

const scanAgents = [
  { icon: 'receipt', title: 'Receipt Agent', detail: 'Merchant, amount, date, item', done: 'Receipt fields recognized' },
  { icon: 'search', title: 'Tax Agent', detail: 'Suggests a relevant category', done: 'Likely work equipment' },
  { icon: 'calendar', title: 'Context Agent', detail: 'Connects sample profile and records', done: 'Professional-use context needs confirmation' },
  { icon: 'spark', title: 'Treasure Agent', detail: 'Estimates potential impact', done: 'Illustrative estimate prepared' },
  { icon: 'shield', title: 'Review Agent', detail: 'Surfaces limits and uncertainty', done: 'User confirmation required' }
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startScan() {
  if (state.scanRunning) return;
  state.scanRunning = true;
  state.scanFinished = false;
  const currentRun = ++scanRun;
  render();

  for (let i = 0; i < scanAgents.length; i++) {
    if (currentRun !== scanRun || state.route !== 'scan') return;
    const row = $(`agent-${i}`);
    if (!row) return;
    row.dataset.status = 'active';
    row.querySelector('.tp-agent-status').innerHTML = '<span class="tp-spinner" aria-label="Working"></span>';
    $('announcer').textContent = `${scanAgents[i].title} is reviewing the fictional sample.`;

    await delay(reducedMotion ? 180 : 620);

    if (currentRun !== scanRun || state.route !== 'scan') return;
    const currentRow = $(`agent-${i}`);
    if (!currentRow) return;
    currentRow.dataset.status = 'done';
    currentRow.querySelector('.tp-agent-status').innerHTML = icon('check', true);
    currentRow.querySelector('.tp-agent-step-detail').textContent = scanAgents[i].done;
  }

  state.scanRunning = false;
  state.scanFinished = true;
  render();
  $('announcer').textContent = 'Sample analysis complete. Your receipt story is ready.';
  toast('Receipt recognized. Your potential impact is ready to review.');
}
function openScanner() {
  state.scanFinished = false;
  state.analysisCategory = 'Work equipment';
  navigate('scan');
}
function saveReceipt() {
  if (alreadySaved()) return toast('This receipt is already saved. No duplicate value added.');
  if (!$('confirm-use')?.checked) return;
  const chosenCategory = $('receipt-category')?.value || 'Work equipment';

  state.rewardBefore = totalTreasure();
  state.readinessBefore = readiness();
  const item = {
    ...sample(),
    category: chosenCategory,
    impact: chosenCategory === 'Work equipment' ? sample().impact : 0
  };
  state.saved.push(item);
  state.lastSaved = item;
  navigate('reward');
  celebrate();
}

/* ---------- Meaningful tasks ---------- */

function completePayday() {
  if (state.septemberChecked) return;
  state.septemberChecked = true;
  render();
  celebrate();
  toast('September checked. Your preparation progress is updated.');
}
function hotelInvoice() {
  if (state.hotelResolved) {
    return openDialog('One less missing piece.', `
      ${badge('Demo document linked', 'check')}
      <p class="tp-mt16">Hotel invoice · Hamburg · sample amount €120.</p>
      <p class="tp-mt12">The conference document set is now marked as organized. No additional tax impact has been added: professional purpose and eligibility still need review.</p>
      <div class="tp-mt20">${button('Done', 'close-dialog')}</div>`);
  }
  openDialog('Was there an overnight stay?', `
    <div class="tp-row">${box('hotel', 'peach')}<div><h3>Conference trip · Hamburg</h3><p>One possible missing document.</p></div></div>
    <p class="tp-mt16">If this was a professional trip and you stayed overnight, keep the hotel invoice with the other records.</p>
    <section class="tp-card tp-mt16"><h3>Demo hotel invoice</h3><p class="tp-mt8">Hamburg · 18 September 2026 · €120</p></section>
    <label class="tp-checkbox-row"><input type="checkbox" id="hotel-confirm"><span>I confirm the professional purpose of this fictional example.</span></label>
    <div class="tp-mt20"><button class="tp-button tp-button-wide" id="link-hotel" data-action="link-hotel" disabled>Link demo invoice ${icon('arrow', true)}</button></div>
    <div class="tp-center">${textButton('Not now', 'close-dialog', 'close')}</div>
    <p class="tp-disclaimer">No file upload or tax-impact calculation is performed.</p>`);
}
function homeOffice() {
  openDialog('A few days worth remembering.', `
    <p>Review days actually worked from home. Avoid double-counting commuting days. The applicable tax rules and your circumstances still matter.</p>
    <label class="tp-field-label tp-mt20" for="home-days">Fictional home-office days to review</label>
    <input class="tp-input" id="home-days" type="number" min="0" max="366" value="48">
    <p class="tp-disclaimer">This task organizes information only. It does not add a financial estimate.</p>
    <div class="tp-mt20">${button(state.homeOfficeReviewed ? 'Save review again' : 'Mark demo review complete', 'save-home-office')}</div>
    <div class="tp-center">${textButton('Later', 'close-dialog', 'close')}</div>`);
}

/* ---------- Explanations and controlled actions ---------- */

function estimateInfo() {
  openDialog('Two views. Not two refunds.', `
    <section class="tp-card tp-card-soft">
      <h3>Tax Treasure · ${eur(totalTreasure())}</h3>
      <p class="tp-mt8">An illustrative estimate of tax-relevant opportunities captured in your documents. It is not money paid out or a calculated final refund.</p>
    </section>
    <section class="tp-card tp-mt12">
      <h3>Gehaltsplus · +€87 / month</h3>
      <p class="tp-mt8">A separate, fixed example of a €1,044 annual tax effect brought forward across 12 equal months, if eligible and approved.</p>
    </section>
    <ul class="tp-mt16">
      <li>These views can overlap. Never add their amounts together.</li>
      <li>A saved receipt does not automatically update an allowance or salary.</li>
      <li>The allowance amount is not the same as its estimated tax effect.</li>
      <li>Tax treatment depends on professional use, thresholds, timing, tax position, and applicable rules.</li>
      <li>A Freibetrag can create a filing obligation. Changes may lead to a smaller refund or a payment due.</li>
    </ul>
    ${button('That makes sense', 'close-dialog')}`);
}
function application() {
  openDialog('Your next step, made simple.', `
    ${badge('Demo draft only', 'shield', 'neutral')}
    <p class="tp-mt16">We can organize the information for review. This prototype does not calculate an actual allowance, submit an application, or simulate official approval.</p>
    <div class="tp-check-line">${icon('check')} Work commute information</div>
    <div class="tp-check-line">${icon('check')} Home-office information</div>
    <div class="tp-check-line">${icon('check')} Work-equipment information</div>
    <div class="tp-check-line">${icon('check')} Education expenses</div>
    <section class="tp-card tp-mt20">
      <div class="tp-row tp-between tp-small"><span>Illustrative annual tax effect</span><strong>€1,044</strong></div>
      <div class="tp-row tp-between tp-small tp-mt12"><span>Actual requested allowance</span><strong>Not calculated</strong></div>
    </section>
    <p class="tp-mt16">A real journey would be: review → confirm → submit → await the tax authority’s decision → check the payslip.</p>
    <label class="tp-checkbox-row"><input type="checkbox" id="draft-consent"><span>I understand this prepares a fictional draft only.</span></label>
    <div class="tp-mt20"><button class="tp-button tp-button-wide" id="prepare-draft" data-action="prepare-draft" disabled>Prepare demo draft ${icon('arrow', true)}</button></div>
    <div class="tp-center">${textButton('Not now', 'close-dialog', 'close')}</div>`);
}
function workflow() {
  openDialog('Multiple agents. One clear next step.', `
    <p>This is a scripted orchestration preview, not live AI. Each stage has a distinct input, output, and review boundary.</p>
    <div class="tp-agent-list">
      ${[
        ['receipt', '1 · Receipt Agent', 'Input: sample document → output: merchant, date, amount, item.'],
        ['search', '2 · Tax Agent', 'Input: extracted item → output: suggested category and conditions.'],
        ['calendar', '3 · Context Agent', 'Input: demo event + documents → output: linked trip and missing hotel invoice.'],
        ['spark', '4 · Treasure Agent', 'Input: categorized evidence → output: illustrative impact or “not enough information”.'],
        ['shield', '5 · Review Agent', 'Input: proposed result → output: uncertainty and required user confirmation.'],
        ['document', '6 · Preparation & monitoring', 'Only after confirmation: organize data and compare future sample payslips.']
      ].map(([i, t, d]) => `<div class="tp-agent-step">${icon(i, true)}<div><div class="tp-agent-step-title">${t}</div><div class="tp-agent-step-detail">${d}</div></div></div>`).join('')}
    </div>
    <p class="tp-disclaimer">“Review Agent” is not certification of legal compliance. Nothing is filed or changed automatically.</p>
    <div class="tp-mt20">${button('Back to my next step', 'close-dialog')}</div>`);
}
function payslip() {
  openDialog('September sample payslip', `
    ${badge('Fictional document', 'document', 'neutral')}
    <section class="tp-card tp-mt16">
      <h3>Nordlicht Studio GmbH · Alex Keller</h3>
      <table class="tp-pay-table tp-mt12">
        <tr><td>Gross salary</td><td>€3,200</td></tr>
        <tr><td>Taxes and contributions</td><td>−€1,013</td></tr>
        <tr><td>Net payout</td><td>€2,187</td></tr>
      </table>
      <p class="tp-mt12">Tax class I · allowance flag present in sample.</p>
    </section>
    <p class="tp-disclaimer">These simplified totals are not a payroll calculation. The allowance is represented by a fictional comparison field.</p>
    <div class="tp-mt20">${button('Close sample', 'close-dialog')}</div>`);
}

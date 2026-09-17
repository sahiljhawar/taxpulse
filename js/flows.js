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
function anomaly() {
  openDialog('Something changed.', `
    ${badge('Alternate demo scenario', 'warning', 'neutral')}
    <p class="tp-mt16">In this sample, the monthly withholding differs from the expected pattern. A difference is a reason to review, not proof of an error.</p>
    <section class="tp-card tp-mt16">
      <div class="tp-row tp-between tp-small"><span>Expected potential Gehaltsplus</span><strong>+€87</strong></div>
      <div class="tp-row tp-between tp-small tp-mt12"><span>This month · alternate sample</span><strong>+€43</strong></div>
      <div class="tp-divider"></div>
      <div class="tp-row tp-between"><strong>Difference</strong><strong>€44</strong></div>
    </section>
    <div class="tp-mt20">${button('Investigate the sample', 'investigate')}</div>
    <div class="tp-center">${textButton('Later', 'close-dialog', 'close')}</div>`);
}
function investigate() {
  openDialog('A possible explanation.', `
    <span class="tp-eyebrow tp-muted">Illustrative comparison results</span>
    <div class="tp-check-line">${icon('check')} Previous and current sample compared</div>
    <div class="tp-check-line">${icon('check')} Gross salary unchanged</div>
    <div class="tp-check-line">${icon('check')} Tax class unchanged</div>
    <div class="tp-check-line">${icon('check')} Allowance field differs</div>
    <section class="tp-card tp-mt20">
      <h3>The allowance entry may need a review.</h3>
      <p class="tp-mt12">In this alternate fictional record, the payroll allowance field is lower. That could explain some of the withholding difference, but it does not establish the cause.</p>
    </section>
    <p class="tp-mt16">Compare the current official allowance information with the payslip. If needed, ask payroll to clarify. No correction is made by TaxPulse.</p>
    <div class="tp-mt20">${button('Keep this as a review note', 'save-investigation')}</div>
    <div class="tp-center">${textButton('Close', 'close-dialog', 'close')}</div>`);
}
function yearEnd() {
  openDialog('Finish your treasure map.', `
    ${badge('Q4 preview · not a deadline alert', 'flag', 'purple')}
    <p class="tp-mt16">Your records may contain unresolved opportunities. Let’s check the evidence, not rush a purchase.</p>
    <section class="tp-card tp-card-soft tp-mt16">
      <span class="tp-eyebrow tp-muted">Separate illustrative Q4 scenario</span>
      <div class="tp-number tp-mt12" style="font-size:35px">€180–€420</div>
      <p class="tp-mt8">potential tax value still to review — not calculated from your current demo records.</p>
    </section>
    <div class="tp-evidence">
      <div class="tp-evidence-item">${icon('search')} Missing hotel invoice</div>
      <div class="tp-evidence-item">${icon('search')} Home-office days to review</div>
      <div class="tp-evidence-item">${icon('search')} Unclassified professional purchase</div>
    </div>
    <p class="tp-disclaimer">The range is illustrative, may overlap existing estimates, and is not added to your treasure. You do not need to spend money or complete tasks by an artificial deadline.</p>
    <div class="tp-mt20">${button('Review my missing documents', 'open-opportunity')}</div>
    <div class="tp-center">${textButton('Preview filing readiness', 'filing-preview', 'document')}</div>`);
}
function filingPreview() {
  openDialog('You started long before tax season.', `
    ${badge('Preparation overview', 'document')}
    <section class="tp-card tp-mt16">
      <div class="tp-row tp-between tp-small"><span>Receipts organized</span><strong>${37 + state.saved.length}</strong></div>
      <div class="tp-row tp-between tp-small tp-mt12"><span>Preparation tasks completed</span><strong>${completedReadinessItems()} / 18</strong></div>
      <div class="tp-row tp-between tp-small tp-mt12"><span>Salary months checked</span><strong>${trackedMonths()} / 12</strong></div>
    </section>
    <p class="tp-mt16">Your evidence is taking shape. Before filing, you still need to check annual payroll documents, other income, missing information, and the final tax calculation.</p>
    <p class="tp-disclaimer">A real Taxfix handoff is outside this prototype. You can download a clearly marked demo summary instead.</p>
    <div class="tp-mt20">${button('Download demo summary', 'download')}</div>
    <div class="tp-center">${textButton('Keep preparing', 'close-dialog', 'close')}</div>`);
}
function simulator() {
  openDialog('What if I moved closer?', `
    <p>Explore one part of the picture. A shorter commute could reduce tax deductions but also save travel costs and time.</p>
    <div class="tp-confirm-fields tp-mt20">
      <div><label class="tp-field-label" for="old-distance">Current commute · one way</label><input class="tp-input" id="old-distance" value="32 km" readonly></div>
      <div><label class="tp-field-label" for="new-distance">New commute · km</label><input class="tp-input" id="new-distance" type="number" min="0" max="100" value="8"></div>
    </div>
    <section class="tp-impact-card tp-mt20" aria-live="polite" aria-atomic="true">
      <p class="tp-small">Illustrative annual tax-effect change</p>
      <div class="tp-impact-value" id="simulation-annual" style="font-size:43px">−€312</div>
      <p class="tp-small tp-mt8" id="simulation-month">Approximately −€26 / month</p>
    </section>
    <p class="tp-disclaimer">Simulation only. This fictional model uses €13 annual tax-effect change per kilometer difference, not a legal mileage rate. It ignores allowances, actual tax rates, thresholds, and travel-cost savings. No current-law tax calculation.</p>
    <div class="tp-mt20">${button('Save a demo scenario note', 'save-scenario')}</div>
    <div class="tp-center">${textButton('Close', 'close-dialog', 'close')}</div>`);
}

/* ---------- Export / share ---------- */

function downloadSummary() {
  const text = `TAXPULSE — FICTIONAL DEMO SUMMARY
Not a tax return, financial statement, or tax advice.

Profile: Alex Keller, Berlin — fictional
Tax year: 2026
Receipts organized: ${37 + state.saved.length}
Potential Tax Treasure estimate: ${eur(totalTreasure())}
Readiness tasks: ${completedReadinessItems()} / 18
Monthly salary checks: ${trackedMonths()} / 12
Separate illustrative Gehaltsplus: EUR 87 / month
Separate illustrative annual tax effect: EUR 1,044

The Treasure and Gehaltsplus views may overlap. Do not add them.
No real allowance has been calculated or submitted.
No real receipt scanning, AI analysis, calendar access, or payroll monitoring.
All figures require individual review under applicable tax rules.
`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'TaxPulse-FICTIONAL-DEMO.txt';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Demo summary download requested.');
}
async function shareIdea() {
  const text = 'TaxPulse — a Taxfix hackathon concept. Capture receipts, understand their potential tax relevance, and prepare throughout the year. A concept demo, not a benefit guarantee.';
  try {
    if (navigator.share) {
      await navigator.share({ title: 'TaxPulse', text });
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      toast('Concept invitation copied. No financial or personal data included.');
    } else {
      openDialog('Share the idea, not your finances.', `
        <p>This neutral text includes no income, tax totals, or personal details.</p>
        <textarea class="tp-input tp-mt16" rows="6" readonly aria-label="Invitation text">${text}</textarea>
        <div class="tp-mt20">${button('Done', 'close-dialog')}</div>`);
    }
  } catch (error) {
    if (error.name !== 'AbortError') toast('Sharing isn’t available in this browser.');
  }
}

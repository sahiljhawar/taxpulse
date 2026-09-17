# TaxPulse

> **Your year-round AI tax companion — capture receipts, understand their potential tax value, and stay filing-ready.**

TaxPulse is a **Taxfix hackathon concept** that reimagines tax preparation as a year-round experience instead of a once-a-year task.

The prototype turns everyday tax-related evidence — especially receipts — into understandable, actionable information. Users can capture a receipt, see what it may be relevant for, understand the potential impact, confirm its professional use, and keep their tax year organized.

At the same time, a proactive AI agent looks across available information to identify connections and potential missing documents.

---

## 🚀 The Idea

Traditional tax software often becomes relevant only when tax season arrives.

TaxPulse takes a different approach:

```text
Capture → Understand → Connect → Confirm → Organize → Stay Ready
```

Instead of asking users to remember everything at the end of the year, TaxPulse becomes a lightweight companion throughout the year.

For example:

> 📸 Take a picture of a €189 monitor receipt
> ↓
> 🤖 AI identifies it as potentially work-related
> ↓
> 💡 Shows an illustrative potential tax impact of ~€57
> ↓
> 👤 User confirms professional use
> ↓
> 💰 Tax Treasure increases
> ↓
> 🔎 AI notices a related conference trip may be missing a hotel invoice

The goal is to make tax preparation feel **continuous, understandable, and rewarding**.

---

## ✨ Key Features

### 1. Receipt Companion

TaxPulse makes receipt capture useful throughout the year rather than treating receipts as documents that users simply store. Each receipt is analyzed and presented with an understandable explanation of why it might matter for taxes and what its illustrative potential impact could be.

### 2. AI Receipt Scanner

Users can scan a receipt and immediately see extracted information such as merchant, purchase amount, date, and purchased item. The current prototype uses fictional sample receipts rather than a real camera or OCR pipeline.

### 3. Multi-Agent AI Analysis

The receipt journey is represented as a sequence of specialized AI agents:

* **Receipt Agent** — extracts receipt information
* **Tax Agent** — suggests a tax-relevant category
* **Context Agent** — connects the purchase with available context
* **Treasure Agent** — estimates illustrative potential impact
* **Review Agent** — highlights uncertainty and asks for confirmation

This demonstrates how a future system could divide tax understanding into specialized AI responsibilities.

### 4. Explainable Tax Impact

Instead of showing users an unexplained number, TaxPulse explains why a purchase may be relevant and what assumptions influence the estimate.

Users can see:

* Purchase amount
* Suggested category
* Potential tax impact
* Professional-use requirement
* Important uncertainty

### 5. Tax Treasure

**Tax Treasure** visualizes the cumulative illustrative value of tax-relevant evidence captured during the year.

The concept gives users immediate feedback after organizing useful documents, making tax preparation feel more tangible.

> **Important:** Tax Treasure is not a refund prediction.

### 6. Tax Readiness

TaxPulse tracks how prepared the user is for filing.

The prototype considers preparation tasks such as:

* Receipts organized
* Salary months checked
* Missing documents resolved
* Home-office information reviewed

The readiness indicator is intended to represent **preparation progress**, not a competitive score.

### 7. Proactive AI Tax Agent

TaxPulse is designed around an AI that does not simply wait for a question.

The AI can proactively surface potentially useful situations, such as:

> "You have a conference in Hamburg and a train ticket. A hotel invoice may be missing."

This changes the experience from **question-answering** to **continuous assistance**.

### 8. Cross-Document Context Detection

The AI concept connects information across different types of evidence.

For example:

```text
Calendar event
      +
Train ticket
      +
Conference ticket
      ↓
Potential business trip
      ↓
Possible missing hotel invoice
```

The prototype demonstrates this using fictional records.

### 9. Missing Document Detection

TaxPulse can highlight potentially missing evidence associated with an activity.

Examples include:

* Hotel invoice
* Home-office information
* Unclassified professional purchase

The system does not assume that a missing document is automatically deductible; it simply surfaces it for user review.

### 10. Gehaltsplus

**Gehaltsplus** is a separate concept that illustrates how certain potential tax effects could, where applicable, be reflected through wage-tax withholding rather than waiting until the annual return.

The prototype illustrates:

* **€87/month**
* **€1,044/year**

These figures are fictional demo values and are not calculated from the user's actual tax situation.

### 11. Payday Check

The Payday Check compares expected and actual salary information.

The prototype can show:

* Expected net salary
* Actual net salary
* Illustrative Gehaltsplus amount
* Payslip information

It can also highlight differences that deserve attention.

### 12. Payslip Anomaly Detection

If the expected salary adjustment differs from the sample payslip, TaxPulse can compare relevant fields.

For example:

```text
Expected adjustment: +€87
Actual sample adjustment: +€43
Difference: €44
```

The prototype then highlights differences such as allowance-related fields while explicitly avoiding claiming that the detected difference proves the cause.

### 13. Annual Tax Breakdown

TaxPulse provides an overview of illustrative tax-relevant categories, such as:

* Work commute
* Home office
* Work equipment
* Education

This gives users a high-level understanding of where their potential tax-related information comes from.

### 14. Home-Office Review

Users can review and organize home-office information, such as the number of home-office days.

The prototype intentionally separates organization from financial estimation in this workflow.

### 15. Year-End Treasure Map

Near the end of the year, TaxPulse can surface unresolved items that may deserve attention.

Example:

```text
🟠 Missing hotel invoice
🟠 Home-office days
🟠 Unclassified professional purchase
```

The concept helps users understand what remains before filing.

### 16. Filing Readiness Preview

Before filing, TaxPulse summarizes the state of the user's preparation:

* Documents organized
* Preparation tasks completed
* Salary months reviewed
* Potential missing information
* Year-end reminders

The prototype can also generate a fictional summary file.

### 17. "What If?" Simulator

TaxPulse includes a simple scenario simulator that lets users explore hypothetical changes.

For example:

> "What happens if my commute changes?"

The prototype uses a fictional calculation model to demonstrate how a change could affect an illustrative annual/monthly value.

It is **not a current-law tax calculator**.

### 18. Human-in-the-Loop Confirmation

TaxPulse does not automatically treat every AI classification as fact.

For potentially tax-relevant purchases, the user must confirm professional use before the prototype allows the receipt to be saved as tax-relevant.

This keeps the user involved in important decisions.

### 19. Privacy-Oriented Prototype

The prototype clearly communicates that it does not actually connect to:

* Taxfix accounts
* Camera
* Calendar
* Bank accounts
* Tax authorities

All demonstration data is fictional.

### 20. Accessible, Responsive UI

The prototype includes accessibility and responsive design considerations such as:

* Keyboard navigation
* Focus management
* ARIA labels
* Modal focus trapping
* Escape-to-close dialogs
* Reduced-motion support
* Responsive desktop/tablet/mobile layouts

---

## 🧭 Main User Journey

The primary experience follows this flow:

```text
                 ┌──────────────┐
                 │   Dashboard  │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ Scan Receipt │
                 └──────┬───────┘
                        │
                        ▼
              ┌────────────────────┐
              │ Multi-Agent Review │
              └─────────┬──────────┘
                        │
                        ▼
               ┌─────────────────┐
               │ User Confirmation│
               └────────┬────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ Tax Treasure │
                 └──────┬───────┘
                        │
                        ▼
             ┌──────────────────────┐
             │ AI Finds Connections │
             │ & Missing Documents  │
             └──────────────────────┘
```

---

## 🖥️ Application Screens

The prototype contains several main routes:

| Screen           | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| **Home**         | Overview of tax preparation and Tax Treasure     |
| **Receipts**     | View captured receipts                           |
| **Scan**         | Start receipt analysis                           |
| **Analysis**     | Review AI interpretation of a receipt            |
| **Reward**       | Show the effect of saving a receipt              |
| **AI Agent**     | View proactive AI opportunities                  |
| **Opportunity**  | Explore connected evidence and missing documents |
| **Gehaltsplus**  | Explore the illustrative salary-tax concept      |
| **Payday Check** | Compare expected and actual salary information   |
| **Breakdown**    | View annual illustrative categories              |
| **Profile**      | User preferences, privacy and demo controls      |

---

## 🤖 AI Architecture Concept

The current prototype represents AI as a coordinated multi-agent system.

```text
                   Receipt
                      │
                      ▼
              ┌───────────────┐
              │ Receipt Agent │
              └───────┬───────┘
                      │
                      ▼
               ┌────────────┐
               │ Tax Agent  │
               └─────┬──────┘
                     │
                     ▼
             ┌──────────────┐
             │Context Agent │
             └──────┬───────┘
                    │
                    ▼
            ┌────────────────┐
            │ Treasure Agent │
            └───────┬────────┘
                    │
                    ▼
             ┌──────────────┐
             │ Review Agent │
             └──────┬───────┘
                    │
                    ▼
              User Decision
```

The current implementation is **scripted orchestration** for demonstration purposes. It does not make real AI API calls.

---

## 🧪 Demo Data

The prototype uses fictional data so the experience can be demonstrated without connecting personal financial or tax information.

Example receipts include:

| Item             | Merchant   | Amount | Illustrative Impact |
| ---------------- | ---------- | -----: | ------------------: |
| External Monitor | MediaMarkt |   €189 |                 €57 |
| Work Laptop      | MediaMarkt |   €899 |                €210 |

Other fictional records include:

* AI Conference Hamburg
* Train ticket
* Conference ticket
* Hotel invoice
* Sample payslip
* Home-office days

All financial and tax-related values are **illustrative only**.

---

## ⚙️ Technical Implementation

TaxPulse is intentionally implemented as a lightweight standalone prototype.

### Technology

* HTML5
* CSS3
* Vanilla JavaScript
* No external framework
* No backend
* No external dependencies
* Client-side state management
* Responsive CSS
* Accessibility-focused interaction patterns

### Architecture

The application uses a small client-side SPA pattern.

Conceptually:

```text
User Interaction
       │
       ▼
Event Handler
       │
       ▼
Application State
       │
       ▼
Screen Function
       │
       ▼
render()
       │
       ▼
DOM
```

Screens are generated from JavaScript functions and injected into the main application container.

---

## 📁 Project Structure

The current prototype is intentionally self-contained:

```text
TaxPulse/
│
├── index.html
│
└── README.md
```

The HTML file contains:

```text
HTML
 ├── Application structure
 ├── Screen templates
 │
 ├── CSS
 │   ├── Design system
 │   ├── Responsive layouts
 │   └── Accessibility states
 │
 └── JavaScript
     ├── Application state
     ├── Navigation
     ├── Screen rendering
     ├── AI workflow simulation
     ├── Dialog system
     └── Event handling
```

---

## ▶️ Running the Prototype

No installation or build process is required.

### Option 1 — Open directly

Open the HTML file in a modern browser:

```text
index.html
```

### Option 2 — Run a local server

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 🔒 Important Prototype Limitations

TaxPulse is a **concept prototype**, not a production tax application.

### No real OCR

Receipt scanning uses predefined fictional sample receipts.

### No real AI

The multi-agent workflow is simulated through scripted JavaScript logic.

### No real tax calculation

Displayed tax impacts are illustrative and do not represent an individual's actual tax refund or liability.

### No external integrations

The prototype does not connect to:

* Taxfix
* Finanzamt / tax authorities
* Banks
* Payroll systems
* Calendar services
* Camera hardware
* Cloud storage

### Demo state only

Changes are stored in browser memory and reset when the page is reloaded.

---

## ⚠️ Tax Disclaimer

TaxPulse is a product concept and UI prototype.

All tax amounts, categories, salary values, receipt impacts, and scenario calculations shown in the prototype are **fictional or illustrative**.

Actual tax treatment depends on factors such as:

* Professional use
* Eligibility
* Tax situation
* Applicable thresholds
* Timing
* Current tax rules
* Individual circumstances

A displayed estimate should therefore **not be interpreted as a guaranteed tax saving, refund, or tax-authority decision**.

The prototype also demonstrates that **Tax Treasure and Gehaltsplus are separate concepts and their illustrative values must not simply be added together**.

---

## 🎯 Product Philosophy

TaxPulse is built around five principles:

### 1. Capture continuously

Don't wait until tax season to remember what happened throughout the year.

### 2. Explain, don't overwhelm

Users should understand why something may matter instead of seeing unexplained tax terminology.

### 3. AI should be proactive

The system should surface useful opportunities instead of waiting for users to know what question to ask.

### 4. Keep humans in control

AI suggestions should be reviewable and confirmable by the user.

### 5. Turn tax preparation into progress

The experience should make preparation visible and understandable without creating unnecessary pressure.

---

## 🔮 Future Vision

The prototype could evolve into a production system with integrations such as:

```text
Camera / OCR
     │
     ▼
Receipt Understanding
     │
     ├──── Calendar
     ├──── Bank Transactions
     ├──── Payroll
     ├──── Cloud Documents
     └──── Tax Documents
              │
              ▼
       Contextual AI Layer
              │
       ┌──────┴──────┐
       ▼             ▼
Tax Opportunities  Missing Evidence
       │             │
       └──────┬──────┘
              ▼
        User Confirmation
              │
              ▼
       Filing Preparation
```

A future implementation could use real document understanding, secure integrations, tax-rule engines, explainable AI, user-specific context, and strong privacy/security controls.

---

## 🏆 Hackathon Concept

**TaxPulse** was designed as a hackathon-style exploration of how tax software could move from:

> **"File your taxes once a year."**

to:

> **"Stay tax-ready all year."**

The central product loop is:

**Receipt → AI understanding → Potential value → Human confirmation → Organized evidence → Proactive next step**

---

## 📄 License

This repository contains a prototype/hackathon concept. Add an appropriate license here if the project is published as open source.

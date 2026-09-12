# 🏦 Financial Escape Room (MVP)

A fast-paced, interactive browser puzzle game built strictly with **pure HTML5, CSS3, and Vanilla JavaScript (ES6)**. No frameworks, no external libraries, no Node.js build process, and no backend database.

Designed specifically for live college/corporate festival kiosks where participants play back-to-back on a single laptop/desktop terminal.

---

## 📂 Project Structure

```
financial-escape-room/
│
├── index.html        # Single-page layout with toggleable screen sections
├── style.css         # Modern cyber-fintech dark theme & CSS animations
├── game.js           # Core game state, timer, scoring, keypad & screen routing
├── data.js           # Puzzles, storylines, and fragments (Easy, Moderate, Finance)
└── README.md         # Event guide & beginner developer documentation
```

---

## 🎮 Game Concept & Flow

The player steps into the shoes of the **Lead Financial Auditor** investigating a security breach on an institutional vault. To disarm the lockdown, the player must investigate 5 security sectors:

1. **Start Screen**: High-impact briefing title & "Enter the Vault" CTA.
2. **Mission Intro Screen**: Contextual 2-3 sentence storyline on the financial trail (skippable).
3. **Name Entry Screen**: Auditor callsign / team name input.
4. **Difficulty Selection Screen**:
   - 🟢 **Easy (Financial Basics)**: Round numbers, apparent scam cues, simple choices, explicit guidance.
   - 🟡 **Moderate (Smart Money)**: Real figures, distractor items, urgency phishing cues, 5-year investment horizons.
   - 🔴 **Finance (Finance Challenge)**: Gross billings with TDS deductions, verified corporate treasury alerts, forensic ledger suspense slips, and index fund allocations.
5. **Rooms 1 to 4 (The Financial Trail)**:
   - **Room 1 (Broken Budget)**: Calculate net remaining surplus balance from income and expense ledgers.
   - **Room 2 (Scam or Legit)**: Inspect an inbound transaction/communication alert for fraud indicators.
   - **Room 3 (Financial Clue Hunt)**: Extract an audit voucher code/discrepancy amount from an encrypted slip.
   - **Room 4 (Investment Detective)**: Recommend the soundest investment vehicle for a given risk/horizon scenario.
   - *Each solved room reveals 1 digital code fragment on the persistent Case File panel!*
6. **Room 5 (Master Vault Lock)**:
   - Assemble the 4 collected fragments in sequence (Room 1 ➔ 2 ➔ 3 ➔ 4).
   - Enter the combined 4-digit code using the interactive on-screen numpad or physical keyboard.
7. **Escape Screen**: Unlocked vault celebration animation.
8. **Results Screen**:
   - Auditor callsign, difficulty tier, elapsed time, room points, speed agility bonus, and assigned auditor rank.
   - **Play Again Button**: Completely resets memory state, timer, and inputs for the next contestant.

---

## 🏆 Scoring & Timer Rules

- **Base Room Points**:
  - **100 points** when solved correctly on the 1st attempt.
  - **60 points** when solved after a retry/hint.
  - 5 rooms × 100 max = **500 maximum room points**.
- **Agility Speed Bonus** (Timer begins when Room 1 launches):
  - Under 3 minutes (≤ 180s) : **+50 bonus points**
  - Under 5 minutes (≤ 300s) : **+40 bonus points**
  - Under 8 minutes (≤ 480s) : **+25 bonus points**
  - Under 12 minutes (≤ 720s): **+10 bonus points**
  - Over 12 minutes (> 720s) : **0 bonus points**
- **Maximum Possible Score**: **550 points**.

---

## ⚡ Live Event Mode (Zero Persistence)

In accordance with live festival booth requirements:
- **No `localStorage` or server database is used.**
- Results exist exclusively in memory for that single session.
- Once "Play Again" is clicked, all records, times, and inputs are wiped clean for the next contestant.

---

## 🚀 How to Run Locally

Because this project uses vanilla web standards, you don't need `npm install` or any build commands!

### Method 1: Double-Click
Simply double-click `index.html` in your file explorer (Finder on macOS) to open it in Chrome, Safari, Edge, or Firefox.

### Method 2: Python Simple HTTP Server
Open your terminal in this folder and run:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🛠️ Customizing & Extending Puzzles

All puzzle data lives inside `data.js`. Beginner developers can easily edit or add questions:

```javascript
// Example: Editing Room 1 in data.js
1: {
  title: "Room 1 — Broken Budget",
  difficulties: {
    easy: {
      incomeValue: 50000,
      expenses: [
        { name: "Rent", amount: 18000 },
        // Add or change expense items here...
      ],
      correctAnswer: "10000",
      codeFragment: "4" // Must match 1st digit of master code in Room 5
    }
  }
}
```

---

## 📄 License
Created for FinPlay / Findrome Committee events. Free to adapt and learn from!

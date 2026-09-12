/**
 * ============================================================================
 * Financial Escape Room — Game Logic (game.js)
 * ============================================================================
 * Simple, friendly, and clean JavaScript game engine.
 * Controls:
 *   - Distinct puzzle loading per difficulty (Easy, Moderate, Finance)
 *   - Screen navigation & transitions
 *   - Live timer (starts in Room 1, stops when safe opens)
 *   - Scoring & 2-attempt tracking:
 *       * 1st attempt correct (no hint)  : +100 pts
 *       * 1st attempt correct (with hint): +60 pts
 *       * 2nd attempt correct            : +60 pts
 *       * 2nd attempt wrong              : 0 pts (shows correct answer & lets player advance)
 *   - Speed bonus at completion
 *   - Clue notebook updates & Room 5 safe keypad
 *   - Full state reset for back-to-back live kiosk sessions
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. GAME STATE OBJECT
// ----------------------------------------------------------------------------
const gameState = {
  playerName: "Player",
  difficulty: "moderate", // 'easy' | 'moderate' | 'finance'
  currentRoom: 1,         // 1 to 5
  
  // Clue Notebook stores 4 secret numbers found in Rooms 1 through 4
  caseFile: [null, null, null, null],

  // Scores, retry counts, and hint usage per room (1 to 5)
  roomScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  roomAttempts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  hintUsed: { 1: false, 2: false, 3: false, 4: false, 5: false },

  // Currently selected option for choice puzzles (Room 2 and 4)
  selectedOption: null,

  // Keypad buffer for Room 5 (The Big Safe)
  vaultInput: "",

  // Timer tracking
  timer: {
    startTime: null,
    intervalId: null,
    elapsedSeconds: 0
  }
};

// ----------------------------------------------------------------------------
// 2. DOM ELEMENT REFERENCES
// ----------------------------------------------------------------------------
const dom = {
  // Top Navbar elements
  topNavbar: document.getElementById("top-navbar"),
  navPlayerName: document.getElementById("nav-player-name"),
  navDifficulty: document.getElementById("nav-difficulty"),
  navRoomIndicator: document.getElementById("nav-room-indicator"),
  navTimer: document.getElementById("nav-timer"),
  navScore: document.getElementById("nav-score"),

  // Clue Notebook elements
  caseFilePanel: document.getElementById("case-file-panel"),
  fragBoxes: [
    document.getElementById("frag-box-1"),
    document.getElementById("frag-box-2"),
    document.getElementById("frag-box-3"),
    document.getElementById("frag-box-4")
  ],
  fragVals: [
    document.getElementById("frag-val-1"),
    document.getElementById("frag-val-2"),
    document.getElementById("frag-val-3"),
    document.getElementById("frag-val-4")
  ],
  fragStatuses: [
    document.getElementById("frag-status-1"),
    document.getElementById("frag-status-2"),
    document.getElementById("frag-status-3"),
    document.getElementById("frag-status-4")
  ],

  // Screens
  screens: {
    start: document.getElementById("screen-start"),
    intro: document.getElementById("screen-intro"),
    name: document.getElementById("screen-name"),
    difficulty: document.getElementById("screen-difficulty"),
    room: document.getElementById("screen-room"),
    vault: document.getElementById("screen-vault"),
    escape: document.getElementById("screen-escape"),
    results: document.getElementById("screen-results")
  },

  // Room Dynamic Content elements
  roomSectorTag: document.getElementById("room-sector-tag"),
  roomTitle: document.getElementById("room-title"),
  roomDifficultyPill: document.getElementById("room-difficulty-pill"),
  roomStoryText: document.getElementById("room-story-text"),
  btnShowHint: document.getElementById("btn-show-hint"),
  roomGuidanceBox: document.getElementById("room-guidance-box"),
  roomGuidanceText: document.getElementById("room-guidance-text"),
  roomPuzzleContent: document.getElementById("room-puzzle-content"),

  // Feedback and Buttons for Rooms 1-4
  roomFeedback: document.getElementById("room-feedback"),
  feedbackIcon: document.getElementById("feedback-icon"),
  feedbackTitle: document.getElementById("feedback-title"),
  feedbackMessage: document.getElementById("feedback-message"),
  feedbackFragmentReveal: document.getElementById("feedback-fragment-reveal"),
  feedbackFragmentVal: document.getElementById("feedback-fragment-val"),
  btnSubmitAnswer: document.getElementById("btn-submit-answer"),
  btnRetryRoom: document.getElementById("btn-retry-room"),
  btnNextRoom: document.getElementById("btn-next-room"),

  // Room 5 Safe Elements
  vaultFragTiles: [
    document.getElementById("vault-frag-1"),
    document.getElementById("vault-frag-2"),
    document.getElementById("vault-frag-3"),
    document.getElementById("vault-frag-4")
  ],
  vaultDigitSlots: [
    document.getElementById("code-digit-0"),
    document.getElementById("code-digit-1"),
    document.getElementById("code-digit-2"),
    document.getElementById("code-digit-3")
  ],
  vaultKeypadStatus: document.getElementById("vault-keypad-status"),
  vaultErrorBox: document.getElementById("vault-error-box"),
  vaultErrorMsg: document.getElementById("vault-error-msg"),

  // Results Screen Elements
  resPlayerName: document.getElementById("res-player-name"),
  resDifficulty: document.getElementById("res-difficulty"),
  resTime: document.getElementById("res-time"),
  resRoomPoints: document.getElementById("res-room-points"),
  resSpeedBonus: document.getElementById("res-speed-bonus"),
  resTotalScore: document.getElementById("res-total-score"),
  resRankTitle: document.getElementById("res-rank-title"),

  // Overlay
  doorUnlockOverlay: document.getElementById("door-unlock-overlay")
};

// ----------------------------------------------------------------------------
// 3. SCREEN NAVIGATION HELPER
// ----------------------------------------------------------------------------
function showScreen(screenKey) {
  // Hide all screens
  Object.values(dom.screens).forEach(screen => {
    if (screen) screen.classList.remove("active");
  });

  // Show target screen
  const targetScreen = dom.screens[screenKey];
  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  // Top navbar & clue notebook are visible ONLY during gameplay (room & vault)
  const isPlaying = (screenKey === "room" || screenKey === "vault");
  if (isPlaying) {
    dom.topNavbar.classList.remove("hidden");
    dom.caseFilePanel.classList.remove("hidden");
  } else {
    dom.topNavbar.classList.add("hidden");
    dom.caseFilePanel.classList.add("hidden");
  }

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----------------------------------------------------------------------------
// 4. TIMER & SCORING SYSTEM
// ----------------------------------------------------------------------------
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const mm = String(mins).padStart(2, "0");
  const ss = String(secs).padStart(2, "0");
  return `${mm}:${ss}`;
}

function startTimer() {
  if (gameState.timer.intervalId) clearInterval(gameState.timer.intervalId);
  gameState.timer.startTime = Date.now();
  gameState.timer.elapsedSeconds = 0;

  gameState.timer.intervalId = setInterval(() => {
    gameState.timer.elapsedSeconds++;
    dom.navTimer.textContent = formatTime(gameState.timer.elapsedSeconds);
  }, 1000);
}

function stopTimer() {
  if (gameState.timer.intervalId) {
    clearInterval(gameState.timer.intervalId);
    gameState.timer.intervalId = null;
  }
}

function getTotalRoomPoints() {
  return Object.values(gameState.roomScores).reduce((sum, pts) => sum + pts, 0);
}

function calculateSpeedBonus(seconds) {
  if (seconds <= 180) return 50;
  if (seconds <= 300) return 40;
  if (seconds <= 480) return 25;
  if (seconds <= 720) return 10;
  return 0;
}

function updateNavbarScore() {
  dom.navScore.textContent = `${getTotalRoomPoints()} pts`;
}

// ----------------------------------------------------------------------------
// 5. CLUE NOTEBOOK / SECRET NUMBER MANAGER
// ----------------------------------------------------------------------------
function unlockCaseFileFragment(roomNum, fragmentChar) {
  const index = roomNum - 1;
  gameState.caseFile[index] = fragmentChar;

  const box = dom.fragBoxes[index];
  const val = dom.fragVals[index];
  const status = dom.fragStatuses[index];

  if (box && val && status) {
    box.classList.remove("locked");
    box.classList.add("unlocked");
    val.textContent = fragmentChar;
    status.textContent = "FOUND!";
  }
}

function resetCaseFile() {
  gameState.caseFile = [null, null, null, null];
  for (let i = 0; i < 4; i++) {
    const box = dom.fragBoxes[i];
    const val = dom.fragVals[i];
    const status = dom.fragStatuses[i];
    if (box && val && status) {
      box.classList.remove("unlocked");
      box.classList.add("locked");
      val.textContent = "?";
      status.textContent = "LOCKED";
    }
  }
}

// ----------------------------------------------------------------------------
// 6. HINT LOGIC
// ----------------------------------------------------------------------------
function revealRoomHint() {
  const roomNum = gameState.currentRoom;
  gameState.hintUsed[roomNum] = true;

  if (dom.roomGuidanceBox) {
    dom.roomGuidanceBox.classList.remove("hidden");
  }

  if (dom.btnShowHint) {
    dom.btnShowHint.innerHTML = "💡 Hint Revealed <span class='hint-penalty'>(Max 60 pts)</span>";
    dom.btnShowHint.disabled = true;
    dom.btnShowHint.style.opacity = "0.7";
    dom.btnShowHint.style.cursor = "default";
  }
}

// ----------------------------------------------------------------------------
// 7. ROOM RENDERING & LOGIC (Rooms 1, 2, 3, 4)
// ----------------------------------------------------------------------------
function renderRoom(roomNumber) {
  gameState.currentRoom = roomNumber;
  gameState.selectedOption = null;

  // Pull difficulty-specific puzzle data
  const diffData = ROOM_DATA[roomNumber].difficulties[gameState.difficulty];

  // Update top status bar
  dom.navRoomIndicator.textContent = `Room ${roomNumber} of 5`;
  const diffNames = { easy: "EASY", moderate: "MEDIUM", finance: "HARD" };
  dom.navDifficulty.textContent = diffNames[gameState.difficulty] || gameState.difficulty.toUpperCase();
  dom.navPlayerName.textContent = gameState.playerName;
  updateNavbarScore();

  // Set room header info directly from diffData so each difficulty is clearly distinct
  dom.roomSectorTag.textContent = diffData.sector;
  dom.roomTitle.textContent = diffData.title;
  dom.roomDifficultyPill.textContent = diffData.subtitle;
  dom.roomStoryText.textContent = diffData.story;

  // Setup Hint Area: ALWAYS HIDDEN INITIALLY!
  const hintText = diffData.hint || diffData.guidance || "";
  dom.roomGuidanceText.textContent = hintText;

  if (gameState.hintUsed[roomNumber]) {
    dom.roomGuidanceBox.classList.remove("hidden");
    if (dom.btnShowHint) {
      dom.btnShowHint.innerHTML = "💡 Hint Revealed <span class='hint-penalty'>(Max 60 pts)</span>";
      dom.btnShowHint.disabled = true;
    }
  } else {
    dom.roomGuidanceBox.classList.add("hidden");
    if (dom.btnShowHint) {
      dom.btnShowHint.innerHTML = "💡 Need a hint? <span class='hint-penalty'>(-40 pts if used)</span>";
      dom.btnShowHint.disabled = false;
      dom.btnShowHint.style.opacity = "1";
      dom.btnShowHint.style.cursor = "pointer";
    }
  }

  // Reset feedback state and action buttons
  dom.roomFeedback.className = "feedback-panel hidden";
  dom.feedbackFragmentReveal.classList.add("hidden");
  dom.btnSubmitAnswer.classList.remove("hidden");
  dom.btnSubmitAnswer.textContent = "SUBMIT YOUR ANSWER ➔";
  dom.btnRetryRoom.classList.add("hidden");
  dom.btnNextRoom.classList.add("hidden");
  dom.btnNextRoom.textContent = "GO TO NEXT ROOM ➔";

  // Build specific puzzle HTML
  let puzzleHTML = "";

  if (roomNumber === 1) {
    // --- ROOM 1: Broken Budget Table ---
    puzzleHTML = `
      <div class="ledger-card">
        <table class="ledger-table">
          <thead>
            <tr>
              <th>Money Item</th>
              <th class="val-col">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="income-row">
              <td><strong>[INCOME]</strong> ${diffData.incomeLabel}</td>
              <td class="val-col">+ ₹${diffData.incomeValue.toLocaleString('en-IN')}</td>
            </tr>
    `;

    if (diffData.loanInfo) {
      puzzleHTML += `
        <tr class="distractor-row">
          <td><em>Loan Details</em></td>
          <td class="val-col" style="color: var(--accent-gold); font-size: 0.85rem;">${diffData.loanInfo}</td>
        </tr>
      `;
    }

    diffData.expenses.forEach(exp => {
      puzzleHTML += `
        <tr class="expense-row">
          <td><strong>[BILL/EXPENSE]</strong> ${exp.name}</td>
          <td class="val-col">− ₹${exp.amount.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });

    if (diffData.distractors && diffData.distractors.length > 0) {
      diffData.distractors.forEach(dis => {
        puzzleHTML += `
          <tr class="distractor-row">
            <td><em>[NOT A BILL PAID] ${dis.name} ${dis.note || ''}</em></td>
            <td class="val-col" style="color: var(--text-muted)">₹${dis.amount.toLocaleString('en-IN')}</td>
          </tr>
        `;
      });
    }

    puzzleHTML += `
          </tbody>
        </table>

        <div class="budget-input-area">
          <label for="room-input-answer">${diffData.question}</label>
          <div class="input-currency-wrapper">
            <span class="currency-symbol">₹</span>
            <input 
              type="text" 
              id="room-input-answer" 
              class="currency-input" 
              placeholder="${diffData.placeholder}" 
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    `;

  } else if (roomNumber === 2) {
    // --- ROOM 2: Scam or Real Binary Choice ---
    puzzleHTML = `
      <div class="fraud-card">
        <div class="fraud-header">
          <span><strong>MESSAGE SENDER:</strong> ${diffData.sender}</span>
          <span><strong>TIME:</strong> ${diffData.timestamp}</span>
        </div>
        <div class="message-bubble">
          ${diffData.messageContent}
        </div>
      </div>

      <div class="binary-options-grid">
        <div class="decision-card" id="opt-scam" onclick="selectRoomOption('scam')">
          <div class="decision-title" style="color: var(--accent-crimson);">🚨 SCAM</div>
          <div class="decision-desc">A fake trick, scam link, or pressure tactic trying to steal money.</div>
        </div>
        <div class="decision-card" id="opt-legit" onclick="selectRoomOption('legit')">
          <div class="decision-title" style="color: var(--accent-emerald);">✅ REAL</div>
          <div class="decision-desc">A safe, normal message from an official service or regular bank alert.</div>
        </div>
      </div>
    `;

  } else if (roomNumber === 3) {
    // --- ROOM 3: Clue Hunt on Receipt ---
    puzzleHTML = `
      <div class="receipt-wrapper">
        <div class="receipt-header">
          <span class="receipt-badge">${diffData.voucherType}</span>
          <div class="receipt-merchant">${diffData.merchant}</div>
          <div class="receipt-date">${diffData.date}</div>
        </div>
        <div class="receipt-items">
    `;

    diffData.items.forEach(item => {
      const isFlagged = item.label.includes("FLAGGED") || item.label.includes("⚠️") || item.label.includes("MARKED") || item.label.includes("Suspense");
      puzzleHTML += `
        <div class="receipt-item-row ${isFlagged ? 'flagged' : ''}">
          <span>${item.label}</span>
          <span>${item.val}</span>
        </div>
      `;
    });

    puzzleHTML += `
        </div>
        <div class="receipt-total-row">
          <span>TOTAL / BALANCE</span>
          <span>${diffData.total}</span>
        </div>
        <div class="receipt-footer-code">${diffData.footerCode}</div>
      </div>

      <div class="clue-input-area">
        <label for="room-input-answer">${diffData.question}</label>
        <input 
          type="text" 
          id="room-input-answer" 
          class="clue-input" 
          placeholder="${diffData.placeholder}" 
          autocomplete="off"
        />
      </div>
    `;

  } else if (roomNumber === 4) {
    // --- ROOM 4: Smart Money Choice Cards ---
    puzzleHTML = `
      <div class="scenario-box">
        ${diffData.scenario}
      </div>

      <div class="investments-grid">
    `;

    diffData.options.forEach(opt => {
      puzzleHTML += `
        <div class="investment-card" id="opt-${opt.id}" onclick="selectRoomOption('${opt.id}')">
          <div class="inv-header">
            <div class="inv-title">${opt.name}</div>
            <div class="inv-tags">
              <span class="tag-risk">${opt.risk}</span>
              <span class="tag-return">${opt.return}</span>
            </div>
          </div>
          <div class="inv-desc">${opt.description}</div>
        </div>
      `;
    });

    puzzleHTML += `</div>`;
  }

  dom.roomPuzzleContent.innerHTML = puzzleHTML;

  // Autofocus text input if present and listen for Enter
  const inputEl = document.getElementById("room-input-answer");
  if (inputEl) {
    inputEl.focus();
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitRoomAnswer();
    });
  }

  // Show the room screen
  showScreen("room");
}

function selectRoomOption(optionId) {
  gameState.selectedOption = optionId;

  // If user was viewing an error message, reset to try again
  if (dom.btnRetryRoom && !dom.btnRetryRoom.classList.contains("hidden")) {
    retryCurrentRoom();
  }

  const cards = dom.roomPuzzleContent.querySelectorAll(".decision-card, .investment-card");
  cards.forEach(card => card.classList.remove("selected"));

  const activeCard = document.getElementById(`opt-${optionId}`);
  if (activeCard) {
    activeCard.classList.add("selected");
  }
}

// ----------------------------------------------------------------------------
// 8. ANSWER SUBMISSION & 2-ATTEMPT SCORING RULE
// ----------------------------------------------------------------------------
/**
 * Scoring & Attempt Rules:
 *   - 1st attempt correct (without hint): 100 points
 *   - 1st attempt correct (with hint)   : 60 points
 *   - 2nd attempt correct               : 60 points
 *   - 2nd attempt wrong                 : 0 points (reveals answer & explanation, allows continuing)
 */
function submitRoomAnswer() {
  const roomNum = gameState.currentRoom;
  const diffData = ROOM_DATA[roomNum].difficulties[gameState.difficulty];

  let playerAnswer = "";
  const isOptionRoom = (roomNum === 2 || roomNum === 4);

  if (isOptionRoom) {
    playerAnswer = gameState.selectedOption || "";
  } else {
    const inputEl = document.getElementById("room-input-answer");
    if (inputEl) {
      playerAnswer = inputEl.value.trim().replace(/[₹,\s]/g, "");
    }
  }

  if (!playerAnswer) {
    alert("Please enter or select an answer before submitting!");
    return;
  }

  const isCorrect = (playerAnswer.toLowerCase() === diffData.correctAnswer.toLowerCase());

  if (isCorrect) {
    // CORRECT!
    let pointsAwarded = 100;
    let attemptNote = "";

    if (gameState.roomAttempts[roomNum] === 0) {
      // 1st attempt
      if (gameState.hintUsed[roomNum]) {
        pointsAwarded = 60;
        attemptNote = "1st attempt with hint used";
      } else {
        pointsAwarded = 100;
        attemptNote = "1st attempt on your own!";
      }
    } else {
      // 2nd attempt
      pointsAwarded = 60;
      attemptNote = "2nd attempt";
    }

    gameState.roomScores[roomNum] = pointsAwarded;
    updateNavbarScore();

    // Reveal secret number in Clue Notebook
    const fragment = diffData.codeFragment;
    unlockCaseFileFragment(roomNum, fragment);

    // Show positive feedback
    dom.roomFeedback.className = "feedback-panel success";
    dom.feedbackIcon.textContent = "✓";
    dom.feedbackTitle.textContent = "CORRECT ANSWER!";
    dom.feedbackMessage.textContent = `Great job! You got it right (${attemptNote}). Awarded +${pointsAwarded} points.`;
    dom.feedbackFragmentVal.textContent = fragment;
    dom.feedbackFragmentReveal.classList.remove("hidden");

    // Action buttons
    dom.btnSubmitAnswer.classList.add("hidden");
    dom.btnRetryRoom.classList.add("hidden");
    dom.btnNextRoom.textContent = (roomNum === 4) ? "PROCEED TO FINAL SAFE ➔" : "GO TO NEXT ROOM ➔";
    dom.btnNextRoom.classList.remove("hidden");

    showDoorUnlockOverlay();

  } else {
    // WRONG ANSWER!
    gameState.roomAttempts[roomNum]++;

    if (gameState.roomAttempts[roomNum] === 1) {
      // 1st WRONG ATTEMPT: Teach the concept and offer a 2nd attempt
      dom.roomFeedback.className = "feedback-panel error";
      dom.feedbackIcon.textContent = "⚠️";
      dom.feedbackTitle.textContent = "NOT QUITE RIGHT (Attempt 1 of 2)";
      dom.feedbackMessage.textContent = diffData.wrongExplanation || "Check the numbers carefully and try one more time!";
      dom.feedbackFragmentReveal.classList.add("hidden");

      dom.btnSubmitAnswer.classList.add("hidden");
      dom.btnRetryRoom.textContent = "🔄 TRY AGAIN (Attempt 2 of 2)";
      dom.btnRetryRoom.classList.remove("hidden");

    } else {
      // 2nd WRONG ATTEMPT: Out of attempts -> Score 0 points for this room
      gameState.roomScores[roomNum] = 0;
      updateNavbarScore();

      // Reveal the secret number so the player is never stuck for Room 5!
      const fragment = diffData.codeFragment;
      unlockCaseFileFragment(roomNum, fragment);

      dom.roomFeedback.className = "feedback-panel error";
      dom.feedbackIcon.textContent = "❌";
      dom.feedbackTitle.textContent = "OUT OF ATTEMPTS (0 points for this room)";
      dom.feedbackMessage.innerHTML = `The correct answer was <strong>${diffData.correctAnswer}</strong>.<br>${diffData.wrongExplanation}`;
      dom.feedbackFragmentVal.textContent = fragment;
      dom.feedbackFragmentReveal.classList.remove("hidden");

      dom.btnSubmitAnswer.classList.add("hidden");
      dom.btnRetryRoom.classList.add("hidden");
      dom.btnNextRoom.textContent = (roomNum === 4) ? "PROCEED TO FINAL SAFE (0 pts) ➔" : "CONTINUE TO NEXT ROOM (0 pts) ➔";
      dom.btnNextRoom.classList.remove("hidden");
    }
  }
}

function retryCurrentRoom() {
  dom.roomFeedback.className = "feedback-panel hidden";
  dom.btnRetryRoom.classList.add("hidden");
  dom.btnSubmitAnswer.classList.remove("hidden");

  const inputEl = document.getElementById("room-input-answer");
  if (inputEl) {
    inputEl.value = "";
    inputEl.focus();
  }
}

function showDoorUnlockOverlay() {
  dom.doorUnlockOverlay.classList.remove("hidden");
  setTimeout(() => {
    dom.doorUnlockOverlay.classList.add("hidden");
  }, 1200);
}

function proceedToNextRoom() {
  if (gameState.currentRoom < 4) {
    renderRoom(gameState.currentRoom + 1);
  } else if (gameState.currentRoom === 4) {
    renderVaultRoom();
  }
}

// ----------------------------------------------------------------------------
// 9. ROOM 5: THE FINAL SAFE KEYPAD LOGIC & 2-ATTEMPT RULE
// ----------------------------------------------------------------------------
function renderVaultRoom() {
  gameState.currentRoom = 5;
  gameState.vaultInput = "";

  dom.navRoomIndicator.textContent = "Room 5 of 5";
  updateNavbarScore();

  // Populate 4 clue numbers in Room 5
  for (let i = 0; i < 4; i++) {
    const tileVal = dom.vaultFragTiles[i];
    if (tileVal) {
      tileVal.textContent = gameState.caseFile[i] || "?";
    }
  }

  updateKeypadDisplay();
  dom.vaultErrorBox.classList.add("hidden");

  // Restore unlock button if previously modified by override
  const unlockBtn = document.getElementById("btn-unlock-vault");
  if (unlockBtn) {
    unlockBtn.textContent = "🔓 UNLOCK THE SAFE";
    unlockBtn.onclick = submitVaultCode;
  }

  showScreen("vault");
}

function updateKeypadDisplay() {
  const chars = gameState.vaultInput.padEnd(4, "_").split("");
  for (let i = 0; i < 4; i++) {
    dom.vaultDigitSlots[i].textContent = chars[i];
  }

  if (gameState.vaultInput.length === 4) {
    dom.vaultKeypadStatus.textContent = "Ready! Press 'UNLOCK THE SAFE' or hit Enter.";
  } else {
    dom.vaultKeypadStatus.textContent = `Entered ${gameState.vaultInput.length} of 4 digits...`;
  }
}

function pressKeypad(digit) {
  if (gameState.vaultInput.length < 4) {
    gameState.vaultInput += digit;
    updateKeypadDisplay();
  }
}

function clearKeypad() {
  gameState.vaultInput = "";
  dom.vaultErrorBox.classList.add("hidden");
  updateKeypadDisplay();
}

function backspaceKeypad() {
  if (gameState.vaultInput.length > 0) {
    gameState.vaultInput = gameState.vaultInput.slice(0, -1);
    dom.vaultErrorBox.classList.add("hidden");
    updateKeypadDisplay();
  }
}

function submitVaultCode() {
  if (gameState.vaultInput.length !== 4) {
    alert("Please enter all 4 digits using the secret numbers from your Clue Notebook!");
    return;
  }

  const masterCode = ROOM_DATA[5].masterCodes[gameState.difficulty];
  const isMatch = (gameState.vaultInput === masterCode);

  if (isMatch) {
    // Correct!
    const pointsAwarded = (gameState.roomAttempts[5] === 0) ? 100 : 60;
    gameState.roomScores[5] = pointsAwarded;
    updateNavbarScore();

    stopTimer();
    showScreen("escape");

  } else {
    // Incorrect!
    gameState.roomAttempts[5]++;

    if (gameState.roomAttempts[5] === 1) {
      // 1st wrong attempt: Keep error message visible so player can read it
      dom.vaultErrorBox.classList.remove("hidden");
      dom.vaultErrorMsg.textContent = 
        `Code '${gameState.vaultInput}' did not open the safe (Attempt 1 of 2). Check the 4 numbers in your Clue Notebook: [${gameState.caseFile.join(" - ")}]. Type them in order (Room 1, 2, 3, 4). Try again!`;
      
      gameState.vaultInput = "";
      updateKeypadDisplay();

      dom.vaultDigitSlots.forEach(slot => {
        slot.style.borderColor = "var(--accent-crimson)";
        setTimeout(() => slot.style.borderColor = "#334155", 600);
      });

    } else {
      // 2nd wrong attempt: 0 points for Room 5, emergency override opens safe so player is not stuck
      gameState.roomScores[5] = 0;
      updateNavbarScore();
      stopTimer();

      dom.vaultErrorBox.classList.remove("hidden");
      dom.vaultErrorMsg.innerHTML = 
        `Code mismatch on 2nd attempt (0 points for Room 5). The correct 4-digit code was <strong>${masterCode}</strong>. Emergency override engaged to open the safe!`;

      const unlockBtn = document.getElementById("btn-unlock-vault");
      if (unlockBtn) {
        unlockBtn.textContent = "🔓 OPEN SAFE (EMERGENCY OVERRIDE) ➔";
        unlockBtn.onclick = () => showScreen("escape");
      }
    }
  }
}

// ----------------------------------------------------------------------------
// 10. RESULTS SCREEN & DEBRIEF
// ----------------------------------------------------------------------------
function renderResultsScreen() {
  const roomPts = getTotalRoomPoints();
  const speedBonus = calculateSpeedBonus(gameState.timer.elapsedSeconds);
  const totalScore = roomPts + speedBonus;
  const timeFormatted = formatTime(gameState.timer.elapsedSeconds);

  let rankTitle = "Detective Trainee";
  if (totalScore >= 530) {
    rankTitle = "🏆 Master Money Detective";
  } else if (totalScore >= 450) {
    rankTitle = "⭐ Senior Mystery Solver";
  } else if (totalScore >= 350) {
    rankTitle = "🔍 Smart Saver";
  }

  const diffLabels = { easy: "EASY", moderate: "MEDIUM", finance: "HARD" };
  dom.resPlayerName.textContent = gameState.playerName;
  dom.resDifficulty.textContent = diffLabels[gameState.difficulty] || gameState.difficulty.toUpperCase();
  dom.resTime.textContent = timeFormatted;
  dom.resRoomPoints.textContent = `${roomPts} pts`;
  dom.resSpeedBonus.textContent = `+${speedBonus} pts`;
  dom.resTotalScore.textContent = `${totalScore} / 550`;
  dom.resRankTitle.textContent = rankTitle;

  showScreen("results");
}

function resetGame() {
  stopTimer();
  gameState.playerName = "Player";
  gameState.difficulty = "moderate";
  gameState.currentRoom = 1;
  gameState.caseFile = [null, null, null, null];
  gameState.roomScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  gameState.roomAttempts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  gameState.hintUsed = { 1: false, 2: false, 3: false, 4: false, 5: false };
  gameState.selectedOption = null;
  gameState.vaultInput = "";
  gameState.timer.elapsedSeconds = 0;

  const nameInput = document.getElementById("player-name-input");
  if (nameInput) nameInput.value = "";

  resetCaseFile();
  showScreen("start");
}

// ----------------------------------------------------------------------------
// 11. EVENT LISTENERS & SETUP
// ----------------------------------------------------------------------------
function selectDifficulty(diffTier) {
  gameState.difficulty = diffTier;
  startTimer();
  renderRoom(1);
}

document.addEventListener("DOMContentLoaded", () => {

  const btnToIntro = document.getElementById("btn-to-intro");
  if (btnToIntro) {
    btnToIntro.addEventListener("click", () => showScreen("intro"));
  }

  const btnToName = document.getElementById("btn-to-name");
  if (btnToName) {
    btnToName.addEventListener("click", () => showScreen("name"));
  }

  const btnSkipIntro = document.getElementById("btn-skip-intro");
  if (btnSkipIntro) {
    btnSkipIntro.addEventListener("click", () => showScreen("name"));
  }

  const btnSubmitName = document.getElementById("btn-submit-name");
  const nameInput = document.getElementById("player-name-input");
  const nameErrorMsg = document.getElementById("name-error-msg");

  function handleNameSubmit() {
    const enteredName = nameInput.value.trim();
    if (!enteredName) {
      nameErrorMsg.classList.remove("hidden");
      nameInput.focus();
      return;
    }
    nameErrorMsg.classList.add("hidden");
    gameState.playerName = enteredName;
    showScreen("difficulty");
  }

  if (btnSubmitName) {
    btnSubmitName.addEventListener("click", handleNameSubmit);
  }
  if (nameInput) {
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleNameSubmit();
    });
  }

  if (dom.btnSubmitAnswer) {
    dom.btnSubmitAnswer.addEventListener("click", submitRoomAnswer);
  }
  if (dom.btnRetryRoom) {
    dom.btnRetryRoom.addEventListener("click", retryCurrentRoom);
  }
  if (dom.btnNextRoom) {
    dom.btnNextRoom.addEventListener("click", proceedToNextRoom);
  }

  const btnViewResults = document.getElementById("btn-view-results");
  if (btnViewResults) {
    btnViewResults.addEventListener("click", renderResultsScreen);
  }

  const btnPlayAgain = document.getElementById("btn-play-again");
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener("click", resetGame);
  }

  window.addEventListener("keydown", (e) => {
    if (dom.screens.vault.classList.contains("active")) {
      if (e.key >= "0" && e.key <= "9") {
        pressKeypad(e.key);
      } else if (e.key === "Backspace") {
        backspaceKeypad();
      } else if (e.key === "Enter") {
        submitVaultCode();
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        clearKeypad();
      }
    }
  });

});

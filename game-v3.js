/**
 * Financial Escape Room V3 — Final Event Game Engine
 * Randomly selects 4 different finance questions from the chosen difficulty; Room 5 is the final safe.
 * Four rooms reveal one code digit each; Room 5 opens the final safe.
 */

const gameState = {
  playerName: 'Player',
  difficulty: 'moderate',
  currentRoom: 1,
  caseFile: [null, null, null, null],
  roomScores: {1:0,2:0,3:0,4:0,5:0},
  roomAttempts: {1:0,2:0,3:0,4:0,5:0},
  hintLevel: {1:0,2:0,3:0,4:0,5:0},
  selectedOption: null,
  sessionQuestions: [],
  vaultInput: '',
  timer: {startTime:null, intervalId:null, elapsedSeconds:0, remainingSeconds:0, limitSeconds:0},
  timedOut: false,
  failedRoom: null,
  runStatus: 'playing'
};

const dom = {
  topNavbar: document.getElementById('top-navbar'), navPlayerName: document.getElementById('nav-player-name'),
  navDifficulty: document.getElementById('nav-difficulty'), navRoomIndicator: document.getElementById('nav-room-indicator'),
  navTimer: document.getElementById('nav-timer'), navScore: document.getElementById('nav-score'),
  caseFilePanel: document.getElementById('case-file-panel'),
  fragBoxes:[1,2,3,4].map(i=>document.getElementById(`frag-box-${i}`)),
  fragVals:[1,2,3,4].map(i=>document.getElementById(`frag-val-${i}`)),
  fragStatuses:[1,2,3,4].map(i=>document.getElementById(`frag-status-${i}`)),
  screens:{start:document.getElementById('screen-start'),intro:document.getElementById('screen-intro'),name:document.getElementById('screen-name'),difficulty:document.getElementById('screen-difficulty'),room:document.getElementById('screen-room'),vault:document.getElementById('screen-vault'),escape:document.getElementById('screen-escape'),results:document.getElementById('screen-results')},
  roomSectorTag:document.getElementById('room-sector-tag'), roomTitle:document.getElementById('room-title'), roomDifficultyPill:document.getElementById('room-difficulty-pill'),
  roomStoryText:document.getElementById('room-story-text'), btnShowHint:document.getElementById('btn-show-hint'), roomGuidanceBox:document.getElementById('room-guidance-box'),
  roomGuidanceText:document.getElementById('room-guidance-text'), roomPuzzleContent:document.getElementById('room-puzzle-content'), roomFeedback:document.getElementById('room-feedback'),
  feedbackIcon:document.getElementById('feedback-icon'), feedbackTitle:document.getElementById('feedback-title'), feedbackMessage:document.getElementById('feedback-message'),
  feedbackFragmentReveal:document.getElementById('feedback-fragment-reveal'), feedbackFragmentVal:document.getElementById('feedback-fragment-val'),
  btnSubmitAnswer:document.getElementById('btn-submit-answer'), btnNextRoom:document.getElementById('btn-next-room'),
  vaultFragTiles:[1,2,3,4].map(i=>document.getElementById(`vault-frag-${i}`)), vaultDigitSlots:[0,1,2,3].map(i=>document.getElementById(`code-digit-${i}`)),
  vaultKeypadStatus:document.getElementById('vault-keypad-status'), vaultErrorBox:document.getElementById('vault-error-box'), vaultErrorMsg:document.getElementById('vault-error-msg'),
  resPlayerName:document.getElementById('res-player-name'), resDifficulty:document.getElementById('res-difficulty'), resTime:document.getElementById('res-time'),
  resRoomPoints:document.getElementById('res-room-points'), resSpeedBonus:document.getElementById('res-speed-bonus'), resTotalScore:document.getElementById('res-total-score'), resRankTitle:document.getElementById('res-rank-title'),
  resRoomsCleared:document.getElementById('res-rooms-cleared'), resFailedRoom:document.getElementById('res-failed-room'), resAttempts:document.getElementById('res-attempts'), resHints:document.getElementById('res-hints'),
  doorUnlockOverlay:document.getElementById('door-unlock-overlay')
};

function showScreen(key){
  Object.values(dom.screens).forEach(s=>s&&s.classList.remove('active'));
  if(dom.screens[key]) dom.screens[key].classList.add('active');
  const playing = key==='room'||key==='vault';
  dom.topNavbar.classList.toggle('hidden',!playing); dom.caseFilePanel.classList.toggle('hidden',!playing);
  window.scrollTo({top:0,behavior:'smooth'});
}

function formatTime(sec){sec=Math.max(0,Math.floor(sec));const m=Math.floor(sec/60),s=sec%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
const TIME_LIMITS={easy:2*60,moderate:3*60,finance:4*60};
function startTimer(){
  stopTimer();
  const limit=TIME_LIMITS[gameState.difficulty]||TIME_LIMITS.moderate;
  gameState.timer.startTime=Date.now();
  gameState.timer.elapsedSeconds=0;
  gameState.timer.limitSeconds=limit;
  gameState.timer.remainingSeconds=limit;
  gameState.timedOut=false;
  updateCountdownDisplay();
  gameState.timer.intervalId=setInterval(()=>{
    const elapsed=Math.floor((Date.now()-gameState.timer.startTime)/1000);
    gameState.timer.elapsedSeconds=Math.min(elapsed,limit);
    gameState.timer.remainingSeconds=Math.max(0,limit-elapsed);
    updateCountdownDisplay();
    if(gameState.timer.remainingSeconds<=0){timeExpired();}
  },250);
}
function updateCountdownDisplay(){
  const remaining=gameState.timer.remainingSeconds;
  dom.navTimer.textContent=formatTime(remaining);
  const warningAt=Math.max(30, Math.ceil(gameState.timer.limitSeconds*0.35));
  const criticalAt=Math.max(10, Math.ceil(gameState.timer.limitSeconds*0.10));
  dom.navTimer.classList.toggle('timer-warning',remaining<=warningAt&&remaining>criticalAt);
  dom.navTimer.classList.toggle('timer-critical',remaining<=criticalAt&&remaining>0);
}
function stopTimer(){if(gameState.timer.intervalId){clearInterval(gameState.timer.intervalId);gameState.timer.intervalId=null;}}
function timeExpired(){
  if(gameState.timedOut || gameState.runStatus!=='playing')return;
  gameState.timedOut=true;
  gameState.runStatus='failed';
  gameState.timer.remainingSeconds=0;
  gameState.timer.elapsedSeconds=gameState.timer.limitSeconds;
  stopTimer();
  updateCountdownDisplay();
  renderResultsScreen(true);
}

function getTotalRoomPoints(){return Object.values(gameState.roomScores).reduce((a,b)=>a+b,0);}
function calculateSpeedBonus(sec){if(sec<=60)return 50;if(sec<=120)return 40;if(sec<=180)return 25;if(sec<=240)return 10;return 0;}
function updateNavbarScore(){dom.navScore.textContent=`${getTotalRoomPoints()} pts`;}

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function prepareSessionQuestions(){
  const difficulty=gameState.difficulty;
  const pool=QUESTION_BANK[difficulty]||QUESTION_BANK.moderate;
  const storageKey=`fer_v3_used_${difficulty}`;
  let used=[];
  try{used=JSON.parse(localStorage.getItem(storageKey)||'[]');if(!Array.isArray(used))used=[];}catch(e){used=[];}

  // Keep the next player's questions different from recent sessions.
  // With 24 questions per level, the pool is refreshed after 6 sessions.
  let available=pool.filter(q=>!used.includes(q.id));
  if(available.length<4){used=[];available=[...pool];}

  const shuffled=shuffle(available);
  const selected=[]; const categories=new Set();
  for(const q of shuffled){
    if(selected.length>=4)break;
    if(!categories.has(q.category)){selected.push(q);categories.add(q.category);}
  }
  if(selected.length<4){for(const q of shuffled){if(selected.length>=4)break;if(!selected.includes(q))selected.push(q);}}

  gameState.sessionQuestions=selected;
  used=[...used,...selected.map(q=>q.id)];
  try{localStorage.setItem(storageKey,JSON.stringify(used));}catch(e){}
}

function unlockCaseFileFragment(roomNum,digit){
  const i=roomNum-1;gameState.caseFile[i]=String(digit);
  if(dom.fragBoxes[i])dom.fragBoxes[i].classList.remove('locked'),dom.fragBoxes[i].classList.add('unlocked');
  if(dom.fragVals[i])dom.fragVals[i].textContent=digit;
  if(dom.fragStatuses[i])dom.fragStatuses[i].textContent='FOUND!';
}
function resetCaseFile(){gameState.caseFile=[null,null,null,null];for(let i=0;i<4;i++){dom.fragBoxes[i]?.classList.remove('unlocked');dom.fragBoxes[i]?.classList.add('locked');if(dom.fragVals[i])dom.fragVals[i].textContent='?';if(dom.fragStatuses[i])dom.fragStatuses[i].textContent='LOCKED';}}

function getDirectAnswer(q){
  if(q.type==='numeric') return `The answer is ${q.answer}.`;
  const option=q.options?.find(([id])=>normalizeAnswer(id)===normalizeAnswer(q.answer));
  if(option) return `The correct answer is ${option[0]} — ${option[1]}`;
  return `The correct answer is ${q.answer}.`;
}

function revealRoomHint(){
  const r=gameState.currentRoom;
  const q=gameState.sessionQuestions[r-1];
  const level=gameState.hintLevel[r]||0;
  if(level===0){
    gameState.hintLevel[r]=1;
    dom.roomGuidanceText.textContent=q.hint||'Break the problem into smaller steps and identify the finance principle involved.';
    dom.roomGuidanceBox.classList.remove('hidden');
    dom.btnShowHint.innerHTML="💡 Show direct answer";
  }else if(level===1){
    gameState.hintLevel[r]=2;
    dom.roomGuidanceText.textContent=getDirectAnswer(q);
    dom.roomGuidanceBox.classList.remove('hidden');
    dom.btnShowHint.textContent="✅ Answer revealed";
    dom.btnShowHint.disabled=true;
  }
}

function escapeHTML(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function renderEvidence(q){
  if(!q.evidence)return '';
  return `<div class="ledger-card"><table class="ledger-table"><tbody>${q.evidence.map(row=>`<tr><td><strong>${escapeHTML(row[0])}</strong></td><td class="val-col">${escapeHTML(row[1])}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderQuestion(q){
  let html=`<div class="scenario-box"><strong>${escapeHTML(q.title)}</strong><br><span>${escapeHTML(q.story)}</span></div>`;
  html+=renderEvidence(q);
  html+=`<div class="question-card"><div class="question-label">${escapeHTML(q.prompt)}</div>`;
  if(q.type==='numeric'){
    html+=`<div class="budget-input-area"><input id="room-input-answer" class="currency-input" type="text" inputmode="decimal" placeholder="Enter your answer" autocomplete="off"></div>`;
  }else{
    html+=`<div class="binary-options-grid">${q.options.map(([id,text])=>`<div class="decision-card" id="opt-${escapeHTML(id)}" onclick="selectRoomOption('${escapeHTML(id)}')"><div class="decision-title">${escapeHTML(id)}</div><div class="decision-desc">${escapeHTML(text)}</div></div>`).join('')}</div>`;
  }
  html+='</div>';dom.roomPuzzleContent.innerHTML=html;
  const input=document.getElementById('room-input-answer');if(input){input.focus();input.addEventListener('keydown',e=>{if(e.key==='Enter')submitRoomAnswer();});}
}

function renderRoom(roomNumber){
  gameState.currentRoom=roomNumber;gameState.selectedOption=null;
  const q=gameState.sessionQuestions[roomNumber-1];
  dom.navRoomIndicator.textContent=`Room ${roomNumber} of 5`;
  const labels={easy:'EASY',moderate:'MEDIUM',finance:'HARD'};dom.navDifficulty.textContent=labels[gameState.difficulty];dom.navPlayerName.textContent=gameState.playerName;updateNavbarScore();
  dom.roomSectorTag.textContent=`Random Challenge • ${q.category}`;dom.roomTitle.textContent=`ROOM ${roomNumber} — ${q.title.toUpperCase()}`;dom.roomDifficultyPill.textContent=`Level: ${labels[gameState.difficulty]}`;dom.roomStoryText.textContent=q.story;
  dom.roomGuidanceText.textContent=q.hint||'Break the problem into smaller steps and identify the finance principle involved.';
  gameState.hintLevel[roomNumber]=0;
  dom.roomGuidanceBox.classList.add('hidden');dom.btnShowHint.disabled=false;dom.btnShowHint.style.opacity='1';dom.btnShowHint.style.cursor='pointer';dom.btnShowHint.innerHTML="💡 Need a hint?";
  dom.roomFeedback.className='feedback-panel hidden';dom.feedbackFragmentReveal.classList.add('hidden');dom.btnSubmitAnswer.classList.remove('hidden');dom.btnNextRoom.classList.add('hidden');
  renderQuestion(q);showScreen('room');
}

function selectRoomOption(id){gameState.selectedOption=id;dom.roomPuzzleContent.querySelectorAll('.decision-card').forEach(c=>c.classList.remove('selected'));document.getElementById(`opt-${id}`)?.classList.add('selected');}

function normalizeAnswer(v){return String(v).trim().replace(/[₹,%\s,]/g,'').toLowerCase();}
function answerIsCorrect(q,raw){const a=normalizeAnswer(raw);const accepted=[q.answer,...(q.accepted||[])].map(normalizeAnswer);return accepted.includes(a);}

function submitRoomAnswer(){
  const r=gameState.currentRoom,q=gameState.sessionQuestions[r-1];
  let raw='';
  if(q.type==='numeric') raw=document.getElementById('room-input-answer')?.value||'';
  else raw=gameState.selectedOption||'';
  if(!raw.trim()){alert('Please enter or select an answer before submitting!');return;}

  if(answerIsCorrect(q,raw)){
    const attempts=gameState.roomAttempts[r];
    const hintLevel=gameState.hintLevel[r]||0;
    const pts=hintLevel===0?(attempts===0?100:80):hintLevel===1?70:40;
    gameState.roomScores[r]=pts;
    updateNavbarScore();
    unlockCaseFileFragment(r,q.codeFragment);
    dom.roomFeedback.className='feedback-panel success';
    dom.feedbackIcon.textContent='✓';
    dom.feedbackTitle.textContent='ROOM UNLOCKED!';
    const hintNote=hintLevel===0?'No hints used.':hintLevel===1?'Solved with Hint 1.':'Solved after using the direct-answer hint.';
    const attemptNote=attempts===0?' First attempt.':attempts===1?' Second attempt.':' Third attempt.';
    dom.feedbackMessage.textContent=`${hintNote}${attemptNote} +${pts} points. Your secret digit is ready.`;
    dom.feedbackFragmentVal.textContent=q.codeFragment;
    dom.feedbackFragmentReveal.classList.remove('hidden');
    dom.btnSubmitAnswer.classList.add('hidden');
    dom.btnNextRoom.textContent=r===4?'PROCEED TO FINAL SAFE ➔':'GO TO NEXT ROOM ➔';
    dom.btnNextRoom.classList.remove('hidden');
    showDoorUnlockOverlay();
    return;
  }

  gameState.roomAttempts[r]++;
  const attemptsLeft=3-gameState.roomAttempts[r];
  dom.roomFeedback.className='feedback-panel error';
  dom.feedbackFragmentReveal.classList.add('hidden');
  dom.feedbackFragmentVal.textContent='?';

  if(attemptsLeft>0){
    dom.feedbackIcon.textContent='⚠️';
    dom.feedbackTitle.textContent=`INCORRECT — ${attemptsLeft} ATTEMPT${attemptsLeft===1?'':'S'} LEFT`;
    dom.feedbackMessage.textContent='That answer is not correct. The solution is not revealed. Re-check the challenge and submit again.';
    dom.btnSubmitAnswer.classList.remove('hidden');
    return;
  }

  // Three failed attempts: the room stays locked, no digit or answer is revealed, and the run ends.
  gameState.roomScores[r]=0;
  gameState.failedRoom=r;
  gameState.runStatus='failed';
  updateNavbarScore();
  stopTimer();
  dom.feedbackIcon.textContent='🔒';
  dom.feedbackTitle.textContent='ROOM FAILED';
  dom.feedbackMessage.textContent=`You used all 3 attempts. The room remains locked, and its answer is not revealed. Your escape attempt ends here.`;
  dom.btnSubmitAnswer.classList.add('hidden');
  dom.btnNextRoom.classList.add('hidden');
  setTimeout(()=>renderResultsScreen(false),900);
}

function showDoorUnlockOverlay(){dom.doorUnlockOverlay.classList.remove('hidden');setTimeout(()=>dom.doorUnlockOverlay.classList.add('hidden'),900);}
function proceedToNextRoom(){if(gameState.currentRoom<4)renderRoom(gameState.currentRoom+1);else renderVaultRoom();}

function renderVaultRoom(){
  gameState.currentRoom=5;
  gameState.vaultInput='';
  dom.navRoomIndicator.textContent='Room 5 of 5';
  updateNavbarScore();
  for(let i=0;i<4;i++) if(dom.vaultFragTiles[i]) dom.vaultFragTiles[i].textContent=gameState.caseFile[i]||'?';
  updateKeypadDisplay();
  dom.vaultErrorBox.classList.add('hidden');
  const b=document.getElementById('btn-unlock-vault');
  if(b){b.textContent='🔓 UNLOCK THE SAFE';b.onclick=submitVaultCode;}
  showScreen('vault');
}

function updateKeypadDisplay(){const chars=gameState.vaultInput.padEnd(4,'_').split('');for(let i=0;i<4;i++)dom.vaultDigitSlots[i].textContent=chars[i];dom.vaultKeypadStatus.textContent=gameState.vaultInput.length===4?"Ready! Press 'UNLOCK THE SAFE' or hit Enter.":`Entered ${gameState.vaultInput.length} of 4 digits...`;}
function pressKeypad(d){if(gameState.vaultInput.length<4){gameState.vaultInput+=d;updateKeypadDisplay();}}
function clearKeypad(){gameState.vaultInput='';dom.vaultErrorBox.classList.add('hidden');updateKeypadDisplay();}
function backspaceKeypad(){gameState.vaultInput=gameState.vaultInput.slice(0,-1);dom.vaultErrorBox.classList.add('hidden');updateKeypadDisplay();}
function submitVaultCode(){
  if(gameState.vaultInput.length!==4){alert('Please enter all 4 digits from your Clue Notebook.');return;}
  const masterCode=gameState.caseFile.join('');
  if(gameState.vaultInput===masterCode){
    gameState.roomScores[5]=100;
    gameState.runStatus='escaped';
    updateNavbarScore();
    stopTimer();
    showScreen('escape');
    return;
  }

  gameState.roomAttempts[5]++;
  const attemptsLeft=3-gameState.roomAttempts[5];
  dom.vaultErrorBox.classList.remove('hidden');
  gameState.vaultInput='';
  updateKeypadDisplay();

  if(attemptsLeft>0){
    dom.vaultErrorMsg.textContent=`That code is incorrect. Re-check the four digits in Room order. ${attemptsLeft} attempt${attemptsLeft===1?' remains.':'s remain.'}`;
    return;
  }

  gameState.roomScores[5]=0;
  gameState.runStatus='failed';
  stopTimer();
  dom.vaultErrorMsg.textContent='The safe remains locked. All 3 code attempts are used, and the correct code is not revealed.';
  const b=document.getElementById('btn-unlock-vault');
  if(b){b.textContent='VIEW FINAL SCORE ➔';b.onclick=()=>renderResultsScreen(false);}
}

function countHintsUsed(){return Object.values(gameState.hintLevel).filter(v=>v>0).reduce((sum,v)=>sum+1,0);}
function countAttemptsUsed(){return Object.values(gameState.roomAttempts).reduce((sum,v)=>sum+v,0);}
function countRoomsCleared(){return [1,2,3,4].filter(r=>gameState.caseFile[r-1]!==null).length;}
function renderResultsScreen(timedOut=false){
  const roomPts=getTotalRoomPoints();
  const bonus=gameState.runStatus==='escaped' ? calculateSpeedBonus(gameState.timer.elapsedSeconds) : 0;
  const total=roomPts+bonus;
  const labels={easy:'EASY',moderate:'MEDIUM',finance:'HARD'};
  dom.resPlayerName.textContent=gameState.playerName;
  dom.resDifficulty.textContent=labels[gameState.difficulty];
  dom.resTime.textContent=formatTime(gameState.timer.elapsedSeconds);
  dom.resRoomPoints.textContent=`${roomPts} pts`;
  dom.resSpeedBonus.textContent=`+${bonus} pts`;
  dom.resTotalScore.textContent=`${total} / 550`;
  dom.resRoomsCleared.textContent=`${countRoomsCleared()} / 4`;
  dom.resFailedRoom.textContent=gameState.failedRoom?`Room ${gameState.failedRoom}`:(gameState.runStatus==='escaped'?'None':'Final Safe');
  dom.resAttempts.textContent=countAttemptsUsed();
  dom.resHints.textContent=countHintsUsed();

  const success=gameState.runStatus==='escaped';
  const title=document.querySelector('#screen-results .section-title');
  const tagline=document.querySelector('#screen-results .results-tagline');
  if(title) title.textContent=success?'GAME COMPLETED!':'ESCAPE FAILED';
  if(tagline){
    tagline.textContent=timedOut?'TIME IS UP — the countdown reached zero before the escape was completed.':success?'You opened the final safe. Here is your score for this game only.':'The locked room stopped the run. The correct answer was not revealed.';
  }
  dom.resRankTitle.textContent=success?'Finance Escape Complete':gameState.failedRoom?`Room ${gameState.failedRoom} Locked`:'Safe Still Locked';
  showScreen('results');
}

function resetGame(){stopTimer();gameState.playerName='Player';gameState.difficulty='moderate';gameState.currentRoom=1;gameState.roomScores={1:0,2:0,3:0,4:0,5:0};gameState.roomAttempts={1:0,2:0,3:0,4:0,5:0};gameState.hintLevel={1:0,2:0,3:0,4:0,5:0};gameState.selectedOption=null;gameState.sessionQuestions=[];gameState.vaultInput='';gameState.timedOut=false;gameState.failedRoom=null;gameState.runStatus='playing';gameState.timer.elapsedSeconds=0;gameState.timer.remainingSeconds=0;gameState.timer.limitSeconds=0;document.getElementById('player-name-input').value='';resetCaseFile();showScreen('start');}
function selectDifficulty(diff){gameState.difficulty=diff;gameState.runStatus='playing';gameState.failedRoom=null;prepareSessionQuestions();resetCaseFile();gameState.roomScores={1:0,2:0,3:0,4:0,5:0};gameState.roomAttempts={1:0,2:0,3:0,4:0,5:0};gameState.hintLevel={1:0,2:0,3:0,4:0,5:0};startTimer();renderRoom(1);}

window.selectDifficulty=selectDifficulty;window.selectRoomOption=selectRoomOption;window.revealRoomHint=revealRoomHint;window.pressKeypad=pressKeypad;window.clearKeypad=clearKeypad;window.backspaceKeypad=backspaceKeypad;window.submitVaultCode=submitVaultCode;

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('btn-to-intro')?.addEventListener('click',()=>showScreen('intro'));
  document.getElementById('btn-to-name')?.addEventListener('click',()=>showScreen('name'));
  document.getElementById('btn-skip-intro')?.addEventListener('click',()=>showScreen('name'));
  const nameInput=document.getElementById('player-name-input'),nameError=document.getElementById('name-error-msg');
  const submitName=()=>{const n=nameInput.value.trim();if(!n){nameError.classList.remove('hidden');nameInput.focus();return;}nameError.classList.add('hidden');gameState.playerName=n;showScreen('difficulty');};
  document.getElementById('btn-submit-name')?.addEventListener('click',submitName);nameInput?.addEventListener('keydown',e=>{if(e.key==='Enter')submitName();});
  dom.btnSubmitAnswer?.addEventListener('click',submitRoomAnswer);dom.btnNextRoom?.addEventListener('click',proceedToNextRoom);
  document.getElementById('btn-view-results')?.addEventListener('click',renderResultsScreen);document.getElementById('btn-play-again')?.addEventListener('click',resetGame);
  window.addEventListener('keydown',e=>{if(dom.screens.vault.classList.contains('active')){if(/^[0-9]$/.test(e.key))pressKeypad(e.key);else if(e.key==='Backspace')backspaceKeypad();else if(e.key==='Enter')submitVaultCode();else if(e.key==='Escape'||e.key.toLowerCase()==='c')clearKeypad();}});
});

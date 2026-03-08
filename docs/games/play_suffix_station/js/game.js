import { QUESTIONS } from './questions.js';

const state = {
  score: 0,
  strikes: 0,
  questionIndex: 0,
  streak: 0,
  maxStreak: 0,
  timeRemaining: 100, // percentage (0-100)
  timerInterval: null,
  isProcessing: false,
  shuffledQuestions: []
};

// DOM Elements
const screens = {
  start: document.getElementById('start-screen'),
  game: document.getElementById('game-scene'),
  end: document.getElementById('end-screen')
};

const ui = {
  score: document.getElementById('score-value'),
  timerBar: document.getElementById('timer-bar'),
  questionMsg: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  explanationBox: document.getElementById('explanation-box'),
  explanationText: document.getElementById('explanation-text'),
  btnNext: document.getElementById('btn-next'),
  streakInd: document.getElementById('streak-indicator'),
  streakCount: document.getElementById('streak-count')
};

function init() {
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-play-again').addEventListener('click', startGame);
  ui.btnNext.addEventListener('click', loadNextQuestion);
}

function switchScreen(screen) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[screen].classList.add('active');
}

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function startGame() {
  state.score = 0;
  state.strikes = 0;
  state.questionIndex = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.isProcessing = false;

  // Shuffle questions within tiers to provide increasing difficulty
  const tier1 = shuffle(QUESTIONS.filter(q => q.tier === 1));
  const tier2 = shuffle(QUESTIONS.filter(q => q.tier === 2));
  const tier3 = shuffle(QUESTIONS.filter(q => q.tier === 3));
  state.shuffledQuestions = [...tier1, ...tier2, ...tier3];

  updateScoreBoard();
  resetStrikes();
  switchScreen('game');
  loadNextQuestion();
}

function loadNextQuestion() {
  if (state.strikes >= 3 || state.questionIndex >= state.shuffledQuestions.length) {
    endGame();
    return;
  }

  state.isProcessing = false;
  ui.explanationBox.classList.add('hidden');

  const q = state.shuffledQuestions[state.questionIndex];
  ui.questionMsg.innerText = q.prompt;

  // Create a mapped array to shuffle options while remembering the correct index
  let optionsMap = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correct }));
  optionsMap = shuffle(optionsMap);

  ui.optionsContainer.innerHTML = '';
  optionsMap.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => handleAnswer(opt.isCorrect, btn, optionsMap);
    ui.optionsContainer.appendChild(btn);
  });

  startTimer(10000 - (state.questionIndex * 150)); // Gets slightly faster over time (min 3s)
}

function startTimer(durationMs) {
  clearInterval(state.timerInterval);
  state.timeRemaining = 100;

  // Prevent duration from getting impossibly fast
  durationMs = Math.max(3000, durationMs);

  const intervalMs = 50;
  const dropPerInterval = 100 / (durationMs / intervalMs);

  ui.timerBar.style.width = '100%';
  ui.timerBar.className = '';

  state.timerInterval = setInterval(() => {
    state.timeRemaining -= dropPerInterval;
    ui.timerBar.style.width = `${state.timeRemaining}%`;

    if (state.timeRemaining < 40) ui.timerBar.className = 'warning';
    if (state.timeRemaining < 15) ui.timerBar.className = 'critical';

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      handleTimeout();
    }
  }, intervalMs);
}

function handleAnswer(isCorrect, selectedBtn, optionsMap) {
  if (state.isProcessing) return;
  state.isProcessing = true;
  clearInterval(state.timerInterval);

  const q = state.shuffledQuestions[state.questionIndex];

  // Disable all buttons and show correct answer
  const allBtns = ui.optionsContainer.querySelectorAll('.option-btn');
  allBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (optionsMap[idx].isCorrect) {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    // Correct
    const timeBonus = Math.floor(state.timeRemaining / 10); // 0-10 bonus points
    const points = 10 + timeBonus;
    state.score += points;
    state.streak++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;

    showFloatingFeedback(`+${points}`, true);

    setTimeout(() => {
      state.questionIndex++;
      loadNextQuestion();
    }, 800);

  } else {
    // Wrong
    selectedBtn.classList.add('wrong');
    selectedBtn.classList.add('shake');
    state.strikes++;
    state.streak = 0;
    updateStrikesUI();
    showFloatingFeedback('❌', false);

    // Show explanation
    ui.explanationText.innerText = q.explanation;
    ui.explanationBox.classList.remove('hidden');
    ui.btnNext.innerText = state.strikes >= 3 ? "Game Over →" : "Next Question →";

    // Let the user click 'Next' to proceed after reading
    ui.btnNext.onclick = () => {
      state.questionIndex++;
      loadNextQuestion();
    };
  }

  updateScoreBoard();
}

function handleTimeout() {
  if (state.isProcessing) return;
  state.isProcessing = true;

  // Treat as wrong answer
  const q = state.shuffledQuestions[state.questionIndex];

  // Highlight correct answer
  const allBtns = ui.optionsContainer.querySelectorAll('.option-btn');
  allBtns.forEach(btn => btn.disabled = true);
  // Find correct button
  Array.from(allBtns).find(b => b.classList.contains('correct'));

  state.strikes++;
  state.streak = 0;
  updateStrikesUI();
  showFloatingFeedback('⏰ Time\'s Up!', false);

  ui.explanationText.innerText = `Too late! ${q.explanation}`;
  ui.explanationBox.classList.remove('hidden');
  ui.btnNext.innerText = state.strikes >= 3 ? "Game Over →" : "Next Question →";

  ui.btnNext.onclick = () => {
    state.questionIndex++;
    loadNextQuestion();
  };

  updateScoreBoard();
}

function updateScoreBoard() {
  ui.score.innerText = state.score;
  // Streak visualization
  if (state.streak >= 3) {
    ui.streakCount.innerText = state.streak;
    ui.streakInd.classList.remove('hidden');
  } else {
    ui.streakInd.classList.add('hidden');
  }
}

function updateStrikesUI() {
  for (let i = 1; i <= 3; i++) {
    const strikeEl = document.getElementById(`strike-${i}`);
    if (i <= state.strikes) {
      strikeEl.classList.add('active');
    } else {
      strikeEl.classList.remove('active');
    }
  }
}

function resetStrikes() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`strike-${i}`).classList.remove('active');
  }
}

function showFloatingFeedback(text, isPositive) {
  const container = document.getElementById('feedback-container');
  const el = document.createElement('div');
  el.className = `floating-text ${isPositive ? 'pos' : 'neg'}`;
  // Reusing the CSS from the other game, assuming it's available or we add it to style.css
  el.style.position = 'absolute';
  el.style.left = '50%';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.fontSize = '2rem';
  el.style.fontWeight = '800';
  el.style.color = isPositive ? 'var(--brand-green)' : 'var(--brand-red)';
  el.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
  el.style.pointerEvents = 'none';
  el.innerText = text;

  // Simple JS animation because it's localized
  el.animate([
    { top: '40%', opacity: 0, scale: 0.5 },
    { top: '30%', opacity: 1, scale: 1.2 },
    { top: '20%', opacity: 0, scale: 1 }
  ], { duration: 1000, easing: 'ease-out' });

  container.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function endGame() {
  clearInterval(state.timerInterval);
  document.getElementById('final-score').innerText = state.score;
  document.getElementById('max-streak').innerText = `${state.maxStreak}🔥`;

  let msg = "Keep practicing! Don't let the verbs win.";
  if (state.score > 200) msg = "Incroyable! You are a true Parisian linguist.";
  else if (state.score > 100) msg = "Bien joué! You're getting the hang of it.";

  document.getElementById('end-message').innerText = msg;
  switchScreen('end');

  document.getElementById('btn-share').onclick = () => {
    alert(`I scored ${state.score} in Suffix Station: French Grammar Rush with a ${state.maxStreak} streak! Can you beat it?`);
  }
}

// Boot
window.onload = init;

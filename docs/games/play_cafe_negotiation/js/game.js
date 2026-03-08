import { NPCS, LEVELS } from './data.js';

const state = {
  respect: 30, // Starts somewhat low for a tourist
  patience: 100,
  level: 1,
  currentStep: 'start',
  activeNPC: null,
  history: [],
  undosRemaining: 3,
  isTypewriting: false
};

// DOM Elements
const screens = {
  start: document.getElementById('start-screen'),
  intro: document.getElementById('level-intro-screen'),
  game: document.getElementById('game-scene'),
  end: document.getElementById('end-screen')
};

function switchScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[screenName].classList.add('active');
}

// Init
function init() {
  renderNPCCards();
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-continue-level').addEventListener('click', startLevelNode);
  document.getElementById('btn-undo').addEventListener('click', undoChoice);
  document.getElementById('btn-play-again').addEventListener('click', () => location.reload());
}

function renderNPCCards() {
  const container = document.getElementById('npc-cards');
  Object.keys(NPCS).forEach(key => {
    const npc = NPCS[key];
    const el = document.createElement('div');
    el.className = 'npc-card';
    el.innerHTML = `<div class="npc-name">${npc.avatar} ${npc.name}</div><div class="npc-desc">${npc.description}</div>`;
    el.onclick = () => {
      document.querySelectorAll('.npc-card').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      state.activeNPC = key;
      document.getElementById('btn-start').disabled = false;
    };
    container.appendChild(el);
  });
}

function startGame() {
  state.respect = 30;
  state.patience = 100;
  state.level = 1;
  state.history = [];
  state.undosRemaining = 3;
  updateMeters();
  document.getElementById('undo-count').innerText = state.undosRemaining;
  document.getElementById('speaker-name').innerText = NPCS[state.activeNPC].name;
  document.getElementById('npc-avatar').innerText = NPCS[state.activeNPC].avatar;
  startLevelIntro();
}

function startLevelIntro() {
  const levelData = LEVELS[state.level];
  if (!levelData) {
    endGame();
    return;
  }
  document.getElementById('level-title').innerText = `Level ${state.level}: ${levelData.title}`;
  document.getElementById('level-desc').innerText = levelData.scenario;
  document.getElementById('app').style.backgroundImage = `url('${levelData.bg}')`;
  switchScreen('intro');
}

function startLevelNode() {
  state.currentStep = 'start';
  switchScreen('game');
  renderNode();
}

function updateMeters() {
  const rBar = document.getElementById('bar-respect');
  const pBar = document.getElementById('bar-patience');

  // Clamp values
  state.respect = Math.max(0, Math.min(100, state.respect));
  state.patience = Math.max(0, Math.min(100, state.patience));

  rBar.style.width = `${state.respect}%`;
  pBar.style.width = `${state.patience}%`;

  rBar.style.backgroundColor = state.respect < 20 ? 'var(--barrier-color)' : 'var(--respect-color)';
  pBar.style.backgroundColor = state.patience < 20 ? 'var(--barrier-color)' : 'var(--patience-color)';
}

function typeWriter(text, element, callback) {
  state.isTypewriting = true;
  element.innerHTML = '';
  let i = 0;
  const speed = 25; // ms per char

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      state.isTypewriting = false;
      if (callback) callback();
    }
  }
  type();
}

function renderNode() {
  // Clear old choices and feedback
  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.innerHTML = '';
  const feedbackBox = document.getElementById('cultural-feedback');
  feedbackBox.className = 'hidden';

  const nodeData = LEVELS[state.level].dialogue[state.currentStep];

  // Show NPC Text
  const textEl = document.getElementById('dialogue-text');
  typeWriter(nodeData.text, textEl, () => {
    // Render Choices
    nodeData.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = `choice-btn ${choice.isEnglish ? 'choice-english' : ''}`;
      btn.innerHTML = `
                <span class="choice-text">${index + 1}. ${choice.text}</span>
                <span class="choice-trans">${choice.translation}</span>
            `;
      btn.onclick = () => makeChoice(choice);
      choicesContainer.appendChild(btn);
    });
  });
}

function showFloatingFeedback(effect) {
  const container = document.getElementById('feedback-container');
  if (effect.respect) {
    const el = document.createElement('div');
    const val = effect.respect > 0 ? `+${effect.respect}` : effect.respect;
    el.className = `floating-text ${effect.respect > 0 ? 'pos' : 'neg'}`;
    el.innerText = `${val} Respect`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

function makeChoice(choice) {
  if (state.isTypewriting) return;

  // Save state for undo
  state.history.push({
    respect: state.respect,
    patience: state.patience,
    step: state.currentStep,
    level: state.level
  });

  // Calculate effects with NPC modifiers
  const npcMods = NPCS[state.activeNPC].modifiers;
  const actualEffect = {
    respect: Math.round((choice.effect.respect || 0) * npcMods.respect),
    patience: Math.round((choice.effect.patience || 0) * npcMods.patience)
  };

  state.respect += actualEffect.respect;
  state.patience += actualEffect.patience;
  updateMeters();
  showFloatingFeedback(actualEffect);

  // Show cultural feedback box
  const feedbackBox = document.getElementById('cultural-feedback');
  feedbackBox.innerText = choice.feedback;
  feedbackBox.className = choice.effect.barrier ? 'error' : '';

  // Check failure states
  if (state.respect <= 0 || state.patience <= 0) {
    setTimeout(endGame, 1500);
    return;
  }

  // Proceed to next node or level
  state.currentStep = choice.next;

  document.getElementById('choices-container').innerHTML = ''; // Hide choices while reading feedback

  setTimeout(() => {
    if (state.currentStep === 'level_complete') {
      state.level++;
      startLevelIntro();
    } else {
      renderNode();
    }
  }, 2000);
}

function undoChoice() {
  if (state.undosRemaining <= 0 || state.history.length === 0 || state.isTypewriting) return;

  const prevState = state.history.pop();
  state.respect = prevState.respect;
  state.patience = prevState.patience;
  state.currentStep = prevState.step;
  state.level = prevState.level;
  state.undosRemaining--;

  document.getElementById('undo-count').innerText = state.undosRemaining;
  updateMeters();
  renderNode();
}

function endGame() {
  let rank = "Un Drame";
  let msg = "You offended the Parisian waiter and were asked to leave.";

  if (state.respect > 75) {
    rank = "Parisien(ne)";
    msg = "Incredible! You navigated the cafe with perfect etiquette. The waiter smiled.";
  } else if (state.respect > 40) {
    rank = "Touriste Poli(e)";
    msg = "You survived! You made some mistakes, but you tried your best to be polite.";
  }

  document.getElementById('final-respect').innerText = state.respect;
  document.getElementById('final-rank').innerText = rank;
  document.getElementById('end-message').innerText = msg;

  switchScreen('end');

  document.getElementById('btn-share').onclick = () => {
    alert(`I scored ${state.respect}% Respect in the Paris Cafe Survival Simulator! Rank: ${rank}. Can you beat me?`);
  };
}

// Boot
window.onload = init;

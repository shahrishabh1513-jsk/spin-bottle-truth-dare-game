const truthQuestions = [
  "Who was your first crush?",
  "What is your biggest fear?",
  "Have you ever lied to a best friend?",
  "Most embarrassing moment?",
  "Who do you trust the most?",
  "Dream travel destination?",
  "Which subject do you hate most?",
  "Have you ever slept during class?",
  "Your guilty pleasure?",
  "Worst exam result?",
  "Have you ever skipped class?",
  "Who in this group would you date?",
  "Have you ever broken someone's heart?",
  "What's your darkest secret?",
  "Betrayed a friend's trust?",
  "Secretly hated someone here?",
  "Something you've never told anyone?",
  "Funniest childhood memory?",
  "Ever sang karaoke alone?",
  "First kiss story?",
  "Last person you stalked online?",
  "Ever vomited from alcohol?",
  "Weirdest dream?",
  "A conspiracy you believe?",
  "How much money is in your bank?",
  "How often do you change bedsheets?",
  "Most awkward date?",
  "Most embarassing photo exists?",
  "Have you ever cheated in exam?",
  "Do you sing in shower?",
  "Ever stolen something?",
  "weirdest toilet story?",
  "Hours spent gaming in a week?",
  "Have you ever sent a nude?",
  "What lie do you tell most?",
  "Do you have a secret kid?",
  "Ever kissed someone in this room?",
  "Who is your secret ex?",
  "Most taboo thought?",
  "Ever cheated on partner?",
  "Would you date two people at once?",
  "Have you ever been in love with two?",
  "What's the worst thing you did for money?",
  "Fart in public story?",
  "Ever seen a ghost?",
  "Age of first kiss?",
  "Do you believe in soulmates?",
  "What teacher did you have crush on?",
  "Do you love your parents?",
  "What's the most illegal thing you did?"
];
const dareTasks = [
  "Sing loudly for 15 seconds.",
  "Dance without music.",
  "Act like a baby.",
  "Walk like a model.",
  "Imitate a teacher.",
  "Speak in an accent for 1 min.",
  "Do 15 jumping jacks.",
  "Pretend you're a tour guide.",
  "Tell a fake ghost story.",
  "Do your funniest laugh.",
  "Reveal the last photo in your phone.",
  "Send random emoji to your crush.",
  "Read your last message aloud.",
  "Call a friend & say 'I miss you'.",
  "Reveal your last Google search.",
  "Drink a weird mixture.",
  "Act like a chicken for 10s.",
  "Give a kiss to the person on left.",
  "Roar like a lion.",
  "Meow like a cat.",
  "Post an ugly selfie on story.",
  "Text your ex 'I love you'.",
  "Call your mom and say 'I'm pregnant'.",
  "Eat a banana without hands.",
  "Smell someone's shoe.",
  "Do the floss dance.",
  "Make a broom dance with you.",
  "Rap a song for 20s.",
  "Read a random page dramatically.",
  "Show your internet history.",
  "Show your chat with best friend.",
  "Reveal your crush name.",
  "Give your phone to someone.",
  "Do 10 pushups.",
  "Propose to someone in room.",
  "Air guitar.",
  "Imitate a monkey.",
  "Blow a kiss to mirror.",
  "Swap shirt with someone.",
  "Tell a dark secret.",
  "Search something embarrassing.",
  "Say something dirty.",
  "Whisper a dark thought to player.",
  "Lick your elbow.",
  "Chug a glass of water.",
  "Vogue walk.",
  "Smell armpit and react.",
  "Crow like a rooster.",
  "Make a funny sound.",
  "Inflate an imaginary balloon."
];
while(truthQuestions.length < 50) truthQuestions.push("What's your favorite pizza topping?");
while(dareTasks.length < 50) dareTasks.push("Do a silly dance.");

let players = [];
let activePlayerIndex = 0;
let currentQuestionType = 'truth';
let currentQuestion = '';

let truthPool = [...truthQuestions];
let darePool = [...dareTasks];
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function reshufflePools() {
  truthPool = shuffleArray([...truthQuestions]);
  darePool = shuffleArray([...dareTasks]);
}
reshufflePools();

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const choiceScreen = document.getElementById('choice-screen');
const questionScreen = document.getElementById('question-screen');
const playerInputsDiv = document.getElementById('player-inputs');
const startBtn = document.getElementById('start-game-btn');
const playerListDiv = document.getElementById('player-list');
const spinBtn = document.getElementById('spin-btn');
const bottle = document.getElementById('bottle');
const selectedMsg = document.getElementById('selected-message');
const selectedPlayerNameSpan = document.getElementById('selected-player-name');
const truthBtn = document.getElementById('truth-btn');
const dareBtn = document.getElementById('dare-btn');
const questionText = document.getElementById('question-text');
const questionEmoji = document.getElementById('question-emoji');
const nextQuestion = document.getElementById('next-question');
const spinAgain = document.getElementById('spin-again');

let playerCount = 4;

function playSound(type) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'spin') {
      osc.frequency.value = 220;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.5);
    } else if (type === 'click') {
      osc.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    }
    osc.start();
    osc.stop(audioCtx.currentTime + (type==='spin'?0.8:0.1));
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) { }
}

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function confetti() {
  for (let i=0; i<30; i++) particles.push({ x: Math.random()*canvas.width, y: -10, size: Math.random()*6+4, speed: Math.random()*6+3, color: `hsl(${Math.random()*360},80%,60%)` });
  if (!window.confettiInterval) {
    window.confettiInterval = setInterval(() => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles = particles.filter(p => p.y < canvas.height+20);
      particles.forEach(p => { p.y += p.speed; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size,0,Math.PI*2); ctx.fill(); });
      if (particles.length===0) { clearInterval(window.confettiInterval); window.confettiInterval=null; }
    }, 30);
  }
}

function renderPlayerInputs(count) {
  let html = '';
  for (let i=0; i<count; i++) {
    html += `<div class="player-row" data-index="${i}">
      <input type="text" id="pname${i}" placeholder="Player ${i+1} name" value="P${i+1}">
      <div class="avatar-select" id="avatar-${i}">
        ${['🤖','🦊','🐼','🐯'].map(av => 
          `<button class="avatar-option ${i===0 && av==='😀' ? 'selected' : ''}" data-avatar="${av}">${av}</button>`
        ).join('')}
      </div>
    </div>`;
  }
  playerInputsDiv.innerHTML = html;
  document.querySelectorAll('.avatar-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentRow = btn.closest('.player-row');
      parentRow.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      playSound('click');
    });
  });
}
renderPlayerInputs(4);

document.querySelectorAll('.count-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active-count'));
    btn.classList.add('active-count');
    playerCount = parseInt(btn.dataset.count);
    renderPlayerInputs(playerCount);
    playSound('click');
  });
});

startBtn.addEventListener('click', () => {
  players = [];
  for (let i=0; i<playerCount; i++) {
    const nameInput = document.getElementById(`pname${i}`);
    const name = nameInput ? nameInput.value.trim() : `P${i+1}`;
    const selectedAvatar = document.querySelector(`#avatar-${i} .avatar-option.selected`);
    const avatar = selectedAvatar ? selectedAvatar.dataset.avatar : '😀';
    players.push({ name: name || `P${i+1}`, avatar });
  }
  activePlayerIndex = 0;
  renderPlayerBadges();
  showScreen(gameScreen);
  playSound('click');
});

function renderPlayerBadges() {
  let html = '';
  players.forEach((p, idx) => {
    html += `<div class="player-badge ${idx===activePlayerIndex ? 'active-player' : ''}" data-idx="${idx}">${p.avatar} ${p.name}</div>`;
  });
  playerListDiv.innerHTML = html;
}

function showScreen(screen) {
  [startScreen, gameScreen, choiceScreen, questionScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  if (screen === questionScreen) {
    confetti();
  }
}

let spinning = false;
spinBtn.addEventListener('click', () => {
  if (spinning) return;
  spinning = true;
  playSound('spin');
  const spinDuration = 2000;
  const startRot = 0;
  const targetRot = 720 + Math.floor(Math.random() * 720);
  const startTime = Date.now();
  
  function animateSpin() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentRot = startRot + targetRot * easeOut;
    bottle.style.transform = `rotate(${currentRot}deg)`;
    
    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      spinning = false;
      const randomIdx = Math.floor(Math.random() * players.length);
      activePlayerIndex = randomIdx;
      renderPlayerBadges();
      selectedMsg.innerText = `${players[activePlayerIndex].name} got selected!`;
      playSound('click');
      setTimeout(() => {
        selectedPlayerNameSpan.innerText = `${players[activePlayerIndex].avatar} ${players[activePlayerIndex].name}`;
        showScreen(choiceScreen);
      }, 400);
    }
  }
  requestAnimationFrame(animateSpin);
});

truthBtn.addEventListener('click', () => {
  currentQuestionType = 'truth';
  if (truthPool.length === 0) reshufflePools();
  currentQuestion = truthPool.pop();
  questionEmoji.innerText = '❤️';
  questionText.innerText = currentQuestion;
  showScreen(questionScreen);
  playSound('click');
});
dareBtn.addEventListener('click', () => {
  currentQuestionType = 'dare';
  if (darePool.length === 0) reshufflePools();
  currentQuestion = darePool.pop();
  questionEmoji.innerText = '🔥';
  questionText.innerText = currentQuestion;
  showScreen(questionScreen);
  playSound('click');
});

nextQuestion.addEventListener('click', () => {
  if (currentQuestionType === 'truth') {
    if (truthPool.length === 0) reshufflePools();
    currentQuestion = truthPool.pop();
    questionEmoji.innerText = '❤️';
  } else {
    if (darePool.length === 0) reshufflePools();
    currentQuestion = darePool.pop();
    questionEmoji.innerText = '🔥';
  }
  questionText.innerText = currentQuestion;
  confetti();
  playSound('click');
});
spinAgain.addEventListener('click', () => {
  showScreen(gameScreen);
  selectedMsg.innerText = '';
  playSound('click');
});

window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

showScreen(startScreen);
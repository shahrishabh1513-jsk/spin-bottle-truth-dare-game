// ============= STATE MANAGEMENT =============
let gameState = {
    players: [],
    currentRound: 0,
    currentPlayerIndex: 0,
    usedQuestions: [],
    mode: 'party',
    specialEventActive: false,
    chaosMode: false,
    gameLog: [],
    comboCounter: 0,
    isGameActive: false,
    currentQuestion: null,
    timerInterval: null,
    timeRemaining: 30,
    skipCount: 0,
    maxSkips: 3,
    isProcessing: false
};

// ============= DOM REFERENCES =============
const DOM = {
    // Splash
    splash: document.getElementById('splashScreen'),
    enterBtn: document.getElementById('enterGameBtn'),
    loader: document.querySelector('.loader-bar'),
    status: document.querySelector('.splash-status'),
    
    // Main
    container: document.getElementById('gameContainer'),
    
    // Menu
    mainMenu: document.getElementById('mainMenu'),
    playerCountDisplay: document.getElementById('playerCountDisplay'),
    playerCountHint: document.getElementById('playerCountHint'),
    playerNameInputs: document.getElementById('playerNameInputs'),
    botSelectors: document.getElementById('botSelectors'),
    startBtn: document.getElementById('startGameBtn'),
    modeIndicator: document.getElementById('gameModeIndicator'),
    decreaseBtn: document.getElementById('decreasePlayers'),
    increaseBtn: document.getElementById('increasePlayers'),
    
    // Game
    playArea: document.getElementById('gamePlayArea'),
    roundNumber: document.getElementById('roundNumber'),
    turnPlayer: document.getElementById('turnPlayer'),
    intensityFill: document.getElementById('intensityFill'),
    intensityValue: document.getElementById('intensityValue'),
    questionCategory: document.getElementById('questionCategory'),
    questionText: document.getElementById('questionText'),
    answerBtn: document.getElementById('answerBtn'),
    dareBtn: document.getElementById('dareBtn'),
    skipBtn: document.getElementById('skipBtn'),
    nextBtn: document.getElementById('nextBtn'),
    endBtn: document.getElementById('endGameBtn'),
    playersList: document.getElementById('playersList'),
    botReaction: document.getElementById('botReaction'),
    reactionAvatar: document.getElementById('reactionAvatar'),
    reactionText: document.getElementById('reactionText'),
    specialEvent: document.getElementById('specialEvent'),
    eventText: document.getElementById('eventText'),
    timerText: document.getElementById('timerText'),
    timerCircle: document.getElementById('timerCircle'),
    
    // Results
    results: document.getElementById('resultsScreen'),
    resultsStats: document.getElementById('resultsStats'),
    resultsPlayers: document.getElementById('resultsPlayers'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    menuBtn: document.getElementById('menuBtn'),
    
    // Modal
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalAction: document.getElementById('modalAction'),
    modalClose: document.getElementById('modalClose'),
    
    // Status
    statusText: document.getElementById('statusText'),
    statusDot: document.querySelector('.status-dot')
};

let playerCount = 2;
let playerNames = ['Player 1', 'Player 2'];
let botPersonalities = {};

// ============= SPLASH SCREEN =============
function initSplash() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            DOM.status.textContent = 'Ready to play! 🎮';
            DOM.enterBtn.classList.remove('hidden');
        }
        DOM.loader.style.width = progress + '%';
        if (progress < 30) DOM.status.textContent = 'Loading game engine...';
        else if (progress < 60) DOM.status.textContent = 'Generating questions...';
        else if (progress < 80) DOM.status.textContent = 'Setting up AI...';
        else DOM.status.textContent = 'Almost ready...';
    }, 200);
    
    // Particles
    const particlesContainer = document.getElementById('splashParticles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }
    
    DOM.enterBtn.addEventListener('click', () => {
        DOM.splash.classList.add('fade-out');
        setTimeout(() => {
            DOM.splash.style.display = 'none';
            DOM.container.classList.remove('hidden');
            initMenu();
        }, 800);
    });
}

// ============= MENU =============
function initMenu() {
    updatePlayerCount();
    setupPlayerNameInputs();
    setupBotSelectors();
    
    DOM.decreaseBtn.addEventListener('click', () => {
        if (playerCount > 1) {
            playerCount--;
            updatePlayerCount();
        }
    });
    
    DOM.increaseBtn.addEventListener('click', () => {
        if (playerCount < 6) {
            playerCount++;
            updatePlayerCount();
        }
    });
    
    DOM.startBtn.addEventListener('click', startGame);
}

function updatePlayerCount() {
    DOM.playerCountDisplay.textContent = playerCount;
    playerNames = [];
    for (let i = 0; i < playerCount; i++) {
        playerNames.push(`Player ${i + 1}`);
    }
    setupPlayerNameInputs();
    setupBotSelectors();
    
    // Update mode hint
    if (playerCount === 2) {
        DOM.playerCountHint.textContent = '2 Players • Couple Mode 💕';
        DOM.modeIndicator.innerHTML = '<span class="mode-badge couple-mode">💕 Couple Mode</span>';
        gameState.mode = 'couple';
    } else {
        DOM.playerCountHint.textContent = `${playerCount} Players • Party Mode 🎉`;
        DOM.modeIndicator.innerHTML = '<span class="mode-badge party-mode">🎉 Party Mode</span>';
        gameState.mode = 'party';
    }
}

function setupPlayerNameInputs() {
    DOM.playerNameInputs.innerHTML = '';
    for (let i = 0; i < playerCount; i++) {
        const row = document.createElement('div');
        row.className = 'name-input-row';
        row.innerHTML = `
            <label>P${i + 1}</label>
            <input type="text" value="${playerNames[i] || `Player ${i + 1}`}" 
                   data-index="${i}" placeholder="Enter name...">
            ${i >= 2 ? '<span class="bot-badge">🤖</span>' : ''}
        `;
        const input = row.querySelector('input');
        input.addEventListener('input', (e) => {
            playerNames[i] = e.target.value || `Player ${i + 1}`;
        });
        DOM.playerNameInputs.appendChild(row);
    }
}

function setupBotSelectors() {
    DOM.botSelectors.innerHTML = '';
    const personalities = ['Shy', 'Savage', 'Romantic', 'Chaotic', 'Funny'];
    const emojis = ['😊', '😈', '🥰', '🤪', '😂'];
    
    for (let i = 2; i < playerCount; i++) {
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-top: 4px;';
        container.innerHTML = `<span style="font-size: 13px; color: var(--text-secondary);">${playerNames[i] || `Player ${i+1}`}:</span>`;
        
        personalities.forEach((name, idx) => {
            const btn = document.createElement('button');
            btn.className = 'bot-selector';
            btn.dataset.player = i;
            btn.dataset.personality = name.toLowerCase();
            btn.textContent = `${emojis[idx]} ${name}`;
            if (idx === 0) btn.classList.add('active');
            btn.addEventListener('click', () => {
                container.querySelectorAll('.bot-selector').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                botPersonalities[i] = name.toLowerCase();
            });
            container.appendChild(btn);
        });
        DOM.botSelectors.appendChild(container);
        
        // Set default
        botPersonalities[i] = 'shy';
    }
}

// ============= GAME START =============
function startGame() {
    // Collect final names
    const inputs = DOM.playerNameInputs.querySelectorAll('input');
    inputs.forEach((input, index) => {
        playerNames[index] = input.value || `Player ${index + 1}`;
    });
    
    // Create players
    gameState.players = [];
    for (let i = 0; i < playerCount; i++) {
        const isBot = i >= 2;
        const personality = isBot ? (botPersonalities[i] || 'shy') : null;
        gameState.players.push({
            name: playerNames[i] || `Player ${i + 1}`,
            isBot: isBot,
            personality: personality,
            score: 0,
            isActive: true
        });
    }
    
    // Set mode
    gameState.mode = playerCount === 2 ? 'couple' : 'party';
    gameState.currentRound = 0;
    gameState.currentPlayerIndex = 0;
    gameState.usedQuestions = [];
    gameState.gameLog = [];
    gameState.isGameActive = true;
    gameState.skipCount = 0;
    gameState.isProcessing = false;
    
    // Hide menu, show game
    DOM.mainMenu.classList.add('hidden');
    DOM.playArea.classList.remove('hidden');
    DOM.results.classList.add('hidden');
    
    // Start first round
    nextRound();
}

// ============= GAME ROUNDS =============
function nextRound() {
    if (!gameState.isGameActive) return;
    
    gameState.currentRound++;
    DOM.roundNumber.textContent = gameState.currentRound;
    
    // Check if game should end
    if (gameState.currentRound > 30) {
        endGame();
        return;
    }
    
    // Update intensity
    const intensity = Math.min(Math.floor(gameState.currentRound / 2) + 1, 10);
    DOM.intensityFill.style.width = (intensity * 10) + '%';
    DOM.intensityValue.textContent = intensity;
    
    // Get next player
    if (gameState.specialEventActive) {
        // If special event handled, reset
        gameState.specialEventActive = false;
    } else {
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    }
    
    const player = gameState.players[gameState.currentPlayerIndex];
    DOM.turnPlayer.textContent = player.name;
    
    // Update players list
    updatePlayersList();
    
    // Select question
    selectQuestion();
    
    // Update status
    DOM.statusText.textContent = `${player.name}'s turn`;
    DOM.statusDot.className = 'status-dot playing';
    
    // Start timer
    startTimer();
}

function selectQuestion() {
    // Get weighted category
    const category = getWeightedCategory(
        gameState.currentRound, 
        gameState.players.length, 
        gameState.mode
    );
    
    // Get questions for this round
    let availableQuestions = getQuestionsByRound(gameState.currentRound)
        .filter(q => q.category === category || Math.random() < 0.3) // Some randomness
        .filter(q => !gameState.usedQuestions.includes(q.id));
    
    // If no questions available, get any question
    if (availableQuestions.length === 0) {
        availableQuestions = getRandomQuestion(gameState.usedQuestions);
        if (availableQuestions) availableQuestions = [availableQuestions];
    }
    
    if (availableQuestions.length === 0) {
        // If truly no questions, end game
        endGame();
        return;
    }
    
    // Pick random question
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    gameState.currentQuestion = question;
    gameState.usedQuestions.push(question.id);
    
    // Display question
    const categoryEmojis = {
        'cute': '🥰',
        'funny': '😂',
        'party': '🎉',
        'adventure': '🏔️',
        'friendship': '🤝',
        'romantic': '💕',
        'couple': '💑',
        'flirty': '😉',
        'embarrassing': '😳',
        'deep_talk': '🧠',
        'naughty': '😈',
        'dark_humor': '💀',
        'relationship': '💞',
        'ice_breaker': '❄️',
        'spicy': '🌶️'
    };
    
    const emoji = categoryEmojis[question.category] || '🎯';
    const categoryName = question.category.replace('_', ' ').toUpperCase();
    DOM.questionCategory.textContent = `${emoji} ${categoryName}`;
    DOM.questionText.textContent = question.text;
    
    // Show/hide buttons based on question type
    if (question.isDare) {
        DOM.dareBtn.style.display = 'none';
        DOM.answerBtn.textContent = '⚡ Accept Dare';
    } else {
        DOM.dareBtn.style.display = 'inline-block';
        DOM.answerBtn.textContent = '💬 Answer';
    }
    
    // Check for special event
    const event = triggerSpecialEvent();
    if (event && gameState.currentRound > 3) {
        showSpecialEvent(event);
    }
    
    // Bot reaction if bot's turn
    const player = gameState.players[gameState.currentPlayerIndex];
    if (player.isBot) {
        setTimeout(() => {
            handleBotTurn(player);
        }, 1500);
    } else {
        // Hide bot reaction for human
        DOM.botReaction.classList.add('hidden');
    }
}

function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timeRemaining = 30;
    DOM.timerText.textContent = '30';
    
    const circumference = 2 * Math.PI * 54;
    DOM.timerCircle.style.strokeDasharray = circumference;
    DOM.timerCircle.style.strokeDashoffset = 0;
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        DOM.timerText.textContent = gameState.timeRemaining;
        
        const progress = gameState.timeRemaining / 30;
        const offset = circumference * (1 - progress);
        DOM.timerCircle.style.strokeDashoffset = offset;
        
        if (gameState.timeRemaining <= 5) {
            DOM.timerCircle.style.stroke = '#FF6B6B';
        } else {
            DOM.timerCircle.style.stroke = '#6C3CE1';
        }
        
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            // Auto-skip if no answer
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    if (gameState.isProcessing) return;
    gameState.isProcessing = true;
    
    const player = gameState.players[gameState.currentPlayerIndex];
    showModal('⏰ Time\'s Up!', `${player.name} ran out of time! Moving to next player.`);
    
    setTimeout(() => {
        closeModal();
        gameState.isProcessing = false;
        nextRound();
    }, 2000);
}

// ============= PLAYER ACTIONS =============
function handleAnswer() {
    if (gameState.isProcessing) return;
    const player = gameState.players[gameState.currentPlayerIndex];
    if (player.isBot) return;
    
    gameState.isProcessing = true;
    clearInterval(gameState.timerInterval);
    
    const question = gameState.currentQuestion;
    if (question.isDare) {
        // Handle dare
        player.score += 2;
        showModal('⚡ Dare Accepted!', `${player.name} accepted the dare and gained 2 points!`);
        addLog(`${player.name} accepted a dare: ${question.text}`);
    } else {
        player.score += 1;
        showModal('💬 Answered!', `${player.name} answered the question and gained 1 point!`);
        addLog(`${player.name} answered: ${question.text}`);
    }
    
    updatePlayersList();
    
    setTimeout(() => {
        closeModal();
        gameState.isProcessing = false;
        nextRound();
    }, 2000);
}

function handleDare() {
    if (gameState.isProcessing) return;
    const player = gameState.players[gameState.currentPlayerIndex];
    if (player.isBot) return;
    
    gameState.isProcessing = true;
    clearInterval(gameState.timerInterval);
    
    // Find a dare question
    const dareQuestions = getQuestionsByRound(gameState.currentRound)
        .filter(q => q.isDare && !gameState.usedQuestions.includes(q.id));
    
    if (dareQuestions.length > 0) {
        const dare = dareQuestions[Math.floor(Math.random() * dareQuestions.length)];
        gameState.usedQuestions.push(dare.id);
        gameState.currentQuestion = dare;
        DOM.questionText.textContent = dare.text;
        DOM.questionCategory.textContent = '⚡ DARE';
        DOM.answerBtn.textContent = '⚡ Accept Dare';
        DOM.dareBtn.style.display = 'none';
        
        showModal('⚡ New Dare!', `A new dare has been issued for ${player.name}!`);
        
        setTimeout(() => {
            closeModal();
            gameState.isProcessing = false;
            // Let them answer the dare
        }, 1500);
    } else {
        showModal('😅 No Dares Available', 'There are no dares available right now. Try answering the question!');
        setTimeout(() => {
            closeModal();
            gameState.isProcessing = false;
        }, 1500);
    }
}

function handleSkip() {
    if (gameState.isProcessing) return;
    const player = gameState.players[gameState.currentPlayerIndex];
    if (player.isBot) return;
    
    gameState.skipCount++;
    if (gameState.skipCount >= gameState.maxSkips) {
        showModal('🚫 No More Skips!', 'You\'ve used all your skips! You must answer or accept a dare.');
        setTimeout(() => {
            closeModal();
        }, 2000);
        return;
    }
    
    gameState.isProcessing = true;
    clearInterval(gameState.timerInterval);
    
    player.score -= 1;
    showModal('⏭️ Skipped!', `${player.name} skipped the question. -1 point! (${gameState.skipCount}/${gameState.maxSkips} skips used)`);
    addLog(`${player.name} skipped a question`);
    
    updatePlayersList();
    
    setTimeout(() => {
        closeModal();
        gameState.isProcessing = false;
        nextRound();
    }, 2000);
}

// ============= BOT AI =============
function handleBotTurn(player) {
    if (!gameState.isGameActive) return;
    if (!player.isBot) return;
    
    clearInterval(gameState.timerInterval);
    gameState.isProcessing = true;
    
    // Show bot reaction
    const question = gameState.currentQuestion;
    const reaction = getBotReaction(player.personality, question);
    DOM.botReaction.classList.remove('hidden');
    DOM.reactionAvatar.textContent = getBotAvatar(player.personality);
    DOM.reactionText.textContent = `"${reaction}"`;
    
    // Bot decision making based on personality
    setTimeout(() => {
        const decision = makeBotDecision(player, question);
        
        if (decision === 'answer') {
            player.score += question.isDare ? 2 : 1;
            addLog(`${player.name} (bot) answered: ${question.text}`);
            showBotAction(player, 'answered the question! ✅');
        } else if (decision === 'dare') {
            player.score += 2;
            addLog(`${player.name} (bot) accepted a dare`);
            showBotAction(player, 'accepted the dare! ⚡');
        } else if (decision === 'skip') {
            player.score -= 1;
            addLog(`${player.name} (bot) skipped`);
            showBotAction(player, 'skipped the question. ⏭️');
        }
        
        updatePlayersList();
        
        setTimeout(() => {
            DOM.botReaction.classList.add('hidden');
            gameState.isProcessing = false;
            nextRound();
        }, 2000);
    }, 1500);
}

function makeBotDecision(player, question) {
    const personality = player.personality || 'shy';
    const intensity = Math.min(Math.floor(gameState.currentRound / 2) + 1, 10);
    
    // Base probabilities
    let answerProb = 0.5;
    let dareProb = 0.2;
    let skipProb = 0.3;
    
    // Adjust based on personality
    switch(personality) {
        case 'savage':
            answerProb = 0.6;
            dareProb = 0.3;
            skipProb = 0.1;
            break;
        case 'shy':
            answerProb = 0.4;
            dareProb = 0.1;
            skipProb = 0.5;
            break;
        case 'romantic':
            answerProb = 0.7;
            dareProb = 0.1;
            skipProb = 0.2;
            break;
        case 'chaotic':
            answerProb = 0.3;
            dareProb = 0.5;
            skipProb = 0.2;
            break;
        case 'funny':
            answerProb = 0.5;
            dareProb = 0.25;
            skipProb = 0.25;
            break;
    }
    
    // Adjust for question type
    if (question.isDare) {
        answerProb = 0;
        dareProb = 0.7;
        skipProb = 0.3;
    }
    
    // Adjust for intensity
    if (intensity > 7) {
        skipProb += 0.2;
        answerProb -= 0.1;
        dareProb -= 0.1;
    }
    
    // If it's a spicy/naughty question, adjust based on personality
    if (question.category === 'naughty' || question.category === 'spicy') {
        if (personality === 'shy') {
            skipProb += 0.3;
            answerProb -= 0.2;
        } else if (personality === 'savage' || personality === 'chaotic') {
            dareProb += 0.3;
            answerProb += 0.1;
        }
    }
    
    // Normalize
    const total = answerProb + dareProb + skipProb;
    const rand = Math.random() * total;
    
    if (rand < answerProb) return 'answer';
    if (rand < answerProb + dareProb) return 'dare';
    return 'skip';
}

function getBotAvatar(personality) {
    const avatars = {
        'shy': '😊',
        'savage': '😈',
        'romantic': '🥰',
        'chaotic': '🤪',
        'funny': '😂'
    };
    return avatars[personality] || '🤖';
}

function showBotAction(player, action) {
    DOM.botReaction.classList.remove('hidden');
    DOM.reactionAvatar.textContent = getBotAvatar(player.personality);
    DOM.reactionText.textContent = `🤖 ${player.name} ${action}`;
}

// ============= SPECIAL EVENTS =============
function showSpecialEvent(event) {
    DOM.specialEvent.classList.remove('hidden');
    DOM.eventText.textContent = `${event.icon} ${event.text}`;
    gameState.specialEventActive = true;
    
    // Handle event types
    switch(event.type) {
        case 'DOUBLE_DARE':
            // Current player does two dares - handled by doubling next question
            showModal('⚡⚡ DOUBLE DARE!', 'You must perform two dares this turn!');
            setTimeout(closeModal, 2000);
            break;
            
        case 'STEAL_TURN':
            // Choose another player - for simplicity, we'll auto-select next player
            const nextIdx = (gameState.currentPlayerIndex + 1) % gameState.players.length;
            gameState.currentPlayerIndex = nextIdx;
            showModal('🎯 STEAL TURN!', `${gameState.players[nextIdx].name} will answer instead!`);
            setTimeout(closeModal, 2000);
            break;
            
        case 'GROUP_TRUTH':
            showModal('💬 GROUP TRUTH!', 'Everyone answers this question!');
            // Everyone gets points
            gameState.players.forEach(p => p.score += 1);
            updatePlayersList();
            setTimeout(closeModal, 2000);
            break;
            
        case 'SPIN_AGAIN':
            showModal('🔄 SPIN AGAIN!', 'You get another question!');
            setTimeout(() => {
                closeModal();
                // Get another question
                const q = getRandomQuestion(gameState.usedQuestions);
                if (q) {
                    gameState.currentQuestion = q;
                    gameState.usedQuestions.push(q.id);
                    DOM.questionText.textContent = q.text;
                }
            }, 1500);
            break;
            
        case 'CHAOS_MODE':
            gameState.chaosMode = true;
            showModal('💀 CHAOS MODE ACTIVATED!', 'A random player gets an extreme question!');
            // Pick random player
            const randomIdx = Math.floor(Math.random() * gameState.players.length);
            gameState.currentPlayerIndex = randomIdx;
            // Get extreme question
            const extremeQ = getQuestionsByRound(21).filter(q => !gameState.usedQuestions.includes(q.id));
            if (extremeQ.length > 0) {
                const q = extremeQ[Math.floor(Math.random() * extremeQ.length)];
                gameState.currentQuestion = q;
                gameState.usedQuestions.push(q.id);
                DOM.questionText.textContent = q.text;
                DOM.questionCategory.textContent = '💀 EXTREME';
            }
            setTimeout(closeModal, 2000);
            break;
            
        case 'SWAP_CHALLENGE':
            showModal('🔄 SWAP CHALLENGE!', 'Exchange your dare with another player!');
            // Swap with random player
            const swapIdx = (gameState.currentPlayerIndex + 1) % gameState.players.length;
            const temp = gameState.players[gameState.currentPlayerIndex];
            gameState.players[gameState.currentPlayerIndex] = gameState.players[swapIdx];
            gameState.players[swapIdx] = temp;
            updatePlayersList();
            setTimeout(closeModal, 2000);
            break;
    }
    
    // Hide after 3 seconds if not already handled
    setTimeout(() => {
        DOM.specialEvent.classList.add('hidden');
    }, 3000);
}

// ============= UI UPDATES =============
function updatePlayersList() {
    DOM.playersList.innerHTML = '';
    gameState.players.forEach((player, index) => {
        const badge = document.createElement('div');
        badge.className = 'player-badge';
        if (index === gameState.currentPlayerIndex && gameState.isGameActive) {
            badge.classList.add('active');
        }
        
        const avatar = player.isBot ? getBotAvatar(player.personality) : '👤';
        const nameDisplay = player.isBot ? `🤖 ${player.name}` : player.name;
        
        badge.innerHTML = `
            <span class="avatar">${avatar}</span>
            <span class="name">${nameDisplay}</span>
            <span class="score">⭐ ${player.score}</span>
        `;
        DOM.playersList.appendChild(badge);
    });
}

function addLog(message) {
    gameState.gameLog.push(message);
    console.log('[Game Log]', message);
}

// ============= MODAL =============
function showModal(title, body) {
    DOM.modalTitle.textContent = title;
    DOM.modalBody.textContent = body;
    DOM.modal.classList.remove('hidden');
}

function closeModal() {
    DOM.modal.classList.add('hidden');
}

// ============= END GAME =============
function endGame() {
    gameState.isGameActive = false;
    clearInterval(gameState.timerInterval);
    
    DOM.playArea.classList.add('hidden');
    DOM.results.classList.remove('hidden');
    
    // Sort players by score
    const sorted = [...gameState.players].sort((a, b) => b.score - a.score);
    
    // Stats
    DOM.resultsStats.innerHTML = `
        <div class="stat-card">
            <div class="number">${gameState.currentRound}</div>
            <div class="label">Rounds</div>
        </div>
        <div class="stat-card">
            <div class="number">${gameState.players.length}</div>
            <div class="label">Players</div>
        </div>
        <div class="stat-card">
            <div class="number">${sorted[0].score}</div>
            <div class="label">Highest Score</div>
        </div>
        <div class="stat-card">
            <div class="number">${gameState.mode === 'couple' ? '💕' : '🎉'}</div>
            <div class="label">${gameState.mode === 'couple' ? 'Couple' : 'Party'} Mode</div>
        </div>
    `;
    
    // Players
    DOM.resultsPlayers.innerHTML = '';
    sorted.forEach((player, index) => {
        const div = document.createElement('div');
        div.className = 'result-player';
        const medals = ['🥇', '🥈', '🥉'];
        const rank = index < 3 ? medals[index] : `#${index + 1}`;
        const avatar = player.isBot ? getBotAvatar(player.personality) : '👤';
        div.innerHTML = `
            <span class="rank">${rank}</span>
            <span class="avatar">${avatar}</span>
            <span class="name">${player.name}</span>
            <span class="score">⭐ ${player.score}</span>
        `;
        DOM.resultsPlayers.appendChild(div);
    });
    
    DOM.statusText.textContent = 'Game Over!';
    DOM.statusDot.className = 'status-dot waiting';
}

// ============= EVENT LISTENERS =============
DOM.answerBtn.addEventListener('click', handleAnswer);
DOM.dareBtn.addEventListener('click', handleDare);
DOM.skipBtn.addEventListener('click', handleSkip);

DOM.nextBtn.addEventListener('click', () => {
    if (!gameState.isProcessing) {
        nextRound();
    }
});

DOM.endBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to end the game?')) {
        endGame();
    }
});

DOM.playAgainBtn.addEventListener('click', () => {
    DOM.results.classList.add('hidden');
    DOM.playArea.classList.add('hidden');
    DOM.mainMenu.classList.remove('hidden');
    initMenu();
});

DOM.menuBtn.addEventListener('click', () => {
    DOM.results.classList.add('hidden');
    DOM.playArea.classList.add('hidden');
    DOM.mainMenu.classList.remove('hidden');
    initMenu();
});

// Modal close
DOM.modalClose.addEventListener('click', closeModal);
DOM.modalAction.addEventListener('click', closeModal);
DOM.modal.addEventListener('click', (e) => {
    if (e.target === DOM.modal) closeModal();
});

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    if (e.key === '1') handleAnswer();
    if (e.key === '2') handleDare();
    if (e.key === '3') handleSkip();
    if (e.key === 'Enter') {
        if (!DOM.modal.classList.contains('hidden')) closeModal();
    }
    if (e.key === ' ' && !DOM.modal.classList.contains('hidden')) {
        e.preventDefault();
        closeModal();
    }
});

// ============= INIT =============
document.addEventListener('DOMContentLoaded', () => {
    initSplash();
});

console.log('🎮 Game Intelligence System loaded!');
console.log(`📚 ${QUESTION_POOL.length} questions loaded`);
console.log('🎯 Ready to play!');
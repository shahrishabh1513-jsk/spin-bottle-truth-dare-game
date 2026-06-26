// ============= CATEGORIES =============
const Categories = {
    CUTE: 'cute',
    FUNNY: 'funny',
    PARTY: 'party',
    ADVENTURE: 'adventure',
    FRIENDSHIP: 'friendship',
    ROMANTIC: 'romantic',
    COUPLE: 'couple',
    FLIRTY: 'flirty',
    EMBARRASSING: 'embarrassing',
    DEEP_TALK: 'deep_talk',
    NAUGHTY: 'naughty',
    DARK_HUMOR: 'dark_humor',
    RELATIONSHIP: 'relationship',
    ICE_BREAKER: 'ice_breaker',
    SPICY: 'spicy'
};

// ============= QUESTION POOL =============
const QUESTION_POOL = [];

// ---- ROUND 1-5: Cute, Funny, Ice Breaker ----
const earlyQuestions = [
    // Ice Breakers
    { text: "What's your favorite childhood memory?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "If you could have any superpower, what would it be?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's the most embarrassing thing you've done in public?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 3 },
    { text: "If you could travel anywhere right now, where would you go?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's your go-to karaoke song?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's the weirdest food you've ever eaten?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What movie makes you cry every time?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 3 },
    { text: "If you were an animal, what would you be?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 1 },
    { text: "What's your most used emoji?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 1 },
    { text: "What's the worst advice you've ever received?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's the first thing you notice about someone?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's your spirit animal?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 1 },
    { text: "What would you do if you won the lottery?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's the best concert you've ever been to?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 2 },
    { text: "What's your favorite smell?", category: Categories.ICE_BREAKER, roundRange: [1, 5], intensity: 1 },
    
    // Cute Questions
    { text: "What always makes you smile no matter what?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's your favorite way to relax after a long day?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's the cutest thing you've ever seen?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's your favorite comfort food?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "If you could have any pet, what would it be?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's the best gift you've ever received?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    { text: "What's your favorite season and why?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's the most beautiful place you've visited?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    { text: "What's your favorite childhood cartoon?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What makes you feel cozy?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's your favorite board game?", category: Categories.CUTE, roundRange: [1, 5], intensity: 1 },
    { text: "What's the best compliment you've ever received?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    { text: "What's your dream vacation?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    { text: "What makes you feel loved?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    { text: "What's your favorite memory with a friend?", category: Categories.CUTE, roundRange: [1, 5], intensity: 2 },
    
    // Funny Questions
    { text: "What's the funniest thing that's happened to you this year?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's your worst pickup line?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's the most useless talent you have?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's the worst date you've ever been on?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 3 },
    { text: "What's a food combination you love that others hate?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's the most ridiculous thing you've ever bought?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's your funniest childhood story?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's the worst fashion trend you've followed?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's the strangest dream you've had?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
    { text: "What's your guilty pleasure TV show?", category: Categories.FUNNY, roundRange: [1, 5], intensity: 2 },
];

// ---- ROUND 6-10: More Personal and Embarrassing ----
const midQuestions = [
    // Embarrassing
    { text: "What's the most embarrassing thing in your search history?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 5 },
    { text: "What's a secret you've never told anyone?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 6 },
    { text: "What's the most embarrassing thing you've done drunk?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 5 },
    { text: "What's something you pretend to understand but don't?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 4 },
    { text: "What's your most embarrassing celebrity crush?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 4 },
    { text: "What's the worst thing you've said to someone?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 6 },
    { text: "What's something you've lied about?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 5 },
    { text: "What's your most embarrassing school memory?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 4 },
    { text: "What's something you're secretly bad at?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 4 },
    { text: "What's the most embarrassing thing you've posted online?", category: Categories.EMBARRASSING, roundRange: [6, 10], intensity: 5 },
    
    // Friendship
    { text: "Who's the most important person in your life right now?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 4 },
    { text: "What's the best advice a friend has given you?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 4 },
    { text: "What's the hardest thing about being a good friend?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 5 },
    { text: "What's your favorite memory with your best friend?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 4 },
    { text: "What's something you're grateful for about your friends?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 4 },
    { text: "What's the longest friendship you've had?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 3 },
    { text: "What's a lesson you've learned from a friendship?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 4 },
    { text: "What's something you'd do for a friend that you'd never do for yourself?", category: Categories.FRIENDSHIP, roundRange: [6, 10], intensity: 5 },
    
    // Deep Talk
    { text: "What's your biggest fear?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 5 },
    { text: "What's something you wish you could change about your past?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 6 },
    { text: "What's your definition of a good life?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 4 },
    { text: "What's the most important lesson you've learned?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 5 },
    { text: "What's something you're still trying to forgive yourself for?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 7 },
    { text: "What's your biggest regret?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 6 },
    { text: "What's something you believe that others find strange?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 5 },
    { text: "What's the meaning of success to you?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 4 },
    { text: "What's something you'd tell your younger self?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 5 },
    { text: "What's the best thing about being alive right now?", category: Categories.DEEP_TALK, roundRange: [6, 10], intensity: 4 },
];

// ---- ROUND 11-15: Romantic, Flirty, Challenging ----
const lateQuestions = [
    // Romantic
    { text: "What's your idea of a perfect date?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 4 },
    { text: "What's something that makes you feel truly loved?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 5 },
    { text: "What's the most romantic thing anyone has ever done for you?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 5 },
    { text: "What's your love language?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 4 },
    { text: "What's something you find attractive that most people don't?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 5 },
    { text: "What's your favorite part of being in love?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 6 },
    { text: "What's the most romantic thing you'd do for someone?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 5 },
    { text: "What's your love story dream?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 5 },
    { text: "What's something you'd want to do with a partner that's on your bucket list?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 6 },
    { text: "What's the most meaningful relationship you've had?", category: Categories.ROMANTIC, roundRange: [11, 15], intensity: 7 },
    
    // Flirty
    { text: "What's your flirting style?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 6 },
    { text: "What's the most attractive quality in a person?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 5 },
    { text: "What's your biggest turn-on?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 7 },
    { text: "What's your best flirting tip?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 6 },
    { text: "What's something that makes you blush?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 6 },
    { text: "What's the boldest thing you've said to someone?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 7 },
    { text: "What's the sexiest thing someone can say to you?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 8 },
    { text: "What's your favorite physical feature on someone?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 6 },
    { text: "What's something unexpected that you find attractive?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 6 },
    { text: "What's the most seductive thing you've done?", category: Categories.FLIRTY, roundRange: [11, 15], intensity: 7 },
    
    // Couple-specific (only used in couple mode)
    { text: "What's the best thing about your partner?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's a memory with your partner that you'll never forget?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's something you wish your partner knew about you?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 6 },
    { text: "What's your favorite quality in your partner?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 4 },
    { text: "What's a fun date you want to go on with your partner?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's the most romantic thing your partner has done for you?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's something you want to do together in the future?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's the best thing about being in this relationship?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's something you're excited about for your future together?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
    { text: "What's the most supportive thing your partner has done for you?", category: Categories.COUPLE, roundRange: [11, 15], intensity: 5 },
];

// ---- ROUND 16-20: Naughty and Spicy ----
const spicyQuestions = [
    // Naughty
    { text: "What's your wildest fantasy?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    { text: "What's something naughty you'd do if nobody was watching?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    { text: "What's the most risqué thing you've ever worn?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 7 },
    { text: "What's your guilty pleasure that's a little naughty?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 7 },
    { text: "What's something you'd like to try in the bedroom?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 9 },
    { text: "What's the most spontaneous sexual thing you've done?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    { text: "What's a secret you'd never want your parents to know?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 7 },
    { text: "What's the naughtiest text you've ever sent?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    { text: "What's your favorite kind of foreplay?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    { text: "What's something you've always wanted to do but haven't had the chance?", category: Categories.NAUGHTY, roundRange: [16, 20], intensity: 8 },
    
    // Spicy
    { text: "What's your biggest turn-off?", category: Categories.SPICY, roundRange: [16, 20], intensity: 8 },
    { text: "What's the most adventurous place you've had sex?", category: Categories.SPICY, roundRange: [16, 20], intensity: 9 },
    { text: "What's your favorite position?", category: Categories.SPICY, roundRange: [16, 20], intensity: 9 },
    { text: "What's something you'd like to do that's outside your comfort zone?", category: Categories.SPICY, roundRange: [16, 20], intensity: 8 },
    { text: "What's the sexiest thing you own?", category: Categories.SPICY, roundRange: [16, 20], intensity: 8 },
    { text: "What's your favorite way to be seduced?", category: Categories.SPICY, roundRange: [16, 20], intensity: 8 },
    { text: "What's something you've never told a partner?", category: Categories.SPICY, roundRange: [16, 20], intensity: 9 },
    { text: "What's the most intense sexual experience you've had?", category: Categories.SPICY, roundRange: [16, 20], intensity: 9 },
    { text: "What's your favorite type of kiss?", category: Categories.SPICY, roundRange: [16, 20], intensity: 7 },
    { text: "What's something you'd want to do with a partner that's on your bucket list?", category: Categories.SPICY, roundRange: [16, 20], intensity: 8 },
];

// ---- ROUND 21+: Dark Humor, Risky Dares, Extreme ----
const extremeQuestions = [
    // Dark Humor
    { text: "What's the darkest joke you know?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's the worst thing you've laughed at?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's a dark secret you'd never share?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 10 },
    { text: "What's something morbid you've thought about?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's the darkest thing about your sense of humor?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's something you'd never joke about?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 8 },
    { text: "What's the worst thing you've said in anger?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's the most morbid thought you've had?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 10 },
    { text: "What's something that makes you laugh that shouldn't?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 9 },
    { text: "What's your darkest fantasy?", category: Categories.DARK_HUMOR, roundRange: [21, 30], intensity: 10 },
    
    // Extreme Dares (Not actual questions, but dares)
    { text: "DARE: Do your best impression of the person to your left", category: Categories.PARTY, roundRange: [21, 30], intensity: 9, isDare: true },
    { text: "DARE: Dance like nobody's watching for 30 seconds", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
    { text: "DARE: Speak in an accent for the next 3 rounds", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
    { text: "DARE: Do 20 pushups right now", category: Categories.PARTY, roundRange: [21, 30], intensity: 7, isDare: true },
    { text: "DARE: Sing the chorus of your favorite song loudly", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
    { text: "DARE: Tell the funniest joke you know", category: Categories.PARTY, roundRange: [21, 30], intensity: 7, isDare: true },
    { text: "DARE: Do a dramatic reading of the last text you sent", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
    { text: "DARE: Act like a robot for 1 minute", category: Categories.PARTY, roundRange: [21, 30], intensity: 7, isDare: true },
    { text: "DARE: Speak only in questions for the next 2 rounds", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
    { text: "DARE: Imitate someone in the room without them knowing", category: Categories.PARTY, roundRange: [21, 30], intensity: 8, isDare: true },
];

// Combine all questions
const allQuestions = [...earlyQuestions, ...midQuestions, ...lateQuestions, ...spicyQuestions, ...extremeQuestions];

// Add unique IDs
allQuestions.forEach((q, index) => {
    q.id = index;
});

QUESTION_POOL.push(...allQuestions);

// ============= BOT REACTIONS =============
const BOT_REACTIONS = {
    [BotPersonality?.SHY || 'shy']: [
        "Nope, I'm definitely not doing that.",
        "Oh no... this is too much.",
        "I'm blushing so hard right now.",
        "Can I pass? Please?",
        "I need a minute to process that.",
        "That's... a lot.",
        "I'm going to pretend I didn't hear that.",
        "Let me think about it... no.",
        "I'm too shy for this game.",
        "Why is this game so mean?"
    ],
    [BotPersonality?.SAVAGE || 'savage']: [
        "Easy challenge. Next.",
        "That's cute. You think that's daring?",
        "I've done worse. Much worse.",
        "Hold my drink.",
        "Is that all you got?",
        "Amateur hour over here.",
        "I was born ready for this.",
        "Too easy. Make it harder.",
        "You call that naughty?",
        "I'm the master of this game."
    ],
    [BotPersonality?.ROMANTIC || 'romantic']: [
        "That's beautiful... 🥰",
        "I'm such a hopeless romantic.",
        "This game gets me.",
        "I could answer that all day.",
        "Love is the answer to everything.",
        "My heart is melting.",
        "That's the sweetest thing.",
        "I'm a believer in true love.",
        "This question was made for me.",
        "Romance is everything."
    ],
    [BotPersonality?.CHAOTIC || 'chaotic']: [
        "CHAOS MODE ACTIVATED!",
        "I'm going to wreck this game.",
        "Rules? What rules?",
        "This is getting interesting...",
        "I'm the wild card, baby!",
        "Nobody knows what I'm going to do.",
        "Let's make this interesting.",
        "I'm unpredictable. Deal with it.",
        "Time to cause some trouble.",
        "The game is too calm. Let me fix that."
    ],
    [BotPersonality?.FUNNY || 'funny']: [
        "That's hilarious! 😂",
        "I'm laughing so hard right now.",
        "That's the funniest thing I've heard.",
        "I can't breathe!",
        "This game is too funny.",
        "I'm dying over here.",
        "That's comedy gold.",
        "I'm the funniest bot around.",
        "That's a good one. But not as good as mine.",
        "I'm going to need a minute to recover."
    ]
};

// Default reactions for any bot
const DEFAULT_BOT_REACTIONS = [
    "Interesting question...",
    "I need to think about this one.",
    "That's a good question.",
    "I'm not sure how to answer that.",
    "That's deep.",
    "Hmm... let me think.",
    "I'm not sure about that one.",
    "That's tough.",
    "I'm going to be honest about this.",
    "Okay, that's a good one."
];

// ============= SPECIAL EVENTS =============
const SPECIAL_EVENTS = [
    { type: 'DOUBLE_DARE', text: 'Double Dare! You must perform two dares!', icon: '⚡⚡' },
    { type: 'STEAL_TURN', text: 'Steal Turn! Choose another player to answer!', icon: '🎯' },
    { type: 'GROUP_TRUTH', text: 'Group Truth! Everyone answers this question!', icon: '💬' },
    { type: 'SPIN_AGAIN', text: 'Spin Again! You get another question!', icon: '🔄' },
    { type: 'CHAOS_MODE', text: 'Chaos Mode Activated! Random player gets an extreme question!', icon: '💀' },
    { type: 'SWAP_CHALLENGE', text: 'Swap Challenge! Exchange your dare with another player!', icon: '🔄' }
];

// ============= WEIGHTED CATEGORIES =============
const CATEGORY_WEIGHTS = {
    [Categories.CUTE]: 0.20,
    [Categories.FUNNY]: 0.20,
    [Categories.EMBARRASSING]: 0.15,
    [Categories.ROMANTIC]: 0.10,
    [Categories.FLIRTY]: 0.10,
    [Categories.DEEP_TALK]: 0.10,
    [Categories.NAUGHTY]: 0.10,
    [Categories.DARK_HUMOR]: 0.05,
    [Categories.ICE_BREAKER]: 0.10,
    [Categories.PARTY]: 0.08,
    [Categories.ADVENTURE]: 0.05,
    [Categories.FRIENDSHIP]: 0.05,
    [Categories.COUPLE]: 0.05,
    [Categories.RELATIONSHIP]: 0.05,
    [Categories.SPICY]: 0.07
};

// ============= HELPER FUNCTIONS =============
function getQuestionsByRound(round) {
    return QUESTION_POOL.filter(q => {
        const [min, max] = q.roundRange;
        return round >= min && round <= max;
    });
}

function getQuestionsByCategory(category) {
    return QUESTION_POOL.filter(q => q.category === category);
}

function getRandomQuestion(excludeIds = []) {
    const available = QUESTION_POOL.filter(q => !excludeIds.includes(q.id));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
}

function getWeightedCategory(round, playerCount, mode) {
    let weights = { ...CATEGORY_WEIGHTS };
    
    // Adjust for game mode
    if (mode === 'couple') {
        weights[Categories.ROMANTIC] += 0.15;
        weights[Categories.FLIRTY] += 0.10;
        weights[Categories.DEEP_TALK] += 0.05;
        weights[Categories.RELATIONSHIP] += 0.05;
        weights[Categories.COUPLE] += 0.10;
        weights[Categories.CUTE] += 0.05;
        // Reduce party and funny
        weights[Categories.PARTY] = Math.max(0, weights[Categories.PARTY] - 0.05);
        weights[Categories.FUNNY] = Math.max(0, weights[Categories.FUNNY] - 0.05);
    } else if (mode === 'party') {
        weights[Categories.PARTY] += 0.10;
        weights[Categories.FUNNY] += 0.05;
        weights[Categories.EMBARRASSING] += 0.05;
        weights[Categories.ADVENTURE] += 0.05;
        // Reduce romantic and couple
        weights[Categories.ROMANTIC] = Math.max(0, weights[Categories.ROMANTIC] - 0.05);
        weights[Categories.COUPLE] = 0;
        weights[Categories.RELATIONSHIP] = Math.max(0, weights[Categories.RELATIONSHIP] - 0.03);
    }
    
    // Adjust for round progression
    if (round >= 1 && round <= 5) {
        weights[Categories.CUTE] += 0.10;
        weights[Categories.ICE_BREAKER] += 0.10;
        weights[Categories.FUNNY] += 0.05;
        weights[Categories.NAUGHTY] = Math.max(0, weights[Categories.NAUGHTY] - 0.05);
        weights[Categories.SPICY] = Math.max(0, weights[Categories.SPICY] - 0.05);
    } else if (round >= 6 && round <= 10) {
        weights[Categories.EMBARRASSING] += 0.10;
        weights[Categories.DEEP_TALK] += 0.05;
        weights[Categories.FRIENDSHIP] += 0.05;
    } else if (round >= 11 && round <= 15) {
        weights[Categories.ROMANTIC] += 0.10;
        weights[Categories.FLIRTY] += 0.10;
        weights[Categories.RELATIONSHIP] += 0.05;
    } else if (round >= 16 && round <= 20) {
        weights[Categories.NAUGHTY] += 0.15;
        weights[Categories.SPICY] += 0.10;
        weights[Categories.FLIRTY] += 0.05;
    } else if (round >= 21) {
        weights[Categories.DARK_HUMOR] += 0.20;
        weights[Categories.NAUGHTY] += 0.10;
        weights[Categories.SPICY] += 0.05;
        weights[Categories.PARTY] += 0.10;
    }
    
    // Normalize weights
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    const normalized = {};
    for (const [key, value] of Object.entries(weights)) {
        normalized[key] = value / total;
    }
    
    // Select category based on weights
    const rand = Math.random();
    let cumulative = 0;
    for (const [category, weight] of Object.entries(normalized)) {
        cumulative += weight;
        if (rand <= cumulative) {
            return category;
        }
    }
    return Object.keys(normalized)[0];
}

function getBotReaction(personality, question) {
    const reactions = BOT_REACTIONS[personality] || DEFAULT_BOT_REACTIONS;
    return reactions[Math.floor(Math.random() * reactions.length)];
}

function triggerSpecialEvent() {
    if (Math.random() < 0.15) { // 15% chance
        return SPECIAL_EVENTS[Math.floor(Math.random() * SPECIAL_EVENTS.length)];
    }
    return null;
}

// Export for use in script.js
window.QUESTION_POOL = QUESTION_POOL;
window.Categories = Categories;
window.CATEGORY_WEIGHTS = CATEGORY_WEIGHTS;
window.BOT_REACTIONS = BOT_REACTIONS;
window.SPECIAL_EVENTS = SPECIAL_EVENTS;
window.getQuestionsByRound = getQuestionsByRound;
window.getQuestionsByCategory = getQuestionsByCategory;
window.getRandomQuestion = getRandomQuestion;
window.getWeightedCategory = getWeightedCategory;
window.getBotReaction = getBotReaction;
window.triggerSpecialEvent = triggerSpecialEvent;
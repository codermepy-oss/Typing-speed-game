// --- CONFIGURATION & DATA ---
const typingLibrary = [
    "The futuristic city was bathed in a neon green glow from the towering glass skyscrapers.",
    "Mastering touch typing is like learning a musical instrument for your fingertips.",
    "A quick brown fox jumps over the lazy dog while the sun sets on the horizon.",
    "Glassmorphism combines frosted glass effects with vibrant colors for a modern UI.",
    "Artificial intelligence is transforming the way we interact with digital interfaces.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The harmony of yellow and green shades creates a refreshing visual experience."
];

let startTime, timerInterval;
let isTestRunning = false;
const keySound = document.getElementById('key-sound');
const successSound = document.getElementById('success-sound');

// --- INITIALIZATION ---
function init() {
    createBubbles();
    loadHighScore();
}

function createBubbles() {
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 20; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 80 + 20 + 'px';
        b.style.width = size; b.style.height = size;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (Math.random() * 10 + 8) + 's';
        b.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(b);
    }
}

// --- NAVIGATION ---
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'practice') startNewSession();
}

// --- TYPING CORE LOGIC ---
function startNewSession() {
    resetStats();
    // Simulate "AI Generation" by picking a random complex sentence
    const randomSentence = typingLibrary[Math.floor(Math.random() * typingLibrary.length)];
    const display = document.getElementById('text-display');
    
    // Wrap every character in a span for individual highlighting
    display.innerHTML = randomSentence.split('').map(char => `<span>${char}</span>`).join('');
    
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isTestRunning) startTimer();
    
    // Play sound
    keySound.currentTime = 0;
    keySound.volume = 0.3;
    keySound.play();

    const inputVal = e.target.value;
    const inputChars = inputVal.split('');
    const spanNodes = document.getElementById('text-display').querySelectorAll('span');
    let errors = 0;

    spanNodes.forEach((span, i) => {
        const char = inputChars[i];
        if (char == null) {
            span.className = ''; // Not typed yet
        } else if (char === span.innerText) {
            span.className = 'correct'; // Green highlight
        } else {
            span.className = 'incorrect'; // Red highlight
            errors++;
        }
    });

    // Real-time Accuracy
    const accuracy = inputChars.length > 0 
        ? Math.max(0, Math.floor(((inputChars.length - errors) / inputChars.length) * 100)) 
        : 100;
    document.getElementById('accuracy').innerText = accuracy;

    // Auto-finish if the sentence is complete
    if (inputVal === document.getElementById('text-display').innerText) {
        finishTest();
    }
});

// Finish on Enter key too
document.getElementById('typing-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishTest();
});

// --- TIMER & STATS ---
function startTimer() {
    isTestRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = elapsed;
        
        // WPM Calculation
        const charCount = document.getElementById('typing-input').value.length;
        const words = charCount / 5;
        const minutes = elapsed / 60;
        document.getElementById('wpm').innerText = elapsed > 0 ? Math.floor(words / minutes) : 0;
    }, 1000);
}

function finishTest() {
    clearInterval(timerInterval);
    isTestRunning = false;
    successSound.play();

    const wpm = document.getElementById('wpm').innerText;
    const acc = document.getElementById('accuracy').innerText;
    const time = document.getElementById('timer').innerText;

    // Save High Score
    const currentHigh = localStorage.getItem('typemaster_high') || 0;
    if (parseInt(wpm) > parseInt(currentHigh)) {
        localStorage.setItem('typemaster_high', wpm);
    }

    document.getElementById('final-results').innerHTML = `
        <p>Speed: <strong>${wpm} WPM</strong></p>
        <p>Accuracy: <strong>${acc}%</strong></p>
        <p>Time: <strong>${time}s</strong></p>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timerInterval);
    isTestRunning = false;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() {
    document.getElementById('modal-overlay').classList.add('hidden');
    navigateTo('dashboard');
}

function loadHighScore() {
    const high = localStorage.getItem('typemaster_high') || 0;
    console.log("Current High Score:", high);
}

// Start the app
init();

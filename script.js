const sentences = [
    "Precision is the key to mastering the art of typing fast.",
    "The glowing interface responded instantly to every single stroke.",
    "A journey of exploration begins with a curious mind.",
    "Modern web interfaces prioritize beauty as much as functionality.",
    "Learning to type quickly requires focus and regular practice.",
    "She opened the window to let the fresh morning air in.",
    "The curious cat jumped onto the bookshelf silently.",
    "Reading books every day can expand your knowledge greatly.",
    "During the storm, the old tree swayed dangerously in the wind.",
    "Technology has changed the way we communicate with others.",
    "He carefully painted the landscape with bright, vivid colors.",
    "Travelling to new places helps you understand different cultures.",
    "The children laughed and played in the sunlit garden.",
    "Writing neatly and clearly makes your work easier to read."
];

let timer, startTime, isRunning = false;
let currentErrors = 0;

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode', !isDark);
    document.getElementById('theme-toggle').innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

function navigateTo(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('modal-overlay').classList.add('hidden');
    if (id === 'practice') startTest();
}

function startTest() {
    resetStats();
    const text = sentences[Math.floor(Math.random() * sentences.length)];
    // Character wrapping for precise highlighting
    document.getElementById('text-display').innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isRunning) startTimer();
    
    // Play Click Sound
    const snd = document.getElementById('key-sound');
    snd.currentTime = 0; snd.volume = 0.2; snd.play();

    const val = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    const targetText = document.getElementById('text-display').innerText;
    
    currentErrors = 0;

    // Real-time Letter-by-Letter Highlighting
    spans.forEach((span, i) => {
        const char = val[i];
        if (char == null) {
            span.className = ''; // Not typed yet
        } else if (char === span.innerText) {
            span.className = 'correct'; // Typed correctly
        } else {
            span.className = 'incorrect'; // Mistake made
            currentErrors++;
        }
    });

    // Real-time Accuracy Calculation
    const totalTyped = val.length;
    const accuracy = totalTyped > 0 ? Math.max(0, Math.floor(((totalTyped - currentErrors) / totalTyped) * 100)) : 100;
    document.getElementById('accuracy').innerText = accuracy;

    // Auto-finish only if text is perfect and complete
    if (val === targetText) finish();
});

// Force finish on Enter (Accurate snapshot)
document.getElementById('typing-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (isRunning) finish();
    }
});

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        
        // WPM Calculation based on 5-character word average
        const chars = document.getElementById('typing-input').value.length;
        const wpm = sec > 0 ? Math.floor((chars / 5) / (sec / 60)) : 0;
        document.getElementById('wpm').innerText = wpm;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('success-sound').play();
    
    const finalWpm = document.getElementById('wpm').innerText;
    const finalAcc = document.getElementById('accuracy').innerText;
    const finalTime = document.getElementById('timer').innerText;

    document.getElementById('final-results').innerHTML = `
        <div class="result-item">
            <h3 style="font-size: 2.5rem; color: var(--accent);">${finalWpm} WPM</h3>
            <p style="color: var(--sub-text);">Accuracy: ${finalAcc}%</p>
            <p style="color: var(--sub-text);">Time: ${finalTime} seconds</p>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timer);
    isRunning = false;
    currentErrors = 0;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() {
    navigateTo('practice');
}

// Init Animated Bubbles
function createBubbles() {
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 12; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const s = Math.random() * 80 + 40 + 'px';
        b.style.width = s; b.style.height = s;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.top = Math.random() * 100 + 'vh';
        b.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(b);
    }
}
createBubbles();

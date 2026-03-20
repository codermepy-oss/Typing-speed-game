const sentences = [
    "Precision is the key to mastering the art of typing fast.",
    "The glowing interface responded instantly to every single stroke.",
    "A journey of exploration begins with a curious mind and steady hands.",
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

// Theme Toggle Fix
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
    document.getElementById('text-display').innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isRunning) startTimer();
    
    // Play Click
    const snd = document.getElementById('key-sound');
    snd.currentTime = 0; snd.volume = 0.2; snd.play();

    const val = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    let errs = 0;

    spans.forEach((span, i) => {
        if (!val[i]) span.className = '';
        else if (val[i] === span.innerText) span.className = 'correct';
        else { span.className = 'incorrect'; errs++; }
    });

    const acc = val.length ? Math.max(0, Math.floor(((val.length - errs) / val.length) * 100)) : 100;
    document.getElementById('accuracy').innerText = acc;

    if (val === document.getElementById('text-display').innerText) finish();
});

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        const wpm = Math.floor((document.getElementById('typing-input').value.length / 5) / (sec / 60));
        document.getElementById('wpm').innerText = sec > 0 ? wpm : 0;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('success-sound').play();
    
    document.getElementById('final-results').innerHTML = `
        <h3 style="font-size: 2rem; color: var(--accent);">${document.getElementById('wpm').innerText} WPM</h3>
        <p>with ${document.getElementById('accuracy').innerText}% accuracy</p>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() {
    navigateTo('practice');
}

// Init Bubbles
const container = document.getElementById('bubbles');
for (let i = 0; i < 15; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = Math.random() * 100 + 40 + 'px';
    b.style.width = s; b.style.height = s;
    b.style.left = Math.random() * 100 + 'vw';
    b.style.top = Math.random() * 100 + 'vh';
    container.appendChild(b);
}

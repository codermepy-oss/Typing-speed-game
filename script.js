const sentences = [
    "Modern web interfaces prioritize beauty as much as functionality.",
    "The best way to predict the future is to create it.",
    "Precision is the key to mastering the art of typing fast.",
    "The glowing interface responded instantly to every keystroke.",
    "Mastering your flow is the secret to peak productivity.",
    "A journey of a thousand miles begins with a single step.",
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

// Theme Toggle logic
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode', !isDark);
        themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
}

function navigateTo(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(id);
    if (targetPage) targetPage.classList.add('active');
    
    const modal = document.getElementById('modal-overlay');
    if (modal) modal.classList.add('hidden');
    
    if (id === 'practice') startTest();
    else resetStats();
}

function startTest() {
    resetStats();
    const text = sentences[Math.floor(Math.random() * sentences.length)];
    const display = document.getElementById('text-display');
    if (display) {
        display.innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    }
    const input = document.getElementById('typing-input');
    if (input) {
        input.value = "";
        setTimeout(() => input.focus(), 100);
    }
}

const typingInput = document.getElementById('typing-input');
if (typingInput) {
    typingInput.addEventListener('input', (e) => {
        if (!isRunning) startTimer();
        
        // Play click sound
        const snd = document.getElementById('key-sound');
        if (snd) { snd.currentTime = 0; snd.volume = 0.2; snd.play().catch(()=>{}); }

        const val = e.target.value;
        const display = document.getElementById('text-display');
        const spans = display.querySelectorAll('span');
        let errs = 0;

        spans.forEach((span, i) => {
            const char = val[i];
            if (char == null) span.className = '';
            else if (char === span.innerText) span.className = 'correct';
            else { span.className = 'incorrect'; errs++; }
        });

        const accuracy = val.length > 0 ? Math.max(0, Math.floor(((val.length - errs) / val.length) * 100)) : 100;
        document.getElementById('accuracy').innerText = accuracy;
        
        if (val === display.innerText) finish();
    });
}

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        const input = document.getElementById('typing-input');
        const wpm = sec > 0 ? Math.floor((input.value.length / 5) / (sec / 60)) : 0;
        document.getElementById('wpm').innerText = wpm;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;

    // Success Sound
    const successSnd = document.getElementById('success-sound');
    if (successSnd) { successSnd.currentTime = 0; successSnd.play().catch(()=>{}); }
    
    const wpm = document.getElementById('wpm').innerText;
    const acc = document.getElementById('accuracy').innerText;
    
    document.getElementById('final-results').innerHTML = `<h3 class="result-wpm">${wpm} WPM</h3><p>Accuracy: ${acc}%</p>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() { navigateTo('practice'); }

// Background Bubbles
const container = document.getElementById('bubbles');
if (container) {
    for (let i = 0; i < 20; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const s = Math.random() * 80 + 20 + 'px';
        b.style.width = s; b.style.height = s;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.top = Math.random() * 100 + 'vh';
        container.appendChild(b);
    }
}

var sentences = [
    "The best way to predict the future is to create it.",
    "Precision is the key to mastering the art of typing fast.",
    "Success is the courage to continue when things get difficult.",
    "Mastering your flow is the secret to peak productivity.",
    "The glowing interface responded instantly to every keystroke.",
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

var timer, startTime, isRunning = false;

// Page Navigation
function navigateTo(id) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    document.getElementById('modal-overlay').classList.add('hidden');
    if (id === 'practice') startTest();
}

// Start Session
function startTest() {
    resetStats();
    var text = sentences[Math.floor(Math.random() * sentences.length)];
    var display = document.getElementById('text-display');
    var htmlContent = "";
    for (var i = 0; i < text.length; i++) {
        htmlContent += "<span>" + text[i] + "</span>";
    }
    display.innerHTML = htmlContent;
    var input = document.getElementById('typing-input');
    input.value = "";
    setTimeout(function() { input.focus(); }, 100);
}

// Typing Logic
document.getElementById('typing-input').addEventListener('input', function(e) {
    if (!isRunning) startTimer();
    
    // Play keystroke sound
    var snd = document.getElementById('key-sound');
    if (snd) { snd.currentTime = 0; snd.volume = 0.2; snd.play().catch(function(){}); }

    var val = e.target.value;
    var spans = document.getElementById('text-display').querySelectorAll('span');
    var errs = 0;

    for (var i = 0; i < spans.length; i++) {
        var char = val[i];
        if (char == null) spans[i].className = '';
        else if (char === spans[i].innerText) spans[i].className = 'correct';
        else { spans[i].className = 'incorrect'; errs++; }
    }

    var accuracy = val.length > 0 ? Math.floor(((val.length - errs) / val.length) * 100) : 100;
    document.getElementById('accuracy').innerText = accuracy;
    
    // Auto-finish if perfectly correct
    if (val === document.getElementById('text-display').innerText) finish();
});

// NEW: FINISH ON ENTER KEY
document.getElementById('typing-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (isRunning || document.getElementById('typing-input').value.length > 0) {
            finish();
        }
    }
});

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(function() {
        var sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        var inputVal = document.getElementById('typing-input').value;
        var wpm = sec > 0 ? Math.floor((inputVal.length / 5) / (sec / 60)) : 0;
        document.getElementById('wpm').innerText = wpm;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;

    // 1. PLAY SUCCESS SOUND
    var successSnd = document.getElementById('success-sound');
    if (successSnd) {
        successSnd.currentTime = 0;
        successSnd.play().catch(function(e) { console.log("Sound blocked"); });
    }
    
    // 2. GET FINAL DATA
    var wpm = document.getElementById('wpm').innerText;
    var acc = document.getElementById('accuracy').innerText;
    var timeTaken = document.getElementById('timer').innerText;
    
    // 3. UPDATE MODAL (Ensuring same font classes)
    var resultsArea = document.getElementById('final-results');
    resultsArea.innerHTML = 
        "<div class='modal-stats-container'>" +
            "<h3 class='result-value'>" + wpm + " WPM</h3>" +
            "<h3 class='result-value'>" + timeTaken + " Seconds</h3>" +
            "<p class='result-accuracy'>Accuracy: " + acc + "%</p>" +
        "</div>";
    
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

// Theme Toggle
document.getElementById('theme-toggle').onclick = function() {
    document.body.classList.toggle('light-mode');
};

// Background Bubbles
var container = document.getElementById('bubbles');
for (var i = 0; i < 15; i++) {
    var b = document.createElement('div');
    b.className = 'bubble';
    b.style.width = "40px"; b.style.height = "40px";
    b.style.left = Math.random() * 100 + "vw";
    b.style.top = Math.random() * 100 + "vh";
    container.appendChild(b);
}

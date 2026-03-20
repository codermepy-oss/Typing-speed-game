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
function navigateTo(id) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    document.getElementById('modal-overlay').classList.add('hidden');
    
    if (id === 'practice') {
        startTest(); // This generates the sentence
    } else {
        resetStats();
    }
}

function startTest() {
    resetStats();
    var text = sentences[Math.floor(Math.random() * sentences.length)];
    var display = document.getElementById('text-display');
    
    // Create spans for each letter
    var htmlContent = "";
    for (var i = 0; i < text.length; i++) {
        htmlContent += "<span>" + text[i] + "</span>";
    }
    display.innerHTML = htmlContent;
    
    var input = document.getElementById('typing-input');
    input.value = "";
    input.disabled = false;
    setTimeout(function() { input.focus(); }, 100);
}

document.getElementById('typing-input').addEventListener('input', function(e) {
    if (!isRunning) startTimer();
    
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
    
    if (val === document.getElementById('text-display').innerText) finish();
});

// POPUP ON ENTER
document.getElementById('typing-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isRunning) {
        finish();
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
    document.getElementById('typing-input').disabled = true;

    // Sound
    var successSnd = document.getElementById('success-sound');
    if (successSnd) { successSnd.currentTime = 0; successSnd.play().catch(function(){}); }
    
    var wpm = document.getElementById('wpm').innerText;
    var acc = document.getElementById('accuracy').innerText;
    var time = document.getElementById('timer').innerText;
    
    // Result Display
    document.getElementById('final-results').innerHTML = 
        "<h3 class='result-value'>" + wpm + " WPM</h3>" +
        "<h3 class='result-value' style='font-size:2rem;'>" + time + " Seconds</h3>" +
        "<p class='modal-subtext color-adaptive'>Accuracy: " + acc + "%</p>";
    
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

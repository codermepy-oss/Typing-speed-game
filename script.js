let sentences = [
"The quick brown fox jumps over the lazy dog",
"Practice typing daily to improve speed",
"Consistency builds strong skills",
"Never stop learning new things",
"Push yourself to improve everyday"
];

let current = "";
let done = 0;
let goal = 5;

let totalChars = 0;
let correctChars = 0;
let startTime;

// LOGIN
function login() {
    let name = document.getElementById("username").value;
    localStorage.setItem("user", name);
    window.location.href = "dashboard.html";
}

// LOAD
window.onload = function () {

    if (document.getElementById("welcome")) {
        document.getElementById("welcome").innerText =
            "Hi, " + localStorage.getItem("user");

        document.getElementById("streak").innerText =
            (localStorage.getItem("streak") || 0) + " days";

        showQuote();
    }

    if (document.getElementById("sentence")) {
        goal = parseInt(localStorage.getItem("goal") || 5);
        loadSentence();

        document.getElementById("input").addEventListener("keydown", function(e){
            if (e.key === "Enter") evaluate();
        });
    }
};

// GOAL
function saveGoal() {
    let g = document.getElementById("goal").value;
    localStorage.setItem("goal", g);
}

// NAV
function startPractice() {
    window.location.href = "practice.html";
}

function goBack() {
    window.location.href = "dashboard.html";
}

// SENTENCE
function loadSentence() {
    current = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("sentence").innerText = current;
    document.getElementById("input").value = "";
    startTime = new Date();
}

// EVALUATE
function evaluate() {
    let input = document.getElementById("input").value;

    let correct = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === current[i]) correct++;
    }

    totalChars += input.length;
    correctChars += correct;

    done++;
    document.getElementById("done").innerText = done;

    let time = (new Date() - startTime) / 1000;

    let wpm = Math.round((input.length / 5) / (time / 60));
    document.getElementById("wpm").innerText = wpm || 0;

    let acc = Math.round((correctChars / totalChars) * 100) || 100;
    document.getElementById("accuracy").innerText = acc;

    document.getElementById("bar").style.width =
        (done / goal) * 100 + "%";

    if (done >= goal) {
        updateStreak();
        document.getElementById("popup").classList.remove("hidden");
    } else {
        loadSentence();
    }
}

// STREAK
function updateStreak() {
    let today = new Date().toDateString();
    let last = localStorage.getItem("last");

    if (last !== today) {
        let streak = parseInt(localStorage.getItem("streak") || 0);
        localStorage.setItem("streak", streak + 1);
        localStorage.setItem("last", today);
    }
}

// QUOTE
function showQuote() {
    let quotes = [
        "Small progress every day leads to big results.",
        "Consistency is more important than motivation.",
        "Discipline builds success.",
        "Focus on improvement."
    ];

    document.getElementById("quote").innerText =
        quotes[Math.floor(Math.random() * quotes.length)];
}

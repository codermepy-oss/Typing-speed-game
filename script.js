const quotes = [
"Push yourself, because no one else will.",
"Success starts with consistency.",
"Stay focused and never give up.",
"Every day is a fresh start.",
"Practice makes perfect."
];

const sentences = [
"Typing fast requires practice and patience.",
"Consistency is the key to improvement.",
"The quick brown fox jumps over the lazy dog.",
"Success comes from daily effort.",
"Focus on accuracy before speed.",
"Never stop learning new things.",
"Discipline beats motivation.",
"Small steps lead to big results.",
"Stay calm and keep typing.",
"Hard work always pays off."
];

let currentIndex = 0;

if(document.getElementById("welcome")){
    document.getElementById("welcome").innerText = "Hi, " + localStorage.getItem("user");
    document.getElementById("goalDisplay").innerText = localStorage.getItem("goal");
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random()*quotes.length)];
    document.getElementById("streak").innerText = localStorage.getItem("streak") || 0;
}

function toggleMode(){
    document.body.classList.toggle("dark");
}

function startPractice(){
    window.location.href = "practice.html";
}

if(document.getElementById("sentence")){
    loadSentence();

    document.getElementById("input").addEventListener("input", checkTyping);
}

function loadSentence(){
    document.getElementById("sentence").innerText = sentences[Math.floor(Math.random()*sentences.length)];
}

function checkTyping(){
    let input = document.getElementById("input").value;
    let sentence = document.getElementById("sentence").innerText;

    let correct = 0;

    for(let i=0;i<input.length;i++){
        if(input[i] === sentence[i]) correct++;
    }

    let progress = (correct / sentence.length) * 100;
    document.getElementById("progress").style.width = progress + "%";

    if(input === sentence){
        nextSentence();
    }
}

function nextSentence(){
    currentIndex++;

    let completed = parseInt(localStorage.getItem("completedToday")) + 1;
    localStorage.setItem("completedToday", completed);

    let goal = parseInt(localStorage.getItem("goal"));

    if(completed >= goal){
        document.getElementById("popup").classList.remove("hidden");
        updateStreak();
        return;
    }

    document.getElementById("input").value = "";
    loadSentence();
}

function updateStreak(){
    let lastDate = localStorage.getItem("lastCompletedDate");
    let today = new Date().toDateString();

    if(lastDate !== today){
        let streak = parseInt(localStorage.getItem("streak") || 0);
        localStorage.setItem("streak", streak + 1);
        localStorage.setItem("lastCompletedDate", today);
    }
}

function goBack(){
    localStorage.setItem("completedToday", 0);
    window.location.href = "dashboard.html";
}

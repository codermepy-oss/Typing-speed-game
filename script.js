let sentences = {
  easy: [
    "The sun rises in the east.",
    "I love to read books.",
    "She is very kind.",
    "We play every day.",
    "This is a simple sentence.",
    "He runs very fast.",
    "They are good friends.",
    "Coding is fun and easy.",
    "Practice makes you better.",
    "Keep learning new things."
  ],
  medium: [
    "Typing fast requires consistent daily practice and focus.",
    "JavaScript is widely used for building interactive websites.",
    "Discipline is more important than motivation in the long run.",
    "Frontend development involves HTML CSS and JavaScript.",
    "A good developer writes clean and efficient code.",
    "Small improvements every day lead to big success.",
    "Time management is a key skill for students.",
    "Debugging code helps you understand problems deeply.",
    "Always test your code before deployment.",
    "Learning never stops in the tech world."
  ],
  hard: [
    "The quick brown fox jumps over the lazy dog multiple times to test typing efficiency.",
    "Building scalable applications requires knowledge of system design and optimization techniques.",
    "Consistency and discipline over time are more powerful than short bursts of motivation.",
    "Advanced algorithms and data structures improve problem solving capabilities significantly.",
    "User experience design plays a crucial role in modern application development.",
    "Performance optimization is essential for large scale web applications.",
    "Understanding asynchronous programming is key in JavaScript development.",
    "Writing reusable and modular code improves maintainability.",
    "Security vulnerabilities must be addressed during development lifecycle.",
    "Clean architecture leads to better scalability and flexibility."
  ]
};

let usedSentences = [];
let currentSentence = "";
let startTime = null;
let timerInterval = null;
let totalTyped = 0;
let correctTyped = 0;
let streak = 0;
let dailyGoal = 0;
let sessionTime = 0;
let difficulty = "easy";

function getSentence() {
  let pool = sentences[difficulty];
  let available = pool.filter(s => !usedSentences.includes(s));
  if (available.length === 0) {
    usedSentences = [];
    available = pool;
  }
  let sentence = available[Math.floor(Math.random() * available.length)];
  usedSentences.push(sentence);
  return sentence;
}

function startApp() {
  dailyGoal = parseInt(prompt("Enter daily minutes goal:", "10")) || 10;
  difficulty = prompt("Choose difficulty: easy / medium / hard", "easy");
  sessionTime = dailyGoal * 60;
  startSession();
}

function startSession() {
  currentSentence = getSentence();
  document.getElementById("sentence").innerText = currentSentence;
  document.getElementById("input").value = "";
  totalTyped = 0;
  correctTyped = 0;
  startTime = new Date().getTime();

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let elapsed = Math.floor((new Date().getTime() - startTime) / 1000);
    let remaining = sessionTime - elapsed;
    document.getElementById("timer").innerText = remaining;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      alert("Session complete!");
    }
  }, 1000);
}

function handleTyping() {
  let input = document.getElementById("input").value;
  let display = "";
  correctTyped = 0;

  for (let i = 0; i < currentSentence.length; i++) {
    if (i < input.length) {
      if (input[i] === currentSentence[i]) {
        display += `<span style="color:green">${currentSentence[i]}</span>`;
        correctTyped++;
      } else {
        display += `<span style="color:red">${currentSentence[i]}</span>`;
      }
    } else {
      display += currentSentence[i];
    }
  }

  document.getElementById("sentence").innerHTML = display;
  totalTyped = input.length;

  if (input === currentSentence) {
    streak++;
    document.getElementById("streak").innerText = streak;
    currentSentence = getSentence();
    document.getElementById("sentence").innerText = currentSentence;
    document.getElementById("input").value = "";
  }

  updateStats();
}

function updateStats() {
  let timeElapsed = (new Date().getTime() - startTime) / 60000;
  let wpm = Math.round((correctTyped / 5) / timeElapsed) || 0;
  let accuracy = totalTyped === 0 ? 100 : Math.round((correctTyped / totalTyped) * 100);

  document.getElementById("wpm").innerText = wpm;
  document.getElementById("accuracy").innerText = accuracy + "%";
}

function restartApp() {
  usedSentences = [];
  streak = 0;
  document.getElementById("streak").innerText = "0";
  startApp();
}

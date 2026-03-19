function startApp() {
  const goal = document.getElementById("goal-select").value;
  localStorage.setItem("dailyGoal", goal);

  document.getElementById("goal-screen").style.display = "none";
}
let sentenceDisplay = document.getElementById("sentence")
let inputField = document.getElementById("input")
let timerDisplay = document.getElementById("timer")
let wpmDisplay = document.getElementById("wpm")
let accuracyDisplay = document.getElementById("accuracy")
let message = document.getElementById("message")

let startBtn = document.getElementById("startBtn")
let endBtn = document.getElementById("endBtn")
let restartBtn = document.getElementById("restartBtn")

let timer = 0
let interval = null
let sentence = ""

const sentences = [
"Typing practice improves speed and accuracy",
"Practice every day to become a faster typist",
"Consistency is the secret to improvement",
"Focus on accuracy before speed",
"Typing games help develop muscle memory"
]

function loadSentence(){

sentence = sentences[Math.floor(Math.random()*sentences.length)]

sentenceDisplay.innerHTML=""

sentence.split("").forEach(letter=>{
let span=document.createElement("span")
span.innerText=letter
sentenceDisplay.appendChild(span)
})

}

function startTest(){

loadSentence()

inputField.disabled=false
inputField.value=""
inputField.focus()

message.textContent=""

timer=0
timerDisplay.innerText=timer

interval=setInterval(()=>{
timer++
timerDisplay.innerText=timer
},1000)

}

function endTest(){

clearInterval(interval)
inputField.disabled=true

calculateResults()

message.textContent="Test Completed!"

}

function restartTest(){

clearInterval(interval)

timer=0
timerDisplay.innerText=0

inputField.value=""
inputField.disabled=true

sentenceDisplay.innerHTML=""

wpmDisplay.innerText=0
accuracyDisplay.innerText=0

message.textContent=""

}

function calculateResults(){

let typed=inputField.value.trim()

let words=typed.split(" ").length

let minutes=timer/60

let wpm=Math.round(words/minutes)

if(!isFinite(wpm)) wpm=0

let correct=0

for(let i=0;i<typed.length;i++){

if(typed[i]===sentence[i]){
correct++
}

}

let accuracy=Math.round((correct/sentence.length)*100)

wpmDisplay.innerText=wpm
accuracyDisplay.innerText=accuracy

}

inputField.addEventListener("input",()=>{

let characters=sentenceDisplay.querySelectorAll("span")

let typed=inputField.value.split("")

characters.forEach((char,index)=>{

if(typed[index]==null){

char.classList.remove("correct")
char.classList.remove("incorrect")

}

else if(typed[index]===char.innerText){

char.classList.add("correct")
char.classList.remove("incorrect")

}

else{

char.classList.add("incorrect")
char.classList.remove("correct")

}

})

})

startBtn.addEventListener("click",startTest)
endBtn.addEventListener("click",endTest)
restartBtn.addEventListener("click",restartTest)

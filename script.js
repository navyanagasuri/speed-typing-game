
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteAuthorElement = document.getElementById("quoteAuthor")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")
const btnNextElement = document.getElementById("btnNext")

let myTime
let totalKeysPress = 0
let correctKeysPress
let incorrectKeysPress

let correct = true;

// document.getElementById("quoteInput").onkeydown = function(){    
//     totalKeysPress ++;
//     //console.log(totalKeysPress)
// }

document.getElementById("quoteInput").onkeydown = function(e){    
    
    if( !(e.key === "Shift" || e.key === "Backspace"))
    totalKeysPress ++;
    //console.log(totalKeysPress)
}

quoteInputElement.addEventListener('input', () => {
    
    correctKeysPress = 0
    incorrectKeysPress = 0
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        }else if (character === characterSpan.innerText) {
            correctKeysPress ++
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = true;
        } else {
            incorrectKeysPress ++
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false;
        }

    })

    if(correct) {
        showTime();
        btnNextElement.value = " Play Again! "
        btnNextElement.addEventListener("click",renderNewQuote)
        
        //renderNewQuote()
    }
})

function showTime(){
    
    quoteDisplayElement.innerText = "Your time: " + myTime + "s.\n" +
    "Total keys press = " + totalKeysPress + "\n" +
    "Words Per Minute = " + Math.floor((totalKeysPress / 5)/(myTime/60)) + "\n" +
    "Correct keys press = " + correctKeysPress + "\n" +
    "Incorrect keys press = " + (totalKeysPress - correctKeysPress) + "\n" +
    "Accuracy(%) = " + ((correctKeysPress * 100 ) / totalKeysPress).toFixed(2) + " %" 
    quoteAuthorElement.innerText = ""
    quoteInputElement.style.display = "none"
    timerElement.style.visibility = "hidden"
    totalKeysPress = 0
    correctKeysPress = 0
    incorrectKeysPress = 0

    //btnNextElement.style.visibility = "hidden"
    //renderNewQuote()
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        // .then(data => data.content);
        .then(data => data);
}

async function renderNewQuote() {

    
    btnNextElement.value ="Next Quote ->"
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = '' //quote.content;
    quoteAuthorElement.innerText = quote.author;
    quote.content.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null;
    quoteInputElement.style.display = "block"
    timerElement.style.visibility = "visible"
    //btnNextElement.style.visibility = "visible"
    
    startTimer()
}
let startTime 
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
        myTime = getTimerTime()
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

function nextQuote(){
    renderNewQuote();
}

renderNewQuote()






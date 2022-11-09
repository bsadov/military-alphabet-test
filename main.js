const content = [['A', 'alpha'],
                ['B', 'bravo'],
                ['C', 'charlie'],
                ['D', 'delta'],
                ['E', 'echo'],
                ['F', 'foxtrot'],
                ['G', 'golf'],
                ['H', 'hotel'],
                ['I', 'india'],
                ['J', 'juliet'],
                ['K', 'kilo'],
                ['L', 'lima'],
                ['M', 'mike'],
                ['N', 'november'],
                ['O', 'oscar'],
                ['P', 'papa'],
                ['Q', 'quebec'],
                ['R', 'romeo'],
                ['S', 'sierra'],
                ['T', 'tango'],
                ['U', 'uniform'],
                ['V', 'victor'],
                ['W', 'whiskey'],
                ['X', 'xray'],
                ['Y', 'yankee'],
                ['Z', 'zulu']];
let activeLetters = [...content];
let letterEle = document.getElementById('letter');
let inputBox = document.getElementById("input");
let answerText = document.getElementById('answerText');
let submitBtn = document.getElementById("submit");
let hintBtn = document.getElementById("hint");
let newBtn = document.getElementById("new")
let answerList = document.getElementById("answerList")
let random;
let prevRandom;
let hintCount;
let isComplete = false;

newLetter();

function checkAnswer(){
    if(activeLetters[random][0] == 'A'){
        if(inputBox.value.toLowerCase() == 'alpha' || inputBox.value.toLowerCase() == 'alfa'){
            correctAnswer();
            return;
        }
        else answerText.textContent = 'Try again!';
    }

    if(activeLetters[random][0] == 'X'){
        if(inputBox.value.toLowerCase() == 'xray' || inputBox.value.toLowerCase() == 'x-ray'){
            correctAnswer();
            return;
        }
        else answerText.textContent = 'Try again!';
    }
    
    if(inputBox.value.toLowerCase() == activeLetters[random][1]){
        correctAnswer();
    }
    else if(inputBox.value != '')
        answerText.textContent = 'Try again!';
};

function newLetter(){
    if(isComplete){
        resetGame();
    }
    prevRandom = random;
    random = Math.floor(Math.random() * activeLetters.length);
    while(activeLetters.length > 1 && random == prevRandom){
        random = Math.floor(Math.random() * activeLetters.length);
    }
    letterEle.textContent = activeLetters[random][0];
    answerText.textContent = '';
    inputBox.value = '';
    hintCount = 1;
    inputBox.disabled=false;
    submitBtn.disabled=false;
    hintBtn.disabled=false;
    inputBox.focus();
};

function correctAnswer(){
    /* adds latest correct entry to side-list */
    let newEle = document.createElement('li');
    newEle.textContent = activeLetters[random][1];
    answerList.prepend(newEle);

    activeLetters.splice(random, 1);
    if(activeLetters.length == 1){
        newBtn.textContent = 'Final Letter';
    }
    else if(activeLetters.length == 0 && !isComplete){
        gameCompleted();
        return
    }
    answerText.textContent = 'Correct!';
    inputBox.disabled=true;
    submitBtn.disabled=true;
    hintBtn.disabled=true;
    newBtn.focus();
}

function showHint(){
    hintCount++;
    if(hintCount < activeLetters[random][1].length){
        answerText.textContent = activeLetters[random][1].slice(0,hintCount);
    }
    else{
        answerText.textContent = activeLetters[random][1].slice(0,hintCount);
        inputBox.disabled=true;
        submitBtn.disabled=true;
        hintBtn.disabled=true;
        newBtn.focus();
        answerText.textContent += ' was the answer! Press Enter to try again';
    }
};

function gameCompleted(){
    isComplete = true;
    answerText.textContent = 'Congratulations, you got them all!';
    inputBox.disabled=true;
    submitBtn.disabled=true;
    hintBtn.disabled=true;
    newBtn.textContent='Reset Game';
    newBtn.focus();
}

function resetGame(){
    while (answerList.lastElementChild) {
        answerList.removeChild(answerList.lastElementChild);
    }
    activeLetters = [...content];
    newBtn.textContent='New Letter';
    isComplete = false;
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
    }
});
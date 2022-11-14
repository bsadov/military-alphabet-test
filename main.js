const content = [['A', 'alpha', 'alfa'],
                ['B', 'bravo'],
                ['C', 'charlie'],
                ['D', 'delta'],
                ['E', 'echo'],
                ['F', 'foxtrot'],
                ['G', 'golf'],
                ['H', 'hotel'],
                ['I', 'india'],
                ['J', 'juliet', 'juliett'],
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
                ['X', 'xray', 'x-ray'],
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
let answersLeft = document.getElementById("answersLeft")
let random;
let prevRandom;
let hintCount;

newLetter();

function newLetter(){
    if(activeLetters.length == 0){
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
    buttonToggle(false);
    inputBox.focus();
};

function checkAnswer(){
    /* OR check for alternate spellings */
    if(inputBox.value.toLowerCase() == activeLetters[random][1] || inputBox.value.toLowerCase() == activeLetters[random][2]){
        correctAnswer();
        return;
    }
    else if(inputBox.value != '')
        answerText.textContent = 'Try again!';
};

function correctAnswer(){
    /* prepends latest correct entry to side-list */
    let newEle = document.createElement('li');
    newEle.textContent = inputBox.value.toLowerCase();
    answerList.prepend(newEle);

    activeLetters.splice(random, 1);
    answersLeft.textContent = activeLetters.length + ' letters left';

    if(activeLetters.length == 1){
        newBtn.textContent = 'Final Letter';
    }
    else if(activeLetters.length == 0){
        gameCompleted();
        return
    }
    answerText.textContent = 'Correct!';
    buttonToggle(true);
    newBtn.focus();
}

function showHint(){
    hintCount++;
    answerText.textContent = activeLetters[random][1].slice(0,hintCount);
    if(hintCount == activeLetters[random][1].length){
        buttonToggle(true);
        newBtn.focus();
        answerText.textContent += ' was the answer! Press Enter to try again';
    }
};

function gameCompleted(){
    answerText.textContent = 'Congratulations, you got them all!';
    buttonToggle(true);
    newBtn.textContent='Reset Game';
}

function resetGame(){
    while (answerList.firstChild != answersLeft) {
        answerList.firstChild.remove()
    }
    activeLetters = [...content];
    answersLeft.textContent = activeLetters.length + ' letters left';
    newBtn.textContent='New Letter';
}

function buttonToggle(boolean){
    inputBox.disabled = submitBtn.disabled = hintBtn.disabled = boolean;
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
    }
});
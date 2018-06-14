/* TODO *\

* pause functionality
* isBreaking is a stupid way to keep track, think of something better
* BUG:

\* ---- */

// elements
const primaryMin = document.querySelector('.primary-min');
const primarySec = document.querySelector('.primary-sec');
const secondaryMin = document.querySelector('.secondary-min');
const secondarySec = document.querySelector('.secondary-sec');
const arrows = document.querySelectorAll('.arrows');
const primaryUp = arrows[0];
const primaryDown = arrows[1];
const secondaryUp = arrows[2];
const secondaryDown = arrows[3];
const defaultHeader = document.querySelector('#header');
const breakHeader = document.querySelector('#breaker');

// buttons
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');
const swapButton = document.querySelector('.swap');

// variables
let intervalId;
let inputTime = primaryMin.textContent;
let totalSeconds;

//flags
let isCounting = false;
let isBreaking = false; // this is a ridiculous workaround
let isPaused = false;

// pause vars
let pausedMin;
let pausedSec;

// event listeners
startButton.addEventListener('click', beginPomodoro);
stopButton.addEventListener('click', endPomodoro);
pauseButton.addEventListener('click', function() {
    console.log('Can you hear this?');
});
swapButton.addEventListener('click', swapTimesButton);
arrows.forEach(function(arrow) {
    arrow.addEventListener('mouseenter', function() {
        // console.log(this);
        this.classList.remove('fa');
        this.classList.add('far');
    });
    arrow.addEventListener('mouseleave', function() {
        // console.log(this);
        this.classList.remove('far');
        this.classList.add('fa');
    });
});
primaryUp.addEventListener('click', primaryUpClick);
primaryDown.addEventListener('click', primaryDownClick);
secondaryUp.addEventListener('click', secondaryUpClick);
secondaryDown.addEventListener('click', secondaryDownClick);



// event functions
function beginPomodoro() {
    inputTime = parseInt(primaryMin.innerText);
    totalSeconds = inputTime * 60;
    if (isCounting) {
        return;
    } else {
        isCounting = !isCounting;
    }

    intervalId = setInterval(function() {
        countdown();

        if (totalSeconds === -1) {
            swapTimes();
            inputTime = parseInt(primaryMin.textContent);
            totalSeconds = inputTime * 60;
        }
    }, 1000)
}

function endPomodoro() {
    clearInterval(intervalId);
    isCounting = false;
    isBreaking = false;

    defaultTimes();
}

function swapTimesButton() {
    if (isCounting) {
        return;
    }

    if (secondaryMin.textContent != 0) {
        swapTimes();
        clearInterval(intervalId);
    }
}

function primaryUpClick() {
    if (isCounting) {
        return;
    }

    if (isBreaking == false) {
        if (primaryMin.textContent < 60) {
            primaryMin.textContent = '' + (parseInt(primaryMin.textContent) + 1);
            inputTime = parseInt(primaryMin.innerText);
        }
    } else {
        if (primaryMin.textContent < 15) {
            primaryMin.textContent = '' + (parseInt(primaryMin.textContent) + 1);
            inputTime = parseInt(primaryMin.innerText);
        }
    }
}

function primaryDownClick() {
    if (isCounting) {
        return;
    }
    if (isBreaking == false) {
        if (primaryMin.textContent > 1) {
            primaryMin.textContent = '' + (parseInt(primaryMin.textContent) - 1);
            inputTime = parseInt(primaryMin.innerText);
        }
    } else {
        if (primaryMin.textContent > 0) {
            primaryMin.textContent = '' + (parseInt(primaryMin.textContent) - 1);
        }
    }
}

function secondaryUpClick() {
    if (isCounting) {
        return;
    }

    if (isBreaking == false) {
        if (secondaryMin.textContent < 15) {
            secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) + 1);
        }
    } else {
        if (secondaryMin.textContent < 60) {
            secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) + 1);
            // inputTime = parseInt(secondaryMin.innerText);
        }
    }
}

function secondaryDownClick() {
    if (isCounting) {
        return;
    }

    if (isBreaking == false) {
        if (secondaryMin.textContent > 0) {
            secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) - 1);
        }
    } else {
        if (secondaryMin.textContent > 1) {
            secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) - 1);
            // inputTime = parseInt(secondaryMin.innerText);
        }
    }
}



// helpers
function defaultTimes() {
    primaryMin.textContent = '25';
    primarySec.textContent = '00';
    secondaryMin.textContent = '5';
    secondarySec.textContent = '00';
}

// this needs to be FIXED!
// at the end of a countdown, secondaryMin becomes '0'
// instead of what should have been saved
function swapTimes() {
    isBreaking = !isBreaking;
    swapHeader();

    let tempPrim = primaryMin.textContent;

    primaryMin.textContent = secondaryMin.textContent;
    primarySec.textContent = '00';
    secondaryMin.textContent = tempPrim;
    secondarySec.textContent = '00';
}

function countdown() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;

    if (min === 0) {
        primaryMin.textContent = '0';
    } else {
        primaryMin.textContent = '' + min;
    }

    if (sec >= 0 && sec <= 9) {
        primarySec.textContent = '0' + sec;
    } else {
        primarySec.textContent = '' + sec;
    }

    totalSeconds--;
}

function swapHeader() {
    if (isBreaking) {
        defaultHeader.classList.add('hide');
        breakHeader.classList.remove('hide');
    } else {
        defaultHeader.classList.remove('hide');
        breakHeader.classList.add('hide');
    }
}
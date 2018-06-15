/* TODO *\

* isBreaking is a stupid way to keep track, think of something better

* arrows eventlistener: in order to use THIS in an eventlistener,
    it needs to be targeting the outer element (target body(?))

* when user clicks primaryMin or secondaryMin,
    user should be able to enter whatever time they want

* add comments to code for readability
* separate code into separate files for readability

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
const pauseHeader = document.querySelector('#pause-header');

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
    if (isPaused) {
        return;
    }

    isPaused = true;
    togglePauseHeader();
    isCounting = false;
    pausedMin = primaryMin.textContent;
    pausedSec = primarySec.textContent;
    clearInterval(intervalId);
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
    if (isPaused) {
        inputTime = parseInt(pausedMin);
        totalSeconds = parseInt(pausedSec) + (inputTime * 60);
        isPaused = !isPaused;
        togglePauseHeader();
    } else {
        inputTime = parseInt(primaryMin.innerText);
        totalSeconds = inputTime * 60;
    }

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
    isPaused = false;

    togglePauseHeader();
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
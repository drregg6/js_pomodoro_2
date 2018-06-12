/* TODO *\

* create statements to control the limits of how long the timer can be
* if timer is running, disable the arrows and start buttons
* pause functionality
* with primary/secondary time, I can't keep track of when it's on break
    or when it's on work..

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

// buttons
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');
const breakButton = document.querySelector('.break');

// variables
let intervalId;
let inputTime = '25';
let totalSeconds;

// pause vars
let isPaused = false;
let pausedMin;
let pausedSec;

// event listeners
startButton.addEventListener('click', beginPomodoro);
stopButton.addEventListener('click', endPomodoro);
pauseButton.addEventListener('click', function() {
    console.log('Can you hear this?');
});
breakButton.addEventListener('click', swapTimesButton);
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
primaryUp.addEventListener('click', function() {
    if (primaryMin.textContent < 60) {
        primaryMin.textContent = '' + (parseInt(primaryMin.textContent) + 1);
        inputTime = parseInt(primaryMin.innerText);
    }
});
primaryDown.addEventListener('click', function() {
    if (primaryMin.textContent > 1) {
        primaryMin.textContent = '' + (parseInt(primaryMin.textContent) - 1);
        inputTime = parseInt(primaryMin.innerText);
    }
});
secondaryUp.addEventListener('click', function() {
    if (secondaryMin.textContent < 15) {
        secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) + 1);
    }
});
secondaryDown.addEventListener('click', function() {
    if (secondaryMin.textContent > 0) {
        secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) - 1);
    }
});



// event functions
function beginPomodoro() {
    inputTime = parseInt(primaryMin.innerText);
    totalSeconds = inputTime * 60;

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

    defaultTimes();
}

function swapTimesButton() {
    if (secondaryMin.textContent != 0) {
        swapTimes();
        clearInterval(intervalId);
    }
}



// helpers
function defaultTimes() {
    primaryMin.textContent = '25';
    primarySec.textContent = '00';
    secondaryMin.textContent = '5';
    secondarySec.textContent = '00';
}

function swapTimes() {
    let tempPrim = inputTime;
    let tempSec = secondaryMin.textContent;

    primaryMin.textContent = tempSec;
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
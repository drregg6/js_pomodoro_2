/* TODO

- it takes a couple seconds for the timer to go into effect
- when the timer ends, it should go right into the break timer

*/

// elements
let primaryMin = document.querySelector('.primary-min');
let primarySec = document.querySelector('.primary-sec');
let secondaryMin = document.querySelector('.secondary-min');
let secondarySec = document.querySelector('.secondary-sec');
let arrows = document.querySelectorAll('.arrows');
let primaryUp = arrows[0];
let primaryDown = arrows[1];
let secondaryUp = arrows[2];
let secondaryDown = arrows[3];

// buttons
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');
const breakButton = document.querySelector('.break');

//
let intervalId;
let inputTime;
let totalSeconds;
let isOnBreak = false;

// event listeners
startButton.addEventListener('click', beginPomodoro);
stopButton.addEventListener('click', endPomodoro);
pauseButton.addEventListener('click', function() {
    console.log('Can you hear this?');
});
breakButton.addEventListener('click', swapTimes);
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
    primaryMin.textContent = '' + (parseInt(primaryMin.textContent) + 1);
});
primaryDown.addEventListener('click', function() {
    primaryMin.textContent = '' + (parseInt(primaryMin.textContent) - 1);
});
secondaryUp.addEventListener('click', function() {
    secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) + 1);
});
secondaryDown.addEventListener('click', function() {
    secondaryMin.textContent = '' + (parseInt(secondaryMin.textContent) - 1);
});



// event functions
function beginPomodoro() {
    inputTime = parseInt(primaryMin.innerText);
    totalSeconds = inputTime * 60;

    intervalId = setInterval(function() {
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

        if (totalSeconds === -1) {
            primaryMin.textContent = '0';
            primarySec.textContent = '00';
            clearInterval(intervalId);
        }
    }, 1000)
}

function endPomodoro() {
    clearInterval(intervalId);

    defaultTimes();
}

function swapTimes() {
    let tempPrim = primaryMin.textContent;
    let tempSec = secondaryMin.textContent;

    primaryMin.textContent = tempSec;
    primarySec.textContent = '00';
    secondaryMin.textContent = tempPrim;
    secondarySec.textContent = '00';
}



// helpers
function defaultTimes() {
    primaryMin.textContent = '25';
    primarySec.textContent = '00';
    secondaryMin.textContent = '5';
    secondarySec.textContent = '00';
}
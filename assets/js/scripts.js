/* TODO

- it takes a couple seconds for the timer to go into effect

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
let inputTime = parseInt(primaryMin.innerText);
let totalSeconds = inputTime * 60;
let isOnBreak = false;

// event listeners
startButton.addEventListener('click', beginPomodoro);
stopButton.addEventListener('click', function() {
    alert('Hello world!');
});
pauseButton.addEventListener('click', function() {
    console.log('Can you hear this?');
});
breakButton.addEventListener('click', function() {
    console.log('Hello world!');
});
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
})



function beginPomodoro() {
    let intervalId = setInterval(function() {
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

// pauseButton.addEventListener('click', function() {
//     clearInterval(intervalId);
// });
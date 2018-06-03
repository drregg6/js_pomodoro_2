let primaryMin = document.querySelector('.primary-min');
let primarySec = document.querySelector('.primary-sec');
let startButton = document.querySelector('.start');
let pauseButton = document.querySelector('.pause');
let inputTime = parseInt(primaryMin.innerText);
let totalSeconds = inputTime * 60;

startButton.addEventListener('click', beginPomodoro);

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
let primaryMin = document.querySelector('.primary-min');
let primarySec = document.querySelector('.primary-sec');
let inputTime = parseInt(primaryMin.innerText);
let totalSeconds = inputTime * 60;
let count = 0;

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

    // count++;
    // if (count === 3) {
    //     clearInterval(intervalId);
    // }
    // console.log(totalSeconds);
}, 1000)
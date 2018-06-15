// helpers
function defaultTimes() {
    primaryMin.textContent = '25';
    primarySec.textContent = '00';
    secondaryMin.textContent = '5';
    secondarySec.textContent = '00';
}

function swapTimes() {
    isBreaking = !isBreaking;
    swapHeader();

    let tempPrim = inputTime;

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

function togglePauseHeader() {
    if (isPaused) {
        pauseHeader.classList.remove('hide');
    } else {
        pauseHeader.classList.add('hide');
    }
}
import { getRandomHexColor } from "./helpers";

refs = {
    startButton: document.querySelector("[data-start]"),
    stopButton: document.querySelector("[data-stop]"),
}

refs.startButton.addEventListener("click", colorChangeStart);
refs.stopButton.addEventListener("click", colorChangeStop);

function colorChangeStart(event) {

refs.startButton.disabled = true;

intervalId = setInterval(() => {
const randomColor = getRandomHexColor();

document.body.style.backgroundColor = randomColor;
}, 1000);
}

function colorChangeStop(event){

refs.startButton.disabled = false;

clearInterval(intervalId);
}

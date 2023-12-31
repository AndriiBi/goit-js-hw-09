import { getRandomHexColor } from "./helpers";

const refs = {
    startButton: document.querySelector("[data-start]"),
    stopButton: document.querySelector("[data-stop]"),
}
let intervalId;

refs.startButton.addEventListener("click", colorChangeStart);
refs.stopButton.addEventListener("click", colorChangeStop);

function colorChangeStart(event) {

refs.startButton.disabled = true;
refs.stopButton.disabled = false;

intervalId = setInterval(() => {
const randomColor = getRandomHexColor();

document.body.style.backgroundColor = randomColor;
}, 1000);
}

function colorChangeStop(event){

refs.startButton.disabled = false;
refs.stopButton.disabled = true;

clearInterval(intervalId);
}

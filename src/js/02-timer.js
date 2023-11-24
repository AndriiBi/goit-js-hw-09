import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startButton: document.querySelector("[data-start]"),
  dateTimePicker: document.getElementById("datetime-picker"),
  daysElement: document.querySelector("[data-days]"),
  hoursElement: document.querySelector("[data-hours]"),
  minutesElement: document.querySelector("[data-minutes]"),
  secondsElement: document.querySelector("[data-seconds]"),
};

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] && selectedDates[0] > new Date()) {
        refs.startButton.removeAttribute("disabled");
      } else {
        refs.startButton.setAttribute("disabled", "disabled");
      }
      console.log(selectedDates[0]);
    },
  };

const dateTimePickerInstance = flatpickr(refs.dateTimePicker, options);

refs.startButton.addEventListener("click", startCountdown);

function startCountdown() {
  const selectedDate = dateTimePickerInstance.selectedDates[0];

  if (!selectedDate || selectedDate <= new Date()) {
    alert("Please choose a date in the future.");
    return;
  }

  clearInterval(timerInterval);

  updateTimer(selectedDate);

  timerInterval = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);
}

function updateTimer(endDate) {
  const now = new Date();
  const timeRemaining = endDate - now;

  if (timeRemaining < 0) {
    clearInterval(timerInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  refs.daysElement.textContent = padZero(days);
  refs.hoursElement.textContent = padZero(hours);
  refs.minutesElement.textContent = padZero(minutes);
  refs.secondsElement.textContent = padZero(seconds);
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}







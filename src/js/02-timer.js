
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const refs = {
  startButton: document.querySelector("[data-start]"),
  dateTimePicker: document.getElementById("datetime-picker"),
  daysElement: document.querySelector("[data-days]"),
  hoursElement: document.querySelector("[data-hours]"),
  minutesElement: document.querySelector("[data-minutes]"),
  secondsElement: document.querySelector("[data-seconds]"),
};

let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] && selectedDates[0] > new Date()) {
      refs.startButton.removeAttribute("disabled");
    } else {
      alert("Please choose a date in the future.");
      refs.startButton.setAttribute("disabled", "disabled");
    }
  },
};

const dateTimePickerInstance = flatpickr(refs.dateTimePicker, options);

refs.startButton.addEventListener("click", startCountdown);

function startCountdown() {
  const selectedDate = dateTimePickerInstance.selectedDates[0];

  clearInterval(intervalId);

  updateTimer(selectedDate);

  intervalId = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);
}

function updateTimer(endDate) {
  const now = new Date();
  const timeRemaining = endDate - now;

  if (timeRemaining < 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  refs.daysElement.textContent = addLeadingZero(days);
  refs.hoursElement.textContent = addLeadingZero(hours);
  refs.minutesElement.textContent = addLeadingZero(minutes);
  refs.secondsElement.textContent = addLeadingZero(seconds);
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
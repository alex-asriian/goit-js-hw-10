import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = 0;
let intervalID;

const startButton = document.querySelector('button[data-start]')
const daytimePicker = document.querySelector('#datetime-picker')
const jsDays = document.querySelector('.js-days')
const jsHours = document.querySelector('.js-hours')
const jsMinutes = document.querySelector('.js-minutes')
const jsSeconds = document.querySelector('.js-seconds')
const errorMsg = {
            title: "Error",
            message: 'Please choose a date in the future',
            position: 'topRight',
            backgroundColor: '#ef4444', 
            titleColor: '#fff',
            messageColor: '#fff',
            progressBarColor: '#b51b1b',
          }

startButton.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
          iziToast.error(errorMsg)
          startButton.disabled = true;
      } else { startButton.disabled = false;
       }
  },
};
flatpickr("#datetime-picker", options);

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

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    daytimePicker.disabled = true;

    let initTime = userSelectedDate.getTime();  
updateInterface(convertMs(initTime - Date.now()));
    intervalID = setInterval(() => {
        const currentTime = Date.now();
       const diff = Math.max(0, initTime - currentTime);
        
        if (diff <= 0) {
            clearInterval(intervalID);
            updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            daytimePicker.disabled = false;
            return; 
        }

        const timeData = convertMs(diff);
        updateInterface(timeData);

        
    }, 1000)

})
function updateInterface({ days, hours, minutes, seconds }) {
    jsDays.textContent = addLeadingZero(days);
    jsHours.textContent = addLeadingZero(hours);
    jsMinutes.textContent = addLeadingZero(minutes);
    jsSeconds.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


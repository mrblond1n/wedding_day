let clock;
$(document).ready(function () {
  // Grab the current date
  let currentDate = new Date();
  // Set some date in the past. In this case, it's always been since Jan 1
  let pastDate = new Date(currentDate.getFullYear(), 0, 1);
  // Calculate the difference in seconds between the future and current date
  let diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;
  // Instantiate a coutdown FlipClock
  clock = $('.clock').FlipClock(diff, {
    clockFace: 'DailyCounter',
    showSeconds: false
  });
});
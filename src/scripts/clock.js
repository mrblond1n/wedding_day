let clock;
$(document).ready(function () {
  // Grab the current date
  let currentDate = new Date();
  // Set some date in the future. In this case, it's always Jan 1
  let futureDate = new Date("August 8, 2019 3:45 PM EDT");
  // Calculate the difference in seconds between the future and current date
  let diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
  // Instantiate a coutdown FlipClock
  clock = $('.clock').FlipClock(diff, {
    clockFace: 'DailyCounter',
    countdown: true,
    showSeconds: false
  });
});
const md = new MobileDetect(window.navigator.userAgent),
  isMobile = md.mobile();

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      const nextOrPrev = direction === 'up' ? 'next' : 'prev';

      scrollToSection(nextOrPrev);
    }
  });
};

wrapper.ontouchmove = e => {
  e.preventDefault();
  console.log('tictoc');
};
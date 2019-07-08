const navBtns = document.querySelectorAll('.contact-slider__nav-btns__item'),
slider = document.querySelector('.contact-slider__list');


for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].onclick = e => {
    slider.style.left = `${i * -100}%`;
  };
};
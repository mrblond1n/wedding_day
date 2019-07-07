const fixNavBtns = document.querySelectorAll('.nav-button__item');
const navBtnList = document.querySelector('.nav-button__list');

for (let index = 0; index < fixNavBtns.length; index++) {

  fixNavBtns[index].onclick = e => {

    for (let i = 0; i < fixNavBtns.length; i++) {
      fixNavBtns[i].classList.remove('nav-button__item--active');
      sections[i].classList.remove('section--active');
    };

    e.currentTarget.classList.add('nav-button__item--active');
    sections[index].classList.add('section--active');

    display.style.transform = `translateY(${index * -100}%)`;
  };
};
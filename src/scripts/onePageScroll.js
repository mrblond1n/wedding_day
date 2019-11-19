const display = document.querySelector('.maincontent'),
  sections = document.querySelectorAll('.section'),
  wrapper = document.querySelector('.wrapper'),
  sectionsArr = [];


for (let i = 0; i < sections.length; i++) {
  sectionsArr.push(sections[i]);
};

let inscroll = false;


// let performTransition = (sectionEq) => {
function performTransition(sectionEq) {

  if (inscroll === false) {

    inscroll = true;

    let position = `${sectionEq * -100}%`;

    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('section--active');
      fixNavBtns[i].classList.remove('nav-button__item--active');
    };
    sections[sectionEq].classList.add('section--active');
    fixNavBtns[sectionEq].classList.add('nav-button__item--active');

    display.style.transform = `translateY(${position})`;

    setTimeout(() => {
      inscroll = false;
    }, 1300);
  };
};


function scrollToSection(direction) {

  const activeSection = document.querySelector('.section--active');

  if (direction === "next" &&
    activeSection.nextElementSibling != null) {
    performTransition(sectionsArr.indexOf(activeSection.nextElementSibling));
  } else if (direction === "prev" &&
    activeSection.previousElementSibling != null) {
    performTransition(sectionsArr.indexOf(activeSection.previousElementSibling));
  };

};


wrapper.onwheel = (e) => {

  let deltaY = e.deltaY;

  if (deltaY < 0) {
    scrollToSection("prev");
  } else if (deltaY > 0) {
    scrollToSection("next");
  };

};


document.onkeydown = e => {
  switch (e.keyCode) {
    case 38:
      scrollToSection("prev");
      break;
    case 40:
      scrollToSection("next");
      break;
    case 32:
      scrollToSection("next");
      break;
  }
};
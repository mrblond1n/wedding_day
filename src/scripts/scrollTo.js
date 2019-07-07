const headerMenuItem = document.querySelectorAll('.menu__link');

for (let i = 0; i < sections.length; i++) {
  headerMenuItem[i].onclick = e => {
    e.preventDefault();

    performTransition(i + 1);
  }
}
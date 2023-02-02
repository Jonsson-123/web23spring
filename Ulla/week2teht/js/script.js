const parallaxWrapper = document.querySelector('.info-text');
const burgerSvg = document.querySelector('.burgerSvg');
const pizzaSvg = document.querySelector('.pizzaSvg');
const toggleNav = document.querySelector('.toggle-nav');
const navBar = document.querySelector('.nav-ul');

console.log("asddasd");

window.addEventListener('mousemove', (evt) => {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;



  let centerx = window.innerWidth / 2;
  let centery = window.innerHeight / 2;


  let from_center_x = centerx - mouseX;
  let from_center_y = centery - mouseY;



  pizzaSvg.style.transform =
    'translateX(' + -from_center_x / 100 + '%) translateY(' + -from_center_y / 100 + '%)';
  burgerSvg.style.transform =
  'translateX(' + -from_center_x / 100 + '%) translateY(' + -from_center_y / 100 + '%)';


});

toggleNav.addEventListener('click', (evt) => {
  evt.preventDefault();
  navBar.classList.toggle('active');
});

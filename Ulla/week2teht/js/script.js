const parallaxWrapper = document.querySelector('.info-text');
const burgerSvg = document.querySelector('.burgerSvg');
const pizzaSvg = document.querySelector('.pizzaSvg');




console.log("asddasd");


window.addEventListener('mousemove', (evt) => {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  console.log('mouseX', mouseX + ' mouseY', mouseY);


  let centerx = window.innerWidth / 2;
  let centery = window.innerHeight / 2;


  let from_center_x = centerx - mouseX;
  let from_center_y = centery - mouseY;

  console.log("fromcenterx", from_center_x);
  console.log("fromcentery", from_center_y);


  pizzaSvg.style.transform =
    'translateX(' + -from_center_x / 100 + '%) translateY(' + -from_center_y / 100 + '%)';
  burgerSvg.style.transform =
  'translateX(' + -from_center_x / 100 + '%) translateY(' + -from_center_y / 100 + '%)';


});

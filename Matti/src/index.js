// Author: Jonsson-123
// Date: 13.1.2023
import Soupphoto from './soup_photo.jpg';
import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';
const headerRight = document.querySelector('.header-right');
headerRight.src = Soupphoto;

//Global variables
let lang = 'fi';
let menuContainers = [];
let activeMenu = [];


/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu, targetElem) => {

  targetElem.innerHTML = '';
  const list = document.createElement('ul');
  const langButton = document.createElement('button');
  const randomButton = document.createElement('button');
  const sortButton = document.createElement('button');


  langButton.textContent = 'Change language';
  randomButton.textContent = 'Pick a random dish';
  sortButton.textContent = 'Sort menu';

  sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(menu), targetElem);
  });

  // Event listener on button to change language
  langButton.addEventListener('click', () => {
    if (lang === 'fi') {
      lang = 'en';
      activeMenu[0] = Sodexo.coursesEn;
      activeMenu[1] = Fazer.coursesEn;
    } else if (lang === 'en') {
      lang = 'fi';
      activeMenu[0] = Sodexo.coursesFi;
      activeMenu[1] = Fazer.coursesFi;
    }
    renderAll();
  }
  );


  randomButton.addEventListener('click', () => {
    alert(getRandomDish(menu));
  });

  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }

  targetElem.append(list);
  targetElem.append(langButton);
  targetElem.append(randomButton);
  targetElem.append(sortButton);
};


/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */

const sortMenu = (menu, order = 'asc') => {
  const newMenu = [...menu];
  newMenu.sort();
  if (order === 'desc') {
    newMenu.reverse();
  }
  return newMenu;
};


/**
 * Get a random dish fron an array
 * @param {Array} menu - Array of dishes
 * @returns random dish item
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

/** Generic function for rendering / rerendering all menus
 *
 */
const renderAll = () => {
  for (const [index, menu] of activeMenu.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
};

/**
 * App initialization
 */
const init = () => {
  activeMenu = [Sodexo.coursesFi, Fazer.coursesFi];
  menuContainers = document.querySelectorAll('.card-text');
  renderAll();
};
init();



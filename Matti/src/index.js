// Author: Jonsson-123
// Date: 21.1.2023
import Soupphoto from './assets/img/soup_photo1.jpg';
import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';
import pwaFunctions from './modules/pwa-module';
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
  langButton.addEventListener('click', async () => {
    // TODO: add real data to Fazer module
    if (lang === 'fi') {
      lang = 'en';
    } else if (lang === 'en') {
      lang = 'fi';
    }
    activeMenu[0] = await Sodexo.getDailyMenu(lang);
    activeMenu[1] = await Fazer.getFazerMenu(lang);
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
  try {
  for (const [index, menu] of activeMenu.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
}
catch (error) {
  console.error('renderAll', error);
}
};

/**
 * App initialization
 */
const init = async () => {

  activeMenu = [await Sodexo.getDailyMenu('fi'), await Fazer.getFazerMenu('fi')];
  menuContainers = document.querySelectorAll('.card-text');
  renderAll();
};

init();

pwaFunctions.applyServiceWorkers();


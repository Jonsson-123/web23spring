// Author: Jonsson-123
// Date: 13.1.2023
import Soupphoto from './soup_photo.jpg';
import Menu from './menu.json';

const headerRight = document.querySelector('.header-right');
headerRight.src = Soupphoto;

let lang = 'fi';
const menuItems = Object.values(Menu.courses);
let activeMenu = [];

/**
 * Creates a menu based on selected language
 * @param {string} lang - Selected language
 * @returns array of dishes
 */
const createActiveMenu = (lang) => {
  activeMenu = [];
  for (const dish of menuItems ) {
  if (lang === 'en'){
    activeMenu.push(dish.title_en);
  } else if (lang === 'fi') {
    activeMenu.push(dish.title_fi);
  }
}
  return activeMenu;
};

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = async (menu) =>  {

  const menuBox = document.querySelector('.item');

  menuBox.innerHTML = '';
  const list = document.createElement('ul');
  const langButton = document.createElement('button');
  const randomButton = document.createElement('button');
  const sortButton = document.createElement('button');

  langButton.textContent = 'Change language';
  randomButton.textContent = 'Pick a random dish';
  sortButton.textContent = 'Sort menu';

  sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(menu));
  });

  // Event listener on button to change language
  langButton.addEventListener('click', () => {
    if (lang === 'fi') {
    lang = 'en';
    } else if (lang === 'en'){
      lang = 'fi';
    }
    renderMenu(createActiveMenu(lang));
  });

  randomButton.addEventListener('click', () => {
    alert(getRandomDish(menu));
  });

  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuBox.append(list);
  menuBox.append(langButton);
  menuBox.append(randomButton);
  menuBox.append(sortButton);
};


renderMenu(createActiveMenu(lang));

/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */
const sortMenu = (menu, order = 'asc') => {
  menu.sort();
  if (order === 'desc') {
    menu.reverse();
  }
  return menu;
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

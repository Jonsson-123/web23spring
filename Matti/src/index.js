// Author: Jonsson-123
// Date: 13.1.2023
import Soupphoto from './soup_photo.jpg';
const headerRight = document.querySelector('.header-right');
headerRight.src = Soupphoto;

const coursesEn = ["Hamburger, cream sauce and poiled potates",
                "Goan style fish curry and whole grain rice",
                "Vegan Chili sin carne and whole grain rice",
                "Broccoli puree soup, side salad with two napas",
                "Lunch baguette with BBQ-turkey filling",
                "Cheese / Chicken / Vege / Halloum burger and french fries"];
const coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
                "Goalaista kalacurrya ja täysjyväriisiä",
                "vegaani Chili sin carne ja täysjyväriisi",
                "Parsakeittoa,lisäkesalaatti kahdella napaksella",
                "Lunch baguette with BBQ-turkey filling",
                "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];

let lang = 'fi';
let activeMenu = coursesFi;

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu) => {
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
    renderMenu(sortMenu(activeMenu));
  });

  langButton.addEventListener('click', () => {
    if (lang === 'fi') {
    changeLanguage('en');
    } else if (lang === 'en'){
      changeLanguage('fi');
    }
  });

  randomButton.addEventListener('click', () => {
    alert(getRandomDish(activeMenu));
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

renderMenu(activeMenu);

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
 * Change UI language
 * @param {string} language
 */
const changeLanguage = (language) => {
  if (language === 'fi') {
    activeMenu = coursesFi;
  } else if (language === 'en') {
    activeMenu = coursesEn;
  }
  lang = language;
  renderMenu(activeMenu);
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



// TODO: Add a button for changing the language of the menu
// TODO: Add a button that picks a random dish from the array and displays it

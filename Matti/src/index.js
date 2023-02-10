// Author: Jonsson-123
// Date: 21.1.2023
import Soupphoto from './assets/img/soup_photo1.jpg';
import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';
import pwaFunctions from './modules/pwa-module';
const headerRight = document.querySelector('.header-right');
const saveButton = document.querySelector('#saveButton');
headerRight.src = Soupphoto;

//Global variables
let darkmode;
let lang = 'fi';
let menuContainers = [];
let activeMenu = [];

let fazerDailyMenu = [];
let sodexoDailyMenu = [];


const restaurants = [
  { name: "Myyrmäki", id: 152, type: "Sodexo" },
  { name: "Karamalmi", id: 3208, type: "Fazer" },
  { name: "Myllypuro", id: 158, type: "Sodexo" },
];

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
    activeMenu[0] = await Sodexo.parseSodexoMenu(sodexoDailyMenu, lang);
    fazerDailyMenu = await Fazer.getFazerMenu(lang);
    activeMenu[1] = Fazer.parseFazerMenu(fazerDailyMenu);
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

  sodexoDailyMenu = await Sodexo.getDailyMenu();
  fazerDailyMenu = await Fazer.getFazerMenu('fi');
  activeMenu = [Sodexo.parseSodexoMenu(sodexoDailyMenu, 'fi'), Fazer.parseFazerMenu(fazerDailyMenu)];
  menuContainers = document.querySelectorAll('.card-text');


  // Combine all the meal names into a single global array
  renderAll();
};

init();
pwaFunctions.applyServiceWorkers();

const input = document.querySelector('.search');


/** Prints a meal name into the input field
 *
 * @param {String} name - Name of a meal
 */
const displayNames = (name) => {
  input.value = name;
  removeElements();
  showMealInfo(name);
};

/** Removes previous listings under search bar
 *
 */
const removeElements = () => {
  //clear all the item
  let items = document.querySelectorAll('.list-items');
  items.forEach((item) => {
    item.remove();
  });
};


/** Prints the nutrient info of a meal
 *
 * @param {*} meal - name of a meal
 */
const showMealInfo = (meal) => {

  // Check if the selected meal belongs to Sodexo menu
  if (activeMenu[0].includes(meal)) {
    // Find the selected meals index
    let selectedIndex = Object.values(activeMenu[0]).indexOf(meal);
    // Find the select info with the index
    let objectOfSelectedIndex = Object.values(sodexoDailyMenu.courses)[selectedIndex];
    // Alert the recipe names and their nutrients

    Sodexo.createAlertStringSodexo(Sodexo.getNutrientsOfMealSodexo(objectOfSelectedIndex));

  }
  // Check if the selected meal belongs to Fazer menu
  if (activeMenu[1].includes(meal)) {
     // Alert the recipe names and their nutrients
    let selectedIndex = Object.values(activeMenu[1]).indexOf(meal);
    Fazer.createAlertStringFazer(Fazer.getNutrientsOfMealFazer(selectedIndex, fazerDailyMenu));
  };
};


// Execute function on keyup, creates an autocomplete listing under search field
input.addEventListener('keyup', (evt) => {

  // A combined array of the activeMenus
  const entireActiveMenus = [...activeMenu[0], ...activeMenu[1]];
  entireActiveMenus.sort();

  // Delete empty meals from array
  const empty = entireActiveMenus.indexOf('no data');
  if (empty !== -1 )entireActiveMenus.splice(empty);

  //loop through above array
  //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (const index of entireActiveMenus) {

    if (index.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != '') {
      //create li element
      const listItem = document.createElement('li');
      //One common class name
      listItem.classList.add('list-items');
      listItem.style.cursor = 'pointer';

      listItem.addEventListener('click', () => {
        displayNames(index);
      });

      //display the value in array (Selects only first word)
      listItem.innerHTML = index.split(',')[0] + '...';
      document.querySelector('.list').appendChild(listItem);
    }
  }
});


/**
 * Saves settings to localstorage
 */
const saveSettings = () => {
  console.log("JEEE");
  const settings = {};
  settings.darkmode = darkmode;
  localStorage.setItem("settings", JSON.stringify(settings));
  //TODO: implement button for saving usersettings
  //TODO : implement ui functionality for adding restaurants
};

saveButton.addEventListener('click', () => {
  saveSettings();
});

/**
 * Changes the lighting option for the website
 */
const changeLighting = () => {
  const body =  document.querySelector('body');
  if (darkmode) {
    body.classList.add('darkmode');
  }
  else {
    body.classList.remove('darkmode');
  }
};

const toggleLightMode = document.querySelector('#togglelightmode');
toggleLightMode.addEventListener('click', () => {
  if (darkmode) darkmode = false;
  else if (!darkmode) darkmode = true;
  changeLighting();

});
/**
 * Loads settings from localstorage
 */
const loadSettings = () => {
  darkmode = (JSON.parse(localStorage.settings)).darkmode;
  changeLighting();
  // TODO: load settings (e.g restaurant array) from localstorage
};
loadSettings();

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


const allMenus = [
  { name: "Myyrmäki", id: 152, type: "Sodexo" },
  { name: "Karamalmi", id: 3208, type: "Fazer" },
  { name: "Myllypuro", id: 158, type: "Sodexo" },
];


/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu, targetElem) => {

  const article = document.createElement('article');
  article.classList.add('item');
  const figure = document.createElement('figure');
  const img = document.createElement('img');

  img.src = './assets/img/sodexo-logo.png';
  img.alt = 'sodexo';
  figure.append(img);
  figure.classList.add('card-img');


  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardTitle = document.createElement('div');
  cardTitle.classList.add('card-title');

  const h3 = document.createElement('h3');
  h3.textContent = 'Sodexo';

  cardTitle.append(h3);

  const cardTitleLocation = document.createElement('div');
  cardTitleLocation.classList.add('card-title-location');
  cardTitleLocation.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svg-location"
  version="1.1" x="0px" y="0px" viewBox="0 0 48 60" style="enable-background: new 0 0 48 48"
  xml:space="preserve">
  <g>
    <path
      d="M9,18c0,7.98,13.63,25.85,14.21,26.61C23.4,44.85,23.69,45,24,45s0.6-0.15,0.79-0.39C25.37,43.85,39,25.98,39,18   c0-8.27-6.73-15-15-15S9,9.73,9,18z M37,18c0,6.27-10.06,20.36-13,24.33C21.06,38.36,11,24.27,11,18c0-7.17,5.83-13,13-13   S37,10.83,37,18z" />
    <path
      d="M14,18c0,5.51,4.49,10,10,10s10-4.49,10-10S29.51,8,24,8S14,12.49,14,18z M32,18c0,4.41-3.59,8-8,8s-8-3.59-8-8s3.59-8,8-8   S32,13.59,32,18z" />
  </g>
</svg>
<span class="location">5km</span>`;

  cardTitle.append(cardTitleLocation);

  const cardText = document.createElement('div');
  cardText.classList.add('card-text');



  const list = document.createElement('ul');
  const langButton = document.createElement('button');
  const randomButton = document.createElement('button');
  const sortButton = document.createElement('button');
  const deleteButton = document.createElement('button');



  langButton.textContent = 'Change language';
  randomButton.textContent = 'Pick a random dish';
  sortButton.textContent = 'Sort menu';
  deleteButton.textContent = 'Delete menu';

  sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(menu), targetElem);
  });

  deleteButton.addEventListener('click', () => {
    targetElem.removeChild(article);
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
  cardText.append(list);
  cardText.append(langButton);
  cardText.append(randomButton);
  cardText.append(sortButton);
  cardText.append(deleteButton);

  cardContent.append(cardTitle);
  cardContent.append(cardText);
  article.append(figure);
  article.append(cardContent);

  targetElem.insertBefore(article, targetElem.firstChild);

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
const renderAll = async () => {
  const targetElem = document.querySelector('.restaurant-area');


  sodexoDailyMenu = await Sodexo.getDailyMenu(152);
  fazerDailyMenu = await Fazer.getFazerMenu('fi');
  activeMenu = [Sodexo.parseSodexoMenu(sodexoDailyMenu, 'fi'), Fazer.parseFazerMenu(fazerDailyMenu)];
  targetElem.removeChild(targetElem.firstElementChild);
  targetElem.removeChild(targetElem.firstElementChild);
  ;
  try {
    for (const [index, menu] of activeMenu.entries()) {
      renderMenu(menu, targetElem);
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
  if (empty !== -1) entireActiveMenus.splice(empty);

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
  const body = document.querySelector('body');
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

const openModalButton = document.querySelector('[data-modal-target]');
const closeModalButton = document.querySelector('[data-close-button]');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');



const openModal = (modal) => {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
};

const closeModal = (modal) => {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');


};

openModalButton.addEventListener('click', () => {
  openModal(modal);
});
closeModalButton.addEventListener('click', () => {
  closeModal(modal);
});
overlay.addEventListener('click', () => {
  closeModal(modal);
});

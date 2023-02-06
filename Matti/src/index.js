// Author: Jonsson-123
// Date: 21.1.2023
import Soupphoto from "./assets/img/soup_photo1.jpg";
import Sodexo from "./modules/sodexo-data";
import Fazer from "./modules/fazer-data";
import pwaFunctions from "./modules/pwa-module";
const headerRight = document.querySelector(".header-right");
headerRight.src = Soupphoto;

//Global variables
let lang = "fi";
const restaurants = [
  { name: "Myllypuro", id: 152, type: "Sodexo" },
  { name: "Karamalmi", id: 3208, type: "Fazer" },
];

const saveSettings = () => {
  const settings = {};
  settings.restaurants = restaurants;
  settings.darkmode = true;
  localStorage.setItem("settings", JSON.stringify(settings));
  //TODO: implement button for saving usersettings
  //TODO : implement ui functionality for adding restaurants
};
saveSettings();

/**
 * Reads user settings from local storage
 */
const loadSettings = () => {
  // TODO: load settings (e.g restaurant array) from localstorage
};
/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu, targetElem) => {
  const menuContainer = document.createElement("article");
  menuContainer.classList.add("item");
  targetElem.append(menuContainer);
  const list = document.createElement("ul");
  const langButton = document.createElement("button");
  const randomButton = document.createElement("button");
  const sortButton = document.createElement("button");

  langButton.textContent = "Change language";
  randomButton.textContent = "Pick a random dish";
  sortButton.textContent = "Sort menu";

  sortButton.addEventListener("click", () => {
    renderMenu(sortMenu(menu), targetElem);
  });

  // Event listener on button to change language
  langButton.addEventListener("click", async () => {
    // TODO: add real data to Fazer module
    if (lang === "fi") {
      lang = "en";
    } else if (lang === "en") {
      lang = "fi";
    }
    targetElem.innerHTML = "";
    renderAll();
  });

  randomButton.addEventListener("click", () => {
    alert(getRandomDish(menu));
  });

  for (const dish of menu) {
    const li = document.createElement("li");
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);
  menuContainer.append(langButton);
  menuContainer.append(randomButton);
  menuContainer.append(sortButton);
  targetElem.append(menuContainer);
};

/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */

const sortMenu = (menu, order = "asc") => {
  const newMenu = [...menu];
  newMenu.sort();
  if (order === "desc") {
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
  let menu;
  const menuWrapper = document.querySelector(".restaurant-area");
  try {
    for (const restaurant of restaurants) {
      if (restaurant.type === "Sodexo") {
        menu = await Sodexo.getDailyMenu(lang, restaurant.id);
      }
      if (restaurant.type === "Fazer") {
        menu = await Fazer.getFazerMenu(lang, restaurant.id);
      }
      renderMenu(menu, menuWrapper);
    }
  } catch (error) {
    console.error("renderAll", error);
  }
};

/**
 * App initialization
 */
const init = async () => {
  loadSettings();
  renderAll();
};

init();

pwaFunctions.applyServiceWorkers();

/**
 * @author Jonsson-123
 */
import fazerMenuAsset from './assets/menu.json';

let meals = [
  { name: 'Lingonberry jam', price: 4.00 },
  { name: 'Mushroom and bean casserole', price: 5.50 },
  { name: 'Chili-flavoured wheat', price: 3.00 },
  { name: 'Vegetarian soup', price: 4.80 },
  { name: 'Pureed root vegetable soup with smoked cheese', price: 8.00 }
];

const fazerMenu = fazerMenuAsset.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components;
});

/** Validates a name for a meal.
 * @param {string} meal meal name.
 * @returns regexp test validation status.
 */
const validateMeal = (meal) => {


  const regexpPattern = /^[A-ZÖÄÅ]{1}[a-zA-ZÖÄÅöäå0-9()\/\-\,\s\\]{3,63}$/;
  return regexpPattern.test(meal);

};
console.log('validateMeal', validateMeal('Mushroom and bean casserole'));

/** Sorts an array based on price with a selected mode
 * @param {*} menu menu of items
 * @param {*} mode mode of calculation
 * @returns
 */
const sortMenuByPrice = (menu, mode) => {
  if (mode === 'desc') {
    return menu.sort((a, b) => b.price - a.price);
  }
  return menu.sort((a, b) => a.price - b.price);
};
console.log('sortMenuByPrice', sortMenuByPrice(meals, 'asc'));


const filterMenuByPrice = (menu, filterPrice) => {
  return menu.filter(dish => dish.price < filterPrice);
};
console.log('filterMenuByPrice', filterMenuByPrice(meals, 5));


const raisePricesOfMenu = (menu, raise) => {
  return menu.map((menu) => {
    return { name: menu.name, price: menu.price * raise };
  });
};

meals = raisePricesOfMenu(meals, 1.2);
console.log('Raised prices:', meals);

const priceOfWholeMenu = (menu) => {
  return menu.reduce((acc, current) => acc + current.price, 0);
};
console.log('priceOfWholeMenu', priceOfWholeMenu(meals));

const getVeganDishes = (menu) => {
  const veganMenu = [];
  menu.forEach(meal => {
      meal.forEach(component => {
        if (component.includes('Veg')){
        veganMenu.push(component);
        };
      });
  });
  return veganMenu;
};

console.log('getVeganDishes', getVeganDishes(fazerMenu));

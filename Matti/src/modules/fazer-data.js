/**
 * Module for Fazer/Foodco menu data parsing
 *
 * @author Jonsson-123
 * @module Fazer
 *
 */

import MenuFi from '../mock-data/fazer-example.json';
import MenuEn from '../mock-data/fazer-example-en.json';
import { doFetch, getWeekdayIndex } from './network';



const coursesFi = MenuFi.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const coursesEn = MenuEn.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const getFazerMenu = async (lang) => {

  try {
  const today = new Date().toISOString().split('T').shift();
  const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=3208&language='+lang+'&date='+today;
  const weeklyMenu = await doFetch(menuUrl, true);
  const menu = weeklyMenu.menus[getWeekdayIndex()];

  if (menu === undefined) {
    alert('no Fazer data for today, showing past fridays data');
    return weeklyMenu.menus[4];
  }
  return weeklyMenu.menus[getWeekdayIndex()];
  } catch (error){
    console.error('getFazerMenu', error);
  }

};
/** Function for parsing fazer menu
 * @param {*} weeklyMenu - Array containing daily Fazer menu
 * @returns meal names from Array
 */
const parseFazerMenu = (dailyMenu) => {
  console.log(dailyMenu);
  if (dailyMenu === undefined) {
    const failedFetch = [];
    return failedFetch[0] = ['no data'];
  }
  const parsedMenu = dailyMenu.menuPackages.map((menuPackage) => {
    return menuPackage.meals.map((mealItem) => {
      return mealItem.name;
    }).join(', ');
   });
  return parsedMenu;
};
/**
 *
 * @param {*} index
 * @param {*} menu
 * @returns
 */
const getNutrientsOfMealFazer = (index, menu) => {

  try {
    const recipeIngridient = [];
    const recipeIngridientInfo = [];
    menu.menuPackages[index].meals.forEach(mealItem => {
      recipeIngridient.push(mealItem.name);
      recipeIngridientInfo.push(Object.entries(mealItem.nutrients));
    });
    return {recipeIngridient, recipeIngridientInfo};
  }
  catch (error) {
    alert('no data');
  }
};

/** Function for creating an alert string with a meal's recipes and their nutrients
 *
 * @param {*} recipeObject - Object containing recipe data
 */
const createAlertStringFazer = (recipeObject) => {

  const recipeItemName = recipeObject.recipeIngridient;
  const recipeItemNameInfo = recipeObject.recipeIngridientInfo;

  let alertString = 'Aterian ravintoarvot: ';
  for (let i = 0; i < recipeItemName.length; i++) {
    alertString += recipeItemName[i];
    alertString += '\n';
    alertString += recipeItemNameInfo[i];
    alertString += '\n';
  }
  alert(alertString);
};


const Fazer = {getFazerMenu, parseFazerMenu, getNutrientsOfMealFazer, createAlertStringFazer};
export default Fazer;

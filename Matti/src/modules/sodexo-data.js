
/**
 * Module for Sodexo menu data parsing
 *
 * @author Jonsson-123
 * @module Sodexo
 *
 */
// MOCK data
//import Menu from '../mock-data/sodexo.json';
import { doFetch, getWeekdayIndex } from './network';

// DAILY URL
//const today = new Date().toISOString().split('T').shift();
//const dailyUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/' + today;


const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';

/** Get daily menu from Sodexo API
 *
 * @param {*} lang - menu language 'fi'/'en'
 * @returns Menu array
 */
const getDailyMenu = async () => {
  try {
  //using dailyUrl
  // const menu = await doFetch(dailyUrl);
  // using weeklyUrl
  const weeklyMenu = await doFetch(weeklyUrl);
  const menu = weeklyMenu.mealdates[getWeekdayIndex()];
  if (menu === undefined) {
    alert('no Sodexo data for today, showing past fridays data');
    return weeklyMenu.mealdates[4];
  }
  return menu;
  } catch (error) {
    console.error('getDailyMenu error', error);
  }

};
/** Function for parsing Sodexo menu
 *
 * @param {*} menu object containing daily Sodexo menu
 * @param {*} lang selected language for meal titles
 * @returns meal names or a 'nodata' menu if data is undefined (this means API fetch failed)
 */
const parseSodexoMenu = (menu, lang) =>  {
  if (menu === undefined){
    const failedFetch = [];
    return failedFetch[0] = ['no data'];
  }
  const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
  const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
  return lang === 'en' ? coursesEn : coursesFi;
};

/** Parses daily menu object's recipes and nutrients of a selected meal
 *
 * @param {*} object meal object
 * @returns object containing recipes and their nutrients
 */
const getNutrientsOfMealSodexo = (object) => {

  try {
    const recipeIngridient = [];
    const recipeIngridientInfo = [];

  Object.values(object.recipes).forEach(recipe => {
    if (recipe.name !== undefined) {
      recipeIngridient.push(recipe.name);
      recipeIngridientInfo.push(recipe.nutrients);
    }
  }
  );
  return {recipeIngridient, recipeIngridientInfo};
}
catch (error) {
  alert('no data');
}
};
/** Function for creating an alert string with a meal's recipes and their nutrients
 *
 * @param {*} recipeObject  Object containing recipe data
 */
const createAlertStringSodexo = (recipeObject) => {

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


const Sodexo = {getDailyMenu, parseSodexoMenu, getNutrientsOfMealSodexo, createAlertStringSodexo};

export default Sodexo;


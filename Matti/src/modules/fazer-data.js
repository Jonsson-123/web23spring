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
  const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=3208&language='+lang+'&date=2023-02-02';
  const menu = await doFetch(menuUrl, true);
  const coursesByMeal = menu.menus[getWeekdayIndex()].menuPackages.map((menuPackage) => {
    return menuPackage.meals.map((menuItem) => {
      return menuItem.name;
    }).join(', ');
   });
   return coursesByMeal;
  } catch (error){
    console.error('getFazerMenu', error);
  }
  const failedFetch = [];
  return failedFetch[0] = ['no data'];
};






const Fazer = {getFazerMenu};
export default Fazer;

/**
 * Module for Fazer/Foodco menu data parsing
 *
 * @author Jonsson-123
 * @module Fazer
 *
 */

import MenuFi from '../mock-data/fazer-example.json';
import MenuEn from '../mock-data/fazer-example-en.json';

const coursesFi = MenuFi.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const coursesEn = MenuEn.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const Fazer = {coursesEn, coursesFi};
export default Fazer;

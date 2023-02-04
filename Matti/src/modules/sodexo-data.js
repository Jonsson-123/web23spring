
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
const getDailyMenu = async (lang) => {
  try {
  //using dailyUrl
  // const menu = await doFetch(dailyUrl);
  // using weeklyUrl
  const weeklyMenu = await doFetch(weeklyUrl);
  const menu = weeklyMenu.mealdates[getWeekdayIndex()];

  const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
  const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
  return lang === 'en' ? coursesEn : coursesFi;
  } catch (error) {
    console.error('getDailyMenu error', error);
  }
  const failedFetch = [];
  return failedFetch[0] = ['no data for today'];
};

const Sodexo = {getDailyMenu};

export default Sodexo;


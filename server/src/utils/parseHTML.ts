import * as cheerio from 'cheerio';
const createSummary = (html: string): string => {
  const $ = cheerio.load(html); // 获取html
  const articleText = $('body').text(); // 获取text
  return articleText.slice(0, 200);
};
export default createSummary;


import { chromium } from 'playwright';

const browser = await chromium.launch({
    headless: false,
    channel: 'msedge'
});
const page = await browser.newPage();
await page.goto('https://itsm.services.sap/now/cwf/agent/home');
// await browser.close();
// console.log("hellow");

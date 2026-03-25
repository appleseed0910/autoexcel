
import { chromium } from 'playwright';

const browser = await chromium.launch({
    headless: false,
    channel: 'msedge'
});
const page = await browser.newPage();
await page.goto('https://itsm.services.sap/now/cwf/agent/record/sn_customerservice_case/575a8cf93b96fadca792519e53e45abc');
// await browser.close();
// console.log("hellow");

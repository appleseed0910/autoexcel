
import { chromium } from 'playwright';

const sampleUrl = 'https://itsm.services.sap/now/cwf/agent/record/sn_customerservice_case/575a8cf93b96fadca792519e53e45abc';

const browser = await chromium.launch({
    // headless: false, // if headless false, then you can see the browser openned
    channel: 'msedge'
});
const page = await browser.newPage();
await page.goto(
    sampleUrl,
    {waitUntil: 'domcontentloaded'}
);

const text = await page.locator('h1').textContent()
console.log(text);

await page.getByRole('tab', { name: 'Record Information'}).click()
const pointer = await page.locator('.needs-clamping').nth(5).getAttribute('title')
console.log(pointer);

browser.close()
console.log("Congrats you have gone so far!");

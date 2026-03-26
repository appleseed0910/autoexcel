
import { chromium } from 'playwright';
import { entries } from './load.ts';

const fetch = async () => {

    // open browser
    const browser = await chromium.launch({
        headless: false, // if headless false, then you can see the browser openned
        channel: 'msedge' // choose one browser that you don't ususally clean sso login information
    });
    const page = await browser.newPage();

    // loop list
    const data = []
    for (const entry of entries) {
        try {
            await page.goto(entry.url, { waitUntil: 'domcontentloaded' })

            const title = await page.locator('h1').textContent()
            console.log(title);

            await page.getByRole('tab', { name: 'Record Information' }).click()

            // Bad selector lol
            let pointer = await page.locator('.needs-clamping').nth(5).getAttribute('title')

            // if the case contains a field "Tenant Type" then the pointer whould be 7th element
            if (pointer?.length !== 24) pointer = await page.locator('.needs-clamping').nth(6).getAttribute('title')
            console.log(pointer);

            data.push({
                cell: entry.cell,
                title,
                pointer
            })
        } catch (e) {
            console.error('Faild on URL ' + '${url}');
        }
    }

    // close browser after list done
    await browser.close()
    return data
}

export default fetch



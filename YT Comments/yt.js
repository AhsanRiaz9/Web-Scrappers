
const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {

    url=`https://www.youtube.com/watch?v=LVlVCgkBQ3w`;
    
    const browser = await puppeteer.launch( {'headless' : false} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    await page.evaluate(() => {
        window.scrollBy(0,);
    });

    await page.waitForSelector("#content-text");

    //extracting data
    const comments = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#content-text")).map(comment=>comment.innerHTML)
    )

    console.log(comments);
    
    //await browser.close();
})();
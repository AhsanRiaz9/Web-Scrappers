const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    url=`https://play2048.co/`;
    
    const browser = await puppeteer.launch( {'headless' : false} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 1280 });
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var sequence = ["ArrowDown","ArrowLeft","ArrowRight","ArrowUp"];

    while(true)
    {
        await page.keyboard.press(sequence[0]);
        await page.keyboard.press(sequence[1]);
        await page.keyboard.press(sequence[2]);
        await page.keyboard.press(sequence[3]);
        utils.shuffle(sequence);
    }

    await browser.close();
})();
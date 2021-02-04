const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    var path = 'z';
    url=`https://scrabble.merriam.com/words/start-with/${path}`;
    
    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var results = [];

    results = await extractedEvaluateCall(page);
    console.log(results);
    utils.ArrayToTxt(results,`${path}.txt`);
        
    await browser.close();
})();

async function extractedEvaluateCall(page) 
{
    return page.evaluate(() => {
        let name = Array.from(document.querySelectorAll(".wres_ul li a")).map(link=>link.innerHTML);
        return name;
    });
}

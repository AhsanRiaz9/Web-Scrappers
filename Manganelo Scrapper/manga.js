const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    url=`https://manganelo.link/manga/shingeki-no-kyojin/shingeki-no-kyojin-chapter-127/`;
    
    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var results = [];

    results = await extractedEvaluateCall(page);
    console.log(results);
    
    for (let index = 0; index < results.length; index++) 
    {
        utils.download(results[index],`./images/${index}.jpg`,()=>{
            console.log(index+ ".jpg done");
        });
    }

    await browser.close();
})();

async function extractedEvaluateCall(page) 
{
    return page.evaluate(() => {
        let name = Array.from(document.querySelectorAll(".page-break img")).map(link=>link.src);
        return name;
    });
}
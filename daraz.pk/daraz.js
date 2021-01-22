const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    url="https://www.daraz.pk/laptops/?spm=a2a0e.home.cate_1.4.35e349373bwClC";
    totalPages =4;

    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var results = [];
    for(let currentPage = 0; currentPage < totalPages ; currentPage++)
    {
        console.log("-------------Scrapping PAGE "+(currentPage+1)+"-----------------");
        results = results.concat(await extractedEvaluateCall(page));
        await page.click("li[title='Next Page']>.ant-pagination-item-link");
        await page.reload();
    }
    utils.StoreJSON(results,'./data.json');

    await browser.close();
})();

async function extractedEvaluateCall(page) 
{
    return page.evaluate(() => {
        let data = [];
        let price = Array.from(document.querySelectorAll('span[class="c13VH6"]')).map((val)=>val.innerHTML);
        let name =  Array.from(document.querySelectorAll('div[class="c16H9d"] a')).map((val)=>val.innerHTML);
        
        for(let i=0;i<price.length;i++)
        {
            let Price = price[i];
            let Name = name[i];
            data.push({ Price, Name });
        }
        return data;
    });
}
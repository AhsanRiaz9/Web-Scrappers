const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
    
    url="https://www.daraz.pk/groceries-laundry-household-paper/?spm=a2a0e.searchlistcategory.cate_6_6.6.64d96c28bnMgVB";
    totalPages = 4;  //-1 for infinte pages

    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var results = [];

    // if using -1 noOfPages than please swap < with >

    for(let currentPage = 0; currentPage < totalPages ; currentPage++)
    {
        console.log("-------------Scrapping PAGE "+(currentPage+1)+"-----------------");
        results = results.concat(await extractedEvaluateCall(page));
        try{
            await page.click("li[title='Next Page']>.ant-pagination-item-link");
            await page.reload();
        }catch(e){
            console.log("Finished Scrapping!");
            break;
        }
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
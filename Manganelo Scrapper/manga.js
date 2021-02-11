const puppeteer = require('puppeteer');
const utils = require('../utils');
const fs = require('fs');

(async () => {
    
    url=`https://manganelo.link/manga/ultimate-scheming-system/chapter-1/`;
    
    const browser = await puppeteer.launch( {'headless' : true} );
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("URL Loaded...");

    var results = [];
    var heading =[];

    //extracting data
    results = await extractImages(page);
    heading = await extractHeading(page);

    //extract manga details
    var chapterNo = heading[heading.length - 1];
    var dashIndex = utils.searchInArray("-",heading);
    var mangaName = utils.concatStringsFromArray(0,dashIndex,heading);

    //create folders
    fs.mkdir(`./${mangaName}/Chapter${chapterNo}`,{recursive:true},(err) => {
        if (err) throw err;
    });

    for (let i = 0; i < results.length; i++) 
    {
        utils.download(results[i],`./${mangaName}/Chapter${chapterNo}/${i}.jpg`,()=>{
            console.log("downloading "+i+ ".jpg");
        });
    }
    await browser.close();
})();

async function extractImages(page)
{
    return page.evaluate(() => {
        let name = Array.from(document.querySelectorAll(".page-break img")).map(link=>link.src);
        return name;
    });
}

async function extractHeading(page)
{
    return page.evaluate(() => {
        let heading = document.getElementById("chapter-heading").innerHTML.split(" ");
        return heading;
    });
}
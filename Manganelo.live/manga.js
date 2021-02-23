const puppeteer = require('puppeteer');
const utils = require('../utils');
const fs = require('fs');

(async () => {
    
    // node manga.js https://manganelo.link/manga/shingeki-no-kyojin/shingeki-no-kyojin-chapter-130/
    url = process.argv[2];
    
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
        utils.download(results[i],`./${mangaName}/Chapter${chapterNo}/${i+1}.jpg`,(err)=>{
            if(err) 
                throw err;
            else
            {
                console.log(`${i+1}.jpg done`);
            }
        });
    }
    console.log(`Chapter ${chapterNo} Downloaded`);

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
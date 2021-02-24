
const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {

    url=`https://www.youtube.com/watch?v=MrOVx-BUx9M&list=LL&index=11`
    
    const browser = await puppeteer.launch({
        'headless' : false,
        defaultViewport: {width: 1920, height: 1080}
    })
    console.log("browser launched...");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle2'})
    console.log("URL Loaded...");

    await page.keyboard.press("PageDown",{delay: 100})
    await page.waitForTimeout(2000)
    await page.waitForSelector(".ytd-comments-header-renderer span")
    const noOfComments = await page.$eval('.ytd-comments-header-renderer span',val=>val.innerHTML)
    var val = String(noOfComments);
    val = val.split(',').join('')
    console.log(val)
    var scrollNumber = Number(val)/10;
    console.log(scrollNumber)
    for (let i = 0; i < scrollNumber ; i++){
        await page.keyboard.press("PageDown",{delay: 500})
        console.log(i+1);
    }

    await page.waitForSelector("#content-text")

    //extracting data
    const comments = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#content-text")).map(comment=>comment.innerText)
    )

    console.log(comments);
    console.log(comments.length);
    
    //await browser.close();
})();
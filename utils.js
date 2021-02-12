const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');

exports.download = async function(url, filename, callback){
    try{
        if(!fs.existsSync(filename))
        {
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(filename, buffer, callback);
        }
    }
    catch(e){
        console.log(e);
    }
};

exports.StoreJSON = (myArray,path)=>{
    content=JSON.stringify(myArray,null,3);
    fs.writeFile(path,content,
        function (err) {
            if (err) {
                console.error('File Was Not Created.');
            }
        }
    );
    console.log(`File Created at ${path}`);
}

exports.ArrayToTxt = (myArray,path)=>{
    content=myArray.toString();
    fs.writeFile(path,content,
        function (err) {
            if (err) {
                console.error('File Was Not Created.');
            }
        }
    );
    console.log(`File Created at ${path}`);
}

exports.concatStringsFromArray = (start,end,array)=> {
    let str="";
    for (let i = start; i < end; i++) 
    {
        str = str.concat(array[i]);
    }
    return str;
}

exports.searchInArray = (str, strArray)=> {
    for (var j=0; j<strArray.length; j++) 
    {
        if (strArray[j].match(str))
            return j;
    }
    return -1;
}

exports.padded = (num , format) => {
    var str = "" + num;
    var ans = format.substring(0, format.length - str.length) + str;
    return ans;
}

exports.shuffle = (array)=> {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) 
    {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
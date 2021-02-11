const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');

exports.download = async function(url, filename, callback){
    try{
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(filename, buffer, callback);
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
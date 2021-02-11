const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');

exports.download = async function(url, filename, callback){
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(filename, buffer, callback);
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
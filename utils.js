const fs = require('fs');
const request = require('request');

exports.download = (url, path, callback)=>{
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback);
    });
}

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
// // 读取本地的文件,然后在 html 中显示出来
// var fs = require('fs');
// var http = require('http');
// http.createServer(function (req, res) {
//     // var read = fs.createReadStream('./output.txt');
//     // read.setEncoding('utf-8');
//     // read.on('data', function (thunk) {
//     //     res.write(thunk);
//     // })
//     // read.on('end', function () {
//     //     res.end();
//     // })
//     fs.readFile('output.txt', 'utf-8', function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
//             res.write(data);
//             res.end();
//         }
//     })
// }).listen('8888');
// console.log('端口号8888启动');

var readTxt = require('./module-read');
readTxt.read('./output.txt')
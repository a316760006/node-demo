var fs = require('fs');
// 接受文件数据的变量
var data = '';

var read = fs.createReadStream('output.txt');

// 设置编码为 utf8
read.setEncoding('utf-8');

// 处理事件流 --> data, end, and ero
read.on('data', function (chunk) {
    data += chunk;
    console.log('读取中')
});
read.on('end', function () {
    console.log(data);
});
read.on('error', function (err) {
    console.log(err.stack);
});
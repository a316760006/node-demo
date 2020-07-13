var fs = require('fs');
// 创建一个可读文本流
var readerStream = fs.createReadStream('output.txt');
readerStream.setEncoding('utf-8');

// 写的文本流
var writeStream = fs.createWriteStream('pipeout.txt');

readerStream.pipe(writeStream);
console.log('end');
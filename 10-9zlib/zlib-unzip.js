// 解压文件 --> 反向操作
// 引入模块
var fs = require('fs');
var zlib = require('zlib');

// 定义一个解压方式 gunzip
var gunZip = zlib.createGunzip();
// 定义另一个解压方式 Inflate
var inflate = zlib.createInflate();

// 分别创建可读和可写的文件流
var inFileByGzip = fs.createReadStream('outputgzip.gz');
var inFileByInflate = fs.createReadStream('outputdeflate.gz');

// 解压后的文件
var outFileByGunzip = fs.createWriteStream('outputgzip.txt');
var outFileByInflate = fs.createWriteStream('outputdeflate.txt');

// 1 pipe: 压缩文件;  2 pipe: 输出到可写文件流
inFileByGzip.pipe(gunZip).pipe(outFileByGunzip);
console.log('gunzip file is ok')
inFileByInflate.pipe(inflate).pipe(outFileByInflate);
console.log('inflate file is ok')
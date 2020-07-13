// 引入模块
var fs = require('fs');
var zlib = require('zlib');

// 定义一个压缩方式 gzip
var gZip = zlib.createGzip();
// 定义另一个压缩方式 deflate
var deflate = zlib.createDeflate();

// 分别创建可读和可写的文件流
var inFile = fs.createReadStream('output.txt');
var outFileByGzip = fs.createWriteStream('outputgzip.gz');
var outFileByDeflate = fs.createWriteStream('outputdeflate.gz');

// 1 pipe: 压缩文件;  2 pipe: 输出到可写文件流
inFile.pipe(gZip).pipe(outFileByGzip);
console.log('gzip file is ok')
inFile.pipe(deflate).pipe(outFileByDeflate);
console.log('deflate file is ok')
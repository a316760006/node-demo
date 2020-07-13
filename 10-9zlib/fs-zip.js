// 将文件压缩
// 引入
var fs = require('fs');
var zlib = require('zlib');

// 创建一个可读流,读取文件 ----> 引入需要压缩的文件
var readStream = fs.createReadStream('output.txt');
// 通过管道,压缩文件
var zipFile = readStream.pipe(zlib.createGzip());
// 创建一个写入的流  gz 是 gzip 压缩后的文件后缀名
var writerStream = fs.createWriteStream('gzip.txt.gz');
// 现在 gzip.txt.gz 里是没有任何内容的

// 已有的文件 pipe 写入的文件
// 通过 pipe 方法把压缩好的文件写入到 创建的文件流
zipFile.pipe(writerStream);

console.log('end');
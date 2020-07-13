var fs = require('fs');

//创建一段文本作为写入的内容
var data = '你好，我是一段文字，一会被写入文档内';

// 创建一个写入数据流
// 新建一个txt文件作为写入的文件

var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'utf8');

// 写入结束事件
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

// writerStream.on('data', function() {
//     console.log("写入ing...");
// });

writerStream.on('error', function(err){
    console.log(err.stack);
 });
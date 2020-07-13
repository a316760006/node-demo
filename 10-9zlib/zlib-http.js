// 引入模块
var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

var gunZip = zlib.createGunzip();
var inflate = zlib.createInflate();

var gZip = zlib.createGzip();
var deflate = zlib.createDeflate();
// 客户端
var request = http.get({
    host: '127.0.0.1',
    path: '/',
    port: 80,
    headers: { 'Accept-Encoding': 'gzip, deflate' }
})
// 在客户端定义响应事件
request.on('response', function (res) {
    // 创建一个文件流
    var output = fs.createWriteStream('index.html');
    // 返回的 headers 里的 content-encoding
    var zipType = res.headers['content-encoding'];
    if (zipType == 'gzip') {
        res.pipe(gunZip).pipe(output);
    }
    if (zipType == 'deflate') {
        res.pipe(inflate).pipe(output);
    }
})
// 服务器端
http.createServer(function (req, res) {
    var input = fs.createReadStream('index.html');
    console.log(req);
    // 判断客户端 headers
    var codingType = req.headers['content-encoding'];
    if (!codingType) {
        codingType = '';
    }
    if (codingType.indexOf('gzip') > -1) {
        // 定义客户端响应 head 中的 content-encoding
        res.writeHead(200, { 'content-encoding': 'gzip' });
        // 1 pipe 将服务器端的文件压缩
        // 2 pipe 将压缩后的文件写入 res 中
        input.pipe(gZip).pipe(res);
    } else if (codingType.indexOf('deflate') > -1) {
        // 定义客户端响应 head 中的 content-encoding
        res.writeHead(200, { 'content-encoding': 'deflate' });
        // 1 pipe 将服务器端的文件压缩
        // 2 pipe 将压缩后的文件写入 res 中
        input.pipe(deflate).pipe(res);
    } else {
        console.log('该服务器无法压缩文件')
        res.writeHead(200, {});
        input.pipe(res);
    }
}).listen(2222);
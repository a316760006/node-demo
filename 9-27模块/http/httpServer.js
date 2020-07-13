// http模块化

// request 请求的参数 response 返回的结果
// response.writeHead(状态码) content-Type 文本类型
// response.end('');
// listen(8888)
var http = require('http');
http.createServer(function (request, response) {        // 简写: rerq  res
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello world\n');
}).listen('8888');
console.log('Server runding at http://127.0.0.1:8888/');
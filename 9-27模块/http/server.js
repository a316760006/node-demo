var http = require('http');
exports.server = function (content, port) {
    let post = port || '8081';
    http.createServer(function (req, res) {
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end(content);
    }).listen(post);
    console.log('端口号 ' + post + ' 启动');
}
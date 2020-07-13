var fs = require('fs');
var app = require('../9-27模块/http/server');
// 1. exports --> 供外部文件使用
// 2. 写函数体
function read(file, error, success) {
    if (!file) {
        console.log('缺少必要参数')
    } else {
        // http.createServer(function (req, res) {
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
                (error && typeof eror === 'function') ? error : console.log(err);
            } else {
                app.server(data, 3333);
            }
        })
        // }).listen('8888');
    }
}
exports.read = read;
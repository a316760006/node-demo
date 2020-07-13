// 404 错误

const express = require('express');
const fs = require('fs');
let app = express();

// 1. 声明一个路由中间件
let router = express.Router();
router.get('/', (req, res, next) => {
    try {
        fs.readFileSync('./xxx/aaa.txt');
    } catch (err) {
        // throw err;
        next(err);
        console.log('错误信息', err)
    }
})
    .all('*', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' })
        res.end('404,页面未找到')
    })
app.use(router);
// 处理 next(err)   err 参数是第一个参数
app.use((err, req, res, next) => {
    res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' })
    res.end('😱服务器错误,请联系管理员后重试!')
})
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})

// 服务器错误
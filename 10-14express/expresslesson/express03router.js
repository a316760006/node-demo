// express 路由
// 1. 引入 express
const express = require('express');
// 2. 构建 http 服务器
let app = express();

// 1. 声明一个路由中间件
let router = express.Router();
// 2. 配置路由  get post
router.get('/home', (req, res) => {
    res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
    res.end('<h1>主页</h1><p>这是有个主页页面</p>');
    console.log('主页');
})
    .get('/list', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>列表</h1><p>这是有个列表页页面</p>');
        console.log('列表页');
    })
    .get('/details', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>详情页</h1><p>这是有个详情页页面</p>');
        console.log('详情页');
    })
    .get('/user', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>用户页</h1><p>这是有个用户页页面</p>');
        console.log('用户页');
    })
// 3. 将配置好的路由通过 use 方法使用到 express 中
app.use(router);

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})
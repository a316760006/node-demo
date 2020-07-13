// 菜单栏
// 1. 引入express
const express = require('express');

// 2. 构建 http 服务器
// 原生的构建方式
let app = express();

// 3. 请求与响应
// app.use(虚拟目录,fn回调函数)

// 设置主页
// next
app.use('/home', (req, res, next) => {
    // 因为用到中文,最好设置一个头
    res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
    res.end('<h1>主页</h1><p>这是有个主页页面</p>');
    console.log('主页');
    // next();
})
    // 设置列表页,  链式操作,直接再次 .use
    .use('/list', (req, res, next) => {
        // 因为用到中文,最好设置一个头
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>列表页</h1><p>这是有个列表页页面</p>');
        console.log('列表页');
        // next();
    })
    // 设置详情页
    .use('/details', (req, res, next) => {
        // 因为用到中文,最好设置一个头
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>详情页</h1><p>这是有个详情页页面</p>');
        console.log('详情页');
        // next();
    })
    // 设置用户页
    .use('/user', (req, res, next) => {
        // 因为用到中文,最好设置一个头
        res.writeHead(200, { 'content-Type': 'text/html;charset=UTF8' });
        res.end('<h1>用户页</h1><p>这是有个用户页页面</p>');
        console.log('用户页');
        // next();
    })
// 4. 侦听端口
app.listen(3000, () => {
    console.log('Server started at http://127.0.0.1:3000')
})
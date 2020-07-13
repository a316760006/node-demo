// 大转盘
// 入口文件

const express = require('express');
const path = require('path');
const template = require('./module/template');
const router = require('./module/router');

let app = express();
// 注册模版引擎
template.init(app);


// 设置静态资源目录
app.use(express.static(path.resolve('./public')));

// 将路由引入
app.use(router);

app.listen(3000,()=>{
    console.log('http://localhost:3000');
});
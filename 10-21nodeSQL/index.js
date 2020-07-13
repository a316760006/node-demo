// 图书管理系统
// 入口文件
const express = require('express');
const path = require('path');
const template = require('./modules/template');
const router = require('./modules/router');
const bodyParser = require('body-parser');
let app = express();

// 注册模板引擎
template.init(app);
// 挂载参数处理中间件
// 处理 json 格式的参数
app.use(bodyParser.json());
// 处理表单数据
app.use(bodyParser.urlencoded({ extended: false }));


// 设置静态资源目录
app.use(express.static(path.resolve('./public')));

// 将路由引入
app.use(router)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
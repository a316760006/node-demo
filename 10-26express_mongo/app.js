// 学生学籍管理系统
// 入口文件

const express = require('express');
const path = require('path');
const template = require('./module/template');
const router = require('./module/router');
const bodyParser = require('body-parser');

let app = express();
// 1 提升到全局
global.app = app;

// 注册模版引擎
template.init(app);

//挂载参数处理中间件
//处理json格式的参数
app.use(bodyParser.json());
//处理表单数据
app.use(bodyParser.urlencoded({ extended: false }));

// 设置静态资源目录
app.use(express.static(path.resolve('./public')));
// 默认没有登录状态 *******
app.locals.isLogin = !1;
app.locals.loginName = undefined;
// console.log(app);

// 在express3.x版本后就可以用另一种简单的写法来操作
// app.locals.num=1;
// express2.x的写法
// app.set('view options',{imports:{num:1}})
// 将路由引入
app.use(router);

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
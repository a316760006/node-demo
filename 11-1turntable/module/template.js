// 模版模块处理
// 引入模版
const art_template = require('express-art-template');
const path = require('path');

const template = {
    init:init      //模版注册并完成并要的代码编写
}
// 如果直接运行会报错
function init(app){
    //2.1 注册模版引擎
    app.engine('html',art_template);
    // 2.2 设置默认模版引擎
    app.set('view engine', 'html');
    // 2.3 express使用模版，默认在app.js同级的views目录中
    app.set('views', path.resolve('./views'));
    //如果用dirname的话，注意拼接路径时，要先返回上一级
}
module.exports = template

// 模板模块处理
// 引入模块
const art_template = require('express-art-template');
const path = require('path');

const template = {
    init: init   // 模板注册并完成必要的代码编写template
}
function init(app) {
    // 注册一个模板引擎 art 就是 .html 的意思
    app.engine('art', art_template);
    // 设置默认模板引擎
    app.set('view engine', 'art');
    // 设置模板引擎的静态目录
    // 使用相对路径
    app.set('views', path.resolve('./views'));
    //只写 __dirname 的话,他自动寻找的是 modules 文件夹,所以需要返回上一级
    // app.set('views', path.join(__dirname, '../', 'views'));
}
module.exports = template
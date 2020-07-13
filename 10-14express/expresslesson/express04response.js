// response 返回的参数
// http: res.end()    可以接受的参数只有2个类型 string || buffer
// express 扩展了很多 res 的方法
// 1. res.json          ajax 会经常用到
// 2. res.redirect      重定向 url
// 3. res.download      下载文件
// 4. res.jsonp         跨域传值

// 1. 引入 express
const express = require('express');
// 2. 构建 http 服务器
let app = express();
// 1. 声明一个路由中间件
let router = express.Router();
// json 控制台的 response heades Etag   设置过期事件
router.get('/json', (req, res) => {
    res.json(
        {
            'name': '张三',
            'age': 18,
            'class': ['语文', '数学', '英语']
        }
    )
})
    // 通过 Response Headers 的 Location 跳转到网址
    .get('/redirect', (req, res) => {
        res.redirect('https://www.baidu.com');
    })
    .get('/download', (req, res) => {
        res.download('./express01.js');
    })
    // jsonp 传入回调函数 callback 
    .get('/jsonp', (req, res) => {
        res.jsonp('express is excellent framework');
    })
// 3. 将配置好的路由通过 use 方法使用到 express 中
app.use(router);
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})
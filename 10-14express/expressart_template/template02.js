const express = require('express');
const art_template = require('express-art-template');
const path = require('path');
const formidable = require('formidable');

let app = express();
let router = express.Router();

let list_data = [
    // {
    //     name: '吕布',
    // },
    // {
    //     name: '刘备',
    // },
    // {
    //     name: '关羽',
    // },
    // {
    //     name: '张飞',
    // }
]
// 2.1 注册模板引擎
//      app.engine(文件后缀名,模板引擎)
app.engine('.html', art_template)
// 2.2 设置默认模板引擎
//      app.set('view engine', 文件后缀名)
app.set('view engine', '.html');
// 2.3 express 使用模板,默认在 app.js 同级的 views 目录中
// path.join('/aaa/bbb','ccc','ddd'); 拼接目录
// 目的: 就是将 views 目录下的 html 文件用 art-template 模板引擎去渲染
app.set('views', path.join(__dirname, 'views'));


// app.set('view options', {
//     debug: process.env.APP_IS_PRODUCTION !== 1,
//     // 不会压缩,不会删注释和 log
//     // imports: 导入数据,预处理一些必要的数据
//     imports: {
//         num: 1,
//         sayhello: (str) => {
//             return 'hello' + str;
//         }
//     }
// })

// 2.6 设置静态资源文件夹
//      app.use(express.static())
//      app.use(静态目录,express.static())
// app.use('/', express.static('./public'));
// 当定义静态目录时,这个目录并不需要是真实存在的
app.use(express.static('./public'));

// 2.4 res.render(文件名,数据对象)
router.get('/', (req, res) => {
    res.render('index.html',
        { list_data }       // 必须是一个 json 对象
    );
})
    .post('/add', (req, res, next) => {
        // 解析前端发送过来的内容
        // formidable
        // 1. 实例化表单数据 IncomingForm
        let form = new formidable.IncomingForm();
        // 2. 设置一些参数  文件上传路径(必须是真实存在的目录)
        form.uploadDir = path.join(__dirname, 'public', 'imgs');
        form.keepExtensions = true; //是否保留文件后缀名
        form.parse(req, function (err, fields, files) {
            // error  就是传文件出错时
            if (err) {
                next();
            } else {
                console.log(files)
                // console.log(files)
                // 将传输的数据写入 list_data 对象里
                let name = fields.name;
                // 解析图片路径
                // 通过 base 获取名字
                let img = 'imgs/' + path.parse(files.img.path).base;
                // 传入 list_data
                list_data.push({
                    name, img
                })
                //刷新页面
                res.redirect('/');
            }
        })
    })
    .all('*', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' })
        res.end('404,页面未找到')
    })
app.use(router);
// 处理服务器错误   err 参数是第一个参数
app.use((err, req, res, next) => {
    res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' })
    res.end('😱服务器错误,请联系管理员后重试!')
})
app.listen(3003, () => {
    console.log('Serve started at http://127.0.0.1:3003')
})

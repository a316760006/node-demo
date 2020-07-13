const express = require('express');
const art_template = require('express-art-template');
const path = require('path');
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


// 2.4 res.render(文件名,数据对象)
router.get('/', (req, res) => {
    res.render('list.html',
        { list_data }       // 必须是一个 json 对象
    );
})
app.use(router);
app.listen(3000, () => {
    console.log('Serve started at http://127.0.0.1:3000')
})

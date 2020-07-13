const express = require('express');
const art_template = require('express-art-template');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
// 1.引入mongoose
// const mongoose = require('mongoose');

let app = express();
let router = express.Router();

// __dirname
let data_path = path.join(__dirname, 'data') + '/data_list.json';
let list_data = JSON.parse(fs.readFileSync(data_path).toString());

// 1.注册默认模板引擎
app.engine('.html', art_template);
// 2.设置默认模板
app.set('view engine', '.html');
// 3.express 使用模板,默认在app.js同级的views目录中
app.set('views', path.join(__dirname, 'views'));
// 4.定义静态目录
app.use(express.static('./public'));
// 5.res.render(文件名,数据对象)
router.get('/', (req, res) => {
    res.render('index.html',
        { list_data }     // 必须是一个json对象
    )
})
    .post('/add', (req, res, next) => {
        // 1.实例化表单数据
        let form = new formidable.IncomingForm();
        // 2.设置一些参数,文件上传路径(必须是真实存在的目录)
        form.uploadDir = path.join(__dirname, 'public', 'imgs');
        // 是否保留文件后缀名
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
            } else {
                // 将传输的数据写入 list_data 对象里
                let name = fields.name;
                let img = 'imgs/' + path.parse(files.img.path).base;
                list_data.push({
                    name, img
                })
                console.log('新增了一条数据', list_data);
                // 将 list_data 数据写入到 data_list.json 文件里
                // 通过 json.stringify 将 list_data 转换成字符串
                fs.writeFile(data_path, JSON.stringify(list_data), (err) => {
                    console.log('写文件');
                    // 刷新页面
                    res.redirect('/');
                })


                // //如果你的数据库名不是buba，那么就把buba改成你自己的数据库名
                // mongoose.connect('mongodb://127.0.0.1:27017/fs', {
                //     useNewUrlParser: !0,
                //     useUnifiedTopology: !0
                // });
                // // 创建构造函数
                // let fs_list = Mongo({
                //     adminname: {
                //         type: String,
                //         required: true
                //     },
                //     password: {  
                //         type: String,
                //         required: true
                //     },
                //     level: {
                //         type: Number,
                //         default: 1 //级别
                //     }
                // });
                // let fsModel = mongoose.model('Admin', fs_list);
                // fsModel.insertMany().then()

            }
        })
    })
    .all('*', (req, res) => {
        res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' });
        res.end('404,页面未找到')
    })
app.use(router);
app.use((err, req, res, next) => {
    res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' });
    res.end('😱服务器错误,请联系管理员后重试!')
})
app.listen(3001, () => {
    console.log('Serve started at http://127.0.0.1:3001')
})
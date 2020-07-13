// 服务处理模块
const fs = require('fs');
const path = require('path');
const data = require('../data.json');
// 获取 data 数据 id 的最大值
let generateBookId = () => {
    let arr = [];
    data.forEach((item) => {
        arr.push(item.id);      // 将 data 里的 id 数据导出到 arr 数组
    })
    // 取出 arr 数组中的最大值 +1
    return Math.max.apply(null, arr) + 1;
}
// 根据 id 获取对应的数据
// 已知 data id 求 id 对应的 那一条 json 数据
let getBookById = (id) => {
    let book = {};
    data.filter((item) => {
        if (item.id == id) {
            book = item;
        }
    })
    return book;
}
// 删除数组中的图书
let delBookItem = (id) => {
    let book = data.filter((item) => {
        return item.id != id
    })
    return book
}
// 写入文件
let writeBookFile = (push_data, res) => {
    console.log(push_data);
    fs.writeFile(path.resolve('./data.json'), JSON.stringify(push_data, null, 4), 'utf8', (err) => {
        err ? res.send('server error') : res.redirect('/');
    })
}

let replaceBookById = (push_data) => {
    data.forEach((item) => {
        if (item.id == push_data.id) {  // 找到数据
            for (key in item) {
                item[key] = push_data[key];  // 替换
            }
        }
    })
    return data
}

// 第一种
exports.indexHandle = (req, res) => {
    res.render('index', { data });
}
exports.status404 = (req, res) => {
    res.render('404', {});
}
// 添加图书页面
exports.addbookHref = (req, res) => {
    // 去往模板 url
    res.render('addbook', {});
}
// 添加图书
exports.addHandle = (req, res) => {
    // 接受前端的数据   req.body
    let push_data = req.body;
    let book = {
        id: generateBookId()
    }
    for (key in push_data) {
        book[key] = push_data[key];
    }
    data.push(book);
    // 将 data 写入 data.json
    //JSON.stringify多传2个参数 null 4使data.json格式化一下
    writeBookFile(data, res);
}
// 编辑图书页面
exports.editbookHref = (req, res) => {
    // 去往编辑图书页面
    let id = req.query.id;
    let book = getBookById(id);
    res.render('editbook', { book })
}
//处理编辑图书功能
exports.editbook = (req, res) => {
    let push_data = req.body;
    // 1. 找到对应的数据
    // 2. 将对应的数据替换
    let book = replaceBookById(push_data)
    // 3. 写入 data.json
    writeBookFile(book, res);
}
// 处理删除图书
exports.delBook = (req, res) => {
    let id = req.query.id;
    push_data = delBookItem(id);
    // 把新的图书数组写入 json 文件
    writeBookFile(push_data, res);
    res.redirect('/');
}









// 第二种
// let service = {
//     indexHandle: (req, res) => {
//         res.render('index', { data });
//     },
//     status404: (req, res) => {
//         res.render('404', { data });
//     }
// }
// module.exports = service
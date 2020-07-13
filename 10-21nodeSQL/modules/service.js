// 服务处理模块
const fs = require('fs');
const path = require('path');
const data = require('../data.json');
const mysql = require('./mysql');
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
    // console.log(push_data);
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
    // 从 mysql 查询数据
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');

    // 分页查询
    // sql
    // limit 语句 ==>   limit index,length   index 默认为0
    // 从第 index 开始取出 length 条记录
    // 通过一个临时表来获取该数据表的总记录数
    // 获取总记录数
    // 'select count(*) as _c from book_list '
    let sql = 'SELECT _b.*, book_list.* FROM (SELECT count(*) AS _c FROM book_list WHERE delete_flag=0) AS _b,book_list WHERE delete_flag=0 ORDER BY list_time DESC LIMIT ?,?';
    //let sql = "SELECT _b.*, book_list.* FROM book_list,(SELECT count(*) AS _c FROM book_list) AS _b WHERE delete_flag=0 ORDER BY list_time DESC LIMIT ?,?"
    let pageSize = 3;      // 每页显示的数目
    let pageTotal = 0;      // 一共有多少页
    let curpge = req.query.page || 1;         // 当前页
    let data = [(curpge - 1) * pageSize, pageSize];
    mysql.handleData(sql, data, (result) => {
        if (result.length == 0) {
            res.render('index', { error: 1 })
        } else {
            pageTotal = Math.ceil(parseInt(result[0]._c) / pageSize);
            let pagecount = [];
            for (let i = 1; i <= parseInt(pageTotal); i++) {
                pagecount.push(i);
            }
            res.render('index', { data: result, pagecount: pagecount });
        }
    })


    // let sql = 'select * from book_list';
    // mysql.handleData(sql, '', (result) => {
    //     res.render('index', { data: result });
    // })
    mysql.close();
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
    // 接受前端的数据      req.body
    let push_data = req.body;
    // console.log(push_data);
    // "insert into book_list value (0,?,?,?)"
    // insert into book_list (`title`,`author`,`classify`) value (?,?,?)
    push_data.list_time = new Date().toLocaleDateString();
    let sql = "insert into book_list (`title`,`author`,`classify`,`list_time`,`delete_flag`) value (?,?,?,?,0)"
    let data = [push_data.title, push_data.author, push_data.classify, push_data.list_time];
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    mysql.handleData(sql, data, (result) => {
        // console.log(result);
        res.redirect('/');
    }, (err) => {
        // console.log(err)
        res.redirect('/');
    })
    mysql.close();




    // // 接受前端的数据   req.body
    // let push_data = req.body;
    // let book = {
    //     id: generateBookId()
    // }
    // for (key in push_data) {
    //     book[key] = push_data[key];
    // }
    // data.push(book);
    // // 将 data 写入 data.json
    // //JSON.stringify多传2个参数 null 4使data.json格式化一下
    // writeBookFile(data, res);
}
// 编辑图书页面
exports.editbookHref = (req, res) => {
    let id = req.query.id;
    // 从数据库取出对应 id 的数据
    let sql = 'select * from book_list where id=?'
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    mysql.handleData(sql, id, (result) => {
        res.render('editbook', { book: result[0] });
    })
    mysql.close();



    // 去往编辑图书页面
    // let id = req.query.id;
    // let book = getBookById(id);
    // res.render('editbook', { book })
}
//处理编辑图书功能
exports.editbook = (req, res) => {
    let push_data = req.body;
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = "update book_list set `title`=?,`author`=?,`classify`=?  where id=?";
    let data = [push_data.title, push_data.author, push_data.classify, push_data.id];
    mysql.handleData(sql, data, (result) => {
        // console.log(result);
        res.redirect('/');
    }, (err) => {
        console.log(err)
        res.redirect('/');
    })
    mysql.close();


    // let push_data = req.body;
    // // 1. 找到对应的数据
    // // 2. 将对应的数据替换
    // let book = replaceBookById(push_data)
    // // 3. 写入 data.json
    // writeBookFile(book, res);
}
// 处理删除图书
exports.delBook = (req, res) => {
    let id = req.query.id;
    // let sql = "DELETE FROM book_list WHERE id = ?"
    let sql = "update book_list set delete_flag=1 where id=?"
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    mysql.handleData(sql, id, (result) => {
        res.redirect('/');
    })
    mysql.close();


    // let push_data = deleteBookItem(id)
    // // 把新的图书数组写入json文件
    // // console.log(push_data)
    // writeBookFile(push_data,res)
    // res.redirect('/')
}
// 去往回收站页面
exports.recycleHref = (req, res) => {
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = 'SELECT _b.*, book_list.* FROM (SELECT count(*) AS _c FROM book_list WHERE delete_flag=1) AS _b,book_list WHERE delete_flag=1 ORDER BY list_time DESC LIMIT ?,?'
    //let sql = "select _b.*,book_list.* from book_list,(select count(*) as _c from book_list) as _b where delete_flag=1 order by list_time desc limit ?,?";
    let pageSize = 4;         //每页显示的数目
    let pageTotal = 0;        //一共有的页数
    let curpage = req.query.repage || 1;           //当前页
    let data = [(curpage - 1) * pageSize, pageSize];

    mysql.handleData(sql, data, (result) => {
        if (result.length == 0) {
            res.render('recycle', { error: 1 })
        }
        else {
            pageTotal = Math.ceil(parseInt(result[0]._c) / pageSize);

            let pagecount = [];
            for (let i = 1; i <= parseInt(pageTotal); i++) {
                pagecount.push(i);
            }
            res.render('recycle', { data: result, pagecount: pagecount });
        }
    });
    mysql.close();
}

// 彻底删除某一本图书
exports.deleteAbsoluteHandle = (req, res) => {
    let id = req.query.id;
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = "delete from book_list where id=?";
    mysql.handleData(sql, id, (result) => {
        res.redirect('/recycle')
    })
    mysql.close();
}
// 还原某一本书籍
exports.recycleHandle = (req, res) => {
    let id = req.query.id;
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = 'update book_list set `delete_flag`=0 where id=?';
    mysql.handleData(sql, id, (result) => {
        res.redirect('/recycle');
    })
    mysql.close();
}
// 清空回收站
exports.clearHandle = (req, res) => {
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = "delete from book_list where delete_flag=1";
    mysql.handleData(sql, '', (result) => {
        res.redirect('/')
    })
    mysql.close();
}
// 全部还原
exports.recycleAllHandle = (req, res) => {
    mysql.open('127.0.0.1', 'root', '123456', 'nodejs');
    let sql = 'update book_list set delete_flag=0 where delete_flag=1';
    mysql.handleData(sql, '', (result) => {
        res.redirect('/')
    })
    mysql.close();
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
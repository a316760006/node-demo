// 数据库处理模块
// 0. cnpm i mysql -S   安装 mysql 模块
// 1. 引入mysql
const mysql = require('mysql');
/* 2. 创建连接 mysql==> 就是通过设置好参数去创建一个连接的对象
 * 2.1 mysql.createConnection 4个参数
 *      host        服务器主机地址,可以是 ip ,也可以是域名
 *      user        mysql 的账户名,默认是 root
 *      password    mysql 的账户密码
 *      database    mysql 的数据库名字
 */
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'nodejs'
})
// 3. 连接 mysql=> 通过创建好的对象中的 connect 方法来连接 mysql
// connect((err)=>{})
connection.connect((err) => {
    if (err) {
        console.log('数据库连接失败,请联系开发人员');
    } else {
        console.log('数据库连接成功');
    }
});
/* 4. 增,删,改,查等操作
 * 4.1 query参数
 *      sql, data, 回调函数(error,result,fields)
 */
// 增

// let sql_add = "insert into book_list set ?";
// let data_add = {
//     title: "问道峨眉",
//     author: "十里渔舟",
//     classify: "仙侠"
// }
// connection.query(sql_add, data_add, (err, result, fields) => {
//     if (err) {
//         console.log('数据添加失败,请联系管理员!')
//     } else {
//         console.log('result=', result);
//         console.log('fields=', fields);
//     }
// })


// 删
// let sql_del = "delete from book_list where ?";
// let data_del = {
//     id: 1
// }
// connection.query(sql_del, data_del, (err, result, fields) => {
//     if (err) {
//         console.log('数据删除失败,请联系管理员!')
//     } else {
//         console.log('result=', result);
//         console.log('fields=', fields);
//     }
// })

// 改
// let sql_updata = "update book_list set ? where ?";
// let data_updata = [
//     {
//         title: '修改后的标题',
//         author: '修改后的作者',
//         classify: '修改后的分类'
//     }, {
//         id: 2
//     }
// ]
// connection.query(sql_updata, data_updata, (err, result, fields) => {
//     if (err) {
//         console.log('数据修改失败,请联系管理员!')
//     } else {
//         console.log('result=', result);
//         console.log('fields=', fields);
//     }
// })

// 查
let sql_select = "select * from book_list where ?";
let data_select = {
    id: 2
}
connection.query(sql_select, data_select, (err, result, fields) => {
    if (err) {
        console.log('数据查询失败,请联系管理员!')
    } else {
        console.log('result=', result);
        console.log('fields=', fields);
    }
})

// 5. 断开连接 mysql
connection.end();
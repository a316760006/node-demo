// mysql 封装成模块,输出
// 1. open
// 2. 增
// 3. 删
// 4. 改
// 5. 查
// 6. 关闭
const mysql = require('mysql');
let connection;
// mysql 打开
exports.open = (host, user, password, database, errcallback, success) => {
    connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })
    connection.connect((err) => {
        err ? (typeof errcallback === 'function' && errcallback.call(err)) : (typeof success === 'function' && success.call())
    })
}
// mysql 增删改查的操作
exports.handleData = (sql, data, success, errcallback) => {
    if (!connection) {
        return console.log('数据库还没有连接,请想连接上mysql')
    }
    // 3个参数
    connection.query(sql, data, (err, result, fields) => {
        err ? (typeof errcallback === 'function' && errcallback.call(null, err)) : (typeof success === 'function' && success.call(null, result))
    })
}
// mysql 关闭
exports.close = () => {
    if (!connection) {
        connection.end();
        connection = null;
        console.log('关闭连接');
    }
}
// 1. 引入express
const express = require('express');

// 2. 构建 http 服务器
// 原生的构建方式
// http.createServer(req,res)
let app = express();

// 3. 请求与响应
// app.use(虚拟目录,fn回调函数)
app.use((req, res) => {
    res.end('Hello World!');
})

// 4. 侦听端口
app.listen(3000, () => {
    console.log('Server started at http://127.0.0.1:3000')
})
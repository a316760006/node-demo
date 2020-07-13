//路由模块
const express = require('express');
const service = require('./service');
let router = express.Router();

router.get('/', service.indexHandle)
    // 点击链接添加图书,取到 addbook 的页面
    .get('/addbookHref', service.addbookHref)
    .post('/addbook', service.addHandle)
    // 编辑内容
    .get('/editbookHref', service.editbookHref)
    .post('/editbook', service.editbook)
    // 删除图书
    .get('/delbook', service.delBook)
    // 去往回收站页面
    .get('/recycle', service.recycleHref)
    // 彻底删除
    .get('/deleteAbosulte', service.deleteAbsoluteHandle)
    // 还原某一本图书
    .get('/recycleBook', service.recycleHandle)
    // 清空回收站
    .get('/clear', service.clearHandle)
    // 全部还原
    .get('/recycleAll', service.recycleAllHandle)
    // 404处理
    .all('*', service.status404)

module.exports = router
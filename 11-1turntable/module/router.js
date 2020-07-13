// 路由模块
const express = require('express');
const service = require('./service');

let router = express.Router();

router
    .get('/', service.indexHref) //首页处理-->1如果登录了，去往管理首页，如果没有登录，去往登录页面
    .get('/getRotate',service.getRotate)    //生成一个角度值，返回给前台
    .get('/prizeResult',service.prizeResult)  //获奖结果
    //伪404处理
    // .all('*', service.status404);


module.exports = router
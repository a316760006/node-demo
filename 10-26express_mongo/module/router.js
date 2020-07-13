// 路由模块
const express = require('express');
const service = require('./service');

let router = express.Router();

router
    .get('/', service.indexHref) //首页处理-->1如果登录了，去往管理首页，如果没有登录，去往登录页面
    .get('/login', service.loginHandle)
    .post('/adminLogin', service.adminLoginHandle) //处理登录表单事件
    .get('/manage', service.manageHref) //去往管理员页面
    .get('/admin/editPassword', service.editPasswordHref) //修改管理员密码
    .post('/admin/updatePassword', service.editPasswordHandle)

    .get('/manage/student', service.manageStudentHref) //去往学生列表页，第一页
    .get('/manage/student/:page', service.manageStudentHref) //学生列表页，第page页
    // 通过rest 
    .get('/manage/student/:page/:orderby/:ordersort', service.manageStudentHref)
    .get('/manage/student/:page/:orderby', service.manageStudentHref)
    .get('/addStudentsHref', service.addStudentsHandle) //批量添加学员信息
    .get('/manage/studentHref/:studentId', service.seeStudentHref) //去往查看学员信息页面
    .get('/manage/editStudent/:studentId', service.editStudentHref) //去往修改学员信息页面
    .post('/manage/editStudentHandle',service.editStudentHandle)//处理编辑学员表单提交
    //伪404处理
    .all('*', service.status404);


module.exports = router
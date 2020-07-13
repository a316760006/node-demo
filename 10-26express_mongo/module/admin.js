// 学生管理模块 admin表
// 引入mongodb.js
const mongoose = require('mongoose');
const Mongo = require('./mongodb');
// 创建构造函数
let Admin = Mongo({
    adminname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1 //级别
    }
});
// console.log('Schema:',Admin);

let adminModel = mongoose.model('Admin', Admin);
// console.log('Model:',adminModel);
// 通过模型adminModel来做登录
// 登录就是查询的操作，注册就是新增
// 在数据库中处理，处理完毕后，返回给service去使用
exports.loginHandle=(data,callback)=>{
    // 在mongodb的命令界面里去创建一个管理员帐号

    // 查询前端传过来的data-->adminname:'',password:''
    adminModel.find(data).then((docs)=>{
        // console.log(docs)
        // if(docs.length==1){
        //     //登录成功
        // }

        //回调callback 将第一条记录做为回调的参数
        callback(docs[0]);
    })
}

//修改密码
exports.updatePassword=(where,data,callback)=>{
    adminModel.update(where,{$set:data}).then((result)=>{
        console.log(result);
        //{n:1,nModified:1,ok:1}
        callback(result.ok);    //返回给service去操作
    })
}
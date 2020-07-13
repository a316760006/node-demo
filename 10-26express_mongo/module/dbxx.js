// 数据库处理模块
// 0 npm i mongodb -S   安装mongodb模块
// 1 引入mongodb
const mongodb = require('mongodb');
// 2 创建mongodb的客户端属性
let mongoClient = mongodb.MongoClient;
mongoClient.useUnifiedTopology=true;
// 3 连接url
const mongoUrl = 'mongodb://127.0.0.1:27017/'    //buba是数据库的名字
// 4 通过connect方法建立与mongodb服务器端的连接
mongoClient.connect(mongoUrl,(err,client)=>{
    if(err){
        console.log(err);
    }else{
        //mongodb2的写法
        //console.log(db.collection('student').find());
        let db=client.db('buba');
        console.log(db.collection('student').find());
    }
})
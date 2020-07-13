// mongodb数据库
// 0.安装mongoose模块
// 1.引入mongoose模块
const mongoose = require('mongoose');
// 2.连接mongodb,并设置useNewUrlParser=true
mongoose.connect('mongodb://127.0.0.1:27017/buba',{useNewUrlParser: true});
// 返回连接的数据库
// var db = mongoose.connection;
// db.on('error', function(){
//     console.log('连接失败');
// });
// db.once('open', function() {
//   console.log('连接成功');
// });

// 3.创建一个mongoose架构Schema,
//   参数为json格式
//   
let Student=new mongoose.Schema({
    name:{
            type:String,
            required:true
        },
    age:Number,
    gender:Boolean,
    hometown:String,
    classname:String,
    jointime:{
        type:Date,
        default:new Date().toLocaleString()
    }
});
// 4.通过架构来制作模型
//  mongoose会在数据库中创建一个表，并且表名是模型名字的小写复数
//  给模型命名时注意，尽量用英文缩写
let Stu=mongoose.model('Stu',Student);
// 5.构造函数实例化模型
// 增
// 相当于插入了一条记录
// let stu = new Stu({
//     name:'小鲜肉',
//     age:22,
//     gender:true,
//     hometown:'北京',
//     classname:'web1810A'
// })
// // 6.保存该实例//返回Promise对象，所以可以通过.then回调成功时结果
//document
// stu.save().then((doc)=>{
//     console.log(doc._doc);
// })
// 一次性增加多条记录
// 模型.insertMany(数组)-->参数为一段数组
// Stu.insertMany([{
//     name:'小金',
//     age:19,
//     gender:true,
//     hometown:'河北',
//     classname:'web1810A'
// },{
//     name:"小明",
//     age:16,
//     gender:true,
//     hometown:'山东',
//     classname:'web1807A'
// },{
//     name:"小红",
//     age:21,
//     gender:false,
//     hometown:'上海',
//     classname:'web1807A'
// }]).then((doc)=>{
//     console.log('增加了记录：',doc);
// })
// 查询
// Stu.find().then((doc)=>{
//     console.log('查询结果：',doc);
// })
// 删除
// Stu.remove({name:'小王'}).then((result)=>{
//     console.log(result)//删除后的数据库返回信息
// })
// 修改
Stu.update({name:'小鲜肉1'},{$set1:{hometown1:'上海'}})
.then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err)
})
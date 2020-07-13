// 封装mongodb模块

// 1.引入mongoose
const mongoose = require('mongoose');
//如果你的数据库名不是buba，那么就把buba改成你自己的数据库名
mongoose.connect('mongodb://139.198.9.38:27017/buba', {
    useNewUrlParser: !0
});
// 向外暴露Schema构造函数
module.exports = (option) => {
    return mongoose.Schema(option)
};
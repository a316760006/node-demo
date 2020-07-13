var path = require('path');
console.log('-------------分割线--------------');
// 返回文件的绝对路径
console.log(__filename);
console.log('-------------分割线--------------');
// 返回输入的文件路径和当前路径的相对值
console.log('path模块的' + path.dirname(__filename));
console.log('-------------分割线--------------');
// console.log('' + path.r(__filename));
console.log('-------------分割线--------------');
// dirname 文件夹的绝对路径
console.log(__dirname);
console.log('-------------分割线--------------');

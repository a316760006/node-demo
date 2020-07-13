// 相对路径变绝对路径
var path = require('path');
var dir = path.resolve('./output.txt')
console.log(dir);
console.log(process.env);
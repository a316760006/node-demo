// Buffer
// 通过 new 关键字来调用 buffer 对象
var buf = new Buffer(10);   // Buffer(size):  size(数字)
var len = buf.write('hello world'); // write 方法  字节数
var str = buf.toString('utf-8');    // toString 方法  截取前面 size 个字节 默认编码'utf-8'
var json = buf.toJSON(buf);         // JSON 方法   变成 json 数据
console.log(len);       // write 的返回值是 buf 的字节数
console.log('----------------------我是分割线---------------------------')
console.log(str);       // 转换成 utf-8 编码
console.log('----------------------我是分割线---------------------------')
console.log(buf.toString('base64'));       // 转成 base64 码
console.log('----------------------我是分割线---------------------------')
console.log(json);
console.log('----------------------我是分割线---------------------------')
var buf = new Buffer(10);
len = buf.write('Hello world 你好,世界');
console.log('字节数' + len);
console.log('内容' + buf.toString('utf-8'));
console.log('转 JSON 数据' + buf.toJSON(buf));
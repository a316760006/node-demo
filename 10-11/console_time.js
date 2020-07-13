// console  的几个方法
// log      日志
// info     信息
// error    错误
// warn     警告
// table    表格

// 代码性能测试

// time1 = setTimeout(xxxx); clearTimeout(time1)

// 标识id
console.time('testing');
for (i = 0; i < 100; i++) {
    console.log(i)
}
console.timeEnd('testing')





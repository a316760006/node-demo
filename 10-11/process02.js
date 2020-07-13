// argv
// 返回一个数组
// 数组的第一和第二项是固定的内容
// 第一项是 node 安装目录的结对路径
// 第二项是执行该文件的绝对路径
// 后面项都是 node 命令时传过去的参数, 下标从2开始
// console.log(process.argv)

// var num1 = parseInt(process.argv[2]); // 返回的值都是字符串格式
// var num2 = process.argv[3] - 0;
// var sum = num1 + num2;
// console.log('计算中...');
// setTimeout(function () {
//     console.log('求和的结果是' + sum);
// }, 1000)
// var sum1 = 0;  // 相当于java中的全局变量
// for (var i = num1; i <= num2; i++) { // i的作用域：for循环内部
//     sum1 += i;
// }
// console.log('所有整数和为' + sum1)

var num1 = parseInt(process.argv[2]);
var num2 = process.argv[3] - 0;
var sum = 0;
for (var i = num1; i <= num2; i++) {
    sum += i;
}
console.log('所有整数和为' + sum)

// 获取指令里传的第一项参数,把他转换成 number 类型
let num1 = parseInt(process.argv[2]);
// 获取指令里传的第二项参数,把他转换成 number 类型
let num2 = parseInt(process.argv[3]);
// 创建一个变量,把最终结果赋值给 sum
let sum = 0;
// 判断传入的两位参数的大小
// 用 for 循环把他们之间所有的整数和加起来
if (num1 > num2) {
    for (let i = num1; i >= num2; i--) {
        sum += i
    }
} else {
    for (let i = num1; i <= num2; i++) {
        sum += i;
    }
}
console.log('计算中')
setTimeout(() => {
    // 最后把结果打印出来
    console.log(num1 + '和' + num2 + '之间的整数和为:   ' + sum)
}, 200);
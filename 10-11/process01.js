// 全局对象可以直接使用,就像前端的 window,document

// process,env 获取机器的环境变量, enviroment
console.log(process.env.MATHINE_NAME);
if (process.env.MATHINE_NAME === 'teacher') {
    console.log('教师端')
    // 执行教师端代码
} else {
    console.log('学生端')
    // 执行学生端代码
}
// 不会约束所有机器
// 需求就是在测试环境中执行一套 api, 正式环境中执行另一套 api

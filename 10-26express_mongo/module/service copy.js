//服务处理模块

const student = require('./student');
// 1.引入管理员模块
const admin = require('./admin');

// 引入formidable模块
const formidable = require('formidable');
const path = require('path');

function checkLogin(res) {
    if (!global.app.locals.loginName) {
        global.app.locals.isLogin = !1;
        res.redirect('/login'); //res作为参数传入函数
        return !1; //没有登录时，跳转login页面，并返回false
    }
    return !0; //已经登录了，返回true-->就是为了执行后面的代码
}
exports.loginHandle = (req, res) => {
    console.log('是否登录：', global.app.locals.isLogin);
    res.render('login', {})
}
// 处理登录表单
exports.adminLoginHandle = (req, res) => {
    let body = req.body; //接收参数

    // 先判断处理一下前端的参数
    if (!body.adminname) {
        return res.render('login', {
            errmsg: '帐号不能为空'
        })
    }
    if (!body.password) {
        return res.render('login', {
            errmsg: '密码不能为空'
        })
    }
    if (body.password.length < 5) {
        return res.render('login', {
            errmsg: '密码太短'
        })
    }
    // 通过admin模块的登录处理函数来处理前台传过来的参数
    // 然后回调结果
    admin.loginHandle(body, (result) => {
        if (!result) { //没有找到任何记录，就会返回undefined
            res.render('login', {
                errmsg: '帐号或密码错误'
            })
        } else {
            console.log('登录成功');
            global.app.locals.isLogin = !0;
            global.app.locals.loginName = result.adminname;
            global.app.locals.loginPass = result.password;
            global.app.locals.loginLevel = result.level;
            // 去往管理员管理页
            res.redirect('/manage');
        }
    });
}
//  后台管理首页
exports.manageHref = (req, res) => {
    if (!checkLogin(res)) return;
    res.render('manage', {});
}
exports.editPasswordHref = (req, res) => {
    if (!checkLogin(res)) return;
    res.render('editPassword', {});
}
exports.editPasswordHandle = (req, res) => {
    let body = req.body;
    // old_password,new_password,new_password_again
    if (!body.old_password) {
        return res.render('editPassword', {
            errmsg: '必须输入旧密码'
        })
    }
    if (body.old_password != global.app.locals.loginPass) {
        return res.render('editPassword', {
            errmsg: '输入旧密码错误'
        })
    }
    if (!body.new_password) {
        return res.render('editPassword', {
            errmsg: '必须输入新密码'
        })
    }
    if (body.new_password.length < 6 || body.new_password.length > 12) {
        return res.render('editPassword', {
            errmsg: '密码长度必须是6-12位'
        })
    }
    if (!body.new_password_again) {
        return res.render('editPassword', {
            errmsg: '必须再次输入新密码'
        })
    }
    if (body.new_password != body.new_password_again) {
        return res.render('editPassword', {
            errmsg: '两次输入密码必须相同'
        })
    }
    let data = {
        password: body.new_password
    }
    let where = {
        adminname: global.app.locals.loginName
    }
    admin.updatePassword(where, data, (result) => {
        if (!result) {
            return res.render('editPassword', {
                errmsg: '更新密码失败了，请稍后重试'
            })
        } else {
            global.app.locals.isLogin = !1;
            global.app.locals.loginName = '';
            global.app.locals.loginPass = '';
            global.app.locals.level = '';
            res.send('<script>alert("更新密码成功，请重新登录");location.href="/login"</script>')
        }
    })
}
exports.indexHref = (req, res) => {
    //判断登录状态，true去往管理首页，false去往登录页
    global.app.locals.isLogin ? res.redirect('/manage') : res.redirect('/login')
}
exports.manageStudentHref = (req, res) => {
    if (!checkLogin(res)) return;
    //排序功能
    let orderby = (req.query.order && req.query.order.by) || 'jointime';
    let ordersort = (req.query.order && req.query.order.sort) || 'desc';
    let order = {} // 要输出的格式是{name:1}
    let orderSort = ordersort == 'asc' ? 1 : -1;
    order[orderby] = orderSort; //{name:1}
    //req接收参数的方式：3种
    //1.req.query.参数名     接收url的get传入参数。这个是系统自带的
    //2.req.body            接收url的post传入参数。这个需要body-parser的中间件来实现。
    //3.req.params          接收url的restful传入的参数。这个需要body-parser的中间件来实现。
    let cur_page = req.params.page || 1; //接收:page的参数
    student.getStudentMaxId(total => {
        student.getStudents(cur_page, total, order, (result) => {
            //成功时：
            cur_page = parseInt(cur_page);
            if (result.code == 0) {
                let pages = result.pageTotal;
                let pagecount = [];
                if (pages <= 5) {
                    for (let i = 1; i <= pages; i++) {
                        pagecount.push(i);
                    }
                } else {
                    for (let i = -2; i <= 2; i++) {
                        if (cur_page == 1) {
                            pagecount.push(cur_page + i + 2);
                        } else if (cur_page == 2) {
                            pagecount.push(cur_page + i + 1);
                        } else if (cur_page == pages) {
                            pagecount.push(cur_page + i - 2);
                        } else if (cur_page == pages - 1) {
                            pagecount.push(cur_page + i - 1);
                        } else {
                            pagecount.push(cur_page + i);
                        }
                    }
                }
                res.render('studentList', {
                    data: result.data,
                    pagecount,
                    cur_page,
                    pages,
                    orderby,
                    ordersort
                    // order
                });
            }
            //失败时
            else {
                res.render('studentList', {
                    errmsg: '还没有学生学籍信息'
                });
            }
        });
    })

}
// 批量添加学员
exports.addStudentsHandle = (req, res) => {
    if (!checkLogin(res)) return;
    student.getStudentMaxId(start => {
        student.importStudents(start, 100, result => {
            // console.log(result);
            res.redirect('/manage/student');
        });
    })
    //批量添加1000个学生信息，start：
}
//查看学员
exports.seeStudentHref = (req, res) => {
    if (!checkLogin(res)) return;
    let studentId = req.params.studentId;
    // 如果没有获取到studentId 就返回列表页
    if (!studentId) return res.redirect('/manage/student');
    global.app.locals.dateToString = (date) => {
        return new Date(date).toLocaleString();
    };
    // 去数据库中查找该学员信息，并返回result
    student.getStudentById(studentId, (result) => {
        console.log(result);
        if (result)
            res.render('studentInfo', result);
        else
            res.send('<script>alert("没有查找到该学号的学员信息")；location.href("/manage/student")</script>');
    })
}
// 编辑学员信息
exports.editStudentHref = (req, res) => {
    if (!checkLogin(res)) return;
    let studentId = req.params.studentId;

    //将时间格式转换成字符串格式
    global.app.locals.dateToString = (date) => {
        //   2019/10/29 10:22:33
        return new Date(date).toLocaleString().split(' ')[0].replace(/\//g, '-');
    };
    // 如果没有获取到studentId 就返回列表页
    if (!studentId) return res.redirect('/manage/student');
    // 去数据库中查找该学员信息，并返回result
    student.getStudentById(studentId, (result) => {
        console.log(result);
        if (result) {
            res.render('editStudent', result);
        } else
            res.send('<script>alert("没有查找到该学号的学员信息")；location.href("/manage/student")</script>');
    })
}
// 编辑学员表单提交
exports.editStudentHandle = (req, res) => {
    let form = new formidable.IncomingForm(); //接收到表单提交的数据
    form.uploadDir = path.resolve('./public/img/upload'); //上传默认路径
    form.keepExtensions = true;
    //解析数据   先错误，再字段，后文件
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.send('<script>alert("修改学籍发生错误，请稍后重试");location.href="/manage/student"</script>')
        }
        console.log(fields); //传过来的字段
        console.log(files); //传过来的文件
        //解析图片路径
        //通过base获得文件名 
        //  files.img.path /User/xxx/xx/pubilc/img/upload/xxx.jpg 
        // path.parse(files.img.path).base xxx.jpg
        let img = '/img/upload/' + path.parse(files.photo.path).base;
        // img = /img/upload/xxx.jpg
        //更新数据库  根据学号更新学生学籍信息
        //整理一下数据
        let data = {
            photo: img,
            classtype: fields.classtype,
            jointime: new Date(fields.jointime)
        }
        let studentId = fields.studentId;
        let set = {
            studentId: studentId
        }
        student.updateStudentById(set, data, (result) => {
            console.log('更新结果是：', result)
            if (result) {
                res.redirect('/manage/studentHref/' + studentId);
            } else {
                res.send('<script>alert("更新失败，请稍后重试");location.href="/manage/student"</script>')
            }
        })

    })
}
// exports.studentOrderHandle = (req, res) => {
//     //获取排序的参数
//     // let order=req.params.order;
//     // console.log(order);
//     let orderby = req.query.order.by;
//     let ordersort = req.query.order.sort;
//     student.getStudents()
//     return;
// }
exports.status404 = (req, res) => {
    res.render('404', {});
}
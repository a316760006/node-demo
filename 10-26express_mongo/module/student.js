// 学生管理模块 student表
// 引入mongodb.js
const mongoose = require('mongoose');
const Mongo = require('./mongodb');

// 创建构造函数schema
let Student = Mongo({
    name: {
        type: String,
        required: true
    },
    classtype: String,
    faculty: String,
    master: String,
    studentId: String,
    age: Number,
    gender: Boolean,
    hometown: String,
    classname: String,
    jointime: {
        type: Date,
        default: new Date().toLocaleString()
    },
    photo: String
});
let stuModel = mongoose.model('Stu', Student);

//获得学生列表
exports.getStudents = (page, total, order, callback) => {
    //
    let pageSize = 20; //每页显示20个学生
    // 当page=1，skip=0
    let pageTotal = Math.ceil(total / pageSize);
    //将{jointime:-1}改为传入的参数order
    stuModel.find().sort(order).skip((page - 1) * pageSize).limit(pageSize).then((docs) => {
        // 先处理一下docs.
        if (docs.length == 0) {
            result = {
                code: -1,
                msg: '没有取到任何学生信息',
                data: []
            }
        } else {
            let data = [];
            for (let i = 0; i < docs.length; i++) {
                data.push(docs[i]._doc);
            }
            result = {
                code: 0,
                msg: '成功取到' + docs.length + '条学生记录信息',
                data,
                pageTotal
            }
        }
        // console.log(docs) //是一个数组
        callback(result);
    })
}
// 批量添加学员 start
function generateData(start, num, callback) {
    let ages = [17, 18, 19, 20, 21, 22, 23, 24];
    let hometowns = ['北京', '上海', '广东', '广西', '河南', '河北', '山东', '山西', '黑龙江', '天津', '重庆', '辽宁', '吉林', '江苏', '浙江', '安徽', '福建', '湖北', '湖南', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '香港', '新疆', '澳门', '内蒙古', '西藏', '宁夏'];
    let StudentsData = [];
    for (let i = start; i < start + num; i++) {
        let facultyObj = generateFaculty();
        let adata = {
            name: generateName(),
            classtype: facultyObj.classtype,
            classname: facultyObj.classname,
            faculty: facultyObj.faculty,
            master: facultyObj.master,
            age: ages[rnd(0, ages.length)],
            hometown: hometowns[rnd(0, hometowns.length)],
            gender: !rnd(0, 2),
            studentId: facultyObj.classname + (facultyObj.classtype == '两年制' ? 't02' : 't03') + n2s(i + 1)
        }

        StudentsData.push(adata);
    }
    console.log('插入学生信息：', StudentsData);
    stuModel.insertMany(StudentsData).then(result => {
        callback(result);
    });
}

function n2s(num) {
    return num.length == 6 ? num : num.length == 5 ? '0' + num : num.length == 4 ? '00' + num : num.length == 3 ? '000' + num : num.length == 2 ? '0000' + num : '00000' + num;
}

function generateFaculty() {
    let Faculties = [{
        name: '大数据云计算',
        master: [{
            name: '大数据开发',
            short: 'cloud'
        }]
    },
    {
        name: '建筑工程学院',
        master: [{
            name: 'VR技术（虚拟与现实)专业',
            short: 'vr'
        }]
    },
    {
        name: '电子商务学院',
        master: [{
            name: '跨境电商专业',
            short: 'ecomm'
        }]
    },
    {
        name: '数字媒体学院',
        master: [{
            name: 'UI专业',
            short: 'ui'
        }, {
            name: 'WEB架构专业',
            short: 'web'
        }]
    },
    {
        name: '软件工程学院',
        master: [{
            name: 'JAVA专业',
            short: 'java'
        }]
    },
    {
        name: '移动智能学院',
        master: [{
            name: '移动互联网应用开发专业',
            short: 'mobile'
        }]
    }
    ];
    let i = rnd(0, Faculties.length);
    let Faculty = Faculties[i].name;
    let j = rnd(0, Faculties[i].master.length);
    let Master = Faculties[i].master[j].name;
    let masterShort = Faculties[i].master[j].short;
    let years = ['17', '18', '19'];
    let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let k = rnd(0, years.length);
    let l = rnd(0, month.length);
    let classname = masterShort + years[k] + month[l] + 'A';
    let classtypes = ['两年制', '三年制'];
    let classtype = classtypes[rnd(0, 2)];
    return {
        faculty: Faculty,
        master: Master,
        classname,
        classtype
    }
}

function generateName() {
    let familyNames = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危', '江', '童', '颜', '郭', '梅', '盛', '林', '刁', '钟', '徐', '邱', '骆', '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍', '虞', '万', '支', '柯', '昝', '管', '卢', '莫', '经', '房', '裘', '缪', '干', '解', '应', '宗', '丁', '宣', '贲', '邓', '郁', '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '钮', '龚', '程', '嵇', '邢', '滑', '裴', '陆', '荣', '翁', '荀', '羊', '於', '惠', '甄', '曲', '家', '封', '芮', '羿', '储', '靳', '汲', '邴', '糜', '松', '井', '段', '富', '巫', '乌', '焦', '巴', '弓', '牧', '隗', '山', '谷', '车', '侯', '宓', '蓬', '全', '郗', '班', '仰', '秋', '仲', '伊', '宫', '宁', '仇', '栾', '暴', '甘', '钭', '厉', '戎', '祖', '武', '符', '刘', '景', '詹', '束', '龙', '叶', '幸', '司', '韶', '郜', '黎', '蓟', '薄', '印', '宿', '白', '怀', '蒲', '邰', '从', '鄂', '索', '咸', '籍', '赖', '卓', '蔺', '屠', '蒙', '池', '乔', '阴', '鬱', '胥', '能', '苍', '双', '闻', '莘', '党', '翟', '谭', '贡', '劳', '逄', '姬', '申', '扶', '堵', '冉', '宰', '郦', '雍', '卻', '璩', '桑', '桂', '濮', '牛', '寿', '通', '边', '扈', '燕', '冀', '郏', '浦', '尚', '农', '温', '别', '庄', '晏', '柴', '瞿', '阎', '充', '慕', '连', '茹', '习', '宦', '艾', '鱼', '容', '向', '古', '易', '慎', '戈', '廖', '庾', '终', '暨', '居', '衡', '步', '都', '耿', '满', '弘', '匡', '国', '文', '寇', '广', '禄', '阙', '东', '欧', '殳', '沃', '利', '蔚', '越', '夔', '隆', '师', '巩', '厍', '聂', '晁', '勾', '敖', '融', '冷', '訾', '辛', '阚', '那', '简', '饶', '空', '曾', '毋', '沙', '乜', '养', '鞠', '须', '丰', '巢', '关', '蒯', '相', '查', '后', '荆', '红', '游', '竺', '权', '逯', '万俟', '司马', '上官', '欧阳', '夏侯', '诸葛', '闻人', '东方', '赫连', '皇甫', '尉迟', '公羊', '澹台', '公冶', '宗政', '濮阳', '淳于', '单于', '太叔', '申屠', '公孙', '仲孙', '轩辕', '令狐', '钟离', '宇文', '长孙', '慕容', '鲜于', '闾丘', '司徒', '司空', '丌官', '司寇', '仉督', '子车', '颛孙', '端木', '巫马', '公西', '漆雕', '乐正', '壤驷', '公良', '拓跋', '夹谷', '宰父', '谷', '梁', '晋', '楚', '闫', '法', '汝', '鄢', '涂', '钦', '段', '干', '百里', '东郭', '南门', '呼延', '归', '海', '羊舌', '微', '生', '岳', '帅', '缑', '亢', '况郈', '有琴', '梁丘', '左丘', '东门', '西门', '商', '牟', '佘', '佴', '伯', '赏', '南宫', '墨', '哈', '谯', '笪', '年', '爱', '阳', '佟'];
    let givenNames = new Array(
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    let i = rnd(0, familyNames.length);
    let familyName = familyNames[i];
    let j = rnd(0, givenNames.length);
    let givenName = givenNames[j];
    return (familyName + givenName);
}

function rnd(min, max) {
    return parseInt((Math.random() * (max - min)) + min)
}

exports.importStudents = generateData;
// 批量添加学员end

exports.getStudentMaxId = (callback) => {
    //
    stuModel.find().countDocuments((err, total) => {
        console.log('学生总数：', total);
        callback(total);
    })
}

exports.getStudentById = (studentId, callback) => {
    // 使用模型查找学员
    stuModel.find({
        studentId
    }).then(doc => {
        if (doc.length == 0)
            callback(false)
        else
            callback(doc[0]._doc);
    })
}
exports.updateStudentById = (set, data, callback) => {
    stuModel.update(set, {
        $set: data
    }).then(result => {
        callback(result.ok);
    })
}
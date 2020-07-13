
//大转盘首页
exports.indexHref=(req,res)=>{
    res.render('index',{});
}
exports.prizeResult=(req,res)=>{
    let prize=req.query.prize;
    // 去数据库新增一条获奖记录

    res.json({
        msg:"恭喜您获得了"+prize+"奖品"
    })
}
exports.getRotate=(req,res)=>{
    result=chance()+(360*rnd(1,3));
    console.log('角度',result)
    res.json({
        rotate:result
    })
}
function chance(){
    let i=rnd(0,100);
    prize1=rnd(0,3)==0?rnd(330,360):rnd(0,3)==1?rnd(60,90):rnd(180,210);
    prize2=rnd(0,2)==0?rnd(30,60):rnd(270,300);
    prize3=rnd(0,2)==0?rnd(90,120):rnd(270,300);
    prize4=rnd(0,2)==0?rnd(120,150):rnd(210,240);
    prize5=rnd(0,3)==0?rnd(0,30):rnd(0,3)==1?rnd(300,330):rnd(150,180);
    if(i<=50){
        return prize1
    }
    if(i<=80){
        return prize2
    }
    if(i<=85){
        return prize3
    }
    if(i<=90){
        return prize4
    }
    return prize5
}
function rnd(min, max) {
    return parseInt((Math.random() * (max - min)) + min)
}
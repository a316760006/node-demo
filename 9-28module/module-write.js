var fs = require('fs');
function write(data, outputfile, success, error) {
    if (!data || !outputfile) {
        console.log('写文件缺少必要参数');
        return false;
    }
    // 创建一个写入数据流
    // 新建衣蛾 txt 文件作为写入的文件
    var writeTxt = fs.createWriteStream(outputfile);
    writeTxt.write(data, 'utf8');
    writeTxt.end();
    typeof success === 'function' && writeTxt.on('finish', success);
    typeof error === 'function' && writeTxt.on('error', error);
}
exports.write = write;
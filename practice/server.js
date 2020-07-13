
var http=require('http');

exports.started=function(content,port){
    var port = port || 8081;
    http.createServer(function(req,res){
        res.writeHead(200,{'content-Type':'text/plain'});
        res.end(content);
    }).listen(port);
    console.log('Server started at http://localhost:'+port);
}


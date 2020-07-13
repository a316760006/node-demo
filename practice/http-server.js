var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'content-Type':'text/plain'});
    res.end('aaaa');
}).listen(8889);

console.log('Server started at:http://localhost:8889');

var http = require('http');
var router = require('./module/router');

var server = http.createServer((request, response)=>{
    router.parseAddress(request, response);
});

server.listen(8080, ()=>{console.log('server is running')});
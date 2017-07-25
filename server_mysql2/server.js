// 1. 모듈 추출
var http = require('http');
var router = require('./module/router');

// 2. 서버 생성
var server  = http.createServer((request, response)=>{
    // 원래는 여기서 url 을 분석하지만 따로 모듈로 분리해서 재사용성을 높여준다
    router.parse(request, response);
});

// 3. 서버 실행
server.listen(8080, ()=>{console.log('server is running')});
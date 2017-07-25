// 1. 서버 모듈
var http = require('http');
var router = require('./module/router.js');

// 2. 서버 생성
var server = http.createServer(function(request, response){ // 시스템이(node.js) function 을 호출해준다
    // request <- node.js 가 사용자 요청정보를 담아서 넘겨준다
    // response <- node.js 가 사용자에게 응답할 때 사용하라고 담아서 넘겨준다.

    // requestParser(request, response);
    
    // 아래에서 하는 요청 분석, 응답 처리, 오류 처리를 모두 밖으로 빼줬다
    console.log('in server');
    router.parse(request, response);
});

// 3. 서버 시작 
server.listen(80, function(){ //콜백 형태로 서버가 등록되면 로그값을 호출되도록 한다. node.js 가 function 을 호출해준다
    console.log('server is running');
})


// // 요청 분석
// function requestParser(request, response){
//     console.log(request.url);
//     if(request.url == "/hello"){
//         sendResponse(response);
//     } else {
//         send404(response);
//     }
// };

// // 응답 처리
// function sendResponse(response){
//     // 응답 정보의 통신 규약이 어떤지 알려줘야 한다. 현재 Http 통신을 하고 있으니 Http 규약대로 써준다
//     response.writeHead(200 ,{'Content-Type':'text/html'}); // hashMap(키값) 형태로 값이 들어간다
//     for(i=0; i<10; i++){
//         response.write(i+"<br/>");
//     }
//     // response.write('<h1>hello</h1>');       // 여기만 써주면 데이터는 넘어오는데 
//     response.end('<h2>Hello world</h2>');   // end 해 주지 않으면 서버가 계속 데이터 받아오기를 기다린다.
// };

// // 오류 처리
// function send404(response){
//     response.write(404, {'Content-Type':'text/html'});
//     response.end('<h1>404 File Not Found</h1>');
// }
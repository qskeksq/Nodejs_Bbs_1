var error = require('../error') //  밖의 디렉토리 파일을 가져오는 방법
var bbs = require('../bbs');
var user = require('../user');

// request 를 분석해서 요청 url 에 대한 연결
exports.parse = function(request, response){

    // if(request.url == '/bbs' && request.method == 'POST'){
    //     // bbs.js 의 write() 함수를 호출

    // } else if(request.url == '/bbs' && request.method == 'GET'){
    //     // bbs.js 의 read() 함수 호출
    // }
    console.log('in router parse')
    var path = splitQueryString(request.url);

    // url 분석 -- 일반적으로 url 분석을 먼저 한다. 만약 추가적으로 /를 통해 경로가 들어간다면 다 분리해서 배열에 담은 후 계단식으로 처리해 주면 된다.
    if(path == '/bbs'){
        // bbs 처리
        parseMethod(bbs, request, response);
    } else if(path == '/user'){
        // user 처리
        user.send(response);
    } else {
        // 에러 처리
        error.send(response, 404);
    }
};

// method 분석 -- 계속 반복되서 따로 함수로 뺴줌
function parseMethod(module, request, response){    
        console.log('in router parseMethod')

    // 모듈을 넘겨줌으로써 밑에서 따로 처리해 주지 않고도 bbs, user 의 crud 로 넘어갈 수 있다
    if(request.method == "POST"){
        module.write(request, response);
    } else if(request.method == "GET"){
        module.read(response);
    } else if(request.method == "DELETE"){
        module.delete(response);
    } else if(request.method == "PUT"){
        module.update(response);
    }
}

// http://localhost:/bbs?title=? 과 같이 url 이 오는 경우가 있다
function splitQueryString(fullUrl){
    var position = fullUrl.indexOf('?');    // ?의 위치값을 반환, 없으면 -1
    if(position == -1){
        return fullUrl;
    } else {
        return fullUrl.substring(0, position);
    }
}
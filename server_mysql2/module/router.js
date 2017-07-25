var bbs = require('../bbs');
var user = require('../user');
var error = require('../error');

// 라우팅 설정(페이지 설정)
exports.parse = function(request, response){
    var parsedUrl = removeQuerystring(request.url);
    if(parsedUrl == '/bbs'){
        queryMethod(bbs, request, response);
    } else if(parsedUrl == '/user'){
        queryMethod(user, request);
    } else {

    }
}

// 메소드 설정(페이지 설정2)
function queryMethod(module ,request, response){
    console.log('in queryMethod')
    if(request.method == "GET"){
        module.read(getQuerystring(request.url), response);
    } else if(request.method == "POST"){
        module.write(request, response);
    } else if(request.method == "PUT"){
        module.update(request, response);
    } else if(request.method == "DELETE"){
        module.delete(request, response);
    }
}

// 주소값 분석 -- http://localhost:8080/bbs?title=서초구 에서 request.url 은 /bbs 부터이다.
var removeQuerystring = function(url){
    // url에서 쿼리스트링을 잘라내기 위한 지점을 구한다
    var position = url.indexOf('?');

    // 쿼리스트링이 없으면 전체를 반환한다
    if(position == -1){
        return url;
    } else {
        // 쿼리 스트링 앞까지 반환
        return url.substring(0, position);
    }
}

// 주소값 분리하는 체계가 두 개가 필요한 이유는 post 와 get 의 주소 사용이 다르기 떄문이다
var getQuerystring = function(url){
    var position = url.indexOf('?');
    if(position == -1){
        return "";
    } else {
        // 쿼리 스트링을 반환
        return url.substring(position+1);
    }
}
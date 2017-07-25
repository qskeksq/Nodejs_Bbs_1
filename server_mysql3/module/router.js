var bbs = require('../controller/bbs');
var user = require('../controller/user');

// 주소 라우팅
exports.parseAddress = function(request, response){
    var path = removeQuerystring(request.url);

    if(path == '/bbs'){
        console.log('in bbs');
        parseMethod(bbs, request, response);
    } else if(path == '/user'){
        console.log('in user');
        parseMethod(user, request, reponse);
    };
}

// 메소드 라우팅
function parseMethod(module, request, response){
    var parsedMethod = request.method;

    if(parsedMethod == 'POST'){
        module.write(request, response);
    } else if(parsedMethod == 'GET'){
        module.read(response);
    } else if(parsedMethod == 'PUT'){
        module.update(request, response);
    } else if(parsedMethod == 'DELETE'){
        module.delete(request, response);
    };
};

// 쿼리 스트링 제거
function removeQuerystring(querystring){
    var position = querystring.indexOf('?');
    if(position == -1){
        return querystring;
    } else {
        return querystring.substring(0, position);
    };
};

// 쿼리 스트링 반환
function getQuerystring(querystring){
    var position = querystring.indexOf('?');
    if(position == -1){
        return '';
    } else {
        return querystring.substring(position+1);
    };
};
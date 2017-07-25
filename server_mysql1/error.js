exports.error = {
    error : "",
    code : 0
}

exports.send = function(response, code){

    // writeHead 는 공통 영역
    response.writeHead(code, {'Content-Type':'text/html'});

    if(code  == 300){

    } else if(code == 404){
        response.end('Page Not Found');
    } else if(code == 500){
        response.end('Internal Server Error');
    }
}
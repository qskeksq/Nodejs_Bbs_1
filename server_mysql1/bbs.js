var dao = require('./bbsDao');

exports.read = function(response){
    console.log('read');   
    this.send(response, 'read');       // exports 는 this 로 접근해야 가능하다
    send(response, 'read');         // 바로 호출이 가능한 것은 private 만 가능하다
}

exports.write = function(request, response){
    console.log('bbs write');   
    // 데이터 꺼내기
    var postData = "";
    // 데이터가 담기는 발생가는 로직, 미리 데이터에 올라가 있음
    request.on('data', function(data){      // 데이터를 읽을 수 있을 때 호출
        postData = postData + data;
    })
    request.on('end', function(){           // 데이터를 다 읽었을 때 호출
        var dataObj = JSON.parse(postData);
        dao.insert(dataObj ,function(){
        send(response, 'write success');
    })
    })
}

exports.update = function(response){
    console.log('update');   
    this.send(response, 'update');
}

exports.delete = function(response){
    console.log('delete');   
    this.send(response, 'delete');
}   

function send(response, method) {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('BBS '+method);
}

// bbs 에서는 raw 한 데이터를 데이터베이스에 넣기 좋은 형태도 바꿔주는 일을 한다
// presenter 의 역할


// 모듈 추출
var dao = require('./bbsDao');

exports.write = function(request, response){
    console.log('in write');

    // 길을 찾아서 데이터 처리할 할 곳에 도착
    var postData = '';

    // 데이터를 받아올 때 호출
    request.on('data', (data)=>{
        postData = postData + data;
    });

    // 데이터를 다 읽었을 때 호출
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        console.log(dataObj);
        dao.insert(dataObj, ()=>{
            send(response, '{"result":"ok"}');
        })
    })

}

exports.read = function(querystring, response){
    if(querystring == ""){
        dao.select(querystring, (items)=>{
            // 이곳은 어떤 데이터가 들어왔는지 보여주기 위한 것
            console.log(items);

            // 이렇게 JSON 으로 데이터를 변형해서 넘겨주면 웹(클라이언트)에서 뿌려준다
            var dataObj = JSON.stringify(items);
            send(response, items);
        });
    }
}

exports.update = function(request, response){
    var updateData = '';
    request.on('data', (data)=>{
        updateData = updateData + data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(updateData);
        dao.update(dataObj, (error)=>{
            if(error){
                console.log(error);
            } else {
                send(response, '{"result":"ok"}')
            }
        })
    });

}

exports.delete = function(request, response){
    // delete  할 때 헷갈릴 수 있는데, 왜 데이터를 다 넘겨주는가>? 인데 사실 다 넘겨줄 필요 없이 id 값만 포함되어 있으면 된다.

    var deleteData = '';
    
    // 제거할 대상의 데이터가 넘어온다. 사실 어떤 데이터를 넘겨줘도 상관 없이 원하는 id 값만 가지고 있으면 된다.
    request.on('data', (data)=>{
        deleteData = deleteData + data;
    });

    // 제거할 대상의 데이터 넘겨주기
    request.on('end', ()=>{
                    // 쿼리는 가져오는 것이고 parse 는 값을 가공해 주는 것.
        var dataObj = JSON.parse(deleteData);   // 아하! JSON 으로 바꿔지지 않아서 인식을 못 하는구나
        console.log(dataObj);
        dao.delete(dataObj, (error)=>{
            if(error){
                console.log(error);
            } else {
                send(response, '{"result":"ok"}');
            }
        });
    });
}

function send(response, result){
    response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    response.end(result);
}
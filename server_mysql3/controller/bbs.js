var lab = require('../model/bbsLab');

exports.write = function(request, response){
    console.log('write in bbs');

    var postData = '';
    request.on('data', (data)=>{
        postData = postData + data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        // 데이터와 함께 콜백 메소드를 던져줘서 마지막까지 데이터가 잘 전달될 경우 성공 메시지를 띄우도록 한다
        lab.insert(dataObj, ()=>{
            send(response, '{"result":"ok"}');
        });
    });
}

exports.read = function(response){
    console.log('read in bbs');

    lab.selectAll((data)=>{
        var dataObj = JSON.stringify(data);
        send(response, dataObj);
    });
}

exports.update = function(request, response){
    console.log('update in bbs');
    
    var updateData = '';
    request.on('data', (data)=>{
        updateData = updateData + data;
    });
    request.on('end', (error)=>{
        var dataObj = JSON.parse(updateData);
        lab.update(dataObj, ()=>{
            send(response, '{"result":"ok"}');
        });
    });
};

exports.delete = function(request, response){
    console.log('delete in bbs');
    
    var deleteData = '';
    request.on('data', (data)=>{
        deleteData = deleteData + data;
    });
    request.on('end', (error)=>{
        var dataObj = JSON.parse(deleteData);
        lab.delete(dataObj, ()=>{
            send(response, '{"result":"ok"}');
        });
    });
}

function send(response, result){
    response.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
    response.end(result);
};
// 1. 모듈 추출
var express = require('express');
var bodyParser = require('body-parser');
// var DummyDB = require('./dummy');

// 2. 서버 생성
var app = express();

// 3. 미들웨어 설정
app.use(bodyParser.urlencoded({extended:false}));

// 4. 라우터 설정

// 4.1 get 방식
app.get('/user', (request, response)=>{
    response.send(DummyDB.get());
})

app.get('/user/:id', (request, response)=>{
                            // token 값은 요청의 인자로 들어가는 듯 하다
    response.send(DummyDB.get(request.params.id));
})

// 4.2 post 방식
app.post('/user', (request, response)=>{
    // 변수 선언 -- 요청으로부터 이름과 지역 꺼내오기(참고로 포스트맨에서 post 방식으로 서버에 요청한다)
    var name = request.body.name;
    var region = request.body.region;

    // 유효성 검사
    if(name && region){
        response.send(DummyDB.insert({
            name : name,
            region :region
        }));
    } else {
        throw new Error('error');
    }
})

// 4.3 put 방식
app.put('/user/:id', (request, response)=>{
    var id = request.params.id;
    var name = request.body.name;
    var region = request.body.region;

    var item = DummyDB.get(id);
    item.name = name || item.name;
    item.region = region || item.region;

    response.send(item);

})

// 4.4 delete 방식
app.delete('/user/:id', (request, response)=>{
    response.send(DummyDB.remove(request.params.id));
})

// 5. 서버 등록
app.listen(8080, ()=>{console.log('server is running...')});



// 6. 더미 데이터베이스 구현
var DummyDB = function(){
    // 변수 선언
    var count = 1;
    var storage = [];
    var DummyDB = {};

    DummyDB.get = function(id){

        if(id){
            // 아이디가 String 값이면 숫자로 바꾸고 숫자이면 그냥 숫자 리턴
            id = (typeof id == 'string') ? Number(id) : id;

            // 저장소 전체를 돌면서
            for(var i in storage){
                // 아이디 값이 일치하면 하나를 리턴하고
                if(storage[i].id == id){
                    return storage[i];
                    // 그렇지 않으면 전체를 리턴한다
                } 
            }
        } else {
            return storage;
        }
    }

    DummyDB.insert = function(data){
        data.id = count++;
        storage.push(data);
        return data;
    };

    DummyDB.remove = function(id){
        id = (typeof id == 'string') ? Number(id) : id;

        for(var i in storage){
            if(storage[i].id == id){
                storage.splice(i, 1);

                return true;
            }
        }

        return false;
    }

    return DummyDB;
}();



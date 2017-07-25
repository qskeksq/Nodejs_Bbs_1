// 스튜디오에서와는 다르게 db 와 직접적인 연결점을 만들어 줘야 한다

var mysql = require('mysql');
var conInfo = {
    host : '127.0.0.1', // 데이터베이스 아이피 또는 url
	user : 'root',      // 사용자 아이디
	password : 'mysql', // 비밀번호
	port : '3306',        // 포트
	database : 'bbs'    // 데이터베이스
}

// insert용 execute
exports.execute = function(query, values, callback){
    console.log('in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, [[values]], (error, result)=>{
        if(error){
            console.log(error);
        } else {
            callback();
            console.log('success');
        }
        // this.end();
    });
};

// select용 execute
exports.executeSelect = function(query, callback){
    console.log('in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, (error, items, fields)=>{
        if(error){
            console.log(error);
        } else {
            callback(items);
            console.log('success');
        }
    });
}

// update용 execute
exports.executeUpdate = function(query, values, callback){
    console.log('in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, values, (error, result)=>{
        if(error){
            console.log(error);
        } else {
            callback();
            console.log('success');
        }
        // this.end();
    });
};
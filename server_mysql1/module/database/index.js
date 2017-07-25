var mysql = require('mysql');

var conInfo = {
	host : '127.0.0.1',	// 데이터베이스 IP 또는 url
	user : 'root',		// 사용자 ID
	password : 'mysql',	// 비밀번호
	port : 3306,		// 포트
	database : 'bbs'	// 데이터베이스
};

// 쿼리 후 결과값을 리턴해주는 함수
exports.executeQuery = function(query, callback){
	var con = mysql.createConnection(conInfo);
	con.connect();
	con.query('select * from board', function(err, items, fields){
		if(err){
			console.log("error message= " + err);
		} else {
			callback(items)
		}
		this.end();	// con.end();인데 안에서 해주도록 한다. <- 필수! 안하면 계속 연결된 상태
	});
	
}

exports.execute = function(query, callback) {	// <- response 객체가 담겨온다.
	// 연결 정보를 담은 객체를 생성
	var con = mysql.createConnection(conInfo);

	// 연결 정보를 이용해서 database 연결
	con.connect();

	// 데이터베이스에 쿼리 실행
	con.query('select * from board', function(err, fields){
		if(err){
			console.log("error message= " + err);
		} else {
			
		}
		this.end();	// con.end();인데 안에서 해주도록 한다. <- 필수! 안하면 계속 연결된 상태
	});
	
}


exports.executeMulti = function(query,values, callback) {	// <- response 객체가 담겨온다.
	console.log('in executeMulti');   

	// 연결 정보를 담은 객체를 생성
	var con = mysql.createConnection(conInfo);

	// 연결 정보를 이용해서 database 연결
	con.connect();

	// 데이터베이스에 쿼리 실행
	con.query(query, [values], function(err, fields){
		console.log('in query');   
		if(err){
			console.log("error message= " + err);
		} else {
			// 넘기고 넘기고 계속 넘겨서 마지막에 () 가 붙은 곳에서 함수가 실행된다
			callback();
		}
		this.end();	// con.end();인데 안에서 해주도록 한다. <- 필수! 안하면 계속 연결된 상태
	});
	
}
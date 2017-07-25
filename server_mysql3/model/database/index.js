var mysql = require('mysql');
var conInfo = {
    host : '127.0.0.1', // 데이터베이스 아이피 또는 url
	user : 'root',      // 사용자 아이디
	password : 'mysql', // 비밀번호
	port : '3306',        // 포트
	database : 'bbs'    // 데이터베이스
};

exports.executeInsert = function(query, values, writeCallback){
    console.log('executeInsert in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, [[values]], (error, result)=>{
        if(error){
            console.log(error);
        } else {
            writeCallback();
            console.log('insert success');
        };
    });
};

exports.executeSelect = function(query, readCallback){
    console.log('executeSelect in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, (error, data, fields)=>{
        if(error){
            console.log(error);
        } else {
            // 콜백에서 데이터를 가져다 쓰려면 data 자체를 사용하면 안 되고 JSON.stringify 해줘야 한다.
            // first argument must be a string or buffer 오류는 대부분 json 으로 인식하지 못하거나 json 형식이 깨지기 때문에 일어난다.
            readCallback(data);
            console.log('insert success');
        };
    });
};

exports.executeUpdate = function(query, value, updateCallback){
    console.log('executeUpdate in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, value, (error)=>{
        if(error){
            console.log(error);
        } else {
            // 콜백에서 데이터를 가져다 쓰려면 data 자체를 사용하면 안 되고 JSON.stringify 해줘야 한다.
            // first argument must be a string or buffer 오류는 대부분 json 으로 인식하지 못하거나 json 형식이 깨지기 때문에 일어난다.
            updateCallback();
            console.log('insert success');
        };
    });
}

exports.executeDelete = function(query, value, deleteCallback){
    console.log('executeDelete in database');
    var connection = mysql.createConnection(conInfo);
    connection.connect();
    connection.query(query, value, (error)=>{
        if(error){
            console.log(error);
        } else {
            // 콜백에서 데이터를 가져다 쓰려면 data 자체를 사용하면 안 되고 JSON.stringify 해줘야 한다.
            // first argument must be a string or buffer 오류는 대부분 json 으로 인식하지 못하거나 json 형식이 깨지기 때문에 일어난다.
            deleteCallback();
            console.log('insert success');
        };
    });
}

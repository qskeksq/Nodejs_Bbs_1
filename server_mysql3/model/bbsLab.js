var database = require('./database')
var tablename = 'board';

exports.insert = function(postData, writeCallback){
    console.log('insert in bbsLab');
    // 보통 sql syntac error 은 여기서 데이터를 잘못 입력해서 생기는 경우가 많다
    var query = 'INSERT INTO '+tablename+' (title, content, author, date) VALUES ?';
    var now = new Date().toLocaleDateString();
    var values = [postData.title, postData.content, postData.author, now];
    database.executeInsert(query, values, writeCallback);
};

exports.selectAll = function(readCallback){
    var query = 'SELECT * FROM '+tablename;
    database.executeSelect(query, readCallback);
};

exports.update = function(putData, updateCallback){
    console.log('update in bbs');
    var query = 'UPDATE '+tablename + ' set '
                + ' title = ?,'
                + ' content =?, '
                + ' author =?, '
                + ' date =? '
                + ' where id =?';
    // 업데이트 되는 날짜
    var now = new Date().toLocaleDateString();
    // 이 values 는 위의 query 순서에 맞춰야 한다. 이름은 상관 없어
    var values = [putData.title,putData.content, putData.author, now, putData.id];
    database.executeUpdate(query, values, updateCallback);
};

exports.delete = function(deleteData, deleteCallback){
    console.log('delete in bbs');
    var query = 'DELETE FROM '+tablename+' WHERE id = ?';
    var value = [deleteData.id];
    database.executeDelete(query, value, deleteCallback);
};
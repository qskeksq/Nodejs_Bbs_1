// bbsDao 는 bbs 에서 데이터를 받아서 데이터베이스에 직접적인 CRUD 를 하는 model

// 모듈 추출
var database = require('./module/database');
var tablename = 'board';



exports.insert = function(data, writeCallback){
    console.log('in insert');
    var query = 'INSERT INTO '+tablename+'(title, content, author, date) VALUES ?';
    var values = [data.name, data.content, data.author, data.date];
    database.execute(query, values, writeCallback);
}

exports.select = function(querystring, readCallback){
    console.log('in select');
    var query = 'SELECT * FROM '+tablename;
    database.executeSelect(query, readCallback);
}

exports.delete = function(data, deletCallback){
    console.log('in delete');
    var query = 'DELETE FROM '+tablename+' WHERE id = ?';
    var values = [data.id];
    console.log(values);
    database.execute(query, values, (error)=>{
        deletCallback(error);
    });
}

exports.update = function(data, updateCallback){
    console.log('in update');
    var query = 'UPDATE '+tablename + ' set '
                + ' title = ?,'
                + ' content =?, '
                + ' author =?, '
                + ' date =? '
                + ' where id =?';
    // 업데이트 되는 날짜
    var now = new Date().toLocaleDateString();
    // 이 values 는 위의 query 순서에 맞춰야 한다. 이름은 상관 없어
    var values = [data.title, data.content, data.author, now, data.id];
    database.executeUpdate(query, values, (error)=>{
        updateCallback(error);
    });
}


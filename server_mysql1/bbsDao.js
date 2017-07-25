var database= require('./module/database');
var tableName = "board";

exports.select = function(){
    var query = "select * from "+tableName+"";
}

exports.insert = function(data, callback){
    console.log('bbsDao insert');   
    var query = " insert into "+tableName+"(title, content, author, date)";
    query = query + " VALUES ?";
    var values = [
        [data.title, data.content, data.author, data.date]
    ];
    database.executeMulti(query, values, function(){
        callback();
    })
}

exports.update = function(){
    var query = " update "+tableName+"";
}

exports.delete = function(){
    var query = " delete from "+tableName+"";
}
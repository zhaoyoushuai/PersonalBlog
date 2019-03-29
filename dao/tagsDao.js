var dbUtil = require("./DBUtill");


function insertTag(tag,ctime,utime,success){
    var insertSql = " insert into tags (tag,ctime,utime) values (?,?,?)"
    var params = [tag,ctime,utime];
    var connection = dbUtil.createConnection()
    connection.connect()

    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end()

}

function queryTag(tag,success){
    var insertSql = " select * from tags where tag = ?"
    var params = [tag];
    var connection = dbUtil.createConnection()
    connection.connect()
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end()
}
function queryAllTags(success){
    var querySql = "select * from tags";
    var connection = dbUtil.createConnection();
    connection.connect()
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end()
}

module.exports.queryTag = queryTag
module.exports.insertTag = insertTag;
module.exports.queryAllTags = queryAllTags;

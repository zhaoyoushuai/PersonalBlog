var dbutil = require("./DBUtill");


function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    var insetSql = "insert into tag_blog_mapping(tag_id,blog_id,ctime,utime) values(?,?,?,?)";
    var params = [tagId,blogId,ctime,utime]
    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(insetSql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end()
}
function queryByTag(id,page,pageSize,success){
    console.log(id)
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    var params = [id,page*pageSize,pageSize]
    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end()
}
function queryByTagCount(tag,success){
    var insertSql = " select count(1) as count from tag_blog_mapping where tag_id = ?"
    var params = [tag];
    var connection = dbutil.createConnection()
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
module.exports.insertTagBlogMapping = insertTagBlogMapping;

module.exports.queryByTag = queryByTag;

module.exports.queryByTagCount = queryByTagCount;


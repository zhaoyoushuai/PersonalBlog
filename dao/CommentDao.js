var dbutil = require("./DBUtill");


function insertComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success){
    var querySql = "insert into comments (blog_id,parent,parent_name,user_name,email,comments,ctime,utime) values (?,?,?,?,?,?,?,?)"
    var connection = dbutil.createConnection();
    var params=[blogId,parent,parentName,userName,email,comments,ctime,utime]
    connection.connect();

    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })

    connection.end();
}

function queryCommentsByBlogId(blogId,success){
    var querySql = "select * from comments where blog_id  = ?"
    var connection = dbutil.createConnection();
    var params=[blogId]
    connection.connect();

    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })

    connection.end();
}
function queryCommentsCountByBlogId(blogId,success){
    var querySql = "select count(1) as count from comments where blog_id = ?"
    var connection = dbutil.createConnection();
    var params=[blogId]
    connection.connect()
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end();
}

function queryNewComment(size,success){
    var querySql = "select * from comments order by id desc limit ?"
    var connection = dbutil.createConnection();
    var params=[size]
    connection.connect()
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end();
}
module.exports.insertComment =insertComment;
module.exports.queryCommentsByBlogId =queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId =queryCommentsCountByBlogId;
module.exports.queryNewComment =queryNewComment;
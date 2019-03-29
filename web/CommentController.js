var timeUtil = require("../util/timeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var commentDao = require("../dao/CommentDao");
var captcha = require("svg-captcha")

var path = new Map();
function queryNewComments(request,response){
    commentDao.queryNewComment(5,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end()
    })
}

path.set("/queryNewComments",queryNewComments)
function addComment(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.username,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function(){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",null));
        response.end()
    })
}

path.set("/addComment",addComment)


function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34})
    response.writeHead(200);
    response.write(respUtil.writeResult("success","评论成功",img));
    response.end()
}

path.set("/queryRandomCode",queryRandomCode)


function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",result));
        response.end()
    })
}


path.set("/queryCommentsByBlogId",queryCommentsByBlogId)



function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","请求成功",result));
        response.end()
    })
}

path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId)
module.exports.path = path;
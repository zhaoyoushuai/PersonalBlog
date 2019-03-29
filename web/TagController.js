var path = new Map();
var timeUtill = require("../util/timeUtil");
var respUtil = require("../util/RespUtil");
var tagsDao = require("../dao/tagsDao");
var tagBlogMapping = require("../dao/tagBlogMappingDao")
var url = require("url")
var blogDao = require("../dao/BlogDao");


function queryAllTags(request,response){
    tagsDao.queryAllTags(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? true: false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end();
    })
}

path.set("/queryAllTags",queryAllTags)


function queryByTagCount(request,response){
    var params = url.parse(request.url,true).query;
    // console.log(params)
    tagBlogMapping.queryByTagCount(params.tagId,function(result){

        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end();
    })
}

path.set("/queryByTagCount",queryByTagCount)


function queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagBlogMapping.queryByTag(params.tag,parseInt(params.page),parseInt(params.pageSize),function(result){
        var blogList  =  [];
        for(var i = 0 ; i < result.length; i ++){
            blogDao.queryBlogById(result[i].blog_id,function(res){
                res[0].content = res[0].content.replace(/<img[\w\W]*>/g,"")
                res[0].content = res[0].content.replace(/<[\w\W]{1,5}>/g,"")
                res[0].content = res[0].content.substring(0,300)
                blogList.push(res[0]);
            })
        }
        getResult(blogList,result.length,response)
    })
}
path.set("/queryByTag",queryByTag)
function getResult(blogList,len,response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList,len,response)
        })
    }else{
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",blogList));
        response.end()
    }
}

module.exports.path = path;
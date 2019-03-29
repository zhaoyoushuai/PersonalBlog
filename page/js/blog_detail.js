var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        title:"",
        content:"",
        ctime:"",
        tags:"",
        views:""
    },
    computed:{

    },
    created:function(){
       var searchUrlParams= location.search.indexOf("?") > -1? location.search.split("?")[1].split("&"):"";
       if(searchUrlParams == ''){
               return;
       }
       var bid = -1;
       for(var i = 0; i < searchUrlParams.length; i ++){
           if(searchUrlParams[i].split("=")[0] == "bid"){
               try{
                   bid = parseInt(searchUrlParams[i].split("=")[1]);
               }catch(e){
                   console.log(e);
               }
           }
       }
       axios({
           method:"get",
           url:"/queryBlogById?bid="+bid
       }).then(function(resp){
           var result = resp.data.data[0];
           blogDetail.title =  result.title;
           blogDetail.content = result.content;
           blogDetail.ctime = result.ctime;
           blogDetail.tags= result.tags;
           blogDetail.views = result.views;
       }).catch(function(resp){
           console.log("请求失败")
       })
    }
})

var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vcode:"",
        rightCode:""
    },
    computed:{
        sendComment:function(){
            return function(){
                var code = document.getElementById("comment_code").value.toLowerCase();
                if(code != sendComment.rightCode){
                    alert("验证码有误")
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
                var bid = -1;
                for(var i = 0 ; i < searchUrlParams.length; i ++){
                    if(searchUrlParams[i].split("=")[0] == "bid"){
                        try{
                            bid = searchUrlParams[i].split("=")[1]
                        }catch(e){
                            console.log(e);
                        }
                    }
                }

                var reply =document.getElementById("comment_reply").value;
                var name =document.getElementById("comment_name").value;
                var email =document.getElementById("comment_email").value;
                var content =document.getElementById("comment_content").value;
                var replayName =document.getElementById("comment_reply_name").value;
                axios({
                    method:"get",
                    url:"/addComment?bid="+bid+"&parent=" + reply+"&username="+name+"&email="+email+"&content="+content+"&parentName=" + replayName
                }).then(function(resp){
                    alert(resp.data.msg);
                    document.getElementById("comment_reply").value = '';
                    document.getElementById("comment_name").value ='';
                    document.getElementById("comment_email").value ='';
                    document.getElementById("comment_content").value ='';
                    document.getElementById("comment_code").value = '';
                    document.getElementById("comment_reply_name").value = '';
                })

            }
        },
        changeCode:function(){
            return function(){
                axios({
                    method:"get",
                    url:"/queryRandomCode",
                }).then(function(resp){
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text.toLowerCase();
                })
            }
        }
    },
    created:function() {
        this.changeCode();
    }
})


var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total:100,
        comments:[]
    },
    computed:{
        reply:function(){
            return function(commentId,userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                console.log(       document.getElementById("comment_reply").value)
                location.href = "#send_comment"
            }
        }
    },
    created:function(){
        var bid  = -10;
        var search = location.search.indexOf("?") !== -1 ?location.search.split("?")[1].split("&"):"";

        for( var i = 0 ; i < search.length ; i ++){
            if(search[i].split("=")[0] == 'bid'){
                try{

                    bid = parseInt(search[i].split("=")[1])
                }catch(e){
                    console.log(e);
                }
            }
        }
            axios({
            method:"get",
            url:"queryCommentsByBlogId?bid="+bid
        }).then(function(resp){
                blogComments.comments = resp.data.data;

                for(var i= 0 ;i <blogComments.comments.length;i ++){
                    if(blogComments.comments[i].parent > -1){
                        blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                    }
                }
        })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid="+ bid
        }).then(function(resp){
            console.log(resp)
            blogComments.total = resp.data.data[0].count;
        })

    }
})
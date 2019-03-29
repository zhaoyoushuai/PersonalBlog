var blogList = new Vue({
    el:"#articleList",
    data:{
        blog_list:[],
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then(function(resp){
            for(var i =0; i < resp.data.data.length; i ++){
                resp.data.data[i].link ="/blog_detail.html?bid="+ resp.data.data[i].id;
            }
            blogList.blog_list = resp.data.data
        }).catch(function(){
            console.log("error")
        })
    }
})
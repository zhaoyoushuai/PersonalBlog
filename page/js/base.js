var random = new Vue({
    el:'#random_tags',
    data:{
        tags:[{tag:"",id:""}]
    },
    computed:{
        randomColor:function(){
            return function(){
                var red = Math.random()* 255
                var green = Math.random()* 255
                var blue = Math.random()* 255
                return "rgb("+red+","+green+","+blue+")"

            }
        },
        randomSize(){
            return function(){
                var size = Math.random()* 20 + 12;
                return size + "px"
            }
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllTags"
        }).then(function(resp){
            // var resul
            for(var i = 0 ; i < resp.data.data.length; i ++){
                random.tags.push({
                    id:resp.data.data[i].id,
                    tag:resp.data.data[i].tag,
                    link:"?tag=" +resp.data.data[i].id
                })
            }
        }).catch(function(){
            console.log("error")
        })
    }
})

var newhot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryBlogByViews"
        }).then(function(resp){
            var result = []
            for(var  i = 0 ; i < resp.data.data.length; i ++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid="+resp.data.data[i].id;
                result.push(temp);
            }
            newhot.titleList = result
        }).catch(function(){
            console.log("error")
        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"},
            {name:'这里是用户名',data:"2018-1-1",comment:"这里是评论爱上放缓士大夫撒反对撒旦"}
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function(resp){
            var result = []
            for(var  i = 0 ; i < resp.data.data.length; i ++){
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                var tempData = new Date(parseInt(resp.data.data[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                temp.data  = tempData;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result
        }).catch(function(){
            console.log("error")
        })
    }
})
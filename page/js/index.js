var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:"asdasdasdsadsad"
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created:function(){
        //请求数据。给content赋值
        axios({
            method:"get",
            url:"/queryEveryDay",
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content
        }).catch(function(error){
            console.log("请求失败")
        })
    }
})


var articleList = new Vue({
    el:'#article_list',
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            {
                title:'这是标题',
                content:"此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                data:"2018-1-1",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            },
            {
                title:'这是标题',
                content:"此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                data:"2018-1-1",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            },
            {
                title:'这是标题',
                content:"此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                data:"2018-1-1",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            },
            {
                title:'这是标题',
                content:"此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                data:"2018-1-1",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            }
        ]
    },
    computed:{
        jumpTo:function(){
            return function(page){
                this.getPages(page,this.pageSize);
            }
        },
        getPages:function(){
            return function(page,pageSize){
                var tag = '';
                var search = location.search.indexOf("?") !== -1 ?location.search.split("?")[1].split("&"):"";

                for( var i = 0 ; i < search.length ; i ++){
                    if(search[i].split("=")[0] == 'tag'){
                        try{
                            tag = parseInt(search[i].split("=")[1])
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                if(tag == ""){
                    axios({
                        method:"get",
                        url:"/queryBlogByPage?page="+(page - 1)+"&pageSize="+pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0 ; i < result.length; i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            var tempData = new Date(parseInt(result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                            temp.data =tempData;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link ="/blog_detail.html?bid="+ result[i].id;
                            list.push(temp);
                        }
                        articleList.page = page
                        articleList.articleList = list
                    }).catch(function(err){
                        console.log("请求错误")
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool
                    })
                }else{
                    axios({
                        method:"get",
                        url:"/queryByTag?page="+(page - 1)+"&pageSize="+pageSize +"&tag="+tag
                    }).then(function(resp){
                        console.log(resp)
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0 ; i < result.length; i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            var tempData = new Date(parseInt(result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                            temp.data =tempData;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link ="/blog_detail.html?bid="+ result[i].id;
                            list.push(temp);
                        }
                        articleList.page = page
                        articleList.articleList = list
                    }).catch(function(err){
                        console.log("请求错误")
                    });
                    axios({
                        method:"get",
                        url:"/queryByTagCount?tagId=" + tag
                    }).then(function(resp){
                        console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool
                    })
                }

            }
        },
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize
            var totalCount =100 ;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage -2,page:nowPage -2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage - 1 });
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 1,page:nowPage + 1});
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 2,page:nowPage + 2});
            }
            // result.push({text:">>",page:parseInt((totalCount + pageSize - 1)/pageSize)});
            result.push({text:">>",page:totalCount/pageSize});
            this.pageNumList = result;
            return result
        }
    },
    created:function(){
        this.getPages(this.page,this.pageSize)
    }

})
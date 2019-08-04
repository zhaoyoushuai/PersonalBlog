## 技术栈：
vue，express，mysql，富文本插件wysiwyg，验证码插件svg-captcha

## 项目结构:

   浏览器页面(page文件夹)，web层页面(web文件夹)，Dao层(dao文件夹)，持久层(mysql)，
   
## 数据库结构:

博客文章 ： 标题，内容，创建时间，浏览次数，标签列表

每日一句 ： 内容，创建时间     

标签 ： 标签名，创建时间

评论 ： 用户名，时间，内容，类型

标签文章映射 ： 标签id ，文章id


## 实现页面及功能:

首页: 每日一句，随机标签云，最近热门，最新评论，文章列表

文章详情页：文章访问数，文章留言

关于页面：关于自己的内容，关于页面的留言，,验证码的校验

留言页面：留言板页面留言,验证码的校验

编辑每日一句页面和编辑文章页面：每日一句和文章的增加与删除

## 后台主要使用的是express（nodejs框架）来搭建服务，通过express链接数据库向前台发送数据

# 《Koa2学习-实现简书博客》


> npm i
> supervisor --harmony index


## 实现概要
- koa2 搭建服务
- MySQL作为数据库
    - mysql 5.7 版本
    - 储存普通数据
    - 存储session登录态数据
- 工具 supervisor 更新热重启     
- 渲染
    - 前端,服务端渲染：ejs作为服务端渲染的模板引擎
- 功能
    - 1、注册、登录、退出
    - 2、文章发布、创建文件夹(文集)、文章自动保存、markdown编辑器、服务端语法解析等
    - 3、首页文章列表的数据读取
    - 4、文章详情页的数据读取  
    - 5、用户个人中心页面


![登录](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/login.png)
![注册](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/reg.png)
![首页](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/home.png)
![搜索](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/search.png)
![我的](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/my.png)
![发布文章后台](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/wen.png)
![文章展示页](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/article1.png)
![文章展示页](https://github.com/lzt9977/node-koa2-blog/blob/master/public/readme/article2.png)



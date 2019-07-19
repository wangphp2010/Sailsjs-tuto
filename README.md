 

git remote add origin https://github.com/wangphp2010/Sailsjs-tuto.git

git push -u origin master



## 安装

https://sailsjs.com/get-started

```bash
$ npm show sails
$ npm rm sails -g
$ npm install -g sails@0.12.14

$ sails -v
$ sails help
# 建立app
$ sails new myweb  
$ cd myweb
$ ls -l
$ sails lift # run server
```
## 安装nodemon
```bash
$ npm install -g nodemon
```
### 运行 

```bash
$ nodemon ./server.js localhost 1337 # 要用nodemon 启动服务器 不然每次修改代码都要重新启动服务器才会生效 
```

或者修改 package.json
"scripts": {
    "debug": "node debug app.js",
    "start": "node app.js"
  },

==>>

  "scripts": {
    "debug": "node debug app.js",
    "start": "nodemon app.js"
  },

运行
```bash
$ npm start
```

## 目录结构介绍

* api 后台处理程序
    + controllers 控制器,映射路由url
    + hooks 系统功能调用和改变
    + models 数据库实体模型
    + policies 访问策略
    + responses 定制http响应内容能够
    + services 定制全局服务类
* assets 网站静态文件根目录
* config 系统设置文件集
* tasks 打包工具
* views 视图
* app.js 引用程序启动入口


## 默认生成的网页 

* config
    + views.js 默认布局设定
* views
    + 403.ejs
    + 404.ejs
    + 500.ejs
    + homepage.ejs 网址主页
    + layout.ejs 网页共同布局

homepage.ejs 会被嵌入到layout.ejs中的 <%- body %>



## 控制器 

```bash
$ sails generate controller test 建立控制器test
$ nano api/controllers/TestController.js
...

...
# 可以直接用  http://localhost:1337/test/go 访问 need restart the server 
    go:function(req,res){
       // res.ok();
       // res.forbidden();
       // res.notFound();
        // res.serverError();
    }
...
```

* api/controllers
    + TestControllers.js
* api/responses
    + forbidden.js
    + notFound.js
    + ok.js
    + serverError.js

## 自建网页

### views/about.ejs
### views/b4layout.ejs
### api/controllers/TestControllers.js


## 嵌入式策略

为路由绑定功能

### api/policies/accessLog.js

```js
module.exports = function(res,res,next){
    console.info(req.method , req.path);
    return next() ;
    // 正常返回next(); 错误是返回正常的404 403 500 等
};
```

### config/policies.js
```js
...
    '*':['accesslog']
...
```

## API服务 


```bash
$ sails generate api User ## 生成api/controllers/UserControlleres.js 和 api/models/User.js 
```
### 生成文件 api/controllers/UserControlleres.js
     默认api 无需编码 本框架会自动加入增删查该的代码

### api/models/User.js
```js
    attributes{
        username:{
            type:'string'
        }
    }
```    
### api使用
#### sails 蓝图指定规范

* GET /user -> UserControllers.find
* GET /user/:id -> UserControllers.findOne
* POST /user -> UserControllers.create
* POST /user/:id -> UserControllers.update
* PUT /user/:id -> UserControllers.destroy

```
http://localhost:1337/user
http://localhost:1337/user/create?username=tony&address=china
http://localhost:1337/user/create?username=luci&address=france
http://localhost:1337/user/1
```

#### 问题 会有服务器错误 需要安装 $ npm install sails-disk 再重启服务器


## 数据更新删除

### 用postman 测试

* GET /user -> UserControllers.find
* GET /user/:id -> UserControllers.findOne
* POST /user -> UserControllers.create
* PUT /user/:id -> UserControllers.update
* DELETE /user/:id -> UserControllers.destroy


## sailsJS蓝图的设置 

文档 

https://sailsjs.com/documentation/concepts/blueprints

https://sailsjs.com/documentation/reference/blueprint-api

### config/blueprints.js
 
   ...
   // actions:true ,// 默认匹配路由和方法
   // rest:true, // REST API 默认为true 可能有安全问题 最好在生产环境设为false
   // shortcuts: true , // 最好在生产环境设为false
   ...

```js
// 推荐设置 
module.exports.blueprints={
    actions:true,
    rest:false,
    shortcuts:false
}

```


## 数据库的设置(MongoDB) 

```bash
# mongo数据库sails驱动程序
$ npm install sails-mongo@0.12.3 --save --save-exact
$ nano config/connections.js
...
    mydb:{
        adapter:'sails-mongo',
        host:'127.0.0.1',
        port:27017,
        //user : 'username', // optional
        //password:'password' ,// optional
        databasse:'mydb' // 不用修改直接写mydb 不然会提示找不到数据库
    },

...
$ nano config/models.js
...
module.exports.models = {
    connection:'mydb',
    migrate: 'alter' , 
}
...

```

## 路由的定制

https://sailsjs.com/documentation/concepts/routes

### api/controllers/TestControllers.js

```js
...
    // test/page1 -> page1
    page1:function(req,res){
        res.send('page1');
    },
    page2:function(req,res){
        res.send('page2');
    },
    page3:function(req,res){
        res.send('page3');
    },
...
```

### config/routes.js

```js
    'GET /page1':'TestController.page1',
    'GET /page2':[
        {policy:'accessLog' },
        {controller:'test' , action:'page2' },

    ],
    'GET /page3':'TestController.page3',


```


## 部署安全问题 

https://sailsjs.com/documentation/concepts/security

### 推荐配置
### config/env/production.js

```js

    // http://sailsjs.org/#!/documentation/reference/blueprint-api
    // https://sailsjs.com/documentation/reference/configuration/sails-config-blueprints
    blueprints:{
        actions:true ,
        rest:false,
        shortcuts:false,
    },
    // http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
  
    cors:{
        allRoutes:false, // 关闭全路由的跨域存取
        origin: 'http://foobar.com,https://lohost.com',
        credentials:true , //需要cookies 验证

    },

    csrf:true , 


```


## 进程监视

sails 在运行时难免会出现错误,这样回事node.js的进程崩溃,从而导致服务器崩溃.那么我们就需要一种手段来见识nodejs进程的运行.当进程出现错误时崩溃,会写入日志,并同时重启服务器.保证服务器的运行.

### 工具 pm2

http://pm2.keymetrics.io/

```bash
$ sudo npm install pm2 -g
$ pm2 start app.js # 启动服务器
$ pm2 list
$ pm2 stop 0
$ pm2 restart 0
$ pm2 delete 0 
```

### 编写部署文件

```bash
$ nano server-pm2.json
...
{
    "name":"myweb",
    "script": "app.js"
    "port": 8080 ,
    "env":{
        "NODE_ENV": "production"
    },
    "options":[""]
}
...
$ pm2 start server-pm2.json
```


"use strict";
const express =require('express');//导入express模块
const app =express();//调用方法生成应用

const bodyParser=require('body-parser');
app.use(bodyParser.json());
//用户
var USERS=[
    {id:'01',username:'admin',password:'132456'},
    {id:'02',username:'aaa',password:'123456'}
]
//产品
var PRODUCTS=[
    {id:'01',user:'李四',pay:'80'},
    {id:'02',user:'张三',pay:'60'}
]

const PASSWORD=[
    {userName:'admin',password:'123456'}
]

app.all('*', function (req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); 
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); 
    res.header("X-Powered-By", ' 3.2.1') 
    if (req.method == "OPTIONS") res.send(200); 
    else next(); });
//响应GET方法
//URL，也叫做路由
//回调函数，表示收到请求后，如何处理并作出应答
//当发送hello 才会作出应答
app.get('/hello',function(req,resp){
    resp.send("hhh");
    resp.end();
});

//yonghu
app.get('/users',function(req,resp){
    resp.send(USERS);
    resp.end();
});
app.get('/users/:id',function(req,resp){
    console.log(req.params);
    const id=req.params.id;
    for(let user of USERS){
        if(user.id ===id){
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//chanp
app.get('/product',function(req,resp){
    resp.send(PRODUCTS);
    resp.end();
});

app.get('/product/:id',function(req,resp){
    console.log(req.params);
    const id=req.params.id;
    for(let product of PRODUCTS){
        if(product.id ===id){
            resp.send([product]);
            break;
        }
    }
    resp.end();
});

//添加用户
//采用参数化路由方式

app.post('/user',function(req,resp){
    //json
    USERS.push(req.body);
    resp.send({succ:true});
    resp.end();
});

//添加chanp
//采用参数化路由方式

app.post('/product',function(req,resp){
    //json
    PRODUCTS.push(req.body);
    resp.send({succ:true});
    resp.end();
});

//修改用户
app.put('/user',function(req,resp){
    //json
    let founded =false;
    for(let user of USERS){
        if(user.id === req.body.id){
            user.username=req.body.username;
            user.password=req.body.password;
            founded=true;
            break;
        }
    }
    if(founded){
        resp.send({succ:true});
    }else{
        resp.send({succ:false,msg:"无用户"});
    }
    resp.end();
});

//修改chanp
app.put('/product',function(req,resp){
    //json
    let founded =false;
    for(let product of PRODUCTS){
        if(product.id === req.body.id){
            product.user=req.body.user;
            product.pay=req.body.pay;
            founded=true;
            break;
        }
    }
    if(founded){
        resp.send({succ:true});
    }else{
        resp.send({succ:false,msg:"无产品"});
    }
    resp.end();
});

//删除用户
app.delete('/user/:id',function(req,resp){
    let founded =false;
    let index =0;
    for(let user of USERS){
        if(user.id === req.params.id){
            USERS.splice(index,1);
            founded=true;
            break;
            
        }
    }
    if(founded){
        resp.send({succ:true});
    }else{
        resp.send({succ:false,msg:"无用户"});
    }
    resp.end();
});

//删除chanp
app.delete('/product/:id',function(req,resp){
    let founded =false;
    let index =0;
    for(let product of PRODUCTS){
        if(product.id === req.params.id){
            PRODUCTS.splice(index,1);
            founded=true;
            break;
        }
    }
    if(founded){
        resp.send({succ:true});
    }else{
        resp.send({succ:false,msg:"无产品"});
    }
    resp.end();
});

//密码验证
app.post('/password',function(req,resp){
    //json
    let founded = false;
    for (let password of PASSWORD) {
        if (password.userName === req.body.username && password.password === req.body.password) {
            resp.send({ succ: true });
            founded = true;
        }
    }
    if (founded == false) {
        resp.send({ succ: false });
    }
    resp.end();
});



//WEB服务器监听8080端口
app.listen(8080,function(){
    console.log('服务器在8080端口启动!');
})

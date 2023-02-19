var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');

//Firebase Admin SDK
var admin = require("firebase-admin");

var serviceAccount = require("./project-113d5-firebase-adminsdk-8r5ga-2643a8ee51");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-113d5-default-rtdb.firebaseio.com"
});


var fireData = admin.database();
//把ejs-locals設為副檔名為ejs的樣板引擎 把位址views設為views，把ejs設為view engine
app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');

//增加靜態檔案的路徑
app.use(express.static('public'))

//增加body解析
app.use(bodyParser.json());//app.use(express.json()) 即可？
app.use(bodyParser.urlencoded({extended:false}));

//路由
app.get('/',function(req,res){
    console.log('有人造訪');
    fireData.ref('todos').once('value',function(snapshot){
        var data = snapshot.val();
        var title = data.title;
        res.render('index',{"todolist":data})
    }

    )
})
//新增
app.post('/addTodo',function(req,res){
    var content =req.body.content;
    var contentRef = fireData.ref('todos').push();
    contentRef.set({"content":content}).then(
        function(){

            
            fireData.ref('todos').once('value',function(snapshot){
                res.send({"success":true,
                        "result":snapshot.val(),
                        "message":"資料讀取成功",
                        "ooo":"真假"});
                
            })
        }
    )

})

//刪除
app.post('/removeTodo',function(req,res){
    var _id = req.body.id;
    fireData.ref('todos').child(_id).remove().then(
        function(){
            fireData.ref('todos').once('value',function(snapshot){
                res.send({
                    "success":true,
                    "result":snapshot.val(),
                    "message":"資料刪除成功"})
            })
        }
    )
})


app.get('/search',function(req,res){
    res.render('search');

})
app.post('/searchList',function(req,res){
    console.log(req.body);
    //轉址
    res.redirect('search');
})

app.post('/searchAJAX',function(req,res){
    res.send('hello!!')
})
/*
let login = function(req,res,next){
    console.log('登入狀態');
    
    next();
}
app.use(login);
*/
/*
app.get('/',function(req,res){
    //es.send('<html><head></head><body><img src="/images/logo.png"></body></html>');
    res.render('index');
})
*/
app.use(function(req,res,next){
    res.status(404).send('抱歉，您的頁面找不到')
})
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('程式有問題，請稍候嘗試')
})


//新增邏輯
/*app.post('/addTodo',function(req,res){
    var content = req.body.content;
    var contentRef = firedata.ref('todos').push;
    contentRef.set({'content':content})
    .then(function(){
        fireData.ref('todos').once('value',function(snapshot){
            res.semd(snapshot.val());
        })
    })
})
*/
//監聽port
var port =process.env.PORT  ||6001;
app.listen(port);
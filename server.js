/**
 * Created by Administrator on 2017/2/15.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var mysql = require('mysql');
var pinyin = require("pinyin");

var pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});

//转换静态方法
app.use(express.static(__dirname + '/www'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/www/index.html');
});

// var viewsDir = __dirname + '/www/views/';
// //引入后台文件
// app.get('/contact', function (req, res) {
//     res.sendFile(viewsDir + 'contact.html');
// });
// //引入前台页面
// app.get('/index',function(req,res){
//     res.sendFile(viewsDir+'index.html');
// });

//查
app.get('/contact',function(req,res){
    pool.getConnection(function(err,con){
        con.query('select * from lists',function(err,result){
            res.json(result);
        })
    })
});
//增
app.post('/contact',function(req,res){
    pool.getConnection(function(err,con){
        con.query('insert into lists (name) values (?)',[req.body.name],function(err,result){
            res.json(result.insertId);
        })
    })
});
//改
app.put('/contact',function(req,res){
    if(req.body.key==='name'){
        var py=pinyin(req.body.value,{
            style:pinyin.STYLE_NORMAL
        }).join(' ');
        pool.getConnection(function(err,con){
            con.query('update lists set name = ?,pinyin=? where id= ?',[req.body.value,py,req.body.id],function(err,result){
                res.json('ok');
            })
        })
    }else if(req.body.key==='phone'){
        pool.getConnection(function(err,con){
            con.query('update lists set phone =? where id=?',[req.body.value,req.body.id],function(err,result){
                res.json('ok');
            })
        })
    }

});
//删
app.post('/deleteContact',function(req,res){
    var ids=JSON.parse(req.body.id).join(",");
    pool.getConnection(function(err,con){
        con.query(`delete from lists where id in (${ids})`,[req.body.key,req.body.value,req.body.id],function(err,result){
            res.json('ok');
        })
    })
});

app.listen(4000);
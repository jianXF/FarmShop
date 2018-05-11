var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//实例化express
var connection = mysql.createConnection({
    host:"rm-wz9mx3p81r9b6sxr9yo.mysql.rds.aliyuncs.com",
    user:"jian",
    password:"Jxl95913",
    database:"farmshop"
	});
connection.connect();


//用户注册
app.post('/reg', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql=`INSERT INTO user_info(tel,password,img,regTime) VALUES 
    ('${req.body.tel}','${req.body.password}','${req.body.img}','${regTime}')`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//手机号查重
app.post('/reg/checkTel', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM user_info where tel='${req.body.tel}'`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        if(results.length==0){
            res.send('success');
        }else{
            res.send('该手机号已被注册,请登陆');
        }
        
    });
});
//登陆
app.post('/reg/login', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM user_info where tel='${req.body.tel}' and password='${req.body.password}'`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        const data = {code:'',data:{},meaasge:''};
        if(results.length!=0){
            data.code='0';
            data.data=results[0];
            data.meaasge='登陆成功';
            
        }else{
            data.code='1';
            data.meaasge='手机号或密码错误';
        }
        res.send(data);
    });
});




app.listen(2014);
console.log("开启服务器");

//时间函数
function timeChange(){ 
    var time = new Date();
    return ""+time.getFullYear()+stringNum(time.getMonth())+stringNum(time.getDate())+stringNum(time.getHours())+stringNum(time.getMinutes())+stringNum(time.getSeconds())+"";
}
function stringNum(ti){
    if(ti<10){
        ti="0"+ti;
    }
    return ti;
}
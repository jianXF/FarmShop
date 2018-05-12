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

//获取商品总类
app.get('/findAll/goods_kind', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods_kind where oId=0`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
        });
});
//通过总类或许子类
app.get('/findChild/goods_kind', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods_kind where oId=${req.query.kindId}`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
        });
});

//通过kindId查找商品
app.get('/find/goods/kindId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql = '';
    switch(req.query.xtab){
        case '1':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and b.kindId=${req.query.kindId} and b.kindId=a.kindId order by upTime DESC`;
            break;
        case '2':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and b.kindId=${req.query.kindId} and b.kindId=a.kindId order by sellnum DESC`;
        break;
        case '3':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and b.kindId=${req.query.kindId} and b.kindId=a.kindId order by price_o DESC`;
        break;
        case '4':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and b.kindId=${req.query.kindId} and b.kindId=a.kindId order by price_o ASC`;
        break;
    }
    console.log(sql);
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
        });
});

//显示所有商品
app.get('/find/goods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");

    var sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and b.kindId=a.kindId order by upTime DESC`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
    });
});

//显示特价促销商品
app.get('/find/goods/isBargain', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='';
    switch(req.query.xtab){
        case '1':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and isBargain=1 and b.kindId=a.kindId order by upTime DESC`;
            break;
        case '2':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and isBargain=1 and b.kindId=a.kindId order by sellnum DESC`;
        break;
        case '3':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and isBargain=1 and b.kindId=a.kindId order by price_o DESC`;
        break;
        case '4':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and isBargain=1 and b.kindId=a.kindId order by price_o ASC`;
        break;
    }
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
    });
});

//通过oId商品
app.get('/find/goods/oId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='';
    switch(req.query.xtab){
        case '1':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and oId=${req.query.oId} and b.kindId=a.kindId order by upTime DESC`;
            break;
        case '2':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and oId=${req.query.oId} and b.kindId=a.kindId order by sellnum DESC`;
        break;
        case '3':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and oId=${req.query.oId} and b.kindId=a.kindId order by price_o DESC`;
        break;
        case '4':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and oId=${req.query.oId} and b.kindId=a.kindId order by price_o ASC`;
        break;
    }
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
    });
});

//通过商品名称查询
app.get('/find/goods/title', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='';
    switch(req.query.xtab){
        case '1':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and title like '%${req.query.title}%' and b.kindId=a.kindId order by upTime DESC`;
            break;
        case '2':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and title like '%${req.query.title}%' and b.kindId=a.kindId order by sellnum DESC`;
        break;
        case '3':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and title like '%${req.query.title}%' and b.kindId=a.kindId order by price_o DESC`;
        break;
        case '4':
        sql=`SELECT * FROM goods as b,goods_kind as a where isSell=1 and title like '%${req.query.title}%' and b.kindId=a.kindId order by price_o ASC`;
        break;
    }
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
    });
});

//通过商品id查找商品
app.get('/find/goods/goodsId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods as b,goods_kind as a , seller_info as c where goodsId=${req.query.goodsId} and b.kindId=a.kindId and b.sellerId = c.sellerId`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results[0]);
           
        });
});


//添加购物车
app.post('/addcart', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`INSERT INTO carlist(goodsId,buyNum,userId) VALUES 
    (${req.body.goodsId},${req.body.buyNum},${req.body.userId})`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//检验购物车是否已添加此商品
app.get('/repeatCart', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM carlist where goodsId = ${req.query.goodsId} and userId = ${req.query.userId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
        
    });
});

//修改购物车信息
app.post('/updateCart', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql = '';
    switch(req.body.type){
        case '1':
                sql=`UPDATE carlist SET buyNum=buyNum+${req.body.buyNum} where carId= ${req.body.carId}`;
                break;
        case '2':
                sql=`UPDATE carlist SET buyNum=${req.body.buyNum} where carId= ${req.body.carId}`;
                break;
    }
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});


//添加收货地址
app.post('/address/insert', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='INSERT INTO address(userId,`name`,tel,province,city,county,address_detail,area_code,is_default) VALUES '+`
    (${req.body.userId},'${req.body.name}','${req.body.tel}','${req.body.province}','${req.body.city}','${req.body.county}',
        '${req.body.address_detail}','${req.body.area_code}',${req.body.is_default})`;
        console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//修改默认地址为不默认
app.post('/address/updateIs', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`UPDATE address SET is_default=0 where userId= ${req.body.userId}`;
                
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send('success');
    });
});

//查询是否有存过地址
app.get('/addressAll', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM address where userId = ${req.query.userId}`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length!=0){
            for(var i of results){
                i.id = i.addressId;
                i.address = i.province+i.city+i.county+i.address_detail;
            }
        }
        res.send(results);
    });
});
//通过addressId查询
app.get('/address/findId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM address where addressId = ${req.query.addressId}`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
    });
});

//修改收货地址
app.post('/address/update', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='UPDATE address SET `name`='+`'${req.body.name}',tel='${req.body.tel}',province='${req.body.province}',
    city='${req.body.city}' , county='${req.body.county}',address_detail='${req.body.address_detail}',
    area_code='${req.body.area_code}' where addressId= ${req.body.addressId}`;
        console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});
//删除收货地址
app.post('/address/delete', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`DELETE FROM address WHERE addressId = ${req.body.addressId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
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
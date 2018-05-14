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
//通过一组商品id查找商品
app.get('/find/goods/goodsIds', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var ids = req.query.goodsId.split(',');
        var sql="SELECT * FROM goods as b , seller_info as a  where b.sellerId = a.sellerId and (";
        for(var i of ids ){
            sql +=` goodsId=${i} or `;
        }
        sql = sql.substr(0,sql.length-3)+')';
        console.log(sql);
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
        });
});

//通过店铺id查找商品
app.get('/find/goods/sellerId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods where isSell=1 and sellerId = ${req.query.sellerId}`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
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


//显示全部购物车
app.get('/carlistAll', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT a.*,b.*,c.status,c.sellerTitle FROM carlist as a,goods as b,seller_info as c where userId = ${req.query.userId} and a.goodsId=b.goodsId and b.sellerId=c.sellerId`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        for( var i of results){
            i.bool=false;
        }
        res.send(results);
        
    });
});

//删除购物车
app.get('/carlist/delete', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`DELETE FROM carlist where carId=${req.query.carId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send("success");
        
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

//修改默认地址
app.post('/address/updateIs', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql1=`UPDATE address SET is_default=0 where userId= ${req.body.userId}`;
    connection.query(sql1, function (error, results, fields) {
        if (error) throw error;
    });
    var sql=`UPDATE address SET is_default=1 where addressId= ${req.body.addressId}`;
                
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

    if(req.query.addressId!=0){
       var sql=`SELECT * FROM address where addressId = ${req.query.addressId}`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
        }); 
    }else{
        var sql=`SELECT * FROM address where  userId= ${req.query.userId} and is_default=1`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
        }); 
    }
    
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

//将除要删除的地址在外的地址address第一个设为默认地址
app.post('/address/updatedefault', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`UPDATE address SET is_default = 1  where addressId != ${req.body.addressId} and userId=${req.body.userId} limit 1`;
        console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});
//下订单
app.post('/order/insert', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql2=`UPDATE goods SET sellnum =sellnum+${req.body.goodsNum}, stock =stock-${req.body.goodsNum} where goodsId=${req.body.goodsId}`;
        connection.query(sql2, function (error, results, fields) {   
            if (error) throw error;
        });
    var sql3=`UPDATE seller_info SET goodsell =goodsell+${req.body.goodsNum} where sellerId=${req.body.sellerId}`;
    connection.query(sql3, function (error, results, fields) {   
        if (error) throw error;
    });
    console.log(sql2);
    const regTime = timeChange();
    if(req.body.status==2){
            var sql='INSERT INTO `order` (orderTime,buyTime,goodsId,`status`,goodsNum,goodsPrice,sellerId,userId,`address`,addressName,addressTel,nodeinfo) VALUES '+`
        (${regTime},${regTime},${req.body.goodsId},${req.body.status},${req.body.goodsNum},'${req.body.goodsPrice}',${req.body.sellerId},${req.body.userId},
            '${req.body.address}','${req.body.addressName}','${req.body.addressTel}','${req.body.nodeinfo}')`;
            console.log(sql);
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send('success');
        });
    }else if(req.body.status==1){
        var sql='INSERT INTO `order` (orderTime,goodsId,`status`,goodsNum,goodsPrice,sellerId,userId,`address`,addressName,addressTel,nodeinfo) VALUES '+`
        (${regTime},${req.body.goodsId},${req.body.status},${req.body.goodsNum},'${req.body.goodsPrice}',${req.body.sellerId},${req.body.userId},
            '${req.body.address}','${req.body.addressName}','${req.body.addressTel}','${req.body.nodeinfo}')`;
            console.log(sql);
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send('success');
        });
    }
    
});
//查询订单
app.get('/orderAll', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='';
    if(req.query.status==-1){
        sql='SELECT a.*,b.sellerTitle,c.goodsId,c.delivery,c.imgLogo,c.title FROM `order` as a,seller_info as b ,goods as c where a.userId'+
        ` = ${req.query.userId} and a.sellerId=b.sellerId and c.goodsId=a.goodsId order by a.orderTime DESC`;
    }else{
        sql='SELECT a.*,b.sellerTitle,c.goodsId,c.delivery,c.imgLogo,c.title FROM `order` as a,seller_info as b ,goods as c where a.userId'+
        ` = ${req.query.userId}`+' and a.status ='+ `${req.query.status} and a.sellerId=b.sellerId and c.goodsId=a.goodsId 
        order by a.orderTime DESC`;
    }
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    
    });
});
//根据订单状态返回订单的个数
app.get('/order/colum', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='select count(*) from `order` where `status`= '+`${req.query.status}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
    
    });
});
//根据orderId修改订单状态
app.post('/order/update', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql='UPDATE `order` SET `status` = ';
    switch(req.body.status){
        case '2':
            sql+=`${req.body.status} and buyTime=${regTime} where orderId= ${req.body.orderId}`;
            break;
        case '3':
            sql+=`${req.body.status} and getTime=${regTime} where orderId= ${req.body.orderId}`;
            break;
        case '4':
            sql+=`${req.body.status} and evaTime=${regTime} where orderId= ${req.body.orderId}`;
            break;
    }
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});


//所有商家
app.get('/sellerAll', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql ='';
        if(req.query.limit==6){
            sql='SELECT * FROM seller_info where `status`=2  order by regTime DESC limit 6';
        }else{
            sql='SELECT * FROM seller_info where  `status`=2 order by regTime DESC';
        }
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
        });
});


//通过电商id查询
app.get('/seller/findId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql ='SELECT * FROM seller_info where sellerId='+`${req.query.sellerId} `;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results[0]);
           
        });
});

//通过名字查询
app.get('/find/seller/title', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql ='SELECT * FROM seller_info where `status`=2 and sellerTitle like ';
    if(req.query.limit==8){
        sql+=`'%${req.query.title}%' order by regTime DESC limit 8`
    }else{
        sql+=`'%${req.query.title}%' order by regTime DESC `
    }
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
        });
});

//搜藏
app.post('/collet/insert', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`INSERT INTO collet(colletType,userId,colletId) VALUES 
    (${req.body.colletType},${req.body.userId},${req.body.colletId})`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});
//取消搜藏
app.post('/collet/delete', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`DELETE from collet  where colletType=${req.body.colletType} and userId=${req.body.userId} 
    and colletId=${req.body.colletId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});
//查找是否搜藏
app.get('/collet/find', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM collet where colletType=${req.query.colletType} and userId=${req.query.userId} 
    and colletId=${req.query.colletId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        if(results.length==0){
            res.send('fail');
        }else{
            res.send('success');
        }
        
    });
});
//显示全部搜藏
app.get('/colletAll', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='';
    if(req.query.colletType==1){
        sql=`SELECT * FROM collet as a,seller_info as b where colletType=${req.query.colletType} and userId=${req.query.userId} 
            and a.colletId=b.sellerId`;
    }else{
        sql=`SELECT * FROM collet as a,goods as b where colletType=${req.query.colletType} and userId=${req.query.userId} 
            and a.colletId=b.goodsId`;
    }
   console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results);
        
    });
});

app.listen(2014);
console.log("开启服务器");

//时间函数
function timeChange(){ 
    var time = new Date();
    return ""+time.getFullYear()+stringNum(time.getMonth()+1)+stringNum(time.getDate())+stringNum(time.getHours())+stringNum(time.getMinutes())+stringNum(time.getSeconds())+"";
}
function stringNum(ti){
    if(ti<10){
        ti="0"+ti;
    }
    return ti;
}
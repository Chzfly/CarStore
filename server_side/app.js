//引包
const express = require('express');
const url = require('url');
const mongoose = require('mongoose');
const _ = require('underscore');
const formidable = require('formidable');
const session = require('express-session');
const path = require('path');
const gm = require('gm');
const crypto = require('crypto');
const fs = require('fs');
const Mock = require('mockjs');

//引文件
const carModel = require('./carModel.js');
const staffModel = require("./staffModel.js");

//创建app对象
const app = express();

//使用session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false
}))
//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/esc');
//数据模型
const Car = mongoose.model('Car', carModel);
const Staff = mongoose.model("Staff", staffModel);
//开静态
app.use(express.static('./'));

//******************************** */接口列表

//得到一辆车的信息

app.get('/carinfo', (req, res) => {
    //得到get请求参数
    const carid = Number(url.parse(req.url, true).query.id);
    //根据请求的汽车id，从数据库中找到这辆车
    Car.find({'id' : carid}, (err, docs) => {
        //如果找到了这辆车就将车辆信息返回
        if(docs.length){
            res.json({'result' : docs[0]});
        }else{
            res.json({'result' : {}});
        }
    });
});

//得到相似车型（调试中此处没有相似算法，随机提供车辆）

app.get('/carlike', (req, res) => {
    //得到get请求参数
    const carid = Number(url.parse(req.url, true).query.id);
    //根据参数carid随机出10辆不包括传入id的互不相同车
    //相似车辆id的数组
    var likeIdArr = [];
    //相似车的结果数组
    var likeCarResults = [];
    //我们需要循环carid并且同时要发出数据请求，数据请求是异步语句，所以选择迭代器,递归的出口就是找到相似车辆的数量是10的时候
    //开启迭代入口
    iter(0);
    function iter(n){
        //迭代出口
        if(n == 10){
            res.json({'results' : likeCarResults});
            return;
        }
        do{
            var id = _.random(1000001, 1000100);
        }while(id == carid || likeIdArr.includes(id))
        //合格的id推进数组
        likeIdArr.push(id);
        //根据id找到车辆信息，放入数组
        Car.find({'id' : id}, (err, docs) => {
            likeCarResults.push(docs[0]);
            //进行下一次迭代
            iter(++n);
        });
    }
});

//富查询接口
app.get("/findcar" , (req,res) => {
    //得到用户的参数
    var query = url.parse(req.url , true).query;
    //各种形参
    var page = Number(query.page);
    var pagesize = Number(query.pagesize)
    var sortby = query.sortby;
    var sortdirection = Number(query.sortdirection);
    var brand = query.brand;
    var series = query.series;
    var color = query.color;
    var price = query.price;
    var km = query.km;
    var engine = query.engine;
    var buydate = query.buydate;
    var license = query.license;
    var exhaust = query.exhaust;
    var gearbox = query.gearbox;
    var fuel = query.fuel;

    //查询对象
    var CHAXUNDUIXIANG = {};
    
    if(!page){
        page = 1;
    }

    if (!pagesize) {
        pagesize = 10;
    }

    if(!sortby){
        sortby = "id";
    }

    if(!sortdirection){
        sortdirection = 1;
    }

    if (color){
        CHAXUNDUIXIANG.color = color.split("v");
    }

    if (engine) {
        CHAXUNDUIXIANG.engine = engine.split("v");
    }

    if (exhaust) {
        CHAXUNDUIXIANG.exhaust = exhaust.split("v");
    }

    if (gearbox) {
        CHAXUNDUIXIANG.gearbox = gearbox.split("v");
    }

    if (fuel) {
        CHAXUNDUIXIANG.fuel = fuel.split("v");
    }

    if(price){
        CHAXUNDUIXIANG.price = { "$gte": price.split("to")[0], "$lte": price.split("to")[1]};
    }

    if (km) {
        CHAXUNDUIXIANG.km = { "$gte": km.split("to")[0], "$lte": km.split("to")[1] };
    }

    if (buydate) {
        CHAXUNDUIXIANG.buydate = { "$gte": buydate.split("to")[0], "$lte": buydate.split("to")[1] };
    }

    if(brand){
        CHAXUNDUIXIANG.brand = brand;
    }

    if (series) {
        CHAXUNDUIXIANG.series = series;
    }

    if (license){
        if(license == "y"){
            CHAXUNDUIXIANG.license = true;
        }else{
            CHAXUNDUIXIANG.license = false;
        }
    }

    //寻找数据库
    Car.count(CHAXUNDUIXIANG , (err , total)=>{
        Car.find(CHAXUNDUIXIANG)
            .sort({[sortby] : sortdirection})
            .skip((page - 1) * pagesize)
            .limit(pagesize)
        .exec((err, docs) => {
            res.json({ total, "results": docs });
        });
    });
});

//图片上传接口
app.post('/uppic', (req, res) => {
    var form = new formidable.IncomingForm();
    //上传图片存储位置
    form.uploadDir = './uploads';
    //保留文件扩展名
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        res.send({"status":200 , "filename" : files.file.path.substr(8)});
    });
});

//登录接口
app.post("/login" , (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        var username = fields.username;
        var password = fields.password;

        //创建SHA256加密函数
        const hash = crypto.createHash('sha256');
        //利用刚创建的加密函数进行加密
        const password_sha256 = hash.update(password).digest("hex");
        //试着在数据库中寻找有没有username是username的，password的password_sha256的人
        //也就是使用用户名和加密后的密码和数据库中的数据进行比对，数据库中存储的是加密后的密码
        Staff.find({
            username,
            "password": password_sha256
        }).exec((err, docs) => {
            if (docs.length) {
                req.session.login = true;
                req.session.username = username;
                res.json({"result" : 1});
            } else {
                res.json({"result" : -1});
            }
        });
    });
});

//得到登陆者的信息
app.get("/me" , (req,res)=>{
    if(!req.session.login){
        res.json({"info" : {} , "status" : "-1" , "description" : "你没有登录"});
    }else{
        Staff.find({
            username : req.session.username
        }).exec((err, docs) => {
            res.json({ "info": docs[0], "status" : 1})
        });
    }
});

//上传头像
app.post("/upavatar", (req, res) => {
    var form = new formidable.IncomingForm();
    //上传图片存到哪里
    form.uploadDir = "./uploads";
    //保留文件扩展名
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        gm(path.resolve(__dirname, files.avatar.path)).size(function(err , size){
            res.json({
                "filename" : files.avatar.path,
                "width" : size.width,
                "height" : size.height
            });
        });
    });
});

//裁剪头像接口
app.post('/cut', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        const picurl = fields.picurl ;
        const cut_rect_x  = fields.cut_rect_x;
        const cut_rect_y  = fields.cut_rect_y;
        const cut_rect_w  = fields.cut_rect_w;
        const cut_rect_h  = fields.cut_rect_h;
        const picRealW  = fields.picRealW;
        const picRealH  = fields.picRealH;
        const picW  = fields.picW;
        const picH = fields.picH;
        
        //比例
        const bili = picW / picRealW;

        //名字
        const username = req.session.username;
        //进行图片裁剪，存储，并修改相应数据库数据
        gm(path.resolve(__dirname, picurl)).crop(cut_rect_w / bili, cut_rect_h / bili, cut_rect_x / bili, cut_rect_y / bili)
            .write(path.resolve(__dirname, "./images/avatars/" + username + ".jpg"), function (err) {
                //写数据库
                Staff.update({ "username": username }, { "$set": { "avatar": "./images/avatars/" + username + ".jpg"}}, function(){
                    res.json({"result" : 1});
                })
            })
    });
});

//请求所有品牌
app.get('/brands', (req, res) => {
    fs.readFile('./txts/brands.txt', (err, docs) => {
        res.json(JSON.parse(docs.toString()));
    })
})

//根据品牌给出所有车系
app.get("/series" , (req,res)=>{
    var brand = url.parse(req.url , true).query.brand;

    fs.readFile("./txts/series.txt", (err, content) => {
        var o = JSON.parse(content.toString());
        for(var i = 0 ; i < o.series.length ; i++){
            if(o.series[i].brand == brand){
                res.json({
                    "series" : o.series[i].ss
                });
                return;
            }
        }
        
        //没有这个牌子，随机一些车系
        res.json({
            "series" : (function(){
                var d = Mock.Random.integer(6,14);
                var arr = [];
                while(d--){
                    arr.push(Mock.Random.cword(2, 5));
                }
                return arr;
            })()
        })
    });
});

//增加车辆，调用这个接口图片已经在uploads里面了，此时迎接的就是图片的顺序和汽车基本资料
app.post("/addcar", (req, res) => {
     
    //寻找数据库，找到当前的最大的ID
    Car.find().sort({ id: -1 }).limit(1).exec((err, docs) => {
        //这个汽车的id就是最大id，因为按id倒序了
        var maxid = docs[0].id;
        //识别POST请求
        var form = new formidable.IncomingForm();
        //识别POST请求
        form.parse(req, function (err, fields, files) {
            //为新车创建id名字的images文件夹
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages/" + (maxid + 1)));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/view"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/inner"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/engine"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/more"));

            fs.mkdirSync(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1)));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/view"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/inner"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/engine"));
            fs.mkdirSync(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/more"));

            //图片顺序序列
            const { view, inner, more, engine } = fields.step2Form;
 
            //遍历view序列，调用gm进行缩略图制作。并且将大图也移动。
            for (let i = 0; i < view.length; i++) {
                gm(path.resolve(__dirname, "./uploads/" + view[i]))
                    .resize(100, 100)
                    .noProfile()
                    .write(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/view" + "/" + view[i]), function (err) {
                        if (!err) console.log('done');
                        //改名字也可以移位
                        fs.renameSync(path.resolve(__dirname, "./uploads/" + view[i]), path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/view/" + view[i]));
                    });
            }

            //遍历inner序列，调用gm进行缩略图制作。并且将大图也移动。
            for (let i = 0; i < inner.length; i++) {
                gm(path.resolve(__dirname, "./uploads/" + inner[i]))
                    .resize(100, 100)
                    .noProfile()
                    .write(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/inner" + "/" + inner[i]), function (err) {
                        if (!err) console.log('done');
                        fs.renameSync(path.resolve(__dirname, "./uploads/" + inner[i]), path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/inner/" + inner[i]));
                    });
            }


            //遍历engine序列，调用gm进行缩略图制作。并且将大图也移动。
            for (let i = 0; i < engine.length; i++) {
                gm(path.resolve(__dirname, "./uploads/" + engine[i]))
                    .resize(100, 100)
                    .noProfile()
                    .write(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/engine" + "/" + engine[i]), function (err) {
                        if (!err) console.log('done');
                        fs.renameSync(path.resolve(__dirname, "./uploads/" + engine[i]), path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/engine/" + engine[i]));
                    });
            }

            //遍历more序列，调用gm进行缩略图制作。并且将大图也移动。
            for (let i = 0; i < more.length; i++) {
                gm(path.resolve(__dirname, "./uploads/" + more[i]))
                    .resize(100, 100)
                    .noProfile()
                    .write(path.resolve(__dirname, "./images/carimages_small/" + (maxid + 1) + "/more" + "/" + more[i]), function (err) {
                        if (!err) console.log('done');
                        fs.renameSync(path.resolve(__dirname, "./uploads/" + more[i]), path.resolve(__dirname, "./images/carimages/" + (maxid + 1) + "/more/" + more[i]));
                    });
            }

            //创建数据，数据库持久
            Car.create({
                id: maxid + 1,
                price: fields.step1Form.price,
                brand: fields.step1Form.brand,
                series: fields.step1Form.series,
                km: fields.step1Form.km,
                color: fields.step1Form.color,
                images: {
                    inner, more, engine, view
                },
                avatar: view[0]
            }, function (err) {
                res.send("ok");
            });
        });
    });
});


//开启监听
app.listen(3000);

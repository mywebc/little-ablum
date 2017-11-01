//这里是大门。
//引入express框架
const express=require('express');
const app=express();
//引入路由
const router=require("./controller/router");

//设置模板
app.set('view engine','ejs');

//设置静态的资源管理
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//管理路径去向,函数不需要加括号
//首页
app.get('/',router.showIndex);
//图集页面
app.get('/:albumName',router.showAlbumName);
//上传页面
app.get('/up',router.showUp);
//处理上传
app.post('/up',router.doPost);




/*404页面*/
app.use((req,res)=>{
    res.render("404");
})
//监听端口
app.listen(2000);
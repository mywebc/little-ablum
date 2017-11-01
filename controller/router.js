//这里是路由中转站，函数调用处。
const file=require('../models/files');
const formidable = require('formidable');
const fs=require('fs');
const sd = require('silly-datetime');
const path=require('path');
//首页
exports.showIndex=(req,res,next)=> {
    //渲染首页
    file.showAlbumsNames((err,filesNames)=>{
        if(err){
            next();
            return;
        }
        //因为异步，先拿到回调再渲染页面
        res.render("index",{
            albums:filesNames
        })

    })
}
//图集页面
exports.showAlbumName=(req,res,next)=>{
    let albumName=req.params.albumName;
    file.albumImage(albumName,(err,albumImages)=>{
        if(err){
            return next();
        }
        res.render("albums",{
            albumImages:albumImages,
            albumName:albumName
        })
    })




}
//上传页面
exports.showUp=(req,res,next)=>{
   file.showAlbumsNames((err,fileNames)=>{
      if(err){return next()}
      res.render("up",{
        albumName:fileNames
      })
    })
}
//处理上传
exports.doPost=(req,res,next)=>{
    let form = new formidable.IncomingForm();
    //设置上传路径
    form.uploadDir = "./temup";
    form.parse(req, function(err, fields, files) {
        if(err){return next()}

        //限制上传图片大小
        if(files.pic.size>10485760){
            res.send('上传图片大小不能超过10M哦！')
            //并且删除零时缓存
            fs.unlink(files.pic.path);
            return;
        }

        //改名并且改变路径
        let  ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        let  ran = parseInt(Math.random() * 89999 + 10000);
        let  extname = path.extname(files.pic.name);

        let oldPath=files.pic.path;
        let newPath='./uploads/'+fields.wenjianjia+'/'+ttt+ran+extname;
        fs.rename(oldPath,newPath,(err)=>{
            if(err){
                res.send('Failed to modify path');
            }
            res.send('fileOK')
        })
    });
    return;
}
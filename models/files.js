//在这里书写具体的文件操作，脏活累活都给他干
const fs=require('fs');

exports.showAlbumsNames=function(callback){
    //读取首页所有文件夹数，并把他们放到数组里暴露，注意同步
    fs.readdir('./uploads',(err,files)=>{
            if(err){
                callback('没有找到uploads',null);
                return;
            }
        //传统解决方法:用自调用问题解决异步
        let  filesNames=[];
        (function iterator(i){
            if(i==files.length){
                callback(null,filesNames)
                return;
            }
            //用fs.stat判断迭代找出文件夹
            fs.stat("./uploads",(err,stats)=>{
                if(err){
                    callback('没有找到文件夹',null)
                    return;
                }
                if(stats.isDirectory()){
                    filesNames.push(files[i])
                }
                iterator(i+1);
            })
        }(0))
    })
}
exports.albumImage=function(albumName,callback){
    //读取首页所有文件夹数，并把他们放到数组里暴露，注意同步
    fs.readdir('./uploads/'+albumName,(err,files)=>{
        if(err){
            callback('没有找到uploads',null);
            return;
        }
        //传统解决方法:用自调用问题解决异步
        let  albumImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(null,albumImages)
                return;
            }
            //用fs.stat判断迭代找出文件夹
            fs.stat("./uploads/"+albumName+'/'+files[i],(err,stats)=>{
                if(err){
                    callback('没有找到文件夹',null);
                    return;
                }
                if(stats.isFile()){
                    albumImages.push(files[i])
                }
                iterator(i+1);
            })
        }(0))
    })
}
exports.doPosts=function(){

}

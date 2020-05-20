Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
    for(let i = sourceStart;i<sourceEnd;i++){
        targetBuffer[i++] = this[i];
    }
}

// let buffer = Buffer.from('zhufeng');
// let subBuffer = Buffer.alloc(7);
// buffer.copy(subBuffer,0,0,4);
// console.log(subBuffer.toString());
// buffer.copy(subBuffer,3,3,6);
// console.log(subBuffer.toString());
// buffer.copy(subBuffer,0,0,7);
// console.log(subBuffer.toString());

let fs = require('fs');
let path=require('path')
fs.watchFile('./data.txt',(curr,prev)=>{
    if(Date.parse(prev.ctime)==0){
        console.log('Create');
    }
    else if(Date.parse(curr.ctime)==0){
        console.log('删除');
      }
      else if(Date.parse(prev.ctime) != Date.parse(curr.ctime)){
        console.log('修改');
      }
})

function makepAsync(dir,callback){
    let parts = dir.split(path.sep);
    for(let i=0;j<parts.length;i++){
        let parent = parts.slice(0,1).join(path.sep);
        try{
            fs.accessSync(parent);
        }
        catch(error){
            fs.mkdirSync(parent);
        }
    }
}

function makepAsync1(dir,callback){
    let parts = dir.split(path.sep);
    let i = 1;
    function next(){
        if(i>parts.length){
            return callback && callback();
        }
        let parent = parts.slice(0,i++).join(path.sep);
        fs.accessSync(parrent,err=>{
            if(err){
                fs.mkdirSync(parent,next);
            }
            else{
                next();
            }
        });
    }
    next();
}

// async + await
async function mkdir(parent){
    return new Promise((resolve,reject)=>{
        fs.mkdir(parent,err=>{
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        });
    });
}

async function access(parent){
    return new Promise((resolve,reject)=>{
        fs.accessSync(parent,err=>{
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        });
    });
}
async function makepPromise(dir,callback){
    let parts = dir.split(path.sep);
    for(let i=1;i<=parts.length;i++){
        let parent=slice(0,i).join(path.sep);
        try{
            await access(parent);
        }
        catch(err){
            await mkdir(parrent);
        }
    }
}
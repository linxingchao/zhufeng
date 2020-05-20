// let fs = require('fs');

// function readFile(filename){
//     return new Promise(function(resolve,reject)
//     {
//         fs.readFile(filename,function(error,data)
//         {
//             if(error)
//             {
//                 reject(error);
//             }
//             else
//             {
//                 resolve(data);
//             }
//         })
//     })
// };

// function *read(){
//     let templete  =yield readFile('./template.txt');
//     let data = yield readFile('./data.txt');
//     return templete + '+' + data;
// }

// // co(read).then(data=>{
// //     console.log(data);
// // },err=>{
// //     console.log(err);
// // })



// function co(gen){
//     let it = gen();
//     return new Promise(function(resolve,reject){
//         !function next(lastVal){
//             let {value,done} = it.next(lastVal);
//             if(done){
//                 resolve(value);
//             }
//             else{
//                 value.then(next,reason=>reject(reason));
//             }
//         }();
//     });
// }

let fs = require('fs');

function readFile(filename){
    return new Promise((resolve,reject)=>{
        fs.readFile(filename,'utf8',(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

async function read(){
    let template = await readFile('./template.txt');
    let data = await readFile('./data.txt');
    return template + '+' +data;
}

function ajaxPromise(queryUrl){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET',queryUrl,true);
        xhr.send(null);
        xhr.onreadystatechange = ()=>{
            if(xhr.status == 4){
                resolve(xhr.responseText);
            }
            else{
                reject(xhr.responseText);
            }
        }
    });
}

let Q = require('./q.js');
let fs1 = require('fs');

function read2(filename){
    let deferred = Q.defer();
    fs1.readFile(filename,'utf8',function(err,data){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

read2('./data.txt')
.then(data=>{
    console.log(data);
},err=>{
    console.error(err);
})



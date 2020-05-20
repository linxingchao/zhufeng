let fs = require('fs');

function getNumber(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let number = Math.random();
            if(number>0.5){
                resolve(number);
            }
            else{
                reject('number is too min');
            }
        },1000);
    });
}

function *read(){
    let a = yield getNumber();
    console.log(a);
    let b = yield 'b';
    console.log(b);
    let c = getNumber();
    console.log(c);
}

async function readAsync(){
    let a = await getNumber();
    console.log(a);
    let b = await 'b';
    console.log(b);
    let c = await getNumber();
    console.log(c);
}

//read();
//readAsync();

process.argv.forEach(item=>{
    console.log(item);
});

console.log(process.memoryUsage());
console.log(process.cwd());
console.log(__dirname);
process.chdir('..');
console.log(process.cwd());
console.log(__dirname);

function err(){
    throw new Error('error');
}

err();

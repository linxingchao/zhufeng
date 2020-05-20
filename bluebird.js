module.exports = {
    promisify(fn){
        return function(){
            var args = Array.from(arguments);
            return new Promise((resolve,reject)=>{
                fn.apply(null,args.concat(err=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(arguments[1]);
                    }
                }));
            })
        }
    },
    promisifyAll(obj){
        for(var atrr in obj){
            if(obj.hasOwnProperty(atrr) && typeof obj[atrr] == 'function'){
                obj[atrr+'Async'] = this.promisify(obj[atrr]);
            }
        }
        return obj;
    }
}
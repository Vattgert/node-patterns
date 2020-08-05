function asyncDivisor(dividend, divisor, callback){
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const result = dividend / divisor;
            if(isNaN(result) && Number.isFinite(result)){
                const error = new Error("Invalid operands");
                if(callback) callback(error);
                return reject(error);
            }
            if(callback) callback(null, result);
            resolve(result);
        })
    })
}

asyncDivisor(10, 2, (error, result) => {
    if (error) {
        return console.error(error);
    }
    console.log(result);
});

asyncDivisor(22, 11)
    .then(result => console.log(result))
    .catch(error => console.error(error));
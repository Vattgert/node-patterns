function asyncFlowWithThunks(generatorFunction) {
    function callback(err) {
        if(err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        const thunk = generator.next(results.length > 1 ? results : results[0]).value;
        thunk && thunk(callback);
    }
    const generator = generatorFunction(callback);
    const thunk = generator.next().value;
    thunk && thunk(callback);
}

function getNumThunk(number){
    return function(callback){
        const numberPromise = new Promise((resolve, reject) => setTimeout(() => resolve(number), 1500));
        numberPromise.then((result) => callback(result)).catch(e => console.log(e));
    }
}

asyncFlowWithThunks(function* (){
    const num = yield getNumThunk(25);
    console.log(num);
});
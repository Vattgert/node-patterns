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

const fs = require('fs');
const path = require('path');

function readFileThunk(filename, options){
    return function(callback){
        fs.readFile(filename, options, callback);
    }
}

function writeFileThunk(filename, data){
    return function(callback){
        fs.writeFile(filename, data, callback);
    }
}

function* getFile(){
    const fileName = path.basename(__filename);
    const myself = yield readFileThunk(fileName, 'utf8');
    yield writeFileThunk(`clone_of_${fileName}`, myself);
    console.log('Clone created');
}

asyncFlowWithThunks(getFile);
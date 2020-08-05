
//Synchronous continuation passing style
/*function add(a, b, callback){
    callback(a + b);
}

console.log("before");
add(1, 2, result => console.log(`Result ${result}`));
console.log("after");


//Async continuation passing style
function additionAsync(a, b, callback){
    setTimeout(() => callback(a + b), 100)
}

console.log("before");
additionAsync(1, 2, result => console.log(`Result ${result}`));
console.log("after");
*/

//Unpredictable function 
/*const fs = require("fs");
const cache = {};
function inconsistentRead(filename, callback){
    if(cache[filename]){
        //callback(cache[filename])
        process.nextTick(() => callback(cache[filename]));
    } else {
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            callback(data);
        })
    }
}

function createFileReader(filename){
    const listeners = [];
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value));
    });

    return {
        onDataReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader("data.txt");
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`);
    const reader2 = createFileReader("data.txt");
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`);
    });
});*/


//Callback errors propagation
//Now errors propagate from try catch inside callback. 
//Without this callback error would be propagated from somewhere readFile...
/*const fs = require("fs");
function readJSON(filename, callback){
    fs.readFile(filename, 'utf-8', (err, data) => {
        let parsed;
        if(err){
            return callback(err);
        }
        
        try{
            parsed = JSON.parse(data);
        } catch(err) {
            return callback(err);
        }
        callback(null, parsed);
    });
};

readJSON("nonJSON.txt", err => console.log(err));*/





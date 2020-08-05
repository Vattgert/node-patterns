//non flowing mode
/*process.stdin.on('readable', () => {
    let chunk;
    console.log("New data available");
    while((chunk = process.stdin.read()) !== null){
        console.log(
            `Chunk read: (${chunk.length}) "${chunk.toString()}"`
        );
    }
}).on('end', () => process.stdout.write("End of stream"));*/

//Flowing mode
/*process.stdin.on('data', chunk => {
    console.log("New data available");
    console.log(
        `Chunk read: (${chunk.length}) "${chunk.toString()}"`
    );
}).on('end', () => process.stdout.write("End of stream"));*/

//Implementing streams
const stream = require("stream");
const Chance = require("chance");
const chance = new Chance();

//Readable stream
/*class RandomStream extends stream.Readable{
    constructor(options){
        super(options)
    }

    _read(size){
        const chunk = chance.string();
        console.log(`Pushing chunk of size ${chunk.length}`);
        this.push(chunk, 'utf-8');
        if(chance.bool({ likelihood: 5})){
            this.push(null);
        }
    }
}

const randomStream = new RandomStream();
randomStream.on('readable', () => {
    let chunk;
    while((chunk = randomStream.read()) !== null){
        console.log(
            `Chunk recieved:  "${chunk.toString()}"`
        );
    }
})*/

//Writable stream
/*require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});

    function generateMore(){
        while(chance.bool({ likelihood: 95 })){
            let shouldContinue = res.write(chance.string({ length: (16 * 24) - 1}));
            if(!shouldContinue){
                console.log("Backpressure");
                return res.once('drain', generateMore);
            }
        }
        res.end('\n The end... \n', () => console.log('All data was sent'));
    }
    generateMore();
}).listen(3000, () => console.log('Listening on port 3000'));*/

//Custom writable stream
/*const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

class ToFileStream extends stream.Writable{
    constructor(){
        super({ objectMode: true});
    }

    _write(chunk, encoding, callback){
        mkdirp(path.dirname(chunk.path)).then(() => {
            fs.writeFile(chunk.path, chunk.content, callback);
        }).catch(err => callback(err));
    }
}

const tf = new ToFileStream();
tf.write({ path: "file1.txt", content: "Hello"});
tf.write({ path: "file2.txt", content: "Node js"});
tf.write({ path: "file3.txt", content: "Streams"});*/

//Duplex stream
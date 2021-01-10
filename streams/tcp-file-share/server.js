const { createServer } = require("net");
const { createWriteStream } = require("fs");
const path = require("path");

const createFileDestination = (filename) => createWriteStream(path.resolve(__dirname, `writeFiles/${filename}`), { highWaterMark: 16 });
const deleteEmptyBytesFromString = (string) => string.replace(/\0/g, '');

function demultiplexFiles(source){
    source.on('readable', function(){
        let chunk;
        while(chunk = this.read()){   
            const filenameBytes = chunk.subarray(0, 101)
            const fileContent = chunk.subarray(101);
            const fileNameString = filenameBytes.toString('utf-8');
            const formattedFileName = deleteEmptyBytesFromString(fileNameString);
            createFileDestination(formattedFileName).write(fileContent);
        }
    });
}

const tcpServer = createServer((socket) => {
    demultiplexFiles(socket);
});

tcpServer.listen(8000, '127.0.0.1');
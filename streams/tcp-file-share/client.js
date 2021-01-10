const { Socket } = require("net");

const { createReadStream } = require("fs");

const FILES = ['sample_send.txt', 'sample_send_2.txt', 'sample_send_3.txt'];
const FILENAME_MAX_LENGTH = 100;

function createFileStreams(files){
    return files.map(path => { 
        return {
            filename: path, 
            stream: createReadStream(path)
        }
    });
}

function multiplexFileStreams(streams, destination){
    let openChannels = streams.length;
    streams.forEach((streamObject) => {
        const { filename, stream } = streamObject;
        stream.on('readable', function(){
            let chunk;
            while((chunk = this.read()) !== null){
                const outputBuffer = Buffer.alloc(FILENAME_MAX_LENGTH + chunk.length);
                outputBuffer.write(filename, 0);
                chunk.copy(outputBuffer, 101);
                destination.write(outputBuffer);
            } 
        }).on('end', () => {
            if(--openChannels === 0){
                destination.end()
            }
        });
    })
}

const fileTransferSocket = new Socket();

fileTransferSocket.connect(8000, '127.0.0.1', () => {
    const fileStreams = createFileStreams(FILES);
    multiplexFileStreams(fileStreams, fileTransferSocket);
});


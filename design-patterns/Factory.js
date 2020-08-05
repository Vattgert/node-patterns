class Profiler{
    constructor(label){
        this.label = label;
        this.lastTime = null;
    }

    start(){
        this.lastTime = process.hrtime();
    }

    end(){
        const diff = process.hrtime(this.lastTime);
        console.log(
            `Timer "${this.label}" tool ${diff[0]} seconds and ${diff[1]} nanoseconds`
        );
    }
}

const env = "development"

function createProfiler(label){
    if(env === "development"){
        return new Profiler(label);
    } else if (env === "production") {
        return {
            start: function(){},
            end: function(){}
        }
    } else {
        throw new Error(' Must set env');
    }
}

function getRandomArray(len){
    const p = createProfiler(`Generating a ${len} items long array`);
    p.start();
    const arr = [];
    for(let i = 0; i < len; i++){
        arr.push(Math.random());
    }
    p.end()
}

getRandomArray(1e6);
console.log("Done");
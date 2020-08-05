const EventEmmiter = require("events");

class ReadOnlyEmmiter extends EventEmmiter{
    constructor(executor){
        super();
        const emit = this.emit.bind(this);
        this.emit = undefined;
        executor(emit);
    }
}

const ticker = new ReadOnlyEmmiter((emit) => {
    let tickCount = 0;
    setInterval(() => emit('tick', tickCount++), 1000);
});

ticker.on('tick', tickCount => console.log(tickCount, 'TICK'));

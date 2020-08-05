function* twoWayGenerator(){
    const what = yield null;
    console.log(`Hello, ${what}`)
}

const generator = twoWayGenerator();
const item = generator.next();
console.log(item);
generator.next("world");
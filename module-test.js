//Module test example
const testModule = (() => {
    const privateFoo = () => 10;
    const privateBar = () => [];

    const exported = {
        publicFoo: () => privateFoo,
        publicBar: () => privateBar
    }
    return exported;
})();
console.log(testModule);
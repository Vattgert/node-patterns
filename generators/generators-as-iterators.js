function* iteratorAsGenerator(arr){
    for(let i = 0; i < arr.length; i++){
        yield arr[i];
    }
}

const generator = iteratorAsGenerator([1, 2, 3, 4, 5]);
let currentItem = generator.next();

while(!currentItem.done){
    console.log(currentItem.value);
    currentItem = generator.next();
}
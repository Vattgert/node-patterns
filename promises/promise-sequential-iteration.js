//Sequential iteration pattern
//The idea of sequential iteration is making a chain of then on promises while iterating array.
const task1 = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() =>  { 
            console.log("task 1")
            resolve("task 1")
        }, 1000);
    });
}

const task2 = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() =>  { 
            console.log("task 2")
            resolve("task 2")
        }, 1000);
    });
}

const task3 = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() =>  { 
            console.log("task 3")
            resolve("task 3")
        }, 1000);
    });
}

const tasks = [task1, task2, task3];
/*let promise = Promise.resolve();
tasks.forEach(task => {
    promise = promise.then(() => {
        return task();
    });
})
*/

//Sequential iteration pattern variant 2
let promise = tasks.reduce((prev, task) => {
    return prev.then(() => {
        return task();
    })
}, Promise.resolve());

promise.then(() => {
    console.log("All tasks completed")
})

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("1")
    },5000)
})

let promise3 = new Promise((resolve, rejeect) => {
    setTimeout(() => {
        resolve("1")
    }, 1000)
})

// promise1
// .finally(val => console.log(val, 'finally'))
// .then(val => console.log(val, 'resolve'))
// .catch(val => console.log(val, 'reject'))

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("2")
    },10000)
})

// let promise3 = new Promise((resolve, reject) => {
//     reject("3")
// })

// Promise.all([promise1, promise2, promise3])
// .finally(val => console.log(val, 'finally'))
// .then(val => console.log(val, 'resolve'))
// .catch(val => console.log(val, 'reject'))


// promise1.then(result => {
//     console.log(result)
//     return result
// }).then(result => {
//     result = result * 2
//     console.log(result)
//     return result
// })
// .then(result => {
//     result = result * 2
//     console.log(result)
//     return result
// })

// fetch('https://www.animenewsnetwork.com/encyclopedia/api.php')
// .then(res => {
//     console.log(res.json)
// })




/*-------Obeservation------
1. Promise can resolve/reject only one value. If multiple are used, then the first one is executed.
2. Finally is executed once the promise is resolved/rejected. It doesnt provide any value, just used for cleanup after the promise state changes from pending.
3. Promise has 2 properties, state and result. State is initially pending and result is undefined. If it resolves, state is fulfilled and result is resolve object. If it fails,
   state is rejected and result is reject.
4. Promise.all observation: 
    a) If all promises are resolved, we get output resolve after 10 secs(other promises are resolved/rejected).
    b) If promise 1 fails, output is displayed reject 1 after 5 secs, but operation goes for 10 secs. Similar for other 2, if only 1 fails, then it gives output within its time
       but continues until the entire time is done(other promises are resolved/rejected).
    c) If multiple rejects are there, only first one is taking into account.
-------------------------*/
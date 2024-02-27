// Run -> file:///Users/tnluser/Desktop/Github/testing/index.html
// Closures
/*
function x(){
    var a = 7
    function y(){
        console.log(a)
    }
    var a = 100
    return y
}
var z = x()
z()
*/
//

let counter = 0

const getData = () => {
    console.log("Data printed", counter ++)
}

const debounce = (fn, delay) => {
    let timer
    return function () {
        let context = this,
        args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args) //to provide correct lexical environments
        }, delay);
    }
}


const efficientGetData = debounce(getData, 300)

const throttle = (fn, delay) => {
    let flag = true; //closure
    return function () {
        let context = this,
        args = arguments;
        if(flag){
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true
            }, delay)
        }
    }
}
    
const throttleButton = throttle(getData, 1000)

function closureWithTimeout () {
    for(var i =0 ; i<=5 ; i ++){
    function closureWithVar (newRef) {
        setTimeout(() => {
            console.log(newRef, "fired after ",newRef," secs" )
        }, newRef*1000)
    }
    closureWithVar(i) //New reference to variable for every loop iteration
   
}
    console.log("Works instantly")
}


//Constructor with closuers
function Counter() {
    var count  = 0 //This forms a closure as well serves as data hiding/encapsulation
    this.incrementCounter = function(){
        count++;
        console.log(count)
    }
    this.decrementCounter = function(){
        count--;
        console.log(count)
    }
}

var countingVar = new Counter()
// countingVar.incrementCounter() // 1
// countingVar.incrementCounter() // 2
// countingVar.decrementCounter() // 1


/*Callback functions: These are the functions which are passed as arguments into other functions.
They are called as per their need and help to perform asynchrounous actions in JS which is a single thread
synchronous language. Example is a function in setTimeout. It is called after a certain time interval,
when the other part of the program is still running, hence achieving asynchronity. The call stack is the 
main thread in JS and if any operation takes a lot of time, like 10s or more, those should be handled
async to make sure we dont block the main thread */

//Event listeners
// function attachedEvent() {
//     let count = 0 ;// Forms a closure. Used so that variable can't be changed outside
//     document?.getElementById("clickMe").addEventListener("click", function (){
//         console.log("Button clicked", ++count)
//     })
// }
// attachedEvent()


//Polyfill for map, filter
// Cannot be done with an arrow function because of this keyword.
Array.prototype.mapPolyfill = function (logic) {
    let output = []
    for (let i = 0; i < this.length; i++)
        output.push(logic(this[i]))
    return output
}

const radius = [1, 2, 3, 4]
function area (radius) {
    return Math.PI * radius * radius
}

Array.prototype.filterPolyfill = function (logic) {
    let output = []
    for(let i = 0; i < this.length ; i++){
        if(logic(this[i]))
            output.push(this[i])
    }
    return output
}

//Reduce function to find sum: cannot use predefined function inside reduce
radius.reduce(function (acc, curr){  
    return acc += curr
}, 0) //second argument is the initial val of acc

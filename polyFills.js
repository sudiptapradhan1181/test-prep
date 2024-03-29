function debouncePoly(fn, delay) {
	let timer;
  return function () {
  	let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
    	fn.apply(context, args)
    }, delay)
  }
}

function throttlePoly(fn, delay){
	let flag = true;
  return function(){
  	let context = this;
    let args = arguments;
    if(flag){
    	flag = false;
      fn.apply(context, args)
      setTimeout(() => {    	
        flag = true
      }, delay)
    }
  }
}

Array.prototype.newMap = function(logic) {
  let result = []
  this.forEach((element) => {
  	result.push(logic(element))
  })
  return result
}

Array.prototype.newFilter = function(logic) {
  let result = []
  this.forEach((element) => {
  	if(logic(element))
  		result.push(element)
  })
  return result
}

Array.prototype.newReduce = function(logic,acc) { 
  var accumulator = acc;
  for (var i = 0; i < this.length; i++) {
      if (accumulator !== undefined) {
        accumulator = logic.call(undefined, accumulator, this[i],   i, this);
      } else {
        accumulator = this[i];
      }
  }
  return accumulator;
}

Array.prototype.newFlat = function(depth = 1) {
	let result = []
    if(depth <=0){
    	return this;
  	}
    else {
    	this.forEach((element) => {
    		if(Array.isArray(element)){
      		let temp = element.newFlat(depth - 1)
          temp.forEach((eleVar) => {
          	result.push(eleVar)
          })
      	}else {
      		result.push(element)
      }
    })
  }
  return result
}

Array.prototype.newSplice = function(startIndex, numItems) {
	let endIndex = startIndex + numItems
  
  let itemsBeforeSplice = []
  let splicedItems = []
  let itemsAfterSplice = []
  
  for(let i = 0; i < this.length ; i++){
  	if(i < startIndex) itemsBeforeSplice.push(this[i])
    if(i >= startIndex && i < endIndex) splicedItems.push(this[i])
    if(i >= endIndex) itemsAfterSplice.push(this[i])
  }
  
  for( let i = 2; i < arguments.length; i++){
  	itemsBeforeSplice.push(arguments[i])
  }
  
  let remainingItems = itemsBeforeSplice.concat(itemsAfterSplice)
  
  let len =  Math.max(this.length, remainingItems.length)
  
  for(let i = 0; i< len; i++){
  	if(remainingItems.length > i)
    	this[i] = remainingItems[i]
     else
     	this.pop()
  }
  return splicedItems
    
}



Function.prototype.newCall = function(obj = {}, ...args) {
    if(typeof this !== "function"){
        throw new Error(" Not a callable function")
    }
    obj.fn = this;
    obj.fn(...args)
}
  
Function.prototype.newApply = function(obj = {}, ...args) {
    if(typeof this !== "function"){
        throw new Error(" Not a callable function")
    }
    if(!Array.isArray(...args)){
        throw new Error(" Uncaught TypeError: CreateListFromArrayLike called on non-object")
    }
    obj.fn = this;
    let arguments = args.flat(10) //Flat is used to ensure single values are passed into every argument
    obj.fn(...arguments)
}

Function.prototype.newBind = function(obj = {}, ...args1) {
	if(typeof this !== "function"){
	    throw new Error(" Not a callable function")
	  } 
	obj.fn = this;
  return function(...args2) {
  	obj.fn(...args1, ...args2)
  }
}

function promiseAllPolyfill(tasksArray) {
	let output = []
  let total = 0
  return new Promise((resolve, reject) => {
  	tasksArray.forEach((promise, index) => {
      promise
      .then((data) => {
        output[index] = data
        total++
        if(total === tasksArray.length)
          resolve(output)
      })
      .catch((err) => {
        reject(err)
      })
    })
  })
}

function promiseRacePolyfill(tasksArray) {
  return new Promise((resolve, reject) => {
  	tasksArray.forEach((promise, index) => {
      promise
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  })
}

function promiseAllSettledPolyfill(tasksArray) {
	return new Promise((resolve, reject) => {
  	let output = []
    tasksArray.forEach((promise, index) => {
    	promise
      .then((data) => {
      	output.push({
        	"status": "fulfilled",
          "value" : data
        })
        if(index === tasksArray.length - 1) //use total rather than index
        	resolve(output)
      })
      .catch((reason) => {
      	output.push({
        	"status": "rejected",
          "reason" : reason
        })
        if(index === tasksArray.length - 1)
        	resolve(output)
      })
    })
  })
}

function promiseAnyPolyfill(tasksArray) {
	return new Promise((resolve, reject) => {
    let counter = 0
    tasksArray.forEach((promise, index) => {
    	promise
      .then((data) => {
      	resolve(data)
      })
      .catch((reason) => {
        counter++
        if(counter === tasksArray.length)
        	reject("[object Error]")
      })
    })
  })
}

function promisePolyFill(executor) {
  let onResolve,
      onReject,
      fulfilled = false,
      rejected = false,
      called = false,
      value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") { // for async
      console.log("inside resolve")
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) { // for sync
      console.log("inside then")
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

String.prototype.newSplit = function(delimiter) {
	let result = []
  let string = this
  if(delimiter === "") return Array.from(string)
  function startSplit(str, idx) {	
  	if(idx >= string.length) return
    const indexOfDelimiter = str.indexOf(delimiter)
    if(indexOfDelimiter >= 0){
    	result.push(str.substring(0, indexOfDelimiter))
      startSplit(str.substring(indexOfDelimiter + delimiter.length, string.length),indexOfDelimiter + delimiter.length)
    } else {
    	result.push(str)
    }
  }
  
  startSplit(this, 0)
  return result
}

function createTimeoutFunctions () {

	let timerId = 1
  let timerMap = {}
  
  function setTimeoutPoly (callback, delay, ...args) {
  	    let id = timerId++
  	    timerMap[id] = true
  	    let start = Date.now()
  	    
  	    function triggerCallback () {
          if(!timerMap[id]) return 
  	      if(Date.now() > start + delay){
  	        callback.apply(this, args)
  	      } else {
  	        window.requestIdleCallback(triggerCallback) 
  	      }
  	    }
  	    
  	    window.requestIdleCallback(triggerCallback) 
        return id
  }
  
  function clearTimeoutPoly (id) {
    delete timerMap[id]
  } 
  
  return [setTimeoutPoly, clearTimeoutPoly]
}

//Code to run settimout polyfill
// const [ setTimeoutPoly, clearTimeoutPoly ] = createTimeoutFunctions()

// console.log("start")

// const timer = setTimeoutPoly(function (name) {
// 	console.log("welcome to ", name, "'s world")
// }, 3000, "Sudo")

// clearTimeoutPoly(timer)

// console.log("end")


function createIntervalFunctions () {

	let intervalId = 1
  let intervalMap = {}

  const [setTimeoutPoly, clearTimeoutPoly] = createTimeoutFunctions()
  
  function setIntervalPoly (callback, delay, ...args) {
  	    let id = intervalId++

        function reiterate() {
          intervalMap[id] = setTimeoutPoly(function (){
            callback.apply(this, args)
            if(intervalMap[id])
              reiterate()
          }, delay)
        }
  	    
        reiterate()
        return id
  }

  
  function clearIntervalPoly (id) {
    clearTimeoutPoly(id)
    delete intervalMap[id]
  } 
  
  return [setIntervalPoly, clearIntervalPoly]
}

//Code to run setinterval poly
// const [setIntervalPoly, clearIntervalPoly] = createIntervalFunctions()

// let counter = 0

// let intervalTimer = setIntervalPoly(function () {
//   counter++
//   console.log('hello')
//   if(counter > 3)
//     clearIntervalPoly(intervalTimer)
// }, 2000)


//Lodash once function which runs a function only once
function lodashOnce (fn, context) {
  let ran

  return function() {
    if(fn){
      ran = fn.apply(context || this, arguments)
      fn = null
      return ran
    }
    
  } 
}

// const hello = lodashOnce((name) => {console.log('hello',name)})
// hello("Sudo")
// hello("Sudo1")
// hello("Sudo2")


//Code for compose

function compose(...functions) {
  return (args) => {
    return functions.reduceRight((arg, fn) => fn(arg), args)
  }
}

// function addFive (a) {
//   return a + 5
// }

// function multiplyTen (a) {
//   return a * 5
// }

// console.log(compose(addFive, multiplyTen)(5))

//2620 Counter
var createCounter = function(n) {
    let count = n - 1
    return function() {
        return ++count;
    };
};


//2704 To be or not to be
var expect = function(val) {
    return {
        toBe: (arg1) => {
            if(val === arg1)
                 return true
             else
                 throw new Error("Not Equal")
        },
        notToBe: (arg2) => {
            if(val !== arg2)
                 return true
             else
                 throw new Error("Equal")
        }
    }
};

//2665 Counter II
var createCounter = function(init) {
    let count = init
    return {
        increment: () => {
            return ++count;
        },
        decrement: () => {
            return --count;
        },
        reset: () => {
            count = init
            return init;
        }
    }
};

//2635 Apply Transform Over Each Element in Array
var map = function(arr, fn) {
    let result = []
    arr.forEach((element, index) => {
        result.push(fn(element, index))
    })
    return result;
};


//2634. Filter Elements from Array
var filter = function(arr, fn) {
    let result = []
    arr.forEach((element, index) => {
        if(fn(element, index))
            result.push(element)
    })
    return result
};

// 2626. Array Reduce Transformation
var reduce = function(nums, fn, init) {
    let output = init;
    nums.forEach((element) => {
        output = fn(output, element)
    })
    return output
};

//2629. Function Composition
var compose = function(functions) {
    
	return function(x) {
        let output = x;
        for(let i = functions.length - 1; i >=0 ; i--){
            output = functions[i](output)
        }
        return output
    }
};

//2703. Return Length of Arguments Passed
var argumentsLength = function(...args) {
	return args.length
};


//2666. Allow One Function Call
var once = function(fn) {
  let count = 0
	return function(...args){
      if(count === 0){
				++count;
				return fn.apply(this, args)
			}
			return undefined
    }
};

//2623. Memoize
function memoize(fn) {
    let localCache = new Map()
    return function(...args) {
			if(localCache.has(String(args))){
				return localCache.get(String(args))
			}
			let output = fn.apply(this, args)
			localCache.set(String(args), output)
			return output
    }
}

function memoize(fn) {
    let localCache = []
    return function(...args) {
            const argsInString = JSON.stringify(args)
			if(argsInString in localCache){
				return localCache[argsInString]
			}
			localCache[argsInString] = fn.apply(this, args)
			return localCache[argsInString]
    }
}

//2723. Add Two Promises
var addTwoPromises = async function(promise1, promise2) {
    return new Promise((resolve, reject) => {
			let output = 0
			Promise.all([promise1, promise2])
			.then((res) => {	
				res.forEach(val => output += val)
				resolve(output)
			})
		})
};

//2621. Sleep
async function sleep(millis) {
    return new Promise((resolve) => {
			setTimeout(() => {
				resolve(millis)
			},millis)
		})
}

//2715. Timeout Cancellation
var cancellable = function(fn, args, t) {

	const timer = setTimeout(() => {
		fn.apply(this, args)
	}, t)

	const cancelFn = function() {
		clearTimeout(timer)
	}

	return cancelFn
	
};

//2725. Interval Cancellation
var cancellable = function(fn, args, t) {
    fn.apply(this, args)
    const interval = setInterval(() => {
            fn.apply(this, args)
        }, t)
    const cancelFn = function() {
        clearInterval(interval) 
    }
return cancelFn
};

//2637. Promise Time Limit
var timeLimit = function(fn, t) {
	return async function(...args) {
        return new Promise((resolve, reject) => {
            fn.apply(this, args)
            .then(res => {
            	resolve(res)
            })
            .catch(err => {
            	reject(err)
            })
            setTimeout(() =>{
            	reject("Time Limit Exceeded")
            }, t)
		})
    }
};


//2622. Cache With Time Limit
var TimeLimitedCache = function() {
    this.cache = []
    this.start = performance.now()
    // setInterval(() => {
    //     this.timer++
    // },1)
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    let flag = false
    for(let i = 0; i < this.cache.length; i++){
         if(this.cache[i].duration < performance.now() - this.cache[i].start){
            this.cache.splice(i,1)
            i--;
        }
    }
    for(let i = 0; i < this.cache.length; i++){
        if(this.cache[i].key === key){
            flag = true;
            this.cache[i].value = value
            this.cache[i].duration = duration
            this.cache[i].start = performance.now()
        }
    }
    if(!flag){
        this.cache.push({
            "key": key,
            "value": value,
            "duration": duration,
            "start": performance.now()
        })
    }
    return flag
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    for(let i = 0; i < this.cache.length; i++){
         if(this.cache[i].duration < performance.now() - this.cache[i].start){
            this.cache.splice(i,1)
            i--;
        }
    }
    for(let i = 0; i < this.cache.length; i++)
        if(this.cache[i].key === key)
            return this.cache[i].value
    return -1
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    for(let i = 0; i < this.cache.length; i++){
        if(this.cache[i].duration < performance.now() - this.cache[i].start){
            this.cache.splice(i,1)
            i--;        
        }
    }
    return this.cache.length
};
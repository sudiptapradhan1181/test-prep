//currying generic function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sumA(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sumA);

console.log(curriedSum(5)(1, 2));

const ARGS_LENGTH = 5;

function sum(...args) {
  if (args.length === ARGS_LENGTH) {
    return args.reduce((initialVal, currentVal) => initialVal + currentVal, 0);
  } else {
    const recursiveFn = (...args2) => {
      args = args.concat(args2);
      if (args.length === ARGS_LENGTH) {
        return args.reduce(
          (initialVal, currentVal) => initialVal + currentVal,
          0
        );
      } else {
        return recursiveFn;
      }
    };
    return recursiveFn;
  }
}

console.log(sum(1, 2, 3, 4, 5));
console.log(sum(1, 2, 3, 4)(5));
console.log(sum(1)(2)(3)(4)(5));

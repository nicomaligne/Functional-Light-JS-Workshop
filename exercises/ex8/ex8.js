var nums = {
  first: [3, 5, 2, 4, 9, 1, 12, 3],
  second: [5, 7, 7, 9, 10, 4, 2],
  third: [1, 1, 3, 2]
};

var filteredNums = filterObj(function(list) {
  return isOdd(listSum(list));
}, nums);

var filteredNumsProducts = mapObj(function(list) {
  return listProduct(list);
}, filteredNums);

var result1 = reduceObj(
  function(acc, v) {
    return acc + v;
  },
  0,
  filteredNumsProducts
);
// 38886

var result2 = pipe(
  curry(filterObj)(compose(isOdd, listSum)),
  curry(mapObj)(listProduct),
  curry(reduceObj)(sum)(0)
)(nums)

console.log({ result1 })
console.log({ result2 })

// ************************************

function mapObj(mapperFn, o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    newObj[key] = mapperFn(o[key]);
  }
  return newObj;
}

function filterObj(predicateFn, o) {
  let filteredObj = {};
  Object.entries(o).map(entry => {
    if (predicateFn(entry[1])) {
      filteredObj = Object.assign({...filteredObj}, { [entry[0]]: entry[1] });
    }
  });
  return filteredObj;
}

function reduceObj(reducerFn, initialValue, o) {
  let acc = initialValue
  Object.values(o).map(value => {
    acc =  reducerFn(acc, value)
  });
  return acc
}

// ************************************

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
function compose(...fns) {
  return function composed(arg) {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
}
function pipe(...fns) {
  return compose(...fns.reverse());
}
function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

// ************************************

function isOdd(v) {
  return v % 2 == 1;
}
function sum(x, y) {
  return x + y;
}
function mult(x, y) {
  return x * y;
}
function listSum(list) {
  return list.reduce(sum, 0);
}
function listProduct(list) {
  return list.reduce(mult, 1);
}

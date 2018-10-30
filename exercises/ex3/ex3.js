function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
}

function compose(...fns) {
  return function(value) {
    for (let i = fns.length - 1; i >= 0; i--) {
      value = fns[i](value);
    }
    return value;
  };
}

function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, value);
  };
}

var f = compose(
  decrement,
  double,
  increment,
  half
);
var p = pipe(
  half,
  increment,
  double,
  decrement
);

console.log("result compose:", f(3) === 4);
// true

console.log("result pipe && recompose", f(3) === p(3));
// true

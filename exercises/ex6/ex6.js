function mult(x, y, z) {
  return x * y * z;
}

function multRec(result, first, ...args) {
  if (args.length === 0) {
    return result * first;
  }
  return result * multRec(first, ...args);
}

let resultRec = multRec(3, 4, 5); // 60
console.log({ resultRec });

resultRec = multRec(3, 4, 5, 6); // Oops!
console.log({ resultRec })

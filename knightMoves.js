function knightMoves(start, target) {
  let Q = [];
  let visited = [];
  let paths = [[start]];

  if (start === target) return "Same position. No need for algo.";

  function recursiveSearch(paths) {
    // idea: have a square. add the path that you can get to from this square. then, in the next iteration get all the paths you are at add in the paths you can next reach, checking in visited to make sure you don't get any cycles. always checking if any of them are the target. got the target => return.
    if (paths.length === 0) return; // base case

    const currentPaths = [...paths];
    for (let path of currentPaths) {
      let currentSquare = path[path.length - 1];
      let nextSquares = possibleNextSquares(currentSquare);

      //clean the next Squares to chck what's been visited.
      nextSquares = nextSquares.filter((element) => !visited.includes(element));
      visited.push(...nextSquares);

      for (let square of nextSquares) {
        let newPath = [...path];
        if (arraysEqual(square, target)) {
          newPath.push(square);
          return newPath;
        }
        newPath.push(square);
        paths.push([...newPath]);
      }
      paths.shift();
    }
    return recursiveSearch(paths); // Add this line
  }

  let result = recursiveSearch(paths); // Store and return the recursive result
  return result;
}

function arraysEqual(arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

const possibleMoves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function possibleNextSquares(currentSquare) {
  let nextSquares = [];
  for (let move of possibleMoves) {
    const nextSquare = [currentSquare[0] + move[0], currentSquare[1] + move[1]];
    if (checkValidity(nextSquare)) {
      nextSquares.push(nextSquare);
    }
  }
  return nextSquares;
}

function checkValidity(square) {
  if (square[0] <= 7 && square[0] >= 0 && square[1] <= 7 && square[1] >= 0)
    return true;
  return false;
}

console.log(knightMoves([0, 0], [7, 7]));

console.log(knightMoves([3, 3], [4, 3]));

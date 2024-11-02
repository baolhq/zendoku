const Difficulties = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  VERY_HARD: "very-hard",
  INSANE: "insane",
  INHUMAN: "inhuman",
});

// Must be 17 <= x <= 81
const SIZE = 81;

const generateSquares = () => {
  const squareContainer = document.querySelector("#square-container");
  const boardStr = sudoku.generate(Difficulties.EASY);
  const boardArr = sudoku.board_string_to_grid(boardStr);

  // const res = sudoku.solve(boardStr);
  // sudoku.print_board(res);

  for (let i = 0; i < Math.sqrt(SIZE); i++) {
    for (let j = 0; j < Math.sqrt(SIZE); j++) {
      const elem = document.createElement("input");
      elem.setAttribute("maxLength", 1);
      elem.classList.add("square");

      if (boardArr[i][j] === ".") {
      } else {
        elem.setAttribute("disabled", true);
        elem.value = boardArr[i][j];
      }

      elem.addEventListener("keyup", (ev) => handleInput(ev));
      squareContainer.appendChild(elem);
    }
  }
};

const handleInput = (ev) => {
  const squares = document.querySelectorAll(".square");
  let isFulfilled = true;
  let values = "";

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i].value.length) isFulfilled = false;
    values += squares[i].value;
  }

  if (isFulfilled) {
    checkBoard(values);
  }
};

const checkBoard = (str) => {
  const grid = sudoku.board_string_to_grid(str);
  if (isValidSudoku(grid)) alert("Problem solved 😎");
};

document.addEventListener("DOMContentLoaded", () => {
  generateSquares();
});

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

      addBoxesStyling(elem, i, j);
      elem.addEventListener("focusin", () => handleFocus(elem));
      elem.addEventListener("keyup", (ev) => handleInput(ev));
      squareContainer.appendChild(elem);
    }
  }
};

//TODO: Need refactoring
const addBoxesStyling = (elem, i, j) => {
  if (i <= 2 || i >= 6) {
    if (j > 2 && j < 6) elem.classList.add("box");
  } else if (j <= 2 || j >= 6) {
    elem.classList.add("box");
  }
};

const handleFocus = (elem) => {
  const squares = document.querySelectorAll(".square");

  squares.forEach((el) => el.classList.remove("selected"));
  elem.classList.add("selected");

  const index = Array.from(squares).indexOf(elem);
  const row = Math.floor(index / 9);
  const col = index % 9;

  // Highlight all squares in the same row
  for (let i = 0; i < 9; i++) {
    squares[row * 9 + i].classList.add("selected");
  }

  // Highlight all squares in the same column
  for (let i = 0; i < 9; i++) {
    squares[i * 9 + col].classList.add("selected");
  }

  // Highlight the 3x3 box
  const startRow = Math.floor(row / 3) * 3; // Get the starting row of the box
  const startCol = Math.floor(col / 3) * 3; // Get the starting column of the box

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      squares[r * 9 + c].classList.add("selected");
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

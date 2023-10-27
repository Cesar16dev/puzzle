const d = document;

let matrix = shuffleMatrix();

/* let matrix = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "", "8"],
]; */

let board = d.querySelector(".board");

drawTokens();
addEventListeners();

function addEventListeners() {
  let tokens = d.querySelectorAll(".token");
  tokens.forEach((token) =>
    token.addEventListener("click", () => {
      let actualPosition = searchPosition(token.innerText);
      let emptyPosition = searchPosition("");
      let movement = canItMove(actualPosition, emptyPosition);

      if (movement !== false) {
        updateMatrix(token.innerText, actualPosition, emptyPosition);
        let result = compareMatrix();

        if (result == true) {
          confetti({
            particleCount: 150,
            spread: 180,
          });
        }

        drawTokens();
        addEventListeners();
      }
    })
  );
}

function searchPosition(e) {
  let rowIndex = 0;
  let columnIndex = 0;
  matrix.forEach((row, index) => {
    let rowElement = row.findIndex((item) => item == e);
    if (rowElement !== -1) {
      rowIndex = index;
      columnIndex = rowElement;
    }
  });
  return [rowIndex, columnIndex];
}

function canItMove(actualPosition, emptyPosition) {
  if (actualPosition[1] == emptyPosition[1]) {
    if (
      actualPosition[0] - emptyPosition[0] > 1 ||
      actualPosition[0] - emptyPosition[0] < -1
    )
      return false;

    /*     if (actualPosition[0] - emptyPosition[0] === -1) return "down";
    else if (actualPosition[0] - emptyPosition[0] === 1) return "up";
    else return "no move"; */
  } else if (actualPosition[0] == emptyPosition[0]) {
    if (
      actualPosition[1] - emptyPosition[1] > 1 ||
      actualPosition[1] - emptyPosition[1] < -1
    )
      return false;
    /*     if (actualPosition[1] - emptyPosition[1] === -1) return "right";
    else if (actualPosition[1] - emptyPosition[1] === 1) return "left";
    else return "no move"; */
  } else return false;
}

function drawTokens() {
  board.innerHTML = "";
  matrix.forEach((row) =>
    row.forEach((el) => {
      if (el == "") board.innerHTML += `<div class = 'empty'>${el}<div>`;
      else board.innerHTML += `<div class = 'token'>${el}<div>`;
    })
  );
}

function updateMatrix(element, actualPosition, emptyPosition) {
  matrix[actualPosition[0]][actualPosition[1]] = "";
  matrix[emptyPosition[0]][emptyPosition[1]] = element;

  //console.log(matrix);
}

function shuffleMatrix() {
  let shuffleMatrix = [[], [], []];
  let array = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
  let shuffleArray = array.sort(() => Math.random() - 0.5);

  let column = 0;
  let row = 0;

  shuffleArray.forEach((el) => {
    shuffleMatrix[row].push(el);
    if (column < 2) {
      column++;
    } else {
      column = 0;
      row++;
    }
  });
  return shuffleMatrix;
}

shuffleMatrix();

function compareMatrix() {
  let counter = 0;
  let finalMatrix = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""],
  ];
  matrix.forEach((row, indexRow) => {
    row.forEach((el, indexColumn) => {
      if (el == finalMatrix[indexRow][indexColumn]) {
        counter++;
      }
    });
  });
  if (counter == 9) {
    return true;
  } else {
    return false;
  }
}

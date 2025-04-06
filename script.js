// array[][]
// 0: [[0, 1, 2]]
// 1: [[0, 1, 2]]
// 2: [[0, 1, 2]]

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const putPlayerValue = (row, col, playerName, playerValue) => {
    if (board[row][col].getValue !== "") {
      console.log(`${playerValue} is set for ${playerName}`);
    } else {
      console.log("PLEASE CHOOSE ANOTHER ROW AND COL");
    }
  };

  const printBoard = () => {
    const boardWithCells = board.map((row) => {
      return row.map((cell) => {
        return cell.getValue();
      });
    });
    console.log(boardWithCells);
  };

  return {
    getBoard,
    putPlayerValue,
    printBoard,
  };
}

function Cell() {
  let value = "";

  const setValue = (playerValue) => {
    value = playerValue;
  };

  const getValue = () => value;

  return {
    setValue,
    getValue,
  };
}

function GameController(
  playeOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playeOneName,
      value: "X",
    },
    {
      name: playerTwoName,
      value: "O",
    },
  ];

  let activePlayer = players[0];
  function switchActivePlayer() {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  }

  const getActivePlayer = () => activePlayer;

  const printRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, col) => {
    console.log(`${getActivePlayer().name}'s current round...`);
    board.putPlayerValue(
      row,
      col,
      getActivePlayer().name,
      getActivePlayer().value
    );

    switchActivePlayer();
    printRound();
  };

  printRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();

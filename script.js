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

  const putPlayerValue = (row, col, playerName, playerValue, playerSymbol) => {
    if (board[row][col].getValue() === 0) {
      board[row][col].setValue(playerValue);
      board[row][col].setSymbol(playerSymbol);

      return "SUCCESS";
    } else {
      console.log("PLEASE CHOOSE ANOTHER ROW AND COL");

      return "FAIL";
    }
  };

  const updateGameboard = () => {
    const boardContainer = document.querySelector(".board-container");
    boardContainer.textContent = "";

    for (let i = 0; i < board.length; i++) {
      let startVal = i + 1;
      for (let j = 0; j < board[i].length; j++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = i;
        div.dataset.col = j;

        boardContainer.appendChild(div);
        div.style.gridArea = `${startVal} / ${startVal} span 1 / span 1`;
        div.textContent = board[i][j].getSymbol();
      }
    }
  };

  return {
    getBoard,
    putPlayerValue,
    updateGameboard,
  };
}

function Cell() {
  let value = 0;
  let symbol = "";

  const setValue = (playerValue) => {
    value = playerValue;
  };

  const getValue = () => value;

  const setSymbol = (playerSymbol) => {
    symbol = playerSymbol;
  };

  const getSymbol = () => symbol;

  return {
    setValue,
    getValue,
    setSymbol,
    getSymbol,
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
      symbol: "X",
      value: 1,
    },
    {
      name: playerTwoName,
      symbol: "O",
      value: -1,
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

  const displayBoard = () => {
    board.updateGameboard();
  };

  const winnerChecker = () => {
    for (let i = 0; i < board.getBoard().length; i++) {
      let rowSum = 0;
      let columnSum = 0;

      for (let j = 0; j < board.getBoard()[i].length; j++) {
        rowSum += board.getBoard()[i][j].getValue();
        columnSum += board.getBoard()[j][i].getValue();
      }

      if (
        rowSum === 3 ||
        rowSum === -3 ||
        columnSum === 3 ||
        columnSum === -3
      ) {
        return "WINNER";
      }
    }

    let diagonalSum =
      board.getBoard()[0][0].getValue() +
      board.getBoard()[1][1].getValue() +
      board.getBoard()[2][2].getValue();

    let reverseDiagonalSum =
      board.getBoard()[0][2].getValue() +
      board.getBoard()[1][1].getValue() +
      board.getBoard()[2][0].getValue();

    if (
      diagonalSum === 3 ||
      diagonalSum === -3 ||
      reverseDiagonalSum === 3 ||
      reverseDiagonalSum === -3
    ) {
      return "WINNER";
    }

    return;
  };

  let roundCounter = 0;
  const playRound = (row, col) => {
    roundCounter++;
    console.log(roundCounter);

    console.log(`${getActivePlayer().name}'s current round...`);

    if (
      board.putPlayerValue(
        row,
        col,
        getActivePlayer().name,
        getActivePlayer().value,
        getActivePlayer().symbol
      ) === "SUCCESS"
    ) {
      if (winnerChecker() === "WINNER") {
        console.log(`${getActivePlayer().symbol} is the winner!`);
        displayBoard();
        return;
      }

      if (roundCounter === 9) {
        console.log("TIE");
        displayBoard();
        return;
      }

      switchActivePlayer();
      displayBoard();
      console.log(`${getActivePlayer().name}'s turn`);
    } else {
      console.log("TRY AGAIN " + getActivePlayer().name);
    }
  };

  displayBoard();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();

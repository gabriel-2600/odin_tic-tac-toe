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

  const putPlayerValue = (row, col, playerValue, playerSymbol) => {
    if (board[row][col].getValue() === 0) {
      board[row][col].setValue(playerValue);
      board[row][col].setSymbol(playerSymbol);

      return "SUCCESS";
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

  const resetAllValues = () => {
    value = 0;
    symbol = "";
  };

  return {
    setValue,
    getValue,
    setSymbol,
    getSymbol,
    resetAllValues,
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

  function getPlayerNames() {
    const playerNames = [players[0].name, players[1].name];
    return playerNames;
  }

  let activePlayer = players[0];
  function switchActivePlayer() {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  }

  const displayBoard = () => {
    displayAnnouncement(`${activePlayer.name}'s current round...`);
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
    if (
      board.putPlayerValue(
        row,
        col,
        activePlayer.value,
        activePlayer.symbol
      ) === "SUCCESS"
    ) {
      roundCounter++;

      if (winnerChecker() === "WINNER") {
        displayBoard();

        displayAnnouncement(`${activePlayer.name} Wins!`);
        return;
      }

      if (roundCounter === 9) {
        displayBoard();

        displayAnnouncement("TIE");
        return;
      }

      switchActivePlayer();
      displayBoard();
      cellClickToPlayRound();
    }
  };

  function cellClickToPlayRound() {
    const cellDiv = document.querySelectorAll(".cell");
    cellDiv.forEach((cell) => {
      cell.addEventListener("click", () => {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);

        playRound(row, col);
      });
    });
  }

  displayBoard();
  cellClickToPlayRound();

  return {
    playRound,
    getPlayerNames,
  };
}

const announcement = document.querySelector(".announcement");
const headerTwo = document.createElement("h2");
announcement.appendChild(headerTwo);
function displayAnnouncement(headerValue) {
  headerTwo.textContent = headerValue;
}

function EventListeners() {
  let playeOneName;
  let playerTwoName;

  const dialog = document.querySelector("dialog");
  dialog.showModal();

  if (dialog.open) {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      startGame();
    });

    const playAsGuestBtn = document.querySelector(".play-as-guest-btn");
    playAsGuestBtn.addEventListener("click", () => {
      GameController();
      dialog.close();
    });
  }

  const newGameBtn = document.querySelector(".new-game-btn");
  newGameBtn.addEventListener("click", () => {
    playeOneName = "";
    playerTwoName = "";
    dialog.showModal();
  });

  const resetBtn = document.querySelector(".reset-btn");
  resetBtn.addEventListener("click", () => {
    if (playeOneName === "" && playerTwoName === "") {
      GameController();
    } else {
      GameController(playeOneName, playerTwoName);
    }
  });

  function startGame() {
    playeOneName = document.querySelector("#player-one").value;
    playerTwoName = document.querySelector("#player-two").value;

    console.log(playeOneName + ", " + playerTwoName);
    GameController(playeOneName, playerTwoName);

    dialog.close();
  }
}

EventListeners();

window.addEventListener("DOMContentLoaded", () => {
  // Initialized a game board to track the game state
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  // Grabs tic-tac toe board from DOM
  const divBoard = document.getElementById('tic-tac-toe-board');
  const newGame = document.getElementById('new-game');
  const giveUp = document.getElementById('give-up');
  const gameStatus = document.getElementById('game-status');

  //Player One is X and corresponds to an even playerCounter value
  //Player Two is O and corresponds to an odd playerCounter value
  let playerCounter = 0;

  const handleClick = event => {
    if (event.target.id !== 'tic-tac-toe-board') {
      if(playerCounter === 0) {
        giveUp.removeAttribute('disabled');
      }

      // Grabs element from DOM that event performed on if its not the container div
      const square = document.getElementById(event.target.id);

      if (playerCounter % 2 === 0 && !square.classList.contains('clicked')) {
        // Edits background image of X on clicked element
        square.style.backgroundImage = "url('images/player-x.svg')";
        square.classList.add('clicked');
        playerCounter++;

        // Adds value to board
        const index = Number(square.id.split('-')[1]);
        addToBoard(index, 'X');

        // Checks if win or draw
        if (checkWin()) {
          updateGameStatus('X');
        } else if (boardFull()) {
          updateGameStatus("");
        }
      } else if (playerCounter % 2 === 1 && !square.classList.contains('clicked')) {
        // Edits background image of O on clicked element
        square.style.backgroundImage = "url('images/player-o.svg')";
        square.classList.add('clicked');
        playerCounter++;

        // Adds value to board
        const index = Number(square.id.split('-')[1]);
        addToBoard(index, 'O');

        // Checks is win or draw
        if (checkWin()) {
          updateGameStatus('O')
        } else if (boardFull()) {
          updateGameStatus("");
        }
      }
    }
  };

  const newGameClick = event => {
    newGame.setAttribute('disabled', 'true');
    gameStatus.innerText = "";
    board.forEach((row, i1) => {
      row.forEach((ele, i2) => {
        board[i1][i2] = "";
      });
    });

    for (let i = 0; i < 9; i++) {
      let element = document.getElementById(`square-${i}`);
      element.style.removeProperty('background-image');
      element.classList.remove('clicked');
    }

    playerCounter = 0;

    divBoard.addEventListener('click', handleClick);
  }

  const giveUpClick = event => {
    if(playerCounter % 2 === 0) {
      updateGameStatus('O');
    } else {
      updateGameStatus('X');
    }
    giveUp.setAttribute('disabled', 'true');
  };

  // call handleClick callback on click on divboard
  divBoard.addEventListener('click', handleClick);
  newGame.addEventListener('click', newGameClick);
  giveUp.addEventListener('click', giveUpClick);

  // Handles updating h1 element
  const updateGameStatus = char => {
    newGame.removeAttribute('disabled');
    divBoard.removeEventListener('click', handleClick);
    if (char === '') {
      gameStatus.innerText = 'Winner: None';
    } else {
      gameStatus.innerText = `Winner: Player ${char}`;
    }
  }

  // Handles updating the game board with an X or O
  const addToBoard = (num, char) => {
    if (num < 3) {
      board[0][num] = char;
    } else if (num < 6) {
      board[1][num - 3] = char;
    } else {
      board[2][num - 6] = char;
    }
  }

  // Checks if the game is won via rows
  const rowWin = (num) => {
    for (let i = 1; i < 3; i++) {
      if (board[num][i - 1] !== board[num][i] || board[num][i] === '') {
        return false;
      }
    }
    return true;
  }

  // Checks if the game is won via columns
  const columnWin = (num) => {
    for (let i = 1; i < 3; i++) {
      if (board[i - 1][num] !== board[i][num] || board[i - 1][num] === '') {
        return false;
      }
    }
    return true;
  }

  // Checks if diagonal win
  const diagWin = (num) => {
    debugger;
    //Checks front diagonal for win
    if ((board[0][num] === board[1][num + 1] && board[1][num + 1] === board[2][num + 2]) && board[0][num] !== '') {
      return true;
    }
    //Check back diagonal for win
    else if ((board[0][num] === board[1][num - 1] && board[1][num - 1] === board[2][num - 2]) && board[0][num] !== '') {
      return true;
    } else {
      // If not a win from diagonals, return false
      return false;
    }
  }

  //Checks the board to see if a win has occurred
  const checkWin = () => {
    let win = false;

    //Runs through each row and see if the current row has a win
    for (let i = 0; i < 3; i++) {
      win = rowWin(i);
      if (win) {
        //Current row had a win so return true!
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      // Loops through columns and sees if its a win
      win = columnWin(i);
      if (win) {
        // column won so return true
        return true;
      }
    }
    for (let i = 0; i < 3; i = i += 2) {
      // loops through diagonals and sees if its a win
      win = diagWin(i);
      debugger;
      if (win) {
        // diagonal won so return true
        return true;
      }
    }
    // If true hasn't been returned yet, no one has won
    return false;
  };

  //Check to see if the board is full of X and O characters
  const boardFull = () => {
    return board.every(row => {
      return row.every(ele => {
        return ele !== '';
      });
    });
  };
});

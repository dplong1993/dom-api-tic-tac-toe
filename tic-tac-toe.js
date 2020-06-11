window.addEventListener("DOMContentLoaded", () => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const divBoard = document.getElementById('tic-tac-toe-board');

  //Player One is X and corresponds to an even playerCounter value
  //Player Two is O and corresponds to an odd playerCounter value
  let playerCounter = 0;

  divBoard.addEventListener('click', event => {
    const square = document.getElementById(event.target.id);
    console.log(divBoard, square, square.classList);
    if(playerCounter % 2 === 0 && !square.classList.contains('clicked')) {
    // Edits background image of X on clicked element
      square.style.backgroundImage = "url('images/player-x.svg')";
      square.classList.add('clicked');
      playerCounter++;

      const index = Number(square.id.split('-')[1]);
      console.log(index);
      addToBoard(index, 'X');
      console.log(checkWin(), boardFull());
      // if(checkWin()){

      // } else if(boardFull()){

      // }
    } else if (playerCounter % 2 === 1 && !square.classList.contains('clicked'))  {
    // Edits background image of O on clicked element
      square.style.backgroundImage = "url('images/player-o.svg')";
      square.classList.add('clicked');
      playerCounter++;

      const index = Number(square.id.split('-')[1]);
      console.log(index);
      addToBoard(index, 'O');
      console.log(checkWin(), boardFull());
    }
  });

  const addToBoard = (num, char) => {
      if (num < 3) {
          board[0][num] = char;
      } else if (num < 6) {
          board[1][num - 3] = char;
      } else {
          board[2][num - 6] = char;
      }
      console.log(board);
  }

  const rowWin = (num) => {
      for (let i = 1; i < 3; i++) {
          if (board[num][i - 1] !== board[num][i] || board[num][i] === '') {
              return false;
          }
      }
      return true;
  }

  const columnWin = (num) => {
    for (let i = 1; i < 3; i++) {
        if (board[i - 1][num] !== board[i][num] || board[num][i] === '') {
            return false;
        }
    }
    return true;
  }

  const diagWin = (num) => {
    if((board[0][num] === board[1][num+1] && board[1][num+1] === board[2][num+2]) && board[0][num] !== '') {
      return true;
    } else if((board[0][num] === board[1][num-1] && board[1][num-1] === board[2][num-2]) && board[0][num] !== '') {
      return true;
    } else return false;
  }

  const checkWin = () => {
      let win = false;
      for (let i = 0; i < 3; i++) {
        win = rowWin(i);
        debugger;
        if (win) {
            return true;
        }
      }
      for (let i = 0; i < 3; i++) {
          win = columnWin(i);
          debugger;
          if (win) {
            return true;
        }
      }
      for (let i = 0; i < 3; i += 2) {
        win = diagWin(i);
        debugger;
        if (win) {
          return true;
      }
      return false;
    }
  };

  const boardFull = () => {
    return board.every(row => {
      return row.every(ele => {
        return ele !== '';
      });
    });
  };
});

// Import stylesheets
import './style.css';

// #region tic tac toe

// NOTE: 'TTT' stands for Tic Tac Toe

// ------- Initialise global variables
// this list is used to store the player and ai's position
// at the start of the game, it will have 9 null elements
let sqList = Array(9).fill(null);

// this list is used to store the square elements
let sqElementList: HTMLElement[] = [];

let isHumanPlayerTurn: boolean = true;

/**
 * Start of the program
 */
function init() {
  createBoard();
  dicegame();
}

/**
 * Create the board for the Tic Tac Toe game
 */
function createBoard() {
  const board = document.getElementById('board');

  // create the 9 squares
  for (let i = 0; i < sqList.length; i++) {
    // creating the square
    const sq = document.createElement('div');
    sq.classList.add('square');
    sq.setAttribute('pos', i.toString());

    // when the square is clicked, the playermove() function will execute
    // and we pass the newly created square into the playermove()
    sq.addEventListener('click', function() {
      playerMove(sq);
    });

    sqElementList.push(sq);

    // adding to newly created square into the board
    board.appendChild(sq);
  }
}

/**
 * Fill in the square that the Human player has clicked on with 'X'
 *
 * @param sq the square that the player has clicked on
 */
function playerMove(sq: HTMLElement) {
  // check that player can make a move
  if (isHumanPlayerTurn) {
    // get the pos value from the square
    const pos: number = Number(sq.getAttribute('pos'));
    const hasMoved = move(pos, 'X', sq, true);

    if (hasMoved) {
      // disable the Human player from clicking on the board
      // this is so that the player can't click on the board while the program is calculating the winner and the AI is making its move
      isHumanPlayerTurn = false;

      // call calcWinner() to check if the Human player is the winner
      if (calcWinner() === true) {
        // setting a delay here so that the Human player can see the X drawn onto the screen before the alert is shown
        setTimeout(function() {
          alert('The winner is P1');
        }, 1);
      } else {
        // if Human player is not the winner, then allow the AI to make a move
        // setTimeout() will delays the AI's move onto the board to give the illusion that the AI is 'thinking'
        setTimeout(function() {
          aiMove();

          // once the AI has made its move onto the board, allows the Human player to make a move
          isHumanPlayerTurn = true;
        }, 250);
      }
    }
  }
}

/**
 * Add X or O onto the square
 *
 * @param pos the position of the square on the board
 * @param symbol 'X' for human and 'O' for AI
 * @param isPlayerHuman
 *
 * @return whether the square is filled or not
 */
function move(
  pos: number,
  symbol: string,
  sq: HTMLElement,
  isPlayerHuman: boolean
): boolean {
  // check that the current position is not yet filled by P1 or AI
  // P1 or AI cannot fill in the square if it is already filled in
  if (sqList[pos] === null) {
    sq.textContent = symbol;
    sq.style.color = isPlayerHuman ? 'gold' : 'lightsalmon';

    // fill in the square
    sqList.splice(pos, 1, isPlayerHuman ? 'P1' : 'AI');

    return true;
  }
  return false;
}

/**
 * Calculate the winner for the tic tac toe game using an algorithm
 */
function calcWinner(): boolean {
  const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningPos.length; i++) {
    const [a, b, c] = winningPos[i];
    if (sqList[a] && sqList[a] === sqList[b] && sqList[a] === sqList[c]) {
      return true;
    }
  }
  return false;
}

/**
 * Making the move for the AI
 */
function aiMove() {
  // get all of the elements in sqList that are not yet filled with X or O, and then add it to freeSqList
  let freeSqList = [];

  for (let i = 0; i < sqList.length; i++) {
    if (sqList[i] === null) {
      freeSqList.push(i);
    }
  }

  // randomly selects a number. The range is between 0 to the freeSqList.length
  // e.g. if freeSqList has 3 elements, then it is between 0 and 3. So randIndex is expected to be 0, 1 or 2
  const randIndex = Math.floor(Math.random() * freeSqList.length);

  // randIndex is then used as index for freeSqList
  const pos = freeSqList[randIndex];

  move(pos, 'O', sqElementList[pos], false);

  if (calcWinner() === true) {
    setTimeout(function() {
      alert('The winner is AI');
    }, 1);
  }
}

enum color {
  blue = 0,
  orange,
  purple,
  green,
  yellow
}

let colors: string[] = ['blue', 'orange', 'purple', 'green', 'yellow'];

class player {
  color: color = -1;
  score: number = 0;
  turn: boolean = false;
  log = Array().fill(null);
}

function player_dropdown(player: player, dropdown: HTMLSelectElement) {
  dropdown.onchange = () => {
    player.color = +dropdown.options[dropdown.options.selectedIndex].value;
  };
}

function dicegame() {
  let player1 = new player();
  let dropdown1: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('dropdown1')
  );
  player_dropdown(player1, dropdown1);
  player1.turn = true;

  let player2 = new player();
  let dropdown2: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('dropdown2')
  );
  player_dropdown(player2, dropdown2);

  let turn: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('turn')
  );
  let score1: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('score1')
  );
  let score2: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('score2')
  );
  let roll: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('roll')
  );
  let player_roll: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('player_roll')
  );
  let player_roll_div: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('player_roll_div')
  );

  let gameover = false;

  roll.onclick = () => {
    if (player1.color < 0) {
      alert('please select a player color!');
      return;
    } else if (player1.color < 0) {
      alert('please select a player color!');
      return;
    }

    const rand: number = Math.floor(Math.random() * 6) + 1;
    player_roll.innerHTML = rand.toString();

    if (player1.turn) {
      player1.score += rand;
      player1.log.push(rand);
      score1.innerHTML = player1.score.toString();
      turn.innerHTML = 'P2';
      player_roll_div.style.backgroundColor = colors[player1.color];
      player2.turn = true;
      player1.turn = false;
    } else if (player2.turn) {
      player2.score += rand;
      player2.log.push(rand);
      score2.innerHTML = player2.score.toString();
      turn.innerHTML = 'P1';
      player_roll_div.style.backgroundColor = colors[player2.color];
      player1.turn = true;
      player2.turn = false;
    }

    if (player1.score >= 20) {
      alert('P1 won!');
      gameover = true;
    } else if (player2.score >= 20) {
      alert('P2 won!');
      gameover = true;
    }

    if (gameover) {
      let output1: string = '';
      for (let i: number = 0; i < player1.log.length; i++) {
        output1 += player1.log[i].toString() + ', ';
      }
      alert( 
        '\ncurrent player: P1\n' +
        'roll log: ' +
          output1.slice(0, -2) +
          '\ntotal score: ' +
          player1.score.toString()
      );
  
      let output2: string = '';
      for (let i: number = 0; i < player2.log.length; i++) {
        output2 += player2.log[i].toString() + ', ';
      }
      alert( '\ncurrent player: P2\n' +
        'roll log: ' +
          output2.slice(0, -2) +
          '\ntotal score: ' +
          player2.score.toString()
      );
    }
  };

    
}

init();

// #endregion
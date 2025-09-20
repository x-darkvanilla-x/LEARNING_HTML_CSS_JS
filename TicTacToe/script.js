/*
  Author: Dipesh Adelkar
  Linkedin: Dipesh Adelkar
  Instagram: @x_darkvanilla_x 
  Github: @x-darkvanilla-x
*/

let board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let p1Counter = 1;
let p2Counter = 1;

class Player {
  constructor() {
    this.isTurn = false;
    this.win = false;
  }
}

class Space {
  constructor(id) {
    this.played = false;
    this.id = id;
  }

  addSymbolX(space) {
    $(space).append("<div class='x'>X</div>");
  }

  addSymbolO(space) {
    $(space).append("<div class='o'>O</div>");
  }
}

// create players
const player1 = new Player();
const player2 = new Player();

// create spaces
const space1 = new Space('one');
const space2 = new Space('two');
const space3 = new Space('three');
const space4 = new Space('four');
const space5 = new Space('five');
const space6 = new Space('six');
const space7 = new Space('seven');
const space8 = new Space('eight');
const space9 = new Space('nine');

// switch turns
function switchTurns(one, two) {
  one.isTurn = true;
  two.isTurn = false;
}

// gameplay
player1.isTurn = true;

$('.grid').on('click', (e) => {
  if (player1.win !== true && player2.win !== true) {
    handleMove(e.target, space1, 1, 0, 0);
    handleMove(e.target, space2, 2, 0, 1);
    handleMove(e.target, space3, 3, 0, 2);
    handleMove(e.target, space4, 4, 1, 0);
    handleMove(e.target, space5, 5, 1, 1);
    handleMove(e.target, space6, 6, 1, 2);
    handleMove(e.target, space7, 7, 2, 0);
    handleMove(e.target, space8, 8, 2, 1);
    handleMove(e.target, space9, 9, 2, 2);
    checkWinner();
  }
});

// handle moves
function handleMove(target, space, num, row, col) {
  if (target.id === space.id && space.played === false) {
    if (player1.isTurn) {
      space.addSymbolX(target);
      board[row][col] = 'x';
      switchTurns(player2, player1);
    } else {
      space.addSymbolO(target);
      board[row][col] = 'o';
      switchTurns(player1, player2);
    }
    space.played = true;
  }
}

// check winner
function checkWinner() {
  const combos = [
    // rows
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    // columns
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    // diagonals
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];

  combos.forEach(c => {
    const [a,b,cPos] = c;
    let val1 = board[a[0]][a[1]];
    let val2 = board[b[0]][b[1]];
    let val3 = board[cPos[0]][cPos[1]];
    if (val1 === 'x' && val2 === 'x' && val3 === 'x') {
      $('.header').text('Player One Wins!').css('color', 'tomato');
      $('.p1').text('Player 1: ' + p1Counter);
      p1Counter++;
      player1.win = true;
    } else if (val1 === 'o' && val2 === 'o' && val3 === 'o') {
      $('.header').text('Player Two Wins!').css('color', '#33DBFF');
      $('.p2').text('Player 2: ' + p2Counter);
      p2Counter++;
      player2.win = true;
    }
  });
}

// reset game
$('.reset').on('click', () => {
  player1.isTurn = true;
  player2.isTurn = false;
  player1.win = false;
  player2.win = false;
  $('.x, .o').remove();
  $('.header').text('Tic Tac Toe').css('color', 'tomato');
  board = [[1,2,3],[4,5,6],[7,8,9]];
  [space1,space2,space3,space4,space5,space6,space7,space8,space9].forEach(s => s.played = false);
});

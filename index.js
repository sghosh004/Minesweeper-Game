const rows = 8;
const columns = 10;
const mineCount = 10;
let remainingCells, board;

const playButton = document.getElementById('play');
const heading = document.getElementsByClassName("heading")[0];
const gameBoardContainer = document.getElementsByClassName('gameboard')[0];

playButton.addEventListener('click', startGame);

function startGame() {
    heading.innerText = "Minesweeper";
    playButton.innerText = 'Start Again';

    remainingCells = (rows * columns) - mineCount;
    board = createBoard(rows, columns, mineCount);

    createGameBoard(board);
}

function createBoard(rows,columns,mineCount){
    let board = [];

    //Create board
    for(let i = 0;i<rows;i++){
        board[i] = [];
        for(let j = 0;j<columns;j++){
            board[i][j] = 0;
        }
    }

    //Randomly place mines
    while(mineCount>0){
        const row = Math.floor(Math.random()*rows);
        const col = Math.floor(Math.random()*columns);
        if(board[row][col] === 0){
            board[row][col] = 'mine';
            mineCount--;
        }
    }

    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            if(board[i][j] !== "mine"){
                board[i][j] = countAdjacentMines(board,i,j);
            }
        }
    }

    return board;
}

function countAdjacentMines(board,row,col){
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < board.length && j >= 0 && j < board[0].length && board[i][j] === 'mine') {
            count++;
        }
        }
    }
    return count;
}

function createGameBoard(board){
    gameBoardContainer.innerHTML = '';

    for(let i = 0;i<board.length;i++){
        for(let j = 0;j<board[0].length;j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            let color = ((i % 2 == 0) && (j % 2 == 0))||((i % 2 == 1) && (j % 2 == 1)) ? 'odd' : 'even';
            cell.classList.add(color);
            cell.dataset.row = i;
            cell.dataset.col = j;
            gameBoardContainer.appendChild(cell);
        }
    }
    gameBoardContainer.classList.add('game');
    gameBoardContainer.addEventListener('click', handleCellClick);
}

function handleCellClick(event) {
    const cell = event.target.closest('.cell');
    if (!cell || cell.classList.contains('revealed')) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    handleClick(row, col);
}

function handleClick(row, col) { 
    if (board[row][col] === 'revealed') {
        return;
    }

    if (board[row][col] === 'mine') {
        revealAllMines();
        heading.innerText = "You Lost 😮";
        gameOver();
    } else {
        revealAdjacentCells(row, col);
    
        if (remainingCells === 0){
            heading.innerText = "✨ You Win ✨";
            gameOver();
        }
    }
}

function revealAdjacentCells(row, col) {
    if (board[row][col] === 'revealed') {
      return;
    }

    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
    
  
    if (board[row][col] === 0) {
        board[row][col] = 'revealed';
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < board.length && j >= 0 && j < board[0].length && (i !== row || j !== col)) {
            revealAdjacentCells(i, j);
          }
        }
      }
    }
    else{
        cell.textContent = board[row][col];
        board[row][col] = 'revealed';
    }
    
    cell.classList.add("revealed");
    remainingCells--;
}

function revealAllMines() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'mine') {
            revealCell(i, j, true);
            }
        }
    }
}

function revealCell(row, col, isMine) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (cell) {
        cell.textContent = isMine ? '❌' : '';
        cell.classList.add('revealed');
    }
}

function gameOver(){
    playButton.style.display = "block";
    playButton.innerText = "Play Again";
    gameBoardContainer.removeEventListener('click', handleCellClick);
}
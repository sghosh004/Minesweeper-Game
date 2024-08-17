# Minesweeper Game

Welcome to the classic Minesweeper game built using HTML, CSS, and JavaScript! This is a web-based version of the popular game where the goal is to clear a grid of hidden mines without detonating any of them.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Technologies Used](#technologies-used)
- [JavaScript Logic Overview](#javascript-logic-overview)

## Features

- **Customizable Grid Size:** The grid consists of 8 rows and 10 columns by default.
- **Mine Placement:** 15 mines are randomly placed across the grid.
- **Win/Loss Conditions:** Reveal all cells without detonating a mine to win, or hit a mine and lose the game.
- **Responsive Design:** The game is optimized for various screen sizes.
- **Restart Option:** After a win or loss, you can restart the game using the "Play Again" button.

## How to Play

1. Click the "Play" button to start the game.
2. Left-click on any cell to reveal it.
3. Avoid clicking on cells containing mines. If you click a mine, you lose the game.
4. If a revealed cell contains a number, that number indicates how many mines are adjacent to that cell.
5. Continue revealing cells until you have cleared all non-mine cells to win the game.
6. If you lose or win, click "Play Again" to restart the game.

## Technologies Used

- **HTML5:** Used for the game structure and elements.
- **CSS:** Used for styling the game board, buttons, and text.
- **JavaScript (ES6):** Used for game logic, handling user interactions, and dynamically creating the game board.

## JavaScript Logic Overview

The index.js file contains the core game logic for Minesweeper. Below is an overview of how the game works and the key functions in the file:

### Variables

- **rows, columns, mineCount:** These variables control the grid size and the number of mines placed on the board.
- **board:** A 2D array that stores the state of the grid (whether a cell contains a mine, is revealed, or has a number of adjacent mines).
- **remainingCells:** Keeps track of how many non-mine cells are left to be revealed to win the game.

### Key Functions

- **createBoard(rows, columns, mineCount):**
  Generates the game board as a 2D array, randomly placing mines and calculating the number of adjacent mines for each non-mine cell.

- **createGameBoard(board):**
  Dynamically generates the visual game board using the DOM. Each cell is represented by a div element and is styled based on its state.

- **handleClick(row, col):**
  Handles user clicks on cells. If the user clicks on a mine, the game ends in a loss. If they click on a non-mine cell, it reveals that cell and any adjacent cells with no mines.

- **revealAdjacentCells(row, col):**
  Recursively reveals adjacent cells that do not contain mines. This function implements the logic that uncovers large areas of safe cells in one click.

- **revealAllMines():**
  Reveals all the mines on the board when the player clicks on a mine and loses the game.

- **revealCell(row, col, isMine):**
  Reveals an individual cell, adding the appropriate classes and content (mine symbol, number of adjacent mines, etc.).

- **gameOver():**
  Resets the game after a win or loss. It displays the "Play Again" button and allows the player to start a new game.

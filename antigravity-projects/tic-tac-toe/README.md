# Neon Tic-Tac-Toe

## Project Overview
Neon Tic-Tac-Toe is a dynamic, browser-based implementation of the classic game. It features a modern, neon-themed aesthetic with engaging animations, particle effects upon winning, and score tracking for an enhanced gameplay experience. The game is entirely self-contained in the frontend without the need for a backend server.

## Features
- **Modern Neon UI**: Sleek, glowing visuals and a responsive, clean design.
- **Interactive Gameplay**: Classic two-player turn-based system (Player X vs. Player O).
- **Score Tracking**: Keeps track of wins for both players across consecutive games.
- **Dynamic Animations**: Includes cell highlighting for winning combinations, board animations for wins and draws, and a beautiful custom particle explosion effect when a player wins.
- **Turn Indicator**: Clear visual cues showing whose turn is currently active.
- **Reset Functionality**: Reset the board at any time or smoothly transition to a new round after a game concludes.

## Tech Stack
- **HTML5**: For structuring the web page, game board, and overlays.
- **CSS3**: For the neon styling, flexbox/grid layouts, responsive design, and CSS-based animations.
- **JavaScript (Vanilla)**: For implementing the game logic, state management, DOM manipulation, score tracking, and custom canvas-style particle animations.

## How to Run the App
Since this is a completely static frontend web application, no server, build steps, or dependencies are required. 

1. Clone or download the project folder.
2. Locate the `index.html` file inside the directory.
3. Simply double-click `index.html` or drag it into any modern web browser to start playing immediately.

## Project Structure
```text
tic-tac-toe/
│
├── index.html    # The main HTML document containing the structure of the game
├── style.css     # CSS file containing all styles, neon aesthetics, and animations
└── script.js     # JavaScript file handling the game logic and particle effects
```

## Usage Instructions
1. **Starting the Game**: Open the game in your browser. Player X will always make the first move.
2. **Playing a Turn**: Click on any empty square on the 3x3 grid to place your mark (X or O).
3. **Turn Indication**: The header displays whose turn it is next.
4. **Winning**: The game instantly detects if a player forms a horizontal, vertical, or diagonal line of 3 marks.
5. **Draw**: The game will automatically announce a draw if all cells are filled with no winner.
6. **Post-Game**: Upon a win or draw, an overlay will appear with the result. Click the "Play Again" button to start a new round with the scores preserved.
7. **Resetting**: Click "Reset Board" at the bottom at any time to clear the board and start a brand new game without losing the current score tally.

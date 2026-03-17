const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const clearScoresBtn = document.getElementById('clearScores');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalMsg = document.getElementById('modal-msg');
const modalBtn = document.getElementById('modalBtn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const index = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[index] !== "" || !gameActive) return;

    makeMove(clickedCell, index);
    checkResult();
}

function makeMove(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkResult() {
    let roundWon = false;
    let winningCombo = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        winningCombo.forEach(i => cells[i].classList.add('winner-line'));
        
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.innerText = scoreX;
        } else {
            scoreO++;
            scoreOElement.innerText = scoreO;
        }
        
        showModal('Winner!', `Player ${currentPlayer} has won the match!`);
        return;
    }

    if (!gameState.includes("")) {
        gameActive = false;
        showModal('Draw!', "The game ended in a tie.");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'text-blue-400' : 'text-pink-400'} font-bold">${currentPlayer}</span>'s turn`;
}

function showModal(title, msg) {
    setTimeout(() => {
        modalTitle.innerText = title;
        modalMsg.innerText = msg;
        modalTitle.className = `text-3xl font-bold mb-4 ${title === 'Draw!' ? 'text-slate-300' : (currentPlayer === 'X' ? 'text-blue-400' : 'text-pink-400')}`;
        modal.classList.remove('hidden');
    }, 500);
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerHTML = `Player <span class="text-blue-400 font-bold">X</span>'s turn`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.className = "cell";
    });
    modal.classList.add('hidden');
}

function clearScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.innerText = "0";
    scoreOElement.innerText = "0";
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modalBtn.addEventListener('click', resetGame);
clearScoresBtn.addEventListener('click', clearScores);

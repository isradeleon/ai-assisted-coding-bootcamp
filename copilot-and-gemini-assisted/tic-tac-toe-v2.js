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
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

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
    const isLightMode = document.body.classList.contains('light-mode');
    const colorClass = currentPlayer === 'X' 
        ? (isLightMode ? 'text-blue-600' : 'text-blue-400') 
        : (isLightMode ? 'text-pink-600' : 'text-pink-400');
    statusText.innerHTML = `Player <span class="${colorClass} font-bold">${currentPlayer}</span>'s turn`;
}

function showModal(title, msg) {
    setTimeout(() => {
        modalTitle.innerText = title;
        modalMsg.innerText = msg;
        const isLightMode = document.body.classList.contains('light-mode');
        const titleColor = title === 'Draw!' 
            ? (isLightMode ? 'text-slate-700' : 'text-slate-300')
            : (currentPlayer === 'X' 
                ? (isLightMode ? 'text-blue-600' : 'text-blue-400')
                : (isLightMode ? 'text-pink-600' : 'text-pink-400'));
        modalTitle.className = `text-3xl font-bold mb-4 ${titleColor}`;
        modal.classList.remove('hidden');
    }, 500);
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    const isLightMode = document.body.classList.contains('light-mode');
    const colorClass = isLightMode ? 'text-blue-600' : 'text-blue-400';
    statusText.innerHTML = `Player <span class="${colorClass} font-bold">X</span>'s turn`;
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

function initializeTheme() {
    const savedTheme = localStorage.getItem('tictactoe-theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.innerText = '☀️';
        localStorage.setItem('tictactoe-theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.innerText = '🌙';
        localStorage.setItem('tictactoe-theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modalBtn.addEventListener('click', resetGame);
clearScoresBtn.addEventListener('click', clearScores);
themeToggle.addEventListener('click', toggleTheme);

initializeTheme();

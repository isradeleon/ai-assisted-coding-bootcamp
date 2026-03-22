const cells = document.querySelectorAll('.cell');
const xTurnIndicator = document.getElementById('x-turn');
const oTurnIndicator = document.getElementById('o-turn');
const board = document.getElementById('board');
const winOverlay = document.getElementById('win-overlay');
const winMessage = document.getElementById('win-message');
const playAgainBtn = document.getElementById('play-again-btn');
const resetBtn = document.getElementById('reset-btn');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

let currentTurn = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    // ensure clicking on cell child ignores parent, use querySelector to match data
    const index = parseInt(cell.getAttribute('data-index'));

    if (isNaN(index) || gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentTurn;
    cell.textContent = currentTurn;
    cell.classList.add(currentTurn.toLowerCase());

    checkWin();
}

function checkWin() {
    let roundWon = false;
    let winningCombination = null;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCombination = winConditions[i];
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        highlightWinningCells(winningCombination);
        board.classList.add(`win-anim-${currentTurn.toLowerCase()}`);
        createParticles(currentTurn);
        setTimeout(() => showWinScreen(currentTurn), 1500);
        updateScore(currentTurn);
        return;
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        board.classList.add('draw-anim');
        setTimeout(() => showWinScreen('Draw'), 1000);
        return;
    }

    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winning-cell', `win-bg-${currentTurn.toLowerCase()}`);
    });
}

function updateTurnIndicator() {
    if (currentTurn === 'X') {
        xTurnIndicator.classList.add('active');
        oTurnIndicator.classList.remove('active');
    } else {
        oTurnIndicator.classList.add('active');
        xTurnIndicator.classList.remove('active');
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function showWinScreen(winner) {
    if (winner === 'Draw') {
        winMessage.textContent = "It's a Draw!";
        winMessage.style.background = 'linear-gradient(to right, #94a3b8, #f8fafc)';
    } else {
        winMessage.textContent = `${winner} Wins Game!`;
        winMessage.style.background = winner === 'X' 
            ? 'linear-gradient(to right, #f43f5e, #fb7185)' 
            : 'linear-gradient(to right, #0ea5e9, #38bdf8)';
    }
    winMessage.style.webkitBackgroundClip = 'text';
    winOverlay.classList.remove('hidden');
}

function resetGame() {
    currentTurn = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateTurnIndicator();
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell', 'win-bg-x', 'win-bg-o');
    });

    board.className = 'board'; // Reset animations
    winOverlay.classList.add('hidden');
    
    // Remove all particles
    document.querySelectorAll('.particle').forEach(p => p.remove());
}

function createParticles(winner) {
    const color = winner === 'X' ? '#f43f5e' : '#0ea5e9';
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 15;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            posY += 2; // gravity effect
            
            opacity -= 0.015;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initial state updates
updateTurnIndicator();

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');

// Listen for clicks on the theme toggle button and toggle light mode class
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Update the button icon based on current mode
    if (document.body.classList.contains('light-mode')) {
        themeToggleBtn.textContent = '🌙';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
        themeToggleBtn.textContent = '☀️';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
});


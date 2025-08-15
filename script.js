// Reflejos Rápidos game logic

// Get DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const statusDiv = document.getElementById('status');
const resultText = document.getElementById('result-text');

// Variables to manage state
let timeoutId; // ID for the waiting timer
let startTime; // Timestamp when signal appears

// Start the game: hide start screen and prepare the waiting phase
function startGame() {
    // Switch screens
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');

    // Reset visuals and text
    gameScreen.style.backgroundColor = '#d9534f'; // red background indicates wait
    statusDiv.textContent = 'Prepárate...';
    startTime = undefined;

    // Determine random delay between 2000 and 5000 ms
    const delay = Math.random() * 3000 + 2000;

    // Set timeout for signal to appear
    timeoutId = setTimeout(() => {
        // Change color to green and instruct to click
        gameScreen.style.backgroundColor = '#5cb85c';
        statusDiv.textContent = '¡Haz clic!';
        // Record start time for measuring reaction
        startTime = performance.now();
    }, delay);
}

// Show result screen with a message
function showResult(message) {
    // Cancel any waiting timer if still pending
    clearTimeout(timeoutId);
    // Switch screens
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
    // Display message
    resultText.textContent = message;
}

// Event listener for starting the game
startButton.addEventListener('click', startGame);

// Event listener for clicking on the game screen
gameScreen.addEventListener('click', () => {
    // If game screen is not active, ignore clicks
    if (!gameScreen.classList.contains('active')) {
        return;
    }
    // If startTime is undefined, the player clicked too early (before the green signal)
    if (startTime === undefined) {
        showResult('¡Te adelantaste! Inténtalo de nuevo.');
    } else {
        // Calculate reaction time
        const endTime = performance.now();
        const reactionTime = endTime - startTime;
        showResult(`Tu tiempo de reacción fue de ${reactionTime.toFixed(0)} ms.`);
    }
});

// Event listener for restarting the game from the result screen
restartButton.addEventListener('click', () => {
    // Reset to start screen
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});
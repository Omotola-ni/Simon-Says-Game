// Constants and Variables
const simonColors = ["green", "red", "yellow", "blue"];
let simonPattern = [];
let userPattern = [];
let strictMode = false;
let gameStarted = false;
let round = 1;
let isUserTurn = false;

// DOM Elements
const simonButtons = document.querySelectorAll('.simon-btn');
const startButton = document.getElementById('start-button');
const strictButton = document.getElementById('strict-button');
const message = document.getElementById('message');

// Function to generate a random color and add it to the simon pattern
function addToSimonPattern() {
    const randomColor = simonColors[Math.floor(Math.random() * 4)];
    simonPattern.push(randomColor);
    displayMessage("Round " + round);
    setTimeout(function () {
        displayMessage("Simon Says");
        setTimeout(playSimonPattern, 1000);
    }, 1000);
}

function displayMessage(text) {
    message.innerText = text;
}

function playSimonPattern() {
    isUserTurn = false;
    let i = 0;
    const interval = setInterval(function () {
        const color = simonPattern[i];
        const button = simonButtons[simonColors.indexOf(color)];
        button.classList.add('active');
        playSound(color);
        setTimeout(function () {
            button.classList.remove('active');
            i++;
            if (i >= simonPattern.length) {
                clearInterval(interval);
                displayMessage("Your Turn");
                isUserTurn = true;
            }
        }, 600);
    }, 1000);
}

// Function to handle user input
function handleUserInput(event) {
    if (!isUserTurn) return;
    const clickedColor = event.target.getAttribute('data-color');
    userPattern.push(clickedColor);
    playSound(clickedColor);
    simonButtons[simonColors.indexOf(clickedColor)].classList.add('active');
    setTimeout(function () {
        simonButtons[simonColors.indexOf(clickedColor)].classList.remove('active');
    }, 300);
    
    if (userPattern.join('') === simonPattern.slice(0, userPattern.length).join('')) {
        if (userPattern.length === simonPattern.length) {
            if (round === 20) {
                displayMessage("You Win!");
                resetGame();
            } else {
                round++;
                displayMessage("Correct! Next round.");
                userPattern = [];
                setTimeout(function () {
                    addToSimonPattern();
                    playSimonPattern();
                }, 1000);
            }
        }
    } else {
        displayMessage("Wrong! Try again.");
        if (strictMode) {
            resetGame();
        } else {
            userPattern = [];
            setTimeout(function () {
                playSimonPattern();
            }, 1000);
        }
    }
}


// Function to reset the game
function resetGame() {
    simonPattern = [];
    userPattern = [];
    round = 1;
    gameStarted = false;
    isUserTurn = false;
    displayMessage("Simon Says");
}

// Event listener for the Start button
startButton.addEventListener('click', function () {
    if (!gameStarted) {
        gameStarted = true;
        resetGame();
        addToSimonPattern();
        setTimeout(function () {
            playSimonPattern();
        }, 1000);
    }
});

// Event listener for the Strict Mode button
strictButton.addEventListener('click', function () {
    strictMode = !strictMode;
    strictButton.classList.toggle('active');
});

// Added event listeners to simonButtons to handle user input
simonButtons.forEach(function (button) {
    button.addEventListener('click', handleUserInput);
});

let currentGame = null;
let gameData = {};

function startGame(gameType) {
  currentGame = gameType;
  document.getElementById('gameSelection').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  
  switch(gameType) {
    case 'guess':
      startNumberGuessing();
      break;
    case 'memory':
      startMemoryGame();
      break;
    case 'rps':
      startRockPaperScissors();
      break;
  }
}

function backToSelection() {
  document.getElementById('gameSelection').style.display = 'block';
  document.getElementById('gameArea').style.display = 'none';
  currentGame = null;
  gameData = {};
}

// Number Guessing Game
function startNumberGuessing() {
  gameData.targetNumber = Math.floor(Math.random() * 100) + 1;
  gameData.attempts = 0;
  
  document.getElementById('gameContent').innerHTML = `
    <div class="text-center">
      <h3>🎯 Number Guessing Game</h3>
      <p>I'm thinking of a number between 1 and 100</p>
      <div class="mb-3">
        <input type="number" class="form-control w-50 mx-auto" id="guessInput" min="1" max="100" placeholder="Enter your guess">
      </div>
      <button class="btn btn-primary" onclick="makeGuess()">Guess!</button>
      <div id="guessResult" class="mt-3"></div>
      <p>Attempts: <span id="attempts">0</span></p>
    </div>
  `;
}

function makeGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);
  const result = document.getElementById('guessResult');
  const attemptsSpan = document.getElementById('attempts');
  
  if (!guess || guess < 1 || guess > 100) {
    result.innerHTML = '<div class="alert alert-warning">Please enter a number between 1 and 100</div>';
    return;
  }
  
  gameData.attempts++;
  attemptsSpan.textContent = gameData.attempts;
  
  if (guess === gameData.targetNumber) {
    result.innerHTML = `<div class="alert alert-success">🎉 Congratulations! You guessed it in ${gameData.attempts} attempts!</div>`;
  } else if (guess < gameData.targetNumber) {
    result.innerHTML = '<div class="alert alert-info">📈 Too low! Try a higher number.</div>';
  } else {
    result.innerHTML = '<div class="alert alert-info">📉 Too high! Try a lower number.</div>';
  }
  
  document.getElementById('guessInput').value = '';
}

// Memory Game
function startMemoryGame() {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  gameData.cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  gameData.flipped = [];
  gameData.matched = [];
  gameData.moves = 0;
  
  let cardsHtml = '<div class="text-center"><h3>🧠 Memory Game</h3><p>Moves: <span id="moves">0</span></p><div class="d-flex flex-wrap justify-content-center">';
  
  gameData.cards.forEach((emoji, index) => {
    cardsHtml += `<button class="btn btn-outline-primary memory-card" id="card-${index}" onclick="flipCard(${index})">?</button>`;
  });
  
  cardsHtml += '</div></div>';
  document.getElementById('gameContent').innerHTML = cardsHtml;
}

function flipCard(index) {
  if (gameData.flipped.length === 2 || gameData.flipped.includes(index) || gameData.matched.includes(index)) {
    return;
  }
  
  const card = document.getElementById(`card-${index}`);
  card.textContent = gameData.cards[index];
  card.classList.add('btn-primary');
  gameData.flipped.push(index);
  
  if (gameData.flipped.length === 2) {
    gameData.moves++;
    document.getElementById('moves').textContent = gameData.moves;
    
    setTimeout(() => {
      const [first, second] = gameData.flipped;
      if (gameData.cards[first] === gameData.cards[second]) {
        gameData.matched.push(first, second);
        if (gameData.matched.length === gameData.cards.length) {
          alert(`🎉 You won in ${gameData.moves} moves!`);
        }
      } else {
        document.getElementById(`card-${first}`).textContent = '?';
        document.getElementById(`card-${first}`).classList.remove('btn-primary');
        document.getElementById(`card-${second}`).textContent = '?';
        document.getElementById(`card-${second}`).classList.remove('btn-primary');
      }
      gameData.flipped = [];
    }, 1000);
  }
}

// Rock Paper Scissors
function startRockPaperScissors() {
  gameData.playerScore = 0;
  gameData.computerScore = 0;
  
  document.getElementById('gameContent').innerHTML = `
    <div class="text-center">
      <h3>✂️ Rock Paper Scissors</h3>
      <div class="row">
        <div class="col-6">
          <h5>You: <span id="playerScore">0</span></h5>
        </div>
        <div class="col-6">
          <h5>Computer: <span id="computerScore">0</span></h5>
        </div>
      </div>
      <div class="my-4">
        <button class="btn btn-outline-primary rps-btn" onclick="playRPS('rock')">🪨</button>
        <button class="btn btn-outline-primary rps-btn" onclick="playRPS('paper')">📄</button>
        <button class="btn btn-outline-primary rps-btn" onclick="playRPS('scissors')">✂️</button>
      </div>
      <div id="rpsResult"></div>
    </div>
  `;
}

function playRPS(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
  
  let result = '';
  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
    gameData.playerScore++;
  } else {
    result = 'Computer wins!';
    gameData.computerScore++;
  }
  
  document.getElementById('playerScore').textContent = gameData.playerScore;
  document.getElementById('computerScore').textContent = gameData.computerScore;
  document.getElementById('rpsResult').innerHTML = `
    <div class="alert alert-info game-result">
      You: ${emojis[playerChoice]} vs Computer: ${emojis[computerChoice]}<br>
      <strong>${result}</strong>
    </div>
  `;
}
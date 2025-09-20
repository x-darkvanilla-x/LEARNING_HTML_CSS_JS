const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = { player: 0, computer: 0 };

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computer choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) return 'rock';
  else if (rand <= 0.67) return 'paper';
  else return 'scissors';
}

// Determine winner
function getWinner(p, c) {
  if (p === c) return 'draw';
  if (p === 'rock') return (c === 'paper') ? 'computer' : 'player';
  if (p === 'paper') return (c === 'scissors') ? 'computer' : 'player';
  if (p === 'scissors') return (c === 'rock') ? 'computer' : 'player';
}

// Show winner and update modal
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    scoreboard.player++;
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${capitalize(computerChoice)}</strong></p>
    `;
  } else if (winner === 'computer') {
    scoreboard.computer++;
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${capitalize(computerChoice)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${capitalize(computerChoice)}</strong></p>
    `;
  }
  score.innerHTML = `<p>Player: ${scoreboard.player}</p><p>Computer: ${scoreboard.computer}</p>`;
  modal.style.display = 'block';
}

// Capitalize first letter
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `<p>Player: 0</p><p>Computer: 0</p>`;
}

// Close modal on click outside
function clearModal(e) {
  if (e.target == modal) modal.style.display = 'none';
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

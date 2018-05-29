function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.playersGuessSubmission = function(guess) {
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    throw 'That is an invalid guess.';
  }

  this.playersGuess = guess;

  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return 'You Win!';
  }

  if (this.pastGuesses.includes(this.playersGuess)) {
    return 'You have already guessed that number.';
  }

  this.pastGuesses.push(this.playersGuess);

  if (this.pastGuesses.length === 5) {
    return 'You Lose.';
  }

  if (this.difference() < 10) {
    return "You're burning up!";
  }

  if (this.difference() < 25) {
    return "You're lukewarm.";
  }

  if (this.difference() < 50) {
    return "You're a bit chilly.";
  }

  if (this.difference() < 100) {
    return "You're ice cold!";
  }
};

Game.prototype.difference = function() {
  let result = this.winningNumber - this.playersGuess;
  return result > 0 ? result : -result;
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};

Game.prototype.provideHint = function() {
  return shuffle([
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber()
  ]);
};

function newGame() {
  return new Game();
}

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  let index = arr.length;
  let randomIndex;
  let temp;

  while (--index > 0) {
    randomIndex = Math.floor(Math.random() * (index + 1));
    temp = arr[randomIndex];
    arr[randomIndex] = arr[index];
    arr[index] = temp;
  }

  return arr;
}

$(document).
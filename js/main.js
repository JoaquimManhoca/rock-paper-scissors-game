document.querySelector('.js-rock-botton')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })
document.querySelector('.js-scissors-button')
  .addEventListener('click', () =>{
    playGame('scissors');
  })

let score = JSON.parse(localStorage.getItem('score') ) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  // console.log(locasslStorage.getItem('score'));

  let isAutoPlaying = false;
  let intervalId;

  const autoPlay = () => {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerGuess();
        playGame(playerMove);
      }, 1000)
      isAutoPlaying = true;
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  document.querySelector('.auto-play-score')
    .addEventListener('click', () =>{
      autoPlay();
    });

    document.querySelector('.reset-score')
      .addEventListener('click', () =>{
        document.querySelector('.reset-confirmation')
        .innerHTML = ` <span>
                          Are you sure you want to reset the score?
                        </span>

                        <button class="js-yes-button" onclick="
                            yesConfirmation();
                          ">Yes</button>
                        <button class="js-no-button" onclick="
                          noConfirmation();
                        ">No</button> `
      })

      let yesConfirmation = () =>{
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.reset-confirmation').innerHTML = ""
      }
      let noConfirmation = () =>{
        document.querySelector('.reset-confirmation').innerHTML = ""
      }

  // shortcut keys for the game.
  document.body.addEventListener('keydown', (event) =>{
    console.log(event.key);
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
      playGame('paper')
    }
    else if (event.key === 's') {
      playGame('scissors')
    }
    else if (event.key === 'a'){
      autoPlay();
    }
    else if (event.key === ' '){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
    }
  })

  function playGame(pickplayerMove) {

    computerGuess = pickComputerGuess();
    let playResult = '';

    if (pickplayerMove === 'scissors') {
      if (computerGuess === 'scissors') {
        playResult = 'Tie';
      }
      else if (computerGuess === 'paper') {
        playResult = 'Win';
      }
      else if (computerGuess === 'rock') {
        playResult = 'Lose';
      }
    }
    else if (pickplayerMove === 'paper') {
      if (computerGuess === 'scissors') {
        playResult = 'Lose';
      }
      else if (computerGuess === 'paper') {
        playResult = 'Tie';
      }
      else if (computerGuess === 'rock') {
        playResult = 'Win';
      }
    }
    else if (pickplayerMove === 'rock') {
      if (computerGuess === 'scissors') {
        playResult = 'Win';
      }
      else if (computerGuess === 'paper') {
        playResult = 'Lose';
      }
      else if (computerGuess === 'rock') {
        playResult = 'Tie';
      }
    }

    if (playResult === 'Win') {
      score.wins += 1;
    }
    else if (playResult === 'Lose') {
      score.losses += 1;
    }
    else if (playResult === 'Tie') {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerText =`You ${playResult}.`;
    document.querySelector('.js-moves').innerHTML = `<img class="image" src="img/${pickplayerMove}-emoji.png" alt=""> <img class="image" src="img/${computerGuess}-emoji.png" alt="">`;

    updateScoreElement();

  }

  function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function pickComputerGuess(){
    let randomNumber = Math.floor(Math.random()*3);
    // console.log(randomNumber);
    computerGuess = '';

    if (randomNumber === 0) {
      computerGuess = 'rock';
    }
    else if (randomNumber === 1) {
      computerGuess = 'paper';
    }
    else if (randomNumber === 2) {
      computerGuess = 'scissors';
    }

    // console.log(computerGuess);

    return computerGuess;
  }


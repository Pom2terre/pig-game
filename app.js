/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//Global variables declaration & initialization
var scores, roundScore, activePlayer, dice, isPlaying;

//Initialize all the variables and the UI
init();

//Hide the dice from the webpage > starting
displayDice('off');




/*********************
 * Handle event click on roll dice button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isPlaying) {
    //1. Random number generate
    dice = Math.floor(Math.random() * 6) + 1;

    //2. Diplay dice result image
    displayDice('on')

    //3. Update the round score IF the rolled number <> 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      // reset the score to 0
      roundScore = 0;
      scores[activePlayer] = roundScore;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      //Next player
      nextPlayer();
    }
  }
});

/*********************
 * Handle event click on hold button
 */
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isPlaying) {
    //add the current score to the global player scores
    scores[activePlayer] += roundScore;
    roundScore = 0;
    //update the ui
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // check if scores[activePlayer] = 100
    if (scores[activePlayer] >= 100) {
      playerWin();
      displayDice('off');
    } else {
      // switch to next players
      nextPlayer();
    }
  }
});

/*********************
 * Handle event click on new game button
 */
document.querySelector('.btn-new').addEventListener('click', init);



/*********************
 * Initialization
 */
function init() {
  scores = [0, 0];
  roundScore = dice = activePlayer = 0;
  isPlaying = true;

  while (activePlayer < 2) {
    document.getElementById('score-' + activePlayer).textContent = '0';
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    activePlayer += 1;
  }
  //select the 1st player randomly
  activePlayer = Math.round(Math.random()); // activePlayer = 0 or 1
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


function nextPlayer() {
  // set the currentPlayer as inactive
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  // switch player 0 <-> 1
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // set next player as active
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  // Hide the dice < next player start playing
  displayDice('off');
}


function playerWin() {
  document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
  // replace current player-x-panel.active class by special winner class (see css file).
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  isPlaying = false;
}


function displayDice(status) {
  var diceDom = document.querySelector('.dice');
  if (status === 'on') { // select the dice image and display it
    diceDom.src = 'dice-' + dice + '.png';
    diceDom.style.display = 'block';
  } else if (status === 'off') { // hide the dice
    diceDom.style.display = 'none';
  }
}

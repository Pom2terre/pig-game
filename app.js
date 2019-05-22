/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Global variables declaration & initialization
var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0; //0=player-1, 1=player-2

//DOM manipulations
//Hide the dice from the webpage > starting
document.querySelector('.dice').style.display = 'none';

//Set the current and score value to 0
while (activePlayer < 2) {
  document.getElementById('score-' + activePlayer).textContent = '0';
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer += 1;
}
activePlayer = 0;

//Handle event click on roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. Random number generate
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Diplay dice result image
  var diceDom = document.querySelector('.dice');
  diceDom.src = 'dice-' + dice + '.png';
  diceDom.style.display = 'block';

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
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    // Hide the dice < next player start playing
    document.querySelector('.dice').style.display = 'none';
  }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
  //add the current score to the global player scores
  scores[activePlayer] += roundScore;
  roundScore = 0;
  //update the ui
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  // switch to next players
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  // Hide the dice < next player start playing
  document.querySelector('.dice').style.display = 'none';

});









//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

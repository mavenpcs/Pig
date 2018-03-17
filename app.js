var scores, roundScore, activePlayer, gamePlaying, flagSix, winningScore, scoreSetting;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
        if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log('Player ' + (activePlayer + 1) + ' rolled ' + dice1 + ' and ' + dice2 + '.');
        // 2. Display the result
        var diceDOM1 = document.querySelector('.dice1');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 === 1 || dice2 === 1) {
            nextPlayer();
        }
        else if ( (dice1 === 6 || dice2 === 6) && flagSix == false) {
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;            
            flagSix = true;
        }
        else if ( (dice1 === 6 || dice2 === 6) && flagSix == true) {            
            resetScore();
            nextPlayer();
        }        
        else if (dice1 !== 6 && dice2 !== 6) {
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;            
            flagSix = false;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;            
        }
        else {
            // Next player's turn
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    flagSix = false;
    console.log('Switch turns!');
}

document.querySelector('.btn-new').addEventListener('click', init);

function resetScore() {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    console.log('Player ' + (activePlayer + 1) + ' rolled 6 twice in a row. Resetting entire score!')
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    flagSix = false;
    winningScore = 100;
    scoreSetting === undefined ? winningScore = 100 : winningScore = scoreSetting;
    
    document.querySelector('.winning-score').innerHTML = 'Winning Score: ' + winningScore;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('#winningScore').addEventListener('keyup', function(event) {
    event.preventDefault;
    
    var userInput = Math.round(document.getElementById('winningScore').value);
    
    if ( !(userInput > 0) && (event.keyCode === 13) ) {
        alert('Please enter a value! \(INTEGER ONLY\)');
    }
    else if (event.keyCode === 13) {
        alert('You have set the winning score to ' + userInput + '. Click on New Game to apply.');
        scoreSetting = userInput;
    }
});
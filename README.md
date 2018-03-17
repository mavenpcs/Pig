# Pig (Dice Game) written in JavaScript

### Rules:
- This is a turn-based two-player game.
- In each turn, player can roll two dice as many times as desired. The sum of the rolls (current score) are added to the player's total score.
  - BUT, if player rolls a 1 from any die, player loses his/her turn along with accumulated current score.
  - Rolling a 6 twice in a row (in two consecutive turns) will result in resetting the player's total score and losing his/her turn.
  (i.e. Rolling two 6's in one turn is OK)
  - Player can also choose to 'Hold', which will result in adding the current score to his/her total score.
- The first player to reach the set winning points is the winner.

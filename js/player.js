//values associated with each player
function Player(turn) {
  this.cards = []
  //value associated the amount a player can bet
  this.money = 1000
  this.cardValue = 0
  //player1 will hava parameter passed to make this true otherwise the default is false
  this.turn = turn ? true: false;
  this.won = false;
}

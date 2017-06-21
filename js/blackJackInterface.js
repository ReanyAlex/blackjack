const i = new Interface()
const suite = ["heart","spades","clubs","diamonds"];
function Interface() {
  this.deckArray = [];
  this.deck = new Deck
  this.player1 = new Player(true)
  this.player2 = new Player()
  this.bet = 0;
}

Interface.prototype.shuffle = function () {
  //same keys for all the suits
  const deckKeys = Object.keys(this.deck.heart)
  let self = this
  deckKeys.map(function(card) {
    //iterates over suite to find suite info
    for (var j = 0; j <= 3; j++) {
    self.deckArray.push(self.deck[suite[j]][card])
    }
  })
  i.deal()
  i.cardValue()
};

Interface.prototype.deal = function () {
  for (let i = 0; i < 4; i++) {
    let random = this.selectCard()
    if (i%2 === 0) {
      //to deal the two cards use the hit function twice for each player
      this.hit()
      //changes the turn of the player only here for deal will have stay change turn
      this.player1.turn = !this.player1.turn
      this.player2.turn = !this.player2.turn
    }else {
      this.hit()
      //changes the turn of the player only here for deal will have stay change turn
      this.player1.turn = !this.player1.turn
      this.player2.turn = !this.player2.turn
    }
  }
};

Interface.prototype.cardValue = function () {
  let length1 = this.player1.cards.length
  let length2 = this.player2.cards.length
  this.player1.cardValue = 0;
  this.player2.cardValue = 0;

  for (var i = 0; i < length1; i++) {
    this.player1.cardValue += this.player1.cards[i].value
  }

  for (var i = 0; i < length2; i++) {
    this.player2.cardValue += this.player2.cards[i].value
  }
  this.isOver21WithAce();
  this.over21();
};

Interface.prototype.selectCard = function () {
  let length = this.deckArray.length
  let random = Math.floor(Math.random()*length)
  return random
};

Interface.prototype.hit = function() {
  if (this.player1.turn) {
    player = 'player1'
  }else if(this.player2.turn) {
    player = 'player2'
  }else {
    return false;
  }
  let random = this.selectCard()
  this[player].cards.push(this.deckArray[random])
  this.deckArray.splice(random,1)
  // should not be this methods job
  // //changes the turn of the player
  // this.player1.turn = !this.player1.turn
  // this.player2.turn = !this.player2.turn
  this.cardValue()
  this.displayCard(player)
  this.whoWon()
};

Interface.prototype.displayCard = function (player) {
  if (player === "player1") {
    document.querySelector('#player1').innerHTML = this.makeDom(player)
  }else  {
    //do display second card faced down
    //this works but it is so ugly
    // console.log(document.querySelector("#player2").childNodes.length);
    if (this.player2.cards.length === 2 && document.querySelector("#player2").childNodes.length < 6 && document.querySelector("#player2").childNodes.length > 2) {
      document.querySelector('#player2').innerHTML = "<span class='cards "+this.player2.cards[0].suit+"'>"+ this.player2.cards[0].unicode +"</span><span class='cards'>"+ unicode.misc +"</span>"
    }else{
    document.querySelector('#player2').innerHTML = this.makeDom(player)
    }
    //need to fix the above code
  }
};
//makes the DOM elememt that get appended into the DOM
Interface.prototype.makeDom = function (player) {
  // console.log(player);
  let domElem =""
  for (let i = 0; i < this[player].cards.length; i++) {
    domElem += "<span class='cards "+this[player].cards[i].suit+"'>"+ this[player].cards[i].unicode +"</span>"
  }
  domElem += "<span class='value'>"+this[player].cardValue+"</span>"
            + "<br><span>bank</span><span class='value'>"+"  "+this[player].money+"</span>"
  return domElem
};

Interface.prototype.stay = function () {
  if (this.player1.turn) {
    // console.log("player 1 turn");
    this.player1.turn = !this.player1.turn
    this.player2.turn = !this.player2.turn
    this.displayCard(player)
    this.ai()
  }else if (this.player2.turn) {
    // console.log("player 2");
    this.over21()
    this.comparePoints()
    this.whoWon()
  }
};

Interface.prototype.isOver21WithAce = function () {
  if (this.player1.cardValue > 21 ) {
    this.changeAce("player1")
  }
  if (this.player2.cardValue > 21 ) {
    this.changeAce("player2")
  }
};

Interface.prototype.changeAce = function (player) {
  //iterate over cards
  for (var i = 0; i < this[player].cards.length; i++) {
    if (this[player].cards[i].name === "ace") {
      if (!this[player].cards[i].valueOne) {
        this[player].cards[i].valueOne = true;
        this[player].cards[i].changeValue()
        // console.log(this[player].cards[i].valueOne);
        this.cardValue()
      }
    };
  }
};

Interface.prototype.over21 = function () {
  if (this.player1.cardValue > 21 ) {
    console.log("player 1 busted");
    this.player1.turn = false;
    this.player2.turn = false;
    this.player2.won = true;
  }
  if (this.player2.cardValue > 21 ) {
    console.log("player 2 busted");
    this.player1.turn = false;
    this.player2.turn = false;
    this.player1.won = true;
  }
};
//if both players stay compare the points
Interface.prototype.comparePoints = function () {
  if (this.player1.cardValue > this.player2.cardValue) {
    this.player1.won = true;
  }else {
    this.player2.won = true;
  }
}
//retrieves the value from the DOM. there is no check yet to make sure it is a numeric value
Interface.prototype.placeBet = function () {
  let bet = document.getElementById("bet").elements[0].value;
  this.bet = parseInt(bet);
  document.querySelector('#current').innerHTML = "<p id='current'>The current bet is $"+this.bet+"</p>"
};
//takes bet and redistrubtes it to who ever wins
Interface.prototype.whoWon = function () {
  if (this.player1.won) {
    this.player1.money += this.bet
    this.player2.money -= this.bet
    document.querySelector('#header').innerHTML = "<p>Player 1 won</p><p>Play another hand</p>"
  }
  if (this.player2.won) {
    this.player1.money -= this.bet
    this.player2.money += this.bet
    document.querySelector('#header').innerHTML = "<p>Player 2 won</p><p>Play another hand</p>"
  }
};
//reset certain information to start a new hand
Interface.prototype.nextHand = function () {
  this.deckArray = [];
  this.player1.cardValue = 0;
  this.player1.cards = [];
  this.player1.won = false;
  this.player2.cardValue = 0;
  this.player2.cards = [];
  this.player2.won = false;
  this.player1.turn = true;
  this.player2.turn = false;
  //set aces that have their vaule changed back to 11
  for (var j = 0; j <= 3; j++) {
    console.log(this.deck[suite[j]].ace.value);
    this.deck[suite[j]].ace.value = 11
  };
  document.querySelector('#header').innerHTML = "Black Jack"
  i.shuffle()
};

Interface.prototype.ai = function () {
  if (this.player2.cardValue < 17) {
    this.displayCard("player2")
    this.hit("player2")
    this.ai()
  }else {
    this.stay()
  }
  this.comparePoints()
};

i.shuffle()

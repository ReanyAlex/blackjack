//constructor function to create a new Deck
function Deck() {
  this.heart = new Suit('heart')
  this.spades = new Suit('spades')
  this.clubs = new Suit('clubs')
  this.diamonds = new Suit('diamonds')
}

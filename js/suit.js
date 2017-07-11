//condensed version will keep orginal below just incase an error pops up
function Suit(suit) {
  //for the naming of the property on this object
  const cardNames = ["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"]
  const cardValues = [11,2,3,4,5,6,7,8,9,10,10,10,10]
  //function to place on the ace cards
  let aceFunction = function() {
                console.log("____________xxx_________")
                console.log(this);
                if (this.valueOne) {
                  this.value = 1;
                }
              }
  //create the 2 through ten cards
  for (let i = 0; i  <= 12; i++) {
    this[cardNames[i]] = {
            name: cardNames[i],
            suit: suit,
            unicode:unicode[suit][i],
            value: parseInt(cardValues[i]),
            //tenary operator to place function on only ace cards
            changeValue: (cardNames[i] === "ace") ? aceFunction : null
    }
  }
}




//old version of code
// all the information associated with a card
//might be able to set it up all up by iterating over an array like 2 through 10
// function Suit(suit) {
//   this.ace = {
//             name: "ace",
//             suit: suit,
//             unicode: unicode[suit][0],
//             valueOne: false,
//             value: 11,
//             changeValue: function() {
//               if (this.valueOne) {
//                 this.value = 1;
//               }
//             }
//           }
//
//   //for the naming of the property on this object
//   const cardValues = ["two","three","four","five","six","seven","eight","nine","ten"]
//   //create the 2 through ten cards
//   for (let i = 0; i  <= 8; i++) {
//     this[cardValues[i]] = {
//                           name: `${i+2}`,
//                           suit: suit,
//                           unicode:unicode[suit][i+1],
//                           value: i+2
//                           }
//                         }
//
//   this.jack = {
//             name: "jack",
//             suit: suit,
//             unicode:unicode[suit][10],
//             value: 10
//           }
//
//   this.queen = {
//             name: "queen",
//             suit: suit,
//             unicode:unicode[suit][11],
//             value: 10
//           }
//
//   this.king = {
//             name: "king",
//             suit: suit,
//             unicode:unicode[suit][12],
//             value: 10
//           }
// }

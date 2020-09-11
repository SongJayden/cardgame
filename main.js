"use strict";

//constants
SIZE = 52;
PAIR = 2;
SUITS = new Array("Spades", "Hearts", "Diamonds", "Clubs");
RESULTVALUES = new Array(
  "Ace",
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "Jack",
  "Queen",
  "King"
);

var cardSet;
var cardSet2;
var guessCards;
var pairedCards;
var pairedResults;
var finalResults;
var gameover;
var foundPairs;
var a;

function shuffleCards() {
  //shuffle cards using random numbers
  var elementsRemaining = cardSet.length;
  var iRnd = 0;
  var temp;

  while (elementsRemaining > 1) {
    iRnd = Math.floor(Math.random() * (elementsRemaining - 1));
    temp = cardSet[iRnd];
    cardSet[iRnd] = cardSet[elementsRemaining - 1];
    cardSet[elementsRemaining - 1] = temp;
    elementsRemaining--;
  }
}

function setGame() {
  //sets new game
  guessCards = new Array();
  pairedCards = new Array(52);
  pairedResults = new Array();
  finalResults = new Array(13);
  gameover = false;
  foundPairs = 0;
  a = 0;

  cardSet = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
  ];
  cardSet2 = [
    "0.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png",
    "17.png",
    "18.png",
    "19.png",
    "20.png",
    "21.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png",
    "28.png",
    "29.png",
    "30.png",
    "31.png",
    "32.png",
    "33.png",
    "34.png",
    "35.png",
    "36.png",
    "37.png",
    "38.png",
    "39.png",
    "40.png",
    "41.png",
    "42.png",
    "43.png",
    "44.png",
    "45.png",
    "46.png",
    "47.png",
    "48.png",
    "49.png",
    "50.png",
    "51.png",
  ];

  shuffleCards();
  document.write(
    "<h1>Shinkei-suijaku Game(Time Left: <span id='timer'></span> ) </h1> "
  );

  document.write("<table>");

  for (j = 0; j < 4; j++) {
    document.write("<tr>");
    for (i = 0; i < 13; i++) {
      document.write("<td>");
      document.write(
        "<img id=" +
          a +
          ' src="back.gif" alt="back img" width=60 hight=60 onclick="selectCard(' +
          a +
          ')">'
      );
      document.write("</td>");
      a++;
    }
    document.write("</tr>");
  }
  document.write("</table>");
  document.write(
    '<div align="center">   <button type="button" onclick="stopGame()">Stop Game</button>  <button type="button" onclick="flipCard()">Flip Cards</button>  <button type="button" onclick="showCard()">Show Cards</button>  </div>'
  );
}

function selectCard(id) {
  //when card is selected
  if (!gameover) {
    //if not game over

    document.getElementById(id).src = cardSet[id] + ".png";

    if (guessCards.length == 0) {
      //first Guess card
      if (pairedCards[cardSet.indexOf(cardSet[id])] != 1) {
        guessCards.push(cardSet[id]);
      }
    } else if (guessCards.length == 1 && guessCards[0] != cardSet[id]) {
      //second guess card
      if (pairedCards[cardSet.indexOf(cardSet[id])] != 1) {
        guessCards.push(cardSet[id]);
        if (isPairedCard(guessCards[0], guessCards[1])) {
          pairedCards[cardSet.indexOf(guessCards[0])] = 1;
          pairedCards[cardSet.indexOf(guessCards[1])] = 1;
          pairedResults.push(guessCards[0]);
          pairedResults.push(guessCards[1]);
          foundPairs++;
          guessCards = new Array();
        } else {
          setTimeout("clearPrevious()", 300);
        }
      }
    } else if (guessCards.length == 2) {
      if (
        pairedCards[cardSet.indexOf(guessCards[0])] != 1 &&
        pairedCards[cardSet.indexOf(guessCards[1])] != 1
      ) {
        clearPrevious();
      }
      guessCards.push(cardSet[id]);
    }
  }
}
function clearPrevious() {
  //clears the last 2
  document.getElementById(cardSet.indexOf(guessCards[0])).src = "back.gif";
  document.getElementById(cardSet.indexOf(guessCards[1])).src = "back.gif";
  guessCards = new Array();
}

function isPairedCard(card1, card2) {
  //if same remainder after dividing it by 13 returns true

  if (card1 % 13 == card2 % 13) {
    return true;
  } else {
    return false;
  }
}
var is = 0;
var fs = 0;
function showCard() {
  //shows all the card in sequence

  if (is < cardSet.length) {
    document.getElementById(is).src = cardSet[is] + ".png";
    is++;
    setTimeout("showCard()", 20);
  } else {
    is = 0;
  }
}

function flipCard() {
  //flips all the card in sequence
  if (fs < cardSet.length) {
    if (pairedCards[fs] != 1) {
      document.getElementById(fs).src = "back.gif";
    }
    fs++;
    setTimeout("flipCard()", 20);
  } else {
    fs = 0;
  }
}

function bubbleSort(arrayToSort) {
  //bubbleSort
  var sorted = false;
  for (var i = 0; i < arrayToSort.length - 1 && !sorted; i++) {
    sorted = true;
    for (var j = 0; j < arrayToSort.length - 1; j++) {
      if (arrayToSort[j] > arrayToSort[j + 1]) {
        temp = arrayToSort[j];
        arrayToSort[j] = arrayToSort[j + 1];
        arrayToSort[j + 1] = temp;
        sorted = false;
      }
    }
  }
}

function stopGame() {
  //stops game
  var message = "You have found " + foundPairs + " pairs:\n";
  bubbleSort(pairedResults);
  var nums;
  var types;
  for (z = 0; z < finalResults.length; z++) {
    finalResults[z] = new Array();
  }
  for (i = 0; i < pairedResults.length; i++) {
    nums = pairedResults[i] % 13; //what value it is
    types = parseInt(pairedResults[i] / 13); //what suit it is

    finalResults[nums][types] = 1; //puts it into final Results double array
  }
  for (j = 0; j < finalResults.length; j++) {
    if (typeof finalResults[j] != "undefined") {
      for (k = 0; k < finalResults[j].length; k++) {
        if (finalResults[j][k] == 1) {
          message += SUITS[k];
          message += "-" + RESULTVALUES[j] + ", ";
        }
      }
    }
  }
  alert(message);
  window.location = document.URL;
}

var count = 60;

var counter = setInterval(timer, 1000);

function timer() {
  //timer function, count down to 0 from 60
  if (count <= 0) {
    clearInterval(counter);
    gameover = true;
    document.getElementById("timer").innerHTML = count + " secs";
    stopGame();
  }
  if (count != 0) {
    count = count - 1;
  }
  document.getElementById("timer").innerHTML = count + " secs";
}

setGame(); //Sets game ready to play

// let's start coding right here

// cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];                      // typeError: card is not iterable

// deck of all cards in game
let deck = document.getElementById('card-deck');

// declaring move variable
let moves = 0;
let counter = document.querySelector('.moves');

// declaring variables for star icons
let stars = document.querySelectorAll('.fa-star');

// declaring variable of matchedCards
let matchedCards = document.getElementsByClassName('match');

// stars list
let starsList = document.querySelectorAll('.stars li');

// closeIcon in modal
let closeIcon = document.querySelector('.close');

// declare modal
let modal = document.getElementById('popup1');

// an array for opened cards
let openedCards = [];



// @description shuffles cards
// @param {array}
// @returns shuffledArray
function shuffle(array) {
    let currentIndex = array.length, value, randomIndex;

    if (currentIndex !== 0) {       // while loop
        randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex = currentIndex - 1;
        value = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = value;
    }
    return array;
};


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play 
function startGame() {
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);

    // remove all existing classes from each card
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function (items) {
            deck.appendChild(items);           // appendChild
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    };

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = '#ffd700';
        stars[i].style.visibility = 'visible';
    };

    // reset timer
    seconds = 0;
    minutes = 0;
    hours = 0;

    let timer = document.querySelector('.timer');
    timer.innerHTML = '0 mins  0 secs';
    clearInterval(interval);
};


// @description toggles open and show class to display cards
let displayCards = function () {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let check = openedCards.length;

    if (check === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        }
        else {
            unmatched();
        }
    }
};


// @description when cards match
function matched() {
    openedCards[0].classList.add('match', 'show', 'open');
    openedCards[1].classList.add('match', 'show', 'open');
    // openedCards[0].classList.remove('show', 'open', 'no-event');
    // openedCards[1].classList.remove('show', 'open', 'no-event');
    openedCards = [];
};


// description when cards do not match
function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();

    setTimeout( function () {
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        openedCards = [];
    }, 1100);
};


// description disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
};


// description enable cards and disabled matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');

        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        };
    });
};


// description count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    // start timer on first click
    if (moves == 1) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        startTimer();
    }

    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (let i = 0; i < 3; i++) {       // let
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 13) {
        for (let i = 0; i < 3; i++) {       // let
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
};


// description game timer
var seconds = 0, minutes = 0, hours = 0;
var timer = document.querySelector('.timer');
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minutes + ' mins ' + seconds + ' secs';
        seconds++;

        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }

    }, 1000);
};



// description congratulation when all cards match. Display modal, moves, time and rating
function congratulation() {
    if (matchedCards.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulation modal
        modal.classList.add('show');

        // declare star rating variable
        let starRating = document.querySelector('.stars').innerHTML;

        // display moves, time and rating 
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // closeIcon on modal
        closeModal();
    };
};


// description close icon on modal
function closeModal() {
    closeIcon.addEventListener('click', function () {
        modal.classList.remove('show');
        startGame();
    });
};


// description play again
function playAgain() {
    modal.classList.remove('show');
    startGame();
};


// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCards);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulation);
};





// // cards array holds all cards
// let card = document.getElementsByClassName("card");
// let cards = [...card];

// // deck of all cards in game
// const deck = document.getElementById("card-deck");

// // declaring move variable
// let moves = 0;
// let counter = document.querySelector(".moves");

// // declare variables for star icons
// const stars = document.querySelectorAll(".fa-star");

// // declaring variable of matchedCards
// let matchedCard = document.getElementsByClassName("match");

//  // stars list
//  let starsList = document.querySelectorAll(".stars li");

//  // close icon in modal
//  let closeicon = document.querySelector(".close");

//  // declare modal
//  let modal = document.getElementById("popup1")

//  // array for opened cards
// var openedCards = [];


// // @description shuffles cards
// // @param {array}
// // @returns shuffledarray
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// };


// // @description shuffles cards when page is refreshed / loads
// document.body.onload = startGame();


// // @description function to start a new play 
// function startGame(){
 
//     // empty the openCards array
//     openedCards = [];

//     // shuffle deck
//     cards = shuffle(cards);
//     // remove all exisiting classes from each card
//     for (var i = 0; i < cards.length; i++){
//         deck.innerHTML = "";
//         [].forEach.call(cards, function(item) {
//             deck.appendChild(item);
//         });
//         cards[i].classList.remove("show", "open", "match", "disabled");
//     }
//     // reset moves
//     moves = 0;
//     counter.innerHTML = moves;
//     // reset rating
//     for (var i= 0; i < stars.length; i++){
//         stars[i].style.color = "#FFD700";
//         stars[i].style.visibility = "visible";
//     }
//     //reset timer
//     second = 0;
//     minute = 0; 
//     hour = 0;
//     var timer = document.querySelector(".timer");
//     timer.innerHTML = "0 mins 0 secs";
//     clearInterval(interval);
// }


// // @description toggles open and show class to display cards
// var displayCard = function (){
//     this.classList.toggle("open");
//     this.classList.toggle("show");
//     this.classList.toggle("disabled");
// };


// // @description add opened cards to OpenedCards list and check if cards are match or not
// function cardOpen() {
//     openedCards.push(this);
//     var len = openedCards.length;
//     if(len === 2){
//         moveCounter();
//         if(openedCards[0].type === openedCards[1].type){
//             matched();
//         } else {
//             unmatched();
//         }
//     }
// };


// // @description when cards match
// function matched(){
//     openedCards[0].classList.add("match", "disabled");
//     openedCards[1].classList.add("match", "disabled");
//     openedCards[0].classList.remove("show", "open", "no-event");
//     openedCards[1].classList.remove("show", "open", "no-event");
//     openedCards = [];
// }


// // description when cards don't match
// function unmatched(){
//     openedCards[0].classList.add("unmatched");
//     openedCards[1].classList.add("unmatched");
//     disable();
//     setTimeout(function(){
//         openedCards[0].classList.remove("show", "open", "no-event","unmatched");
//         openedCards[1].classList.remove("show", "open", "no-event","unmatched");
//         enable();
//         openedCards = [];
//     },1100);
// }


// // @description disable cards temporarily
// function disable(){
//     Array.prototype.filter.call(cards, function(card){
//         card.classList.add('disabled');
//     });
// }


// // @description enable cards and disable matched cards
// function enable(){
//     Array.prototype.filter.call(cards, function(card){
//         card.classList.remove('disabled');
//         for(var i = 0; i < matchedCard.length; i++){
//             matchedCard[i].classList.add("disabled");
//         }
//     });
// }


// // @description count player's moves
// function moveCounter(){
//     moves++;
//     counter.innerHTML = moves;
//     //start timer on first click
//     if(moves == 1){
//         second = 0;
//         minute = 0; 
//         hour = 0;
//         startTimer();
//     }
//     // setting rates based on moves
//     if (moves > 8 && moves < 12){
//         for( i= 0; i < 3; i++){
//             if(i > 1){
//                 stars[i].style.visibility = "collapse";
//             }
//         }
//     }
//     else if (moves > 13){
//         for( i= 0; i < 3; i++){
//             if(i > 0){
//                 stars[i].style.visibility = "collapse";
//             }
//         }
//     }
// }


// // @description game timer
// var second = 0, minute = 0; hour = 0;
// var timer = document.querySelector(".timer");
// var interval;
// function startTimer(){
//     interval = setInterval(function(){
//         timer.innerHTML = minute+"mins "+second+"secs";
//         second++;
//         if(second == 60){
//             minute++;
//             second=0;
//         }
//         if(minute == 60){
//             hour++;
//             minute = 0;
//         }
//     },1000);
// }


// // @description congratulations when all cards match, show modal and moves, time and rating
// function congratulations(){
//     if (matchedCard.length == 16){
//         clearInterval(interval);
//         finalTime = timer.innerHTML;

//         // show congratulations modal
//         modal.classList.add("show");

//         // declare star rating variable
//         var starRating = document.querySelector(".stars").innerHTML;

//         //showing move, rating, time on modal
//         document.getElementById("finalMove").innerHTML = moves;
//         document.getElementById("starRating").innerHTML = starRating;
//         document.getElementById("totalTime").innerHTML = finalTime;

//         //closeicon on modal
//         closeModal();
//     };
// }


// // @description close icon on modal
// function closeModal(){
//     closeicon.addEventListener("click", function(e){
//         modal.classList.remove("show");
//         startGame();
//     });
// }


// // @desciption for user to play Again 
// function playAgain(){
//     modal.classList.remove("show");
//     startGame();
// }


// // loop to add event listeners to each card
// for (var i = 0; i < cards.length; i++){
//     card = cards[i];
//     card.addEventListener("click", displayCard);
//     card.addEventListener("click", cardOpen);
//     card.addEventListener("click",congratulations);
// };
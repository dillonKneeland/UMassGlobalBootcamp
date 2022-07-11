const gameContainer = document.getElementById("game-field");
gameContainer.addEventListener('click', handleCardClick);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add('flipped');
    newDiv.setAttribute('data-color', color);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  let card = undefined;
  if (event.target.classList.contains('flipped')) {
    card = event.target;
  } else return;
  let cards = gameContainer.querySelectorAll(':not(.flipped):not([data-matched])');
  console.log(cards);
  if (cards.length > 1) return;
  card.classList.remove('flipped');
  if (cards.length > 0 && cards[0].getAttribute('data-color') === card.getAttribute('data-color')) {
    cards[0].setAttribute('data-matched', 'true');
    card.setAttribute('data-matched', 'true');
  } else if (cards.length === 0) {
    return;
  } else {
    setTimeout(() => {
      cards[0].classList.add('flipped');
      card.classList.add('flipped')
    }, 1000);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

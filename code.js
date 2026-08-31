const gridContainer = document.querySelector(".grid-container");
const cardExplanations = document.querySelector(".card-explanations");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("data/card.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

  function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
         <img class="front-image" src=${card.image}> 
      </div>
      <div class="back">
       
      </div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

/* src=${card.image} */

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


var acc = document.getElementsByClassName("accordion");
var shorten = document.getElementsByClassName("activeaccordion");
var i;


cardExplanations.addEventListener("click", function(event) {

  if (!event.target.classList.contains("accordion")) {
    return;
  }
    const panel = event.target.nextElementSibling;

    document.querySelectorAll(".card-explanations .panel").forEach(function(otherPanel) {
      if (otherPanel !== panel) {
      otherPanel.classList.add("closedac");
      }
    });

    panel.classList.toggle("closedac");
  });



function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  const cardData = cards.find(card => card.name === firstCard.dataset.name);

  const cardexplanation = document.createElement("div");
    cardexplanation.classList.add("explanation");
    cardexplanation.setAttribute("data-name", firstCard.dataset.name);
    cardexplanation.innerHTML = `

      <button class="accordion">${cardData.texttitle}</button>
                              <div class="panel closedac"> 
                              <p>${cardData.textcontent}</p>
                          </div>
    `;
    cardExplanations.appendChild(cardexplanation);

  resetBoard();
}

/*

panel.classList.toggle("openpanel");
panel.style.maxHeight = panel.scrollHeight + "px";


function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
  */

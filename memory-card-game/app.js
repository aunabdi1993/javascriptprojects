// Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
  { imgSrc: "./images/beatles.jpeg", name: "Beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "Blink182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "FKATwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "Fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", name: "Joy Division" },
  { imgSrc: "./images/ledzep.jpeg", name: "Led Zeppelin" },
  { imgSrc: "./images/metallica.jpeg", name: "Metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "Pink Floyd" },
  { imgSrc: "./images/beatles.jpeg", name: "Beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "Blink182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "FKATwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "Fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", name: "Joy Division" },
  { imgSrc: "./images/ledzep.jpeg", name: "Led Zeppelin" },
  { imgSrc: "./images/metallica.jpeg", name: "Metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "Pink Floyd" },
];

//Function to randomise the cards
const randomize = () => {
  const cardData = getData();
  // Method to randomize an array
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();
  // Generate HTMLxs
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
          card.classList.remove('flipped');
          card.style.pointerEvents = "none";
      })
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
          card.classList.remove('flipped');
          setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if(playerLives === 0) {
          restart("👎 Try Again!");
      }
    }
  }
  //Run a check to see if won the game
  if(toggleCard.length === 16){
      restart('👍 You Won!')
  }
};
//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none"
    cardData.forEach((item,index) => {
        cards[index].classList.remove('toggleCard');
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    })
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100)
};

cardGenerator();

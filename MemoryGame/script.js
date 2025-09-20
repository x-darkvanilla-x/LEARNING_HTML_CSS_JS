/*
  Author: Dipesh Adelkar
  Linkedin: Dipesh Adelkar
  Instagram: @x_darkvanilla_x 
  Github: @x-darkvanilla-x
*/

const boxcard = document.getElementById("boxcard");
const counterEl = document.getElementById("counter");
const resetBtn = document.getElementById("resetBtn");

let BoxOpened = null;
let ImgOpened = "";
let Counter = 0;
let ImgFound = 0;

var ImgSource = [
  "http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png",
  "http://img6.uploadhouse.com/fileuploads/17699/17699263b01721074bf094aa3bc695aa19c8d573.png",
  "http://img6.uploadhouse.com/fileuploads/17699/17699262833250fa3063b708c41042005fda437d.png",
  "http://img9.uploadhouse.com/fileuploads/17699/176992615db99bb0fd652a2e6041388b2839a634.png",
  "http://img4.uploadhouse.com/fileuploads/17699/176992601ca0f28ba4a8f7b41f99ee026d7aaed8.png",
  "http://img3.uploadhouse.com/fileuploads/17699/17699259cb2d70c6882adc285ab8d519658b5dd7.png",
  "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
  "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png",
  "http://img9.uploadhouse.com/fileuploads/17699/176992568b759acd78f7cbe98b6e4a7baa90e717.png",
  "http://img9.uploadhouse.com/fileuploads/17699/176992554c2ca340cc2ea8c0606ecd320824756e.png"
];

let cards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  boxcard.innerHTML = "";
  cards = [];
  ImgFound = 0;
  Counter = 0;
  counterEl.textContent = Counter;

  let doubled = [...ImgSource, ...ImgSource];
  shuffle(doubled);

  doubled.forEach((src, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = src;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="${src}" alt="img"></div>
      </div>
    `;

    card.addEventListener("click", () => openCard(card));
    boxcard.appendChild(card);
    cards.push(card);
  });
}

function openCard(card) {
  if (card.classList.contains("flipped")) return;
  card.classList.add("flipped");

  if (!BoxOpened) {
    BoxOpened = card;
    ImgOpened = card.dataset.image;
  } else {
    Counter++;
    counterEl.textContent = Counter;

    if (ImgOpened === card.dataset.image) {
      // Match
      BoxOpened = null;
      ImgOpened = "";
      ImgFound++;
      if (ImgFound === ImgSource.length) {
        setTimeout(() => alert(`You found all images in ${Counter} moves!`), 500);
      }
    } else {
      // Not a match
      const prev = BoxOpened;
      BoxOpened = null;
      ImgOpened = "";
      setTimeout(() => {
        prev.classList.remove("flipped");
        card.classList.remove("flipped");
      }, 700);
    }
  }
}

resetBtn.addEventListener("click", createBoard);

// Init game
createBoard();

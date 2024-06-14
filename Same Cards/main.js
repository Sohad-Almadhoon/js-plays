document.querySelector(".control-buttons span").onclick = () => {
  let yourName = prompt("What's your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
    localStorage.setItem("name", yourName);
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let counter = 0;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

const shuffle = (array) => {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    current--;
    temp = array[current]; // 9
    random = Math.floor(Math.random() * current); // 2
    array[current] = array[random]; // 9 => 2  , 2 => 9
    array[random] = temp;
  }
};
shuffle(orderRange);
const stopClicking = () => {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
};

const checkMatchedBlocks = (firstBlock, secondBlock) => {
  let triesElement = document.querySelector(".tries span");
  localStorage.setItem("tries", triesElement.innerHTML);
  if (firstBlock.dataset.dog === secondBlock.dataset.dog) {
    counter++;
    if (counter == 5 && triesElement.innerHTML < 3) {
      document.querySelector(".success").classList.add("winner");
      document
        .querySelector(".winner span")
        .addEventListener("click", function () {
          document.querySelector(".success").remove();
          location.reload();
        });
    }
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    if (triesElement.innerHTML == 3) {
      document.querySelector(".fail").classList.add("loser");
      document
        .querySelector(".loser span")
        .addEventListener("click", function () {
          document.querySelector(".fail").remove();
          location.reload();
        });
    }
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
};
const flipBlock = (selectedBlock) => {
  selectedBlock.classList.add("is-flipped");
  const allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
};
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

const createTimer = () => {
  const countDown = new Date("Dec 31 , 2024 23:59:59").getTime();
  const now = new Date().getTime();
  const dateDiff = countDown - now;
  const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  


};
createTimer();
// how to add mutiple playes using localstorge ??
// create timer ?? for 30 minutes

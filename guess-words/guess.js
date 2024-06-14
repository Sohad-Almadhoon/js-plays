let gameName = "Guess The World";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Made with ❤️`;

// Setting game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
//Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
let message = document.querySelector(".message");
wordToGuess = words[Math.floor(Math.random() * words.length)];
//Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);

const generateInputs = () => {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-input");
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.maxLength = "1";
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-input input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (e) {
      const currentIndex = Array.from(inputs).indexOf(this);
      if (e.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      if (e.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
    });
  });
};
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);
console.log(wordToGuess);
function handleGuess() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1].toLowerCase();
    //Game Logic
    if (letter == actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    message.innerHTML = `You win 🎉 The word is <span>${wordToGuess}</span>`;
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    const inputs = document.querySelectorAll(`.try-${currentTry} input`);
    inputs.forEach((input) => (input.disabled = true));
    currentTry++;
    
    const nextInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextInputs.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
          document
            .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      hintBtn.disabled = true;
      message.innerHTML = "<p>You lost the game ❌</p>";
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    hintBtn.disabled = true;
  }
  const enabledInputs = document.querySelectorAll(".inputs > div:not(.disabled-input) input");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === "");
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex]; 
    const fillIndex = Array.from(enabledInputs).indexOf(randomInput);
    if (fillIndex !== -1) {
      randomInput.value = wordToGuess[fillIndex].toUpperCase();
    }
  }
}
function handleBackSpace(e) {
  if (e.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      prevInput.value = "";
      currentInput.value = "";
      prevInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackSpace);
window.onload = () => generateInputs();

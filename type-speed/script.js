const typingText = document.querySelector(".typing-text p"),
  inputField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b");
(mistakeTag = document.querySelector(".mistake span")),
  (wpmTag = document.querySelector(".wpm span")),
  (cpmTag = document.querySelector(".cpm span")),
  (tryAgainBtn = document.querySelector(".content button"));
console.log(wpmTag, cpmTag);
let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (isTyping = mistakes = 0);
//?? explain typing and the timer
const randomPargraph = () => {
  const randomIndex = Math.floor(paragraphs.length * Math.random());
  typingText.innerHTML = "";
  paragraphs[randomIndex].split("").forEach((span) => {
    const spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  document.addEventListener("click", () => inputField.focus());
};
randomPargraph();
const initTyping = () => {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else { 
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((char) => char.classList.remove("active"));
    characters[charIndex].classList.add("active");
    // just an equation
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    console.log(wpm);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerHTML = charIndex - mistakes;
    wpmTag.innerHTML = wpm;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
};
const initTimer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = timeLeft;
  } else {
    clearInterval(timer);
  }
};
const resetGame = () => {
  randomPargraph();
  (timeLeft = maxTime), (charIndex = isTyping = mistakes = 0);
  timeTag.innerHTML = timeLeft;
  mistakeTag.innerHTML = mistakes;
  wpmTag.innerHTML = 0;
  cpmTag.innerHTML = 0;
};
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

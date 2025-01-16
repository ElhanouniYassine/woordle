const WORD_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const VALIDAT_WORD_URL = "https://words.dev-apis.com/validate-word";
const spiral = document.querySelector(".spiral");
let NUMBER_ROUNDS = 6;
let currentIndex = 0;
let global = document.querySelectorAll(".scoreboard-letter");
let indexJump = 0; // hadi drnaha bach nb9aw n9zo l next rows
let guessedWord = "";
let count = 0;
let wordToGet = "";
spiral.style.visibility = "hidden";

async function start() {
  function winner(value) {
    if (value === wordToGet) {
      alert("winner");
      return true;
    }
  }

  function loser() {
    alert("You Lose ! the word is: " + wordToGet);
  }

  function turnGreen(index) {
    global[index + indexJump].style.backgroundColor = "green";
  }

  function turnYellow(index) {
    global[index + indexJump].style.backgroundColor = "yellow";
  }

  function turnGrey(index) {
    global[index + indexJump].style.backgroundColor = "grey";
  }

  function handlePlayer(value) {

    const letterCounts = {};
    for (let char of wordToGet) {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }

    for (let index = 0; index < wordToGet.length; index++) {
      if (wordToGet[index] === value[index]) {
        turnGreen(index);
        letterCounts[value[index]]--;
      }
    }

    for (let index = 0; index < wordToGet.length; index++) {
      if (wordToGet[index] !== value[index] && letterCounts[value[index]] > 0) {
        turnYellow(index);
        letterCounts[value[index]]--;
      }
    }
    for (let index = 0; index < wordToGet.length; index++) {
      if (!wordToGet.includes(value[index])) {
        turnGrey(index);
      }
    }
  }

  async function validateWord(word) {
    const res = await fetch(VALIDAT_WORD_URL, {
      method: "POST",
      body: JSON.stringify({ word: word }),
    });
    const resObj = await res.json();
    return resObj.validWord;
  }
  document.addEventListener("keydown", async (event) => {
    spiral.style.visibility = "hidden";
    if (
      isLetter(event.key) ||
      event.key == "Backspace" ||
      event.key == "Enter"
    ) {
      let numberToDelete = 0;
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        if (currentIndex < global.length) {
          if (count < 5) {
            guessedWord += event.key;
            global[currentIndex].textContent = event.key;
            currentIndex++;
            count++;
          }
        }
      }

      if (count == 5) {
        if (event.key == "Enter") {
          const isValid = await validateWord(guessedWord);
          if (!isValid) {
            alert("Invalid word! Please try again.");
            return;
          }

          console.log(NUMBER_ROUNDS);
          NUMBER_ROUNDS--;
          if (winner(guessedWord.toUpperCase())) {
            return;
          }
          handlePlayer(guessedWord.toUpperCase());
          indexJump += 5;
          count = 0;
          guessedWord = "";
          spiral.style.visibility = "visible";
          if (NUMBER_ROUNDS == 0) {
            loser();
          }
        }
      }

      if (event.key == "Backspace") {
        numberToDelete++;
        global[currentIndex - 1].textContent = "";
        guessedWord = guessedWord.slice(0, guessedWord.length - numberToDelete);
        currentIndex--;
        count--;
      }
    }
  });
  //hadi drnaha bach njibo lklma
  const response = await fetch(WORD_URL);
  const data = await response.json();
  wordToGet = data.word.toUpperCase();
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

start();

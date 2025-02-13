console.log("script.js is initializing...");

// --------------------------------------------- HTML vars ----------------------------------------------------------
let container = document.querySelector(".containeri");
const parent = container.parentNode; //stores the parent node

let word = document.querySelector(".word");
let keyboard = document.querySelector(".keyboard");
let lives = document.querySelector(".lives");
let displayMsg = document.querySelector(".displayMsg"); //The in-game popup
let parentPop = displayMsg.parentNode;
let scoreCls = document.querySelector(".score");
const parentDisp = scoreCls.parentNode;
let keys = document.querySelector(".keys");
let parentKey = keys.parentNode;

let btns = document.querySelector(".btns");
let contBtn = document.querySelector(".cont-btn");
let endBtn = document.querySelector(".end-btn");
let startBtn = document.querySelector(".start-btn");
let restartBtn = document.createElement("button");
let parentBtn = contBtn.parentNode;

let popMainCont = document.querySelector(".pop-main-cont");
let popCont = document.querySelector(".pop-container");
const popParent = popMainCont.parentNode;
let popMsg = document.querySelector(".pop-msg"); //The start-end popup msg

const icon = '<i class="fa-solid fa-heart m-2" style="color: #5d5484;"></i>'; //The icon

// -------- Adding the audios ------------
let keyAud = document.querySelector(".key-press-aud");
let startRestAud = document.querySelector(".start-restart-aud");
let endAud = document.querySelector(".end-aud");
let contAud = document.querySelector(".cont-aud");

// ------------------------------- The Word --------------------------------------------

let wordsArr = [
  "apple",
  "chair",
  "happy",
  "river",
  "balloon",
  "journey",
  "paper",
  "light",
  "cake",
  "syrup",
  "coca",
]; //11

// ---------- The declarations -------------

let randNumWord; // generates a randum number between 0-11
let randWord; //stores the random Word as a string
let doneIndexArr = []; //stores the indices done for rand Words
let randWordArr; //stores the random Word as an array of letters
let dashedRandWordArr; //same as above but will get dashed in the coming function

let slashedIndices; //The random number that will act as the index where letters will be slashed
let doneSlashedIndices = []; //All the generated slashed indexes are stored here

let userInLetter; //The letter user has input
let userLettersArr = []; //All the letters user entered in an Array form
let indexOfRandomNum;

// ---------- HTML declarations --------------

let keyPressed; //the key user has pressed

let life = [];
let minusHeart = [];

let score = 0;
let rounds = 5; //wordsArr.length; //the amount of rounds user gets - could be a number or wordsArr.lentgh
let r = 0; //amount of times the game will run

// ------------------------------- The funcitonality --------------------------------------------

// ---------- Picking a random Word -------------

function PickRandomWord() {
  do {
    randNumWord = Math.floor(0 + Math.random() * 11);
  } while (doneIndexArr.includes(randNumWord));

  randWord = wordsArr[randNumWord]; //Picks one random Word with the index of randNumWord value

  randWordArr = randWord.split("");
  dashedRandWordArr = randWord.split("");

  // LIFE
  let hearts = randWord.length - 2;

  life = Array(hearts).fill(icon);
  lives.innerHTML = life.join("");

  doneIndexArr.push(randNumWord);

  word.innerHTML = `The randomly generated Word is: ${randWordArr.join("")}`; //Displaying the Word
}

// ---------- Replacing letters with dashes -------------

function ReplaceWithUnderScore() {
  PickRandomWord();
  let i = 0;
  do {
    slashedIndices = Math.floor(0 + Math.random() * randWordArr.length);
    if (doneSlashedIndices.includes(slashedIndices)) {
      slashedIndices = Math.floor(0 + Math.random() * randWordArr.length);
    } else {
      dashedRandWordArr[slashedIndices] = "_";
      doneSlashedIndices.push(slashedIndices);
      i++;
    }
  } while (i < randWord.length - 2); //generates a random num word length -2 times and replaces it with "_"

  word.innerHTML = ` ${dashedRandWordArr.join(" ")}`; //Displaying the dashed Word
}

// ---------- Taking the input from user -------------

// ------- The keys
// Define the handleKeyPress and handleClick functions outside of KeyPress

function handleKeyPress(event) {
  document.removeEventListener("keydown", handleKeyPress); // Remove the event listener after key presss
  // resolve(event.key); // Resolve the promise with the pressed key
  keyPressed = event.key; //The pressed key
  // Adding the sound
  keyAud.play();
  // Styling the keys
  const keyDiv = document.querySelector(`.${keyPressed}`);
  if (keyDiv) {
    keyDiv.classList.remove("bg-LighterGreen");
    keyDiv.classList.remove("shadow-md");
    keyDiv.classList.add("bg-GrayishBlue"); // Add the active class
    keyDiv.classList.remove("cursor-pointer");
    keyDiv.classList.add("shadow-none");
  }
  resolveKeyPress(keyPressed);
}

function handleClick(event) {
  const keyDiv = event.target;
  if (keyDiv.classList.contains("keys")) {
    // Adding the sound
    keyAud.play();
    // Ensure only key divs are targeted
    keyDiv.classList.remove("bg-LighterGreen");
    keyDiv.classList.add("bg-GrayishBlue");
    keyDiv.classList.remove("shadow-md");
    keyDiv.classList.add("shadow-none");
    keyDiv.classList.remove("cursor-pointer");
    keyPressed = keyDiv.textContent.trim().toLowerCase();
    resolveKeyPress(keyPressed); // Use the text content as the "key"
  }
}

let resolveKeyPress; // Declare resolveKeyPress outside of KeyPress

// Function to handle key press and return a promise
function KeyPress() {
  return new Promise((resolve) => {
    resolveKeyPress = resolve; // Assign the resolve function to resolveKeyPress
    document.addEventListener("keydown", handleKeyPress); // Add the event listener for key press
    document.addEventListener("click", handleClick); // Add the event listener for click
  });
}

async function UserInput() {
  ReplaceWithUnderScore();

  let x = 0;
  do {
    userInLetter = await KeyPress();
    let matchFound = false;
    for (let i = 0; i < doneSlashedIndices.length; i++) {
      let index = doneSlashedIndices[i];
      if (randWordArr[index] === keyPressed) {
        dashedRandWordArr[index] = keyPressed;
        word.innerHTML = `${dashedRandWordArr.join(" ")} `;
        matchFound = true;
      }
    }
    if (!matchFound) {
      life.pop(); //remove a heart if wrong
      lives.innerHTML = life.join("");
    }
    userLettersArr.push(keyPressed);
    x++;
  } while (
    life.length != 0 &&
    randWordArr.join("") !== dashedRandWordArr.join("")
  ); //with AND operator the loop stops when at least one condition is false
  // } while (x < doneSlashedIndices.length);

  // Display - Whether hearts over or not over

  if (life.length == 0) {
    console.log(`itsokkee, better luck next timeee`);
    container.classList.remove("md:mt-10");
    container.classList.remove("mt-16");
    displayMsg.innerHTML = `You're out of hearts ): The word was:`;
    parentPop.appendChild(displayMsg);

    lives.innerHTML = `HEARTS OVER`;
  } else {
    container.classList.remove("md:mt-10");
    container.classList.remove("mt-16");
    displayMsg.innerHTML = `Wohooo! You guessed it:`;
    parentPop.appendChild(displayMsg);
    score++;
  }

  word.innerHTML = ` ${randWordArr.join("")}`;

  // }
}

// ---------------------- The lives and scores -------------------------

let z = 0;

function StartBtn() {
  // Adding the audio
  startRestAud.play();
  // Removing restart button and adding the contBtn and endBtn
  popMainCont.remove();

  // Score and lives append
  parentDisp.appendChild(scoreCls);
  parentDisp.appendChild(lives);

  // The container is back!
  parent.appendChild(container);

  // Score
  scoreCls.innerHTML = `${1}/${rounds}`;

  UserInput();
}

// remove event listener to the start button
startBtn.addEventListener("click", StartBtn);

function ContBtn() {
  console.log("continued");

  // Removing the "active" class
  let activeDivs = document.querySelectorAll(".bg-GrayishBlue");
  activeDivs.forEach((div) => {
    if (div.parentNode == parentKey) {
      div.classList.remove("bg-GrayishBlue");
      div.classList.add("shadow-md");
      div.classList.add("bg-LighterGreen");
      div.classList.remove("cursor-pointer");
      console.log("active removed");
    } else {
      console.log("not a key");
    }
  });

  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("click", handleClick);

  // Adding back margin
  container.classList.add("md:mt-10");
  container.classList.add("md:p-4");

  // display message
  displayMsg.innerHTML = ``;

  // Reset necessary variables
  doneSlashedIndices = [];
  userLettersArr = [];

  // Debugging logs
  console.log(`Current round: ${r}`);
  console.log(`Total rounds: ${rounds}`);

  // User Input
  UserInput();

  //  Removing the popup display
  displayMsg.remove();

  // Run the game round times - if r > rounds then game ends and endBtn() will run
  if (r >= rounds - 1) {
    contBtn.removeEventListener("click", ContBtn);
    console.log(`game over`);
    EndBtn();
  } else {
    // Adding audio
    contAud.play();
    r++;
  }

  // Score
  scoreCls.innerHTML = `${r + 1}/${rounds}`;
}

// Add event listener to the continue button
if (contBtn) {
  contBtn.addEventListener("click", ContBtn);
}

function EndBtn() {
  // Adding the sound
  endAud.play();

  // removing event listeners
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("click", handleClick);

  // The messages on popup after game
  if (r !== rounds - 1) {
    popMsg.innerHTML = `You left the game midway (': <br><div class="mt-4">hope to see you back soon!</div>  <br> Your Score: ${score}/${rounds}`;
  } else if (score <= rounds / 2) {
    popMsg.innerHTML = `It's ok let's do better next time 😊 <br> Your Score: ${score}/${rounds}`;
  } else if (score >= rounds / 2 && score !== rounds) {
    popMsg.innerHTML = `You did goooddd, let's do even better! 💗 <br> Your Score: ${score}/${rounds}`;
  } else if (score == rounds) {
    popMsg.innerHTML = `Lessgooo ! you aced it 🎊 <br> Your Score: ${score}/${rounds}`;
  }

  // Reset all necessary variables
  doneIndexArr = [];
  doneSlashedIndices = [];
  userLettersArr = [];
  life = [];
  randWordArr = [];
  dashedRandWordArr = [];
  score = 0;
  r = 0;

  // Clearing the display
  scoreCls.innerHTML = ``;
  word.innerHTML = ``;
  lives.innerHTML = ``;

  // Removing the keyboard and container
  parent.removeChild(container);

  // Removing start button and appending the container
  popParent.appendChild(popMainCont);
  startBtn.remove();

  // creating restart
  restartBtn.classList =
    "start-btn btn font-Nunito font-semibold bg-DeepPurple text-white m-2 rounded-full py-3 px-6 text-2xl mb-4 shadow-slate-500 shadow-lg hover:shadow-none active:shadow-none";
  restartBtn.innerHTML = `RESTART`;
  popCont.appendChild(restartBtn);
}

// remove event listener to the continue button
endBtn.addEventListener("click", EndBtn);

function RestartBtn() {
  // Adding audio
  startRestAud.play();

  // Removing restart button and adding the contBtn and endBtn
  restartBtn.remove();
  popMainCont.remove();

  // Score and lives append
  parentDisp.appendChild(scoreCls);
  parentDisp.appendChild(lives);

  if (contBtn) {
    contBtn.addEventListener("click", ContBtn);
  }

  // The container is back!
  parent.appendChild(container);

  // Removing the popup leftover
  displayMsg.remove();

  // Removing the "active" class
  let activeDivs = document.querySelectorAll(".bg-GrayishBlue");
  activeDivs.forEach((div) => {
    if (div.parentNode == parentKey) {
      div.classList.remove("bg-GrayishBlue");
      div.classList.add("bg-LighterGreen");
      div.classList.add("shadow-md");
      div.classList.remove("cursor-pointer");
    } else {
      console.log("not a key");
    }
  });

  //changing the display of in-game popup
  displayMsg.innerHTML = ``;

  // Reset all necessary variables
  doneIndexArr = [];
  doneSlashedIndices = [];
  userLettersArr = [];
  life = [];
  randWordArr = [];
  dashedRandWordArr = [];
  score = 0;

  // Adding the margin above word
  container.classList.add("md:mt-10");
  container.classList.add("mt-16");

  //starts
  // scoreCls.innerHTML = `${score}/${rounds}`
  scoreCls.innerHTML = `${1}/${rounds}`;
  UserInput();

  console.log("Restarting...");
}

// remove event listener to the Resart button
restartBtn.addEventListener("click", RestartBtn);

// The popup at the beginning
function StartPopUp() {
  // Removing the in-game popup
  parentPop.removeChild(displayMsg);
  // Removing the pre and post game popup
  parent.removeChild(container);
  popMsg.innerHTML = `Guess the word to score! <br> <i class="md:m-2 m-2"> ~Goodluck <3 <i>`;
}

// ----------------------- Calling the function ----------------------
StartPopUp();

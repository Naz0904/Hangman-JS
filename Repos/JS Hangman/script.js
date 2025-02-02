console.log("script.js is initializing...");

// --------------------------------------------- HTML vars ----------------------------------------------------------
let container = document.querySelector(".container")
const parent = container.parentNode; //stores the parent node

let newDiv = document.createElement("div");
let word = document.querySelector(".word");
let keyboard = document.querySelector(".keyboard");
let lives = document.querySelector(".lives");
let displayMsg = document.querySelector(".displayMsg");
let scoreCls = document.querySelector(".score");
const parentDisp = scoreCls.parentNode;
let keys = document.querySelector(".keys");

let btns = document.querySelector(".btns")
console.log(btns)
// let contBtn = document.querySelector(".cont-btn")
// let endBtn = document.querySelector(".end-btn")
let contBtn = document.createElement("button")
let endBtn = document.createElement("button")
let restartBtn = document.createElement("button")


let popCont = document.querySelector(".pop-container")
// let activeDivs = document.querySelectorAll(".active");

// -------- Creating The buttons ------------


// Creating the buttons
function CreateCont(){
  contBtn.classList = "cont-btn btn" 
  contBtn.innerHTML = `Start`
  btns.appendChild(contBtn)
}

function CreateEnd(){
  endBtn.classList = "end-btn btn" 
  endBtn.innerHTML = `End`
  btns.appendChild(endBtn)
}

// ------------------------------- The Word --------------------------------------------

let wordsArr = [
  "basketball",
  "sky",
  "flower",
  "hairstyle",
  "speaker",
  "glasses",
  "daisy",
  "phone",
  "condements",
  "syrup",
  "coca",
]; //11

// ------------------------------- The funcitonality --------------------------------------------

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
let rounds = wordsArr.length; //the amount of rounds user gets - could be a number or wordsArr.lentgh
let r = 0; //amount of times the game will run

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
  life = Array(hearts).fill("💗"); //created an array and fills with 💗
  lives.innerHTML = life.join(""); //gives you the hearts repeating the time of lives

  doneIndexArr.push(randNumWord);

  word.innerHTML = `The randomly generated Word is: ${randWordArr.join(
    ""
  )}`; //Displaying the Word
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
  // Styling the keys
  const keyDiv = document.querySelector(`.${keyPressed}`);
  console.log(keyDiv);
  if (keyDiv) {
    keyDiv.classList.add("active"); // Add the active class
  }
  resolveKeyPress(keyPressed);
}


function handleClick(event) {
  const keyDiv = event.target;
  if (keyDiv.classList.contains("keys")) {
    // Ensure only key divs are targeted
    keyDiv.classList.add("active");
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
    // userInLetter = prompt("Enter a letter:");
    for (let i = 0; i < doneSlashedIndices.length; i++) {
        let index = doneSlashedIndices[i];
        if (randWordArr[index] === keyPressed) {
          dashedRandWordArr[index] = keyPressed;
          // console.log(`the index you figured is ${index}`);
          word.innerHTML = `${dashedRandWordArr.join(" ")} `;
          matchFound = true;
      }
    }
    if (!matchFound) {
        life.pop(); //remove a heart if wrong
        lives.innerHTML = life.join("");
        console.log(life.length!=0)
    }
    userLettersArr.push(keyPressed);
    x++;
  } while (life.length!=0 && randWordArr.join("") !== dashedRandWordArr.join("")); //with AND operator the loop stops when at least one condition is false
  // } while (x < doneSlashedIndices.length);

  // If hearts over or not - display

  if (life.length==0){
    console.log(`itsokkee, better luck next timeee`)
    displayMsg.innerHTML = `You're out of hearts ): The word was:`
  }
  else {
    displayMsg.innerHTML = `Wohooo! You guessed it:`
    score++;
  }

  console.log(score)
  scoreCls.innerHTML = `${score}/${rounds}`
  word.innerHTML = ` ${randWordArr.join("")}`;

  // }
}

//reruning the game after one game

// function Buttons(){
//   keys.remove()
//   newDiv.classWord("Continue")
// }


// ------------------------------- Playing with the HTML --------------------------------------------

// ---------------------- The lives and scores -------------------------
// contBtn.addEventListener("click",ContExit)

let z = 0;

function ContBtn(){
  // score and lives back 
  parentDisp.appendChild(scoreCls)
  parentDisp.appendChild(lives)


  contBtn.innerHTML = `Continue`
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("click", handleClick);

  // Removing the "active" class
  let activeDivs = document.querySelectorAll(".active");
  activeDivs.forEach(div => {
    div.classList.remove("active");
    console.log("active removed")
  });

  // display message
  displayMsg.innerHTML = ``

  // Score
  scoreCls.innerHTML = `${score}/${rounds}`

  // Reset necessary variables
  doneSlashedIndices = [];
  userLettersArr = [];  
  
  // Run the game round times - if r > rounds then game ends and endBtn() will run
  if (r>=rounds){
    EndBtn()
    console.log(`game over`)
  }
  else{
    UserInput();
    r++
    console.log(`This is round ${r} of ${rounds} rounds`)
    console.log("continued")
  }

}


// Add event listener to the continue button
  if (contBtn) {
    contBtn.addEventListener("click", ContBtn);
}

function EndBtn(){
  // removing event listeners
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("click", handleClick);

    // Removing the "active" class
    let activeDivs = document.querySelectorAll(".active");
    activeDivs.forEach(div => {
      div.classList.remove("active");
      console.log("active removed")
    });

  newDiv.classList = "pop-up"

  if (r !== rounds){
    newDiv.innerHTML = `You left the game midway (': hope to see you back soon! You scored ${score}/${rounds}`
  }
  else if (score<=rounds/2){
    newDiv.innerHTML = `You scored ${score}/${rounds} points, it's ok let's do better next time 😊`
  }
  else if (score >= rounds/2 && score !== rounds){
    newDiv.innerHTML = `You scored ${score}/${rounds} points, You did goooddd, let's do even better! 💗`
  }
  else if (score == rounds) {
    newDiv.innerHTML = `You scored ${score}/${rounds} points, lessgooo ! you aced it 🎊`
  }
  popCont.appendChild(newDiv)

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
    scoreCls.innerHTML = ``
    word.innerHTML = ``
    lives.innerHTML = ``


  // Removing the keyboard and container
  parent.removeChild(container);

  // Removing cont
  contBtn.remove()
  
  // creating restart
  restartBtn.classList = "restart-btn btn" 
  restartBtn.innerHTML = `Restart`
  // btns.appendChild(restartBtn)
  // endBtn.parentNode.insertBefore(restartBtn, endBtn); //appends before the end button
  popCont.appendChild(restartBtn)

  // Removing the End button
  endBtn.remove()
}


// remove event listener to the continue button
endBtn.addEventListener("click", EndBtn)

function RestartBtn(){
  // Removing restart button and adding the contBtn and endBtn
  restartBtn.remove()
  newDiv.remove()
  CreateCont()
  CreateEnd()

  // Score and lives append
  parentDisp.appendChild(scoreCls)
  parentDisp.appendChild(lives)

  
  // The container is back!
  parent.appendChild(container);

  // Reset all necessary variables
  doneIndexArr = [];
  doneSlashedIndices = [];
  userLettersArr = [];
  life = [];
  randWordArr = [];
  dashedRandWordArr = [];
  score = 0;

  //starts 
  contBtn.innerHTML = `Continue`
  scoreCls.innerHTML = `${score}/${rounds}`
  UserInput()

  console.log("Restarting...")
}

// remove event listener to the Resart button
restartBtn.addEventListener("click", RestartBtn)

// 

// ----------------------------------------- Calling the functions ----------------------------------------------
CreateCont()
CreateEnd()
// Removing scores and lives at the beginning
parentDisp.removeChild(scoreCls)
parentDisp.removeChild(lives)

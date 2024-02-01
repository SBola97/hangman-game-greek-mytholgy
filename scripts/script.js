const tecladoDiv = document.querySelector(".teclado");
const wordDisplayer = document.querySelector(".word-displayer");
const marcador = document.querySelector(".marcador b");
const hangmanImg = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

let currentWord, correctas, wrongCount;
const chances = 6;

const resetGame = () => {
  correctas = [];
  wrongCount = 0;
  hangmanImg.src = `imgs/hangman-${wrongCount}.svg`;
  tecladoDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  marcador.innerText = `${wrongCount} de ${chances}`;
  wordDisplayer.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  gameModal.classList.remove("show");
};

//Obtención de la palabra y pista aleatorias
const getRdmWord = () => {
  const [palabra, pista] = words[Math.floor(Math.random() * words.length)];
  //console.log(palabra, pista);
  currentWord = palabra;
  currentWord = currentWord.toLowerCase();
  document.querySelector(".pista b").innerText = pista;
  resetGame();
}

const gameOver = (isWinner) => {
  setTimeout(() => {
    const modalText = "La palabra correcta era:";
    gameModal.querySelector("img").src = `imgs/${isWinner ? 'win' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isWinner ? '¡Ganaste!' : 'Game Over'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
    gameModal.classList.add("show");
  }, 100);
}

const initGame = (button, clickedLetter) => {

  //console.log(button, clickedLetter);

  //Verificando si la palabra actual contiene la letra seleccionada
  if (currentWord.includes(clickedLetter)) {

    //console.log(clickedLetter, "Acertaste");

    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctas.push(letter);
        wordDisplayer.querySelectorAll("li")[index].innerText = letter;
        wordDisplayer.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  }
  else {
    //Si falla la letra, actualiza el contador y la imagen del ahorcado
    wrongCount++;
    hangmanImg.src = `imgs/hangman-${wrongCount}.svg`;
    //console.log(clickedLetter, `Fallaste, te quedan ${chances - wrongCount} oportunidades`);
  }
  //Desactiva la letra seleccionada
  button.disabled = true;
  //Muestra el marcador con las vidas restantes
  marcador.innerText = `${wrongCount} de ${chances}`;
  //Comprueba los aciertos y fallos para finalizar el juego 
  if (wrongCount === chances)
    return gameOver(false);
  else if (correctas.length === currentWord.length)
    return gameOver(true);

}

//Creación de los botones para el teclado y añadiendo su event listener
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  tecladoDiv.appendChild(button);
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRdmWord();

playAgain.addEventListener("click",getRdmWord);
document.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    const btn = document.querySelector("#button", "#nome");
    btn.click();
  }

})

//Lógica de salvar o nome
const name = document.getElementById("nome");
const nameContainer = document.getElementById("name-container");
const pontos = document.getElementById("pontos");
const getName = localStorage.getItem("name") || { name: "Mario" };
const getPontos = localStorage.getItem("pontos") || { pontos: 0 };
nameContainer.innerHTML = `<h1>${JSON.parse(getName).name}</h1>`;

function startGame() {
  console.log("entrou");
  const data = {
    name: name.value === "" ? "Mario" : name.value,
  };
  localStorage.setItem("name", JSON.stringify(data));
}

// início da lógica de funcionamento do jogo
let points = 0;
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const lose = document.querySelector(".lose");
const win = document.querySelector(".ganhou");

const jump = function () {
  mario.classList.add("jump");

  setTimeout(function () {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(function () {
  const pipePosition = pipe.offsetLeft;
  const cloudsPosition = clouds.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

// lógica de pontos
  if (pipePosition < 110 && pipePosition > 0 && marioPosition > 80) {
      console.log("a");
      points = points + 10;
      pontos.innerHTML = `Pontos: ${points}`;

      if (points === 100) {
        pipe.style.visibility = "hidden";
  
        mario.style.visibility = "hidden";
  
        clouds.style.visibility = "hidden";
  
        win.style.display = "block";
      }
  }

// lógica de perder
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    mario.src = "./Imagens/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    lose.style.display = "block";

    clearInterval(loop);
  }
}, 105);

document.addEventListener("keydown", jump);

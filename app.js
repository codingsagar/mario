window.addEventListener("DOMContentLoaded", () => {
  let upBtn = document.getElementById("up");
  let mario = document.getElementById("mario");
  let sound = document.getElementById("sound");
  let score = document.getElementById("score");
  let enemy = document.getElementById("enemy");
  let reloadBtn = document.getElementById("reload");
  let startGame = document.getElementById("start");
  let gameOverAudio = new Audio("./gameOver.mp3");

  let num = 0;

  upBtn.addEventListener("click",jumpfn);
  document.addEventListener("keyup",(e)=>{
    if (e.keyCode == 38) {
      jumpfn();
    }
  })
  startGame.addEventListener("click",()=>{
    setTimeout(() => {
      enemy.classList.add("enemy");
    }, 700);
  })

  reloadBtn.addEventListener("click",()=>{
    let url = location.href;
    document.location = url;
  })

  function jumpfn() {
    if (gameOver===0) {
      num++;
      score.innerHTML = "Score : " + num;
      sound.play();
      mario.src = "./jump.png";
      mario.classList.add("jump");
      setTimeout(() => {
        mario.src = "./simple.png";
      }, 790);
      mario.addEventListener("animationend", () => {
        mario.classList.remove("jump");
      });
      
    }
  }

  // collison detection
  let gameOver = 0;
  setInterval(() => {
    dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('bottom'));

    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('bottom'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    let a = 55;
    let b = 40;
    if (window.innerWidth<=600) {
        a = 40;
        b = 30;
      }
    if (offsetX < a && offsetY < b) {
      gameOver++;
        if (gameOver==1) {
          gameOverAudio.play();
        }
        mario.src = "./gameOver.png";
        let enawaleft = window.getComputedStyle(enemy, null).getPropertyValue('left');
        let mnawabottom = window.getComputedStyle(mario, null).getPropertyValue('bottom');

        enemy.classList.remove("enemy");
        mario.classList.remove("jump");
        enemy.style.left = enawaleft;
        mario.style.bottom = mnawabottom;
        mario.classList.add("gameOver");
        upBtn.disabled = true;

    }
    else{
      let olddur = window.getComputedStyle(enemy).getPropertyValue("animation-duration");
      let newdur = olddur - 0.05;
      enemy.style.animationDuration = newdur;

    }

}, 10);

});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "./images/background.jpg";
const BG = {
  //two background images will be placed side-by-side. As one scrolls past the left edge of the screen, it is moved to the right of the next image, so they alternate
  x1: 0, //x position for the first image
  x2: canvas.width, //x position for the second image
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  //gamespeed added to remove gap between screens
  //if x coordinate of first background has moved past the left edge of the screen by a whole screen width (-BG width), it gets moved to the right edge
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  //gamespeed added to remove gap between screens
  else BG.x2 -= gamespeed;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas between each frame of animation
  //ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = '90px Georgia';
  if (score < 100) {
    ctx.strokeText(score, 700, 70);
    ctx.fillText(score, 700, 70);
  } else if (score >= 100) {
    ctx.strokeText(score, 650, 70);
    ctx.fillText(score, 650, 70);
  }
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate); //recursive animation loop
  angle += 0.12;
  hue++;
  frame++;
}
animate(); //having declared animate function, it needs to be called here

document.onload = function () {
  canvas.focus();
};

document.addEventListener("keydown", function (e) {
  if (e.charCode === ' ' || e.key === ' ' || e.char === ' ' || e.code === 'Space') spacePressed = true;
});

document.addEventListener("keyup", function (e) {
  if (e.charCode === ' ' || e.key === ' ' || e.char === ' ' || e.code === 'Space') spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "./images/bang.png";
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width + 50 > obstaclesArray[i].x &&
      ((bird.y - 45 < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y + 40 > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      //collision detected
      ctx.drawImage(bang, bird.x - 250, bird.y - 200, 600, 600);
      endGame();
      return true;
    }
  }
}

function endGame() {
  let quizResult = 0;
  switch (true) {
    case score >= 30:
      quizResult = 3;
      break;
    case score >= 25:
      quizResult = 2.5;
      break;
    case score >= 20:
      quizResult = 2;
      break;
    case score >= 15:
      quizResult = 1.5;
      break;
    case score >= 10:
      quizResult = 1;
      break;
    case score >= 5:
      quizResult = 0.5;
      break;
    case score >= 0:
      quizResult = 0;
  }

  ctx.font = "75px Georgia";
  ctx.fillStyle = "blue";
  ctx.fillText("Congratulations!!!", 50, canvas.height / 2);
  ctx.fillText("Your quiz score is " + quizResult, 50, canvas.height / 2 + 60);
}

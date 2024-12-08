const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3.3;
    this.bottom = (Math.random() * canvas.height) / 3.3;
    this.x = canvas.width * 2;
    this.width = 30;
    this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
    this.counted = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= gamespeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
      if (score % 5 === 0) {
        gamespeed++;
      }
    }
    this.draw();
  }
}

function handleObstacles() {
  if (frame % 75 === 0) {
    //this executes the if statement every 50 frames
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}

const markSprite = new Image();
markSprite.src = "./images/spritesheet.png";

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.originalWidth = 502; //crucial - divide total width by number of sprites in the row
    this.originalHeight = 604;
    this.width = this.originalWidth / 20;
    this.height = this.originalHeight / 20;
    this.weight = 1;
    this.frameX = 0;
  }
  update() {
    let curve = Math.sin(angle) * 20; //curve is used to apply undulating motion to the bird
    if (this.y > canvas.height - this.height * 3 + curve) {
      //stop the bird falling to within 3 times its height from the bottom
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      //make the bird fall due to gravity
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0; //makes the bird start to fall as soon as spacebar is released (no delay)
    }
    if (spacePressed && this.y > this.height * 3) this.flap(); //produces undulating bird motion at top of screen
  }
  draw() {
    ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, this.width * 4, this.height * 2);
    ctx.drawImage(
      markSprite,
      this.frameX * this.originalWidth, //frameX selects each sprite in turn from the spritesheet
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 75,
      this.y - 110,
      this.width * 7,
      this.height * 7
    ); //to animate the spritesheet the most detailed version of drawImage is used.  Parameters 1-4 refer to the spritesheet, parameters 5-8 refer to size and placement of the image on the canvas
  }
  flap() {
    this.vy -= 2;
    if (this.frameX >= 3) this.frameX = 0;
    else if (frame % 3 === 0) this.frameX++; //only increase frameX on every third frame
  }
}
const bird = new Bird(); //instance of the Bird class

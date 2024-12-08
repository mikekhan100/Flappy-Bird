const particlesArray = [];

class Particle {
  constructor() {
    this.x = bird.x; //the particles are generated from where the bird is
    this.y = bird.y;
    this.size = Math.random() * 7 + 3; //particle size is random
    this.speedY = Math.random() * 1 - 0.5; //particles to move randomly in vertical plane
    this.color = "hsla(" + hue + ", 100%, 50%, 0.8)";
  }
  update() {
    //calculates position of each particle for each frame of the animation
    this.x -= gamespeed; //makes particles scroll to the left
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //each particle is a small circle
    ctx.fill();
  }
}

function handleParticles() {
  particlesArray.unshift(new Particle()); //creates a new particle based on the constructor
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(); //calculates current x,y position
    particlesArray[i].draw(); //draws a circle at the generated coordinates
  }
  //if more than 200, remove 20 - stops performance issues with excessive particles
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}

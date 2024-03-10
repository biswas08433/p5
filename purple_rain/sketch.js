let rain = []
const NUMBER_OF_RAINDROPS = 500;

function setup() {
  createCanvas(1280, 720);
  for (let i = 0; i < NUMBER_OF_RAINDROPS; i++) {
    rain.push(new RainDrop());
  }
}

function draw() {
  background(230, 230, 250);
  rain.forEach(e => {
    e.fall_and_show();
  });
}

class RainDrop {
  constructor() {
    this.x = random(0, width);
    this.y = random(-10, height);
    this.speed = random(4, 10);
  }
  fall_and_show() {
    this.speed += 0.05;
    this.y += this.speed;

    if (this.y > height) {
      this.x = random(0, width);
      this.y = random(-10, 0);
      this.speed = random(4, 10);
    }
    stroke(138, 43, 226);
    strokeWeight(3);
    line(this.x, this.y, this.x, this.y + this.speed);
    circle(this.x, this.y + this.speed, 4);
  }
}

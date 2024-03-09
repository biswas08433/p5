class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
  }
  show() {
    this.z -= map(mouseX, 0, width, -10, 10);
    if (this.z < 1) {
      this.z = width
    }
    if (this.z > width) {
      this.z = 1
    }
    let sx = map(this.x / this.z, -1, 1, 0, width);
    let sy = map(this.y / this.z, -1, 1, 0, height);
    noStroke();
    fill(256);
    circle(sx, sy, map(this.z, width, 0, 0, 10));
  }
}

let stars = [];

function setup() {
  frameRate(60);
  createCanvas(1280, 720);
  for (let index = 0; index < 1000; index++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  stars.forEach(element => {
    element.show()
  });
}

// function setup() {
//   frameRate(60);
//   createCanvas(1280, 720);
// }

// function draw() {
//   background(256);
//   circle(250, 250, 10);
// }


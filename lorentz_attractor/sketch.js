let x
let y
let z
let s
let p
let b
let dt = 0.0

let particle_array = []
let axes

let hue = 0

class Particle {
  constructor(x_, y_, z_, c_) {
    this.x = x_
    this.y = y_
    this.z = z_
    this.c = c_
  }
}

class Axes {
  constructor() {
    this.d = 5
  }
  show() {
    stroke("#ff000066")
    line(-this.d, 0, 0, this.d, 0, 0);
    stroke("#00ff0066")
    line(0, -this.d, 0, 0, this.d, 0);
    stroke("#0000ff66")
    line(0, 0, -this.d, 0, 0, this.d);
  }
}
function setup() {
  createCanvas(1280, 720, WEBGL)
  colorMode(HSB)
  blendMode(ADD)
  camera(0, 0, 50 * sqrt(3), 0, 0, 0, 0, 1, 0);
  perspective(PI / 6, 1, sqrt(3), 4000 * sqrt(3));
  smooth()
  axes = new Axes()

  x = random(0.1, 2)
  y = random(0.1, 2)
  z = random(0.1, 2)
  s = 10
  p = 28
  b = 8.0 / 3.0

  let mainElement = $("main")
  var canvasElement = $("canvas")
  mainElement.append(canvasElement)
}

function draw() {
  background(color(10))
  axes.show()
  dt = (1.0 / 60)
  orbitControl()
  if (particle_array.length > 5000) {
    particle_array.shift()
  }

  let dx = (s * (y - x)) * dt
  let dy = (x * (p - z) - y) * dt
  let dz = (x * y - b * z) * dt

  x += dx
  y += dy
  z += dz


  strokeWeight(4)


  hue += .1
  if (hue > 255) {
    hue = 0
  }
  particle_array.push(new Particle(x, y, z, color(hue, 255, 128, 10)))

  noFill()
  beginShape()
  for (let i = 0; i < particle_array.length; i++) {
    stroke(particle_array[i].c)
    vertex(particle_array[i].x, particle_array[i].y, particle_array[i].z)
  }
  endShape()
  // console.log(frameRate())
}
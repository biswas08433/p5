let invaders
let protector

let player_bullets = []
let enemy_bullets = []

let player_bullets_to_delete = []
let enemy_bullets_to_delete = []

let ENEMY_ROW = 4
let ENEMY_COL = 10

function setup() {
  createCanvas(512, 512)
  input = new Input()
  // frameRate(1)

  protector = new Protector()
  invaders = new Invaders(ENEMY_ROW, ENEMY_COL)
}

function draw() {
  background("#10141F")

  player_bullets.forEach(e => {
    e.move_and_show()
  })
  enemy_bullets.forEach(e => {
    e.move_and_show()
  })
  let input_direction = input.keys[RIGHT] - input.keys[LEFT]
  protector.move(input_direction)
  protector.show()
  invaders.move_and_show()

  manage_game()
}

function manage_game() {

  // Clean up the scene
  player_bullets_to_delete.forEach(i => {
    player_bullets.splice(i, 1)
  });
  player_bullets_to_delete = []
  enemy_bullets_to_delete.forEach(i => {
    enemy_bullets.splice(i, 1)
  });
  enemy_bullets_to_delete = []

  // randomly shoot bullets at player


  // enemy-collision check
  for (let i = 0; i < player_bullets.length; i++) {
    if (player_bullets[i].y < 0) {
      player_bullets_to_delete.push(i)
      continue
    }
    for (let j = 0; j < invaders.arr.length; j++) {
      if (invaders.arr[j] === 0) {
        continue
      }

      let invader_pos = invaders.give_individual_position(j)

      if (player_bullets[i].x < invader_pos.x + invaders.size &&
        player_bullets[i].x + player_bullets[i].size > invader_pos.x &&
        player_bullets[i].y < invader_pos.y + invaders.size &&
        player_bullets[i].y + player_bullets[i].size > invader_pos.y) {
        // console.log(i, j, pos.x, pos.x, player_bullets[i], invaders)
        player_bullets_to_delete.push(i)
        invaders.arr[j] = 0
      }
    }
  }
}

function Invaders(row_, col_) {
  this.arr = []
  for (let i = 0; i < row_; i++) {
    for (let j = 0; j < col_; j++) {
      this.arr.push(1)
    }
  }
  this.row = row_
  this.col = col_
  this.size = 20
  this.hgap = 20
  this.vgap = 15
  this.x = 22
  this.y = 0
  this.stride = 22
  this.hdirection = 1

  this.give_individual_position = function (n) {
    let row = floor(n / this.col)
    let col = n % this.col
    return createVector(this.x + (col * (this.hgap + this.size)), this.y + (row * (this.vgap + this.size)));
  }

  this.move_and_show = function () {
    fill("#A53030")

    if (this.y > height) {
      alert("Game Over")
      noLoop()
    }
    let move = false
    let climb_down = false



    move = frameCount % 7 === 0
    if (move) {
      climb_down = this.x >= 132 || this.x <= 0
      if (climb_down) {
        this.y += this.stride
        this.hdirection *= -1
        climb_down = false
      }
      this.x += this.stride * this.hdirection
      move = false
    }
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (this.arr[i * this.col + j] == 0) {
          continue
        }
        pos = this.give_individual_position(i * this.col + j)
        square(pos.x, pos.y, this.size)
      }
    }
  }
  this.shoot = function (n) {
    let pos = this.give_individual_position(n)
    enemy_bullets.push(new Bullet(pos.x, pos.y, this.size, true))
  }
}

function Protector() {
  this.size = 16
  this.speed = 10

  this.x = width / 2
  this.y = height - this.size

  this.move = function (direction) {
    let window_margin = 10
    this.x += this.speed * direction
    if (this.x > width + window_margin) {
      this.x = -window_margin
    } else if (this.x < -window_margin) {
      this.x = width + window_margin
    }
  }

  this.show = function () {
    fill("#4F8FBA")
    square(this.x, this.y, this.size)
  }
  this.shoot = function () {
    player_bullets.push(new Bullet(this.x, this.y, this.size, false))
  }
}

function Bullet(x_, y_, protector_size, enemy) {
  this.x = x_
  this.y = y_

  if (enemy) {
    this.speed = 5
  } else {
    this.speed = -5
  }
  this.size = 10
  this.move_and_show = function () {
    this.y += this.speed
    if (enemy) {
      fill("#DA863E")
    } else {
      fill("#A4DDDB");
    }
    square(this.x + ((protector_size - this.size) / 2), this.y, this.size)
  }
}


// Input Handling
let input
const RIGHT = 0
const LEFT = 1
function Input() {
  this.keys = [0, 0] // RIGHT, LEFT
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      input.keys[RIGHT] = 1
      break
    case LEFT_ARROW:
      input.keys[LEFT] = 1
      break
    case UP_ARROW:
      protector.shoot()
      break
    default:
      break
  }
}

function keyReleased() {
  switch (keyCode) {
    case RIGHT_ARROW:
      input.keys[RIGHT] = 0
      break
    case LEFT_ARROW:
      input.keys[LEFT] = 0
      break
    default:
      break
  }
}


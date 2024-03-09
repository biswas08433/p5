let snake;
let food;
let inputs = [];

let grid_size = 16;

function setup() {
  createCanvas(512, 512);
  frameRate(10);
  fill(255);
  snake = new Snake();
  food = new Food();
}

function draw() {
  background(0);

  food.show();
  snake.update_and_show();
  manage_things();
}

// Queue the inputs
function keyPressed() {
  inputs.push(keyCode);
}

class Snake {
  constructor() {
    this.body = [[1, 0], [0, 0]];
    this.direction = [1, 0];
    this.grow = false;
  }
  update_and_show() {
    if (inputs.length != 0) {
      switch (inputs.shift()) {
        case UP_ARROW:
          if (this.direction[0] != 0 && this.direction[1] != 1) {
            this.direction = [0, -1]
          }
          break;

        case DOWN_ARROW:
          if (this.direction[0] != 0 && this.direction[1] != -1) {
            this.direction = [0, 1]
          }
          break;

        case LEFT_ARROW:
          if (this.direction[0] != 1 && this.direction[1] != 0) {
            this.direction = [-1, 0]
          }
          break;

        case RIGHT_ARROW:
          if (this.direction[0] != -1 && this.direction[1] != 0) {
            this.direction = [1, 0]
          }
          break;

        default:
          break;
      }
    }
    // Movement logic
    let new_pos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]];

    // Wrap-Around
    if (new_pos[0] >= width / grid_size) {
      new_pos[0] = 0;
    }
    if (new_pos[1] >= height / grid_size) {
      new_pos[1] = 0;
    }

    if (new_pos[0] < 0) {
      new_pos[0] = floor(width / grid_size) - 1;
    }
    if (new_pos[1] < 0) {
      new_pos[1] = floor(height / grid_size) - 1;
    }

    // Losing logic
    this.body.forEach(element => {
      if (new_pos[0] == element[0] && new_pos[1] == element[1]) {
        alert("Game Over");
        noLoop();
        return;
      }
    });

    // growing logic
    this.body.unshift(new_pos);
    if (!this.grow) {
      this.body.pop();
    } else {
      this.grow = false;
    }

    // Drawing logic
    this.body.forEach(coordinate => {
      fill(255);
      square(coordinate[0] * grid_size, coordinate[1] * grid_size, grid_size);
    });
  }
}

class Food {
  constructor() {
    this.position = [floor(random(0, width / grid_size)), floor(random(0, height / grid_size))];
  }
  show() {
    fill("#e63946");
    square(this.position[0] * grid_size, this.position[1] * grid_size, grid_size);
  }
}

function manage_things() {
  if (snake.body[0][0] == food.position[0] && snake.body[0][1] == food.position[1]) {
    snake.grow = true;
    food = new Food();
    while (food_inside_snake()) {
      food = new Food();
    }
  }
}

function food_inside_snake() {
  snake.body.forEach(element => {
    if (food.position[0] == element[0] && food.position[1] == element[1]) {
      return true
    }
  });
  return false;
}
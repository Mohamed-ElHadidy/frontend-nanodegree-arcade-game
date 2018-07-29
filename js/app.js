// Enemies our player must avoid
const Enemy = function (x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // console.log(this.speed);
    // to return the bugs to the left side
    if (this.x > 550) {
        this.x = -200;
        // to return the bugs back with different speed
        this.speed = randomSpeed();
    }
    // collision detection
    if (this.x < player.x + 80 &&
        this.x + 80 > player.x &&
        this.y < player.y + 80 &&
        this.y + 80 > player.y) {
        // to return the player to the starting position
        player.x = 200;
        player.y = 400;
        // decrease the lives by one
        livesDecrement();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gems 

const Gem = function (x, y, sprite) {

    this.x = x;
    this.y = y;
    this.sprite = random(sprites);

}

Gem.prototype.update = function () {

    if (this.x < player.x + 80 &&
        this.x + 80 > player.x &&
        this.y < player.y + 60 &&
        this.y + 60 > player.y) {

        //send the collected gem offscreen
        this.x = -500;
        // return it back in new x postion and random sprite
        setTimeout(() => this.x = random(posX), 3000);
        this.sprite = random(sprites);

        // add 25 points when the player collect a gem
        scoreIncrement(25);

    }

    Gem.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 84, 140);
    };

}

// To get random gems positons 

const posX = [7, 57, 107, 157, 207, 257, 307, 357, 407];

// To get random spriets

const sprites = [
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png'
];

const random = function getRandomElement(arr) {
    let randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x, y, sprite) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

    if (this.y == -25) {
        // return the player back to the starting point
        player.x = 200;
        player.y = 400;
        // add one more level
        levelIncrement(1);
    }

};

Player.prototype.handleInput = function (keyCode) {

    switch (keyCode) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'up':
            if (this.y > -25) {
                this.y -= 85;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;
    }
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const randomSpeed = () => Math.floor((Math.random() * 150) + 50);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(300, 140, randomSpeed());
const enemy2 = new Enemy(3, 225, randomSpeed());
const enemy3 = new Enemy(100, 60, randomSpeed());
const allEnemies = [enemy1, enemy2, enemy3];
const gem1 = new Gem(300, 77);
const gem2 = new Gem(3, 162);
const gem3 = new Gem(100, 242);
let allGems = [gem1, gem2, gem3];
const player = new Player(200, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/// Level & Score & lives ///

const score = document.querySelector('.score-num');
const level = document.querySelector('.level-num');
const lives = document.querySelector('.lives-num');

let levelCount = 0;
let scoCount = 0;
let livesCount = 3;

function scoreIncrement(x) {
    scoCount += x;
    score.innerHTML = `${scoCount}`;
}

function levelIncrement(x) {

    levelCount += x;
    level.innerHTML = `${levelCount}`;
    
    if (levelCount === 10) {
        alert(`Congrats you score is ${score.innerHTML}`);
        reset();
    }
}

function livesDecrement() {

    livesCount--;
    lives.innerHTML = ` x${livesCount}`;

    if (livesCount === 0) {
        alert('gameover')
        reset();
    }

}

function reset() {
    // reset lives
    livesCount = 3;
    lives.innerHTML = ` x${livesCount}`;
    // reset levels
    levelCount = 0;
    level.innerHTML = 0;
    // reset score
    scoCount = 0;
    score.innerHTML = 0;
}
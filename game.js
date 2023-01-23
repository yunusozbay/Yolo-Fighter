const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

myCanvas.style.border = "1px solid black"

//Background
const bgImg = new Image();
bgImg.src = "./images/full_background.png"
const bgImg2 = new Image();
bgImg2.src = "./images/full_background.png"
let bg1x = 0
let bg2x = myCanvas.width
let bgSpeed = 2

//Player aircraft
const playerImg = new Image();
playerImg.src = "./images/playeraircraft.png"
let playerWidth = 125
let playerHeight = 75
let playerX = playerWidth/5
let playerY = myCanvas.height/2 - playerHeight/2
let playerSpeed = 5
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;

//Enemy aircraft
const enemyImg = new Image()
enemyImg.src ="./images/enemy-aircraft.png"

let enemies = []

class Enemy {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
    }
    draw() {
        ctx.drawImage(enemyImg, this.xPos, this.yPos, this.width, this.height)
        this.xPos -= 2
    }
    checkCollision() {
        if (
          playerX < this.xPos + this.width &&
          playerX + playerWidth > this.xPos &&
          playerY < this.yPos + this.height &&
          playerHeight + playerY > this.yPos
        ) {
          gameOver = true
        }
    }
}



let animateId
let gameOver = false


const animate = () => {
    //Background
   /*  ctx.clearRect(0, 0, canvas.width, canvas.height) */
    ctx.drawImage(bgImg, bg1x, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(bgImg2, bg2x, 0, myCanvas.width, myCanvas.height);

    bg1x -= bgSpeed;
    bg2x -= bgSpeed;

      if(bg1x < -myCanvas.width) {
        bg1x = myCanvas.width
      }
      if(bg2x < -myCanvas.width) {
        bg2x = myCanvas.width
      } 
    //Player aircraft
    ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);
    if (isMovingLeft && playerX > 0) {
        playerX -= playerSpeed
      }
    if (isMovingRight && playerX < myCanvas.width - playerWidth) {
        playerX += playerSpeed
      }
    if (isMovingUp && playerY > 5) {
        playerY -= playerSpeed
    }
    if (isMovingDown && playerY < myCanvas.height - 170) {
        playerY += playerSpeed
    }

    //new Enemy(0, 0, 100, 100).draw() 
    //Enemy aircrafts
    if (animateId % 100 === 0) {
    enemies.push(new Enemy(myCanvas.width + 125, (myCanvas.height - 170) * Math.random(), 125, 75))}
  
    enemies.forEach(enemy => {
        enemy.draw()
        enemy.checkCollision()
      })
    enemies = enemies.filter(enemy => enemy.xPos > -150)

   

    if (gameOver) {
        cancelAnimationFrame(animateId)
      } else {
        animateId = requestAnimationFrame(animate)
    }
}


const startGame = () => {
    document.querySelector('.game-intro').style.display = 'none'
    animate()
  }


window.addEventListener('load', () => {
    document.getElementById('start-button').onclick = () => {
      startGame()   
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'a') {
            isMovingLeft = true
        }
        if (event.key === 'd') {
            isMovingRight = true
        }
        if (event.key === "w") {
            isMovingUp = true
        }
        if (event.key === "s") {
            isMovingDown = true
        }
      })
    document.addEventListener('keyup', () => {
        isMovingLeft = false
        isMovingRight = false
        isMovingUp = false
        isMovingDown = false
      })


});




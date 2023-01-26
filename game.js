const splashScreen = document.getElementById('splash-screen')
const gameplayScreen = document.getElementById("gameplay-screen");
const gameoverScreen = document.getElementById("gameover-screen");

gameplayScreen.style.display = "none"
gameoverScreen.style.display = "none"


const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");
myCanvas.style.border = "1px solid black"

//Audio
const mainTheme = new Audio("./audio/mainTheme.mp3");
mainTheme.volume = 0.3;
const explosionSound = new Audio("./audio/explosion.mp3");
explosionSound.volume = 0.2;
const mouseclickSiren = new Audio("./audio/mouseclickSiren.mp3");
mouseclickSiren.volume = 0.2;
const playerCannonSound = new Audio("./audio/cannon.mp3");
playerCannonSound.volume = 0.2;
const playerSound = new Audio("./audio/playerAirplane.mp3");
playerSound.volume = 0.1;
const siren800 = new Audio("./audio/sirenAfter800score.mp3");
siren800.volume = 0.3;

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
let isShooting = false;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//Enemy aircraft
const enemyImg = new Image()
enemyImg.src ="./images/enemy-aircraft.png"

let enemies = []
let enemySpeed = 3
let enemyProjectileSpeed = 5

class Enemy {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
    }
    draw() {
        ctx.drawImage(enemyImg, this.xPos, this.yPos, this.width, this.height)
        this.xPos -= enemySpeed
    }
    checkCollision() {
        if (
          playerX < this.xPos + this.width &&
          playerX + playerWidth > this.xPos &&
          playerY < this.yPos + this.height &&
          playerHeight + playerY > this.yPos
        ) {
          gameOver = true
          explosionSound.play()
        }
    }
/*     die() {
      enemyArr.indexOf(this).splice(indexOf(this), 1)
    } */
}
//Player projectile
const playerProjectileImg = new Image()
playerProjectileImg.src ="./images/torpedo.png"

let projectiles = []

class Projectile {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
    }
    draw() {
        ctx.drawImage(playerProjectileImg, this.xPos, this.yPos, this.width, this.height)
        this.xPos += 4
    }
    checkProjectileCollision(enemyArr) {
      for (let i =0; i <enemyArr.length; i++) {
      if (
        this.xPos < enemyArr[i].xPos + enemyArr[i].width &&
        this.xPos + this.width > enemyArr[i].xPos &&
        this.yPos < enemyArr[i].yPos + enemyArr[i].height &&
        this.height + this.yPos > enemyArr[i].yPos) {
          enemyArr.splice(i, 1);
          projectiles.splice(this, 1)
          score += 20
          explosionSound.play()
      }
    }
  }
}

// Enemy Projectiles
const enemyProjectileImg = new Image()
enemyProjectileImg.src = "./images/enemy-projectile.png"

let enemyProjectiles = []

class EnemyProjectile {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
  }
  draw() {
    ctx.drawImage(enemyProjectileImg, this.xPos, this.yPos, this.width, this.height)
    this.xPos -= enemyProjectileSpeed
  }
  checkEnemyProjectileCollision() {
    if (
      playerX < this.xPos + this.width &&
      playerX + playerWidth > this.xPos &&
      playerY < this.yPos + this.height &&
      playerHeight + playerY > this.yPos
    ) {
      gameOver = true
      explosionSound.play()
    }
}
}

//Score and IDs
const finalScore = document.querySelector(".final-score")
const highScore = document.querySelector(".high-score");
let score = 0;
let highScoreCounter = 0;
const gameoverMsg = document.querySelector(".message");


let canShoot = true
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

    //Enemy aircrafts
    if (animateId % 60 === 0) {
    enemies.push(new Enemy(myCanvas.width + 125, (myCanvas.height - 170) * Math.random(), 125, 75))}
  
    enemies.forEach(enemy => {
        enemy.draw()
        enemy.checkCollision()
      })
    enemies = enemies.filter(enemy => enemy.xPos > -150)  

    //Player projectile
    if (isShooting && canShoot) {
        projectiles.push(new Projectile(playerX + 150, playerY + playerHeight/3, 50, 30))
        canShoot=false
        setTimeout(() => canShoot = true, 1000)
      }
    projectiles.forEach(element => {
        element.draw()
        element.checkProjectileCollision(enemies)
    })
    projectiles = projectiles.filter(element => element.xPos < myCanvas.width + 50)

    //Enemy projectile
    if (animateId % 500 === 0) {
      enemies.forEach((element) => {
        enemyProjectiles.push(new EnemyProjectile(element.xPos - 100, element.yPos + 30, 50, 30))
      })}
    
    enemyProjectiles.forEach(element => {
      element.draw()
      element.checkEnemyProjectileCollision()
    })

    enemyProjectiles = enemyProjectiles.filter(element => element.xPos > -150)

    //score
    ctx.font = "32px Black Ops One";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, myCanvas.width-220, 40);
    
    if(score >= 1000){gameOver = true}

    if(score === 100){ 
      enemySpeed = 4
      enemyProjectileSpeed = 6
    }
    if(score === 200){ 
      enemySpeed = 5
      enemyProjectileSpeed = 7
    }
    if(score === 400){
      enemySpeed = 6
      enemyProjectileSpeed = 8
    }
    if(score === 600){ 
      enemySpeed = 7
      enemyProjectileSpeed = 9
    }
    if(score === 800){
      bgSpeed = 3
      enemySpeed = 10
      enemyProjectileSpeed = 14
      siren800.play()
      siren800.loop = true
    }
  


    if (gameOver) {
        cancelAnimationFrame(animateId)
        splashScreen.style.display = 'none' 
        gameplayScreen.style.display = "none"
        gameoverScreen.style.display = "block"
        finalScore.innerText = `Score: ${score}`
        playerSound.pause()
        siren800.pause()
        mainTheme.load()
        mainTheme.play()
        if(score > highScoreCounter) {
          highScoreCounter = score
        }
        highScore.innerText = `High Score: ${highScoreCounter}`
      } else {
        animateId = requestAnimationFrame(animate)
    }
    
    //Gameover messages
    if (score >= 0 && score < 500) {
      gameoverMsg.innerText = "We have lost the war!"
    }
    else if (score >= 500 && score <= 999) {
      gameoverMsg.innerText = "We have eliminated majority of them, almost there!"
    }
    else {
      gameoverMsg.innerText = "You have aced it!"
    }

}

const startGame = () => {
    splashScreen.style.display = 'none'
    gameplayScreen.style.display = "block"
    gameoverScreen.style.display = "none"
    animate()
  }
const restartGame = () => {
    splashScreen.style.display = 'none'
    gameplayScreen.style.display = "block"
    gameoverScreen.style.display = "none"
    gameOver = false
    enemies = enemies.filter(element => element.xPos > myCanvas.width)
    projectiles = projectiles.filter(element => element.xPos > myCanvas.width) 
    enemyProjectiles  = enemyProjectiles.filter(element => element.xPos > myCanvas.width)
    score = 0;
    playerX = playerWidth/5
    playerY = myCanvas.height/2 - playerHeight/2
    enemySpeed = 3
    enemyProjectileSpeed = 5
    bgSpeed = 2
    animate()  
}

window.addEventListener('load', () => {
    document.getElementById('start-button').onclick = () => {
      startGame()
      playerSound.play()
      playerSound.loop = true
      mouseclickSiren.play()
      mainTheme.pause()   
    }
    document.getElementById('restart-button').onclick = () => {
      restartGame()
      playerSound.play()
      playerSound.loop = true
      mouseclickSiren.play()
      mainTheme.pause()   
    }
    document.getElementById('splash-screen').onmousemove = () => {
      mainTheme.play()
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
        if (event.key === " ") {
            isShooting = true
            playerCannonSound.play()
        }
      })

    document.addEventListener('keyup', () => {
      if (event.key === 'a') {
        isMovingLeft = false
      }
      if (event.key === 'd') {
        isMovingRight = false
      }
      if (event.key === "w") {
        isMovingUp = false
      }
      if (event.key === "s") {
        isMovingDown = false
     }
      if (event.key === " ") {
        isShooting = false
      }
      })

});


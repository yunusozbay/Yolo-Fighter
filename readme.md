# Yolo-Fighter

<img src="./images/YOLO - FIGHTERblackops.png" alt="logo" width="50%"/>  

## Description

Yolo-Fighter is a 2D-game where the player has to move its fighter plane in x,y plane and shoot projectiles to destroy enemy aircraft. Enemies will be coming from x-axis. The difficulty will increase constantly and the game will end when the fighter plane takes damage.The score will be calculated according to how many aircrafts are destroyed by the player(20points per enemy). Attaining 1000 score terminates the game with victory message.

## MVP

- Player aircraft can move up, down, left, right 
- Player aircraft can shoot projectiles to destroy enemy aircraft.
- Enemy aircraft can shoot projectiles as well.
- Reload time for shooting projectiles.
- Increasing difficulty
- Collision with enemy projectile or enemies itself ends the game

## Backlog

- Add score count
- Add highscore count
- Game terminates at 1000 score with a victory message
- Add audio

## Data structure

# game.js

- Enemy () {this.xPos; this.yPos; this.width; this.height}
- draw ()
- checkCollision ()
- Projectile () {this.xPos; this.yPos; this.width; this.height}
- draw ()
- checkProjectileCollision (enemyArr)
- EnemyProjectile () {this.xPos; this.yPos; this.width; this.height}
- draw ()
- checkEnemyProjectileCollision ()

## States y States Transitions
- splash-screen
- gameplay-screen
- gameover-screen

## Link

https://yunusozbay.github.io/Yolo-Fighter/

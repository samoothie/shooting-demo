import Player from "./Player.js";
import Enemy from "./Enemy.js"
import BulletController from "./BulletController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 600;

//create objects
const bulletController = new BulletController(canvas);
const player = new Player(canvas.width/2.2, canvas.height/1.3, bulletController);
const enemies = [
    new Enemy(50, 20, 'red', 5),
    new Enemy(150, 20, 'white', 5),
    new Enemy(250, 20, 'yellow', 5),
    new Enemy(350, 20, 'pink', 5),
    new Enemy(50, 100, 'green', 5),
    new Enemy(150, 100, 'orange', 13),
    new Enemy(250, 100, 'green', 5),
    new Enemy(350, 100, 'blue', 10),
]
function gameLoop() {
    setCommonStyle();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bulletController.draw(ctx);
    player.draw(ctx);
    enemies.forEach(enemy => {
        if(bulletController.collideWith(enemy)) {
            if(enemy.health <= 0) {
                enemies.splice(enemies.indexOf(enemy), 1);
            }
        } else {
        enemy.draw(ctx);
        }
    });
}

function setCommonStyle() {
    ctx.shadowColor = "#d53"; //color of glow
    ctx.shadowBlur = 20; //gives glow
    ctx.lineJoin = "bevel"; //rounds corners a little bit
    ctx.lineWidth = 10;//should stack on top of the player 
}

setInterval(gameLoop, 1000 / 60);

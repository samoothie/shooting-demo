import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBullet = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    shoot(x, y, speed, damage, delay) {
        if(this.timeTillNextBullet <= 0) {
            this.bullets.push(new Bullet(x, y, speed, damage));
            this.timeTillNextBullet = delay;
        }

        this.timeTillNextBullet--;
    }

    draw(ctx) {
        console.log(this.bullets.length);
        this.bullets.forEach((bullet) => {
            if(this.isBulletOffScreen(bullet)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }
            bullet.draw(ctx)
        });
    }

    isBulletOffScreen(bullet) {
        return bullet.y <= -bullet.height;
    }
    //keep in mind this only prevents bullets from top of screen, 
    //not entire border

    collideWith(sprite) { //any entity on screen "sprite"
        return this.bullets.some(bullet=> {
            if(bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true;
            }
            return false
        });
    }
}
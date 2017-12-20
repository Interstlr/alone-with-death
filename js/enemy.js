class Enemy {
    constructor(x, y, r, spriteSet) {
        this.r = r;
        this.pos = createVector(x, y);
        this.moveSpeed = 2;
        this.color = color(255);
        this.animation = new Animation(spriteSet);

        this.hp = 100;
        this.damage = 0;
        this.damageToWall = 2;

        this.moveQueue = [];

        this.isOnScreen = false;
    }

    update(player, map) {

        if(this.animation.isMoving) this.moveEnemy(player.pos);

        if(this.isOnScreen) {

            if(this.isIntersects(player.pos)) {
                this.animation.isMoving = false;

                player.makeBlood();
                setTimeout(function() {
                    this.damage = 0.5;
                }.bind(this), 500);
                this.animation.renderZombieAnim(this.pos, player.pos);

                this.damage = 0.5;

            } else {
                this.animation.isMoving = true;
                this.animation.renderZombieAnim(this.pos, player.pos);
                this.damage = 0;
                
            }

            /*
            if(this.pos.x <= 600 || playerPos.x <= 600 ||  (Math.abs(dx) <= 100)) {
                
            }
            if(this.moveQueue.length == 0) {
                
                let arrX = [this.pos.x, (this.pos.x + playerPos.x)  / 1, playerPos.x];
                let arrY = [this.pos.y,  (this.pos.y + playerPos.y) / 1, playerPos.y];
    
                let nPoints = arrX.length;
                let resultY = 0;
                let s = 0;
    
                let currentX = this.pos.x;
                for(let k = 0; k < 15; k++) {
                    if(currentX < 600 || playerPos.x < 600 || Math.abs( playerPos.x - currentX ) < 100) { 
                        break;
                     } else {
                        resultY = arrY[0];
                        for(let i = 1; i < nPoints; i++) {
                            let difference = 0;
                            for(let j = 0; j <= i; j++) {
                                s = 1;
                                for(let m = 0; m <= i; m++) {
                                    if(m != j) {
                                        s *= arrX[j] - arrX[m];
                                    }
                                }
                                if(s != 0) {
                                    difference += arrY[j] / s;
                                }
                            }
                            for(let m = 0; m < i; m++) {
                                let findX = currentX;
                                difference *= (findX - arrX[m]);
                            }
                            resultY += difference;
                        }
        
                        this.moveQueue.push(createVector(currentX,resultY));
        
                        if(dx > 0) {    
                            currentX += 1;//this.moveSpeed;
                        } else if(dx <= 0) {
                            currentX -= 1;//this.moveSpeed;
                        }
                     }
                }
                // console.log(this.moveQueue);
            } else {
                this.pos.x = this.moveQueue[0].x;
                this.pos.y = this.moveQueue[0].y;
                this.moveQueue.splice(0, 1);
            }
            */

        }
        handleCollisionWalls(this.pos, map, 20);
    }

    moveEnemy(playerPos) {

        let dx = playerPos.x - this.pos.x;
        let dy = playerPos.y - this.pos.y;

        dx >= 0 ? this.pos.x += this.moveSpeed : this.pos.x += -this.moveSpeed;
        dy >= 0 ? this.pos.y += this.moveSpeed : this.pos.y += -this.moveSpeed;
    }

    checkCollidingWalls(map) {
        let collTile = handleCollisionWalls(this.pos, map, 25);
        
        if(collTile.isCollide) {
            map[collTile.tileY][collTile.tileX].healthValue -= this.damageToWall;
        }
    }

    changeColor() {
        this.color = color(random(255), random(255), random(255));
    }

    isIntersects(playerPos) {
        let d = dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y);
        if(d < 50) {
            return true;
        }
        return false;
    }
}
class Enemy {
    constructor(x, y, r, spritesMove) {
        this.r = r;
        this.pos = createVector(x, y);
        this.moveSpeed = 2;
        this.color = color(255);
        this.animation = new Animation(spritesMove);

        this.hp = 100;
        this.damage = 0;
        this.damageToWall = 2;

        this.isOnScreen = false;
    }

    update(playerPos, map) {

        let dx = playerPos.x - this.pos.x;
        let dy = playerPos.y - this.pos.y;

        let moveX = 0;
        let moveY = 0;

        if(dx > 0) {
            this.pos.x += 1;
            moveX += 1;
        } else if(dx < 0) {
            this.pos.x -= 1;
        }

        if(dy > 0) {
            this.pos.y += 1;
        } else if(dy < 0) {
            this.pos.y -= 1;
        }

        this.checkCollidingWalls(map);

        if(this.isOnScreen) {
            this.animation.renderMove(this.pos.x, this.pos.y, 50, 50);
            //this.render();

            if(this.isIntersects(playerPos)) {
                this.damage = 0.5;
            } else {
                this.damage = 0;
            }
        }
    }

    render() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    checkCollidingWalls(map) {
        let collTile = handleCollisionWalls(this.pos, map);
        
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
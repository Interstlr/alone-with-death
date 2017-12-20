class Animation {
    constructor(imagesSet) {
        this.imagesSet = imagesSet;
        this.moveSpriteIndex = 0;
        this.attackSpriteIndex = 0;
        this.tickCount = 0;
        this.ticksPerSprite = 1;
        
        this.width = 110;
        this.height = 130;

        this.spritesMoveLength = this.imagesSet[0].length;
        this.spritesAttackLength = this.imagesSet[1].length;

        this.isMoving = true;
        this.isAttacking = false;
    }

    resetParams() {
        this.moveSpriteIndex = 0;
        this.tickCount = 0;
    }

    renderZombieAnim(enemyPos, playerPos) {

        push();
        imageMode(CENTER);
        translate(enemyPos.x, enemyPos.y);

        let angle = atan2(enemyPos.y - playerPos.y, enemyPos.x - playerPos.x);
        
        rotate(angle + Math.PI);

        this.tickCount++;
        
        if(this.isMoving) {
            image(this.imagesSet[0][this.moveSpriteIndex], 0, 0, this.width, this.height);

            if(this.tickCount > this.ticksPerSprite) {
                this.moveSpriteIndex++;
                if(this.moveSpriteIndex >= this.spritesMoveLength) this.moveSpriteIndex = 0;
                this.tickCount = 0;
            }
        } else {
            image(this.imagesSet[1][this.attackSpriteIndex], 0, 0, this.width, this.height);

            if(this.tickCount > this.ticksPerSprite) {
                this.attackSpriteIndex++;
                if(this.attackSpriteIndex >= this.spritesAttackLength) this.attackSpriteIndex = 0;
                this.tickCount = 0;
            }
        }
        pop();
    }

    renderPlayer(curWeapon, playerPos, bodySpriteCurX, bodySpriteCurY, bodySpriteCurW, bodySpriteCurH) {
        //push();
        imageMode(CENTER);
        rotate(-0.1);
        image(this.imagesSet[curWeapon][this.spriteIndex], bodySpriteCurX, bodySpriteCurY, bodySpriteCurW, bodySpriteCurH);
        //pop();

        this.tickCount++;
        if(this.tickCount > this.ticksPerSpritePlayer) {
            this.spriteIndex++;
            if(this.spriteIndex >= this.spritesMoveLength) this.spriteIndex = 0;
            this.tickCount = 0;
        }
    }
}
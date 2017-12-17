class Animation {
    constructor(imagesSet) {
        this.imagesSet = imagesSet;
        this.spriteIndex = 0;
        this.tickCount = 0;
        this.ticksPerSprite = 2;
        this.ticksPerSpritePlayer = 10;
        
        this.width = 110;
        this.height = 130;

        this.spritesMoveLength = this.imagesSet.length;
    }

    renderMove(x, y, playerPos) {
        push();
        imageMode(CENTER);
        // angleMode(DEGREES);
        translate(x, y);

        let angle = atan2(y - playerPos.y, x - playerPos.x) //*  180 / Math.PI;
        // angle = (angle < 0) ? angle + 360 : angle;
        
        
        rotate(angle + Math.PI);
        
        image(this.imagesSet[this.spriteIndex], 0, 0, this.width, this.height);
        pop();

        this.tickCount++;
        if(this.tickCount > this.ticksPerSprite) {
            this.spriteIndex++;
            if(this.spriteIndex >= this.spritesMoveLength) this.spriteIndex = 0;
            this.tickCount = 0;
        }
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
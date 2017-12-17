class Animation {
    constructor(imagesSet) {
        this.imagesSet = imagesSet;
        this.spriteIndex = 0;
        this.tickCount = 0;
        this.ticksPerSprite = 2;
        
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
        console.log(this.imagesSet[curWeapon][this.spriteIndex]);
        image(this.imagesSet[curWeapon][this.spriteIndex], playerPos.x, playerPos.y, bodySpriteCurW, bodySpriteCurH);
        //pop();

        this.tickCount++;
        if(this.tickCount > this.ticksPerSprite) {
            this.spriteIndex++;
            if(this.spriteIndex >= this.spritesMoveLength) this.spriteIndex = 0;
            this.tickCount = 0;
        }
    }
}
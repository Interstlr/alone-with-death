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
        //translate(x, y);
        let angle = atan2(y - playerPos.y, x - playerPos.x) / Math.PI * 180;
        angle = (angle < 0) ? angle + 360 : angle;
        //console.log(angle);
        angleMode(DEGREES);
        rotate(angle);
        
        image(this.imagesSet[this.spriteIndex], x, y, this.width, this.height);
        pop();

        this.tickCount++;
        if(this.tickCount > this.ticksPerSprite) {
            this.spriteIndex++;
            if(this.spriteIndex >= this.spritesMoveLength) this.spriteIndex = 0;
            this.tickCount = 0;
        }
    }
}
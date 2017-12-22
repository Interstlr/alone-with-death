class Minimap {
    constructor(img, playerPos) {
        this.mapImg = img;

        this.show = true;
        
        this.posX = WIN_WIDTH_HALF / 2 + 100;
        this.posY = -100;

        this.playerPoint = null;

        this.mapScale = 160;

    }

    update(playerPos) {

        let mapX = playerPos.x / this.mapScale;
        let mapY = playerPos.y / this.mapScale;

        if(this.show) {
            this.render(playerPos, mapX, mapY);
        }
    }

    render(playerPos, mapX, mapY) {
        push();

        translate(playerPos.x, playerPos.y);
        fill('#282828');
        stroke(2);
        rect(this.posX - 1, this.posY - 2, 203, 203); //border
        image(
            this.mapImg,
            this.posX,
            this.posY, 
            200,
            200
        );

        fill('#c10000');
        ellipse(this.posX + mapX, this.posY + mapY, 6, 6);

        pop();
    }
}

//PlayerPos.x + WIN_WIDTH_HALF - 400,
//PlayerPos.y - 100,
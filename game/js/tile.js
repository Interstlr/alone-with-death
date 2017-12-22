class Tile {
    constructor(x, y, imgX, imgY, spriteID, activeMap) {
        this.pos = {'x': x, 'y': y};
        this.imgPos = {'x': imgX, 'y': imgY};
        this.spriteID = spriteID;
        this.isWalkable = true;

        switch(spriteID) {
            case 0: //black tile
                this.isWalkable = false;
                break;
            case 81: //concrete wall
                this.healthValue = 1800;
                this.solid = true;
                this.isWalkable = false;
                break;
            case 82: //infinite wall
                this.solid = true;
                this.isWalkable = false;
                break;
            case 72: //building entrance
                this.isWalkable = false;
                this.solid = true;
                break;
            case 71: //brick wall
                this.healthValue = 1000;
                this.solid = true;
                this.isWalkable = false;
                break;
            case 72: //infinite brick wall
                this.solid = true;
                this.isWalkable = false;
                break;
            case 73: //gray roof
                this.isWalkable = false;
                this.solid = true;

            case 31: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 32: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 33: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 41: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 42: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 43: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 51: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 52: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 53: 
                this.solid = true;
                this.isWalkable = false;
                break;
            case 62:
                this.isWalkable = false;
                this.isHouseEntrance = true;
            case 92:
                this.isWalkable = false;
                this.isBunkerEntrance = true;
        }
    }

    update() {
        if(this.healthValue <= 0) {
            this.imgPos.y = 600;

            switch(this.spriteID) {
                case 71: 
                    this.imgPos.x = 300;
                    this.spriteID = 64;
                    break;
                case 81: 
                    this.imgPos.x = 200;
                    this.spriteID = 63;
                    break;
            }
            delete this.solid; 
            this.isWalkable = true;
        }

        image(images,
            this.pos.x,
            this.pos.y, 
            TILE_W, 
            TILE_H, 
            this.imgPos.x, 
            this.imgPos.y, 
            TILE_W, 
            TILE_H
        );
    }
}
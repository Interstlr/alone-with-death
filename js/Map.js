class Map {
    constructor(objOrigin, mapSize) {
        this.name = name;
        this.origin = {'x': objOrigin.x, 'y': objOrigin.y};
        this.map = [];
        this.imagesSet = null;
        this.activeMap = 'arena';
        this.loaded = false;
        this.mapSize = mapSize;
    }

    createMap(json) {
        this.map.length = 0;
        let tmpMap = [];
        let tileX = 0;
        let tileY = 0;


        let jsonIndex = 0;
        let imgID = 0;
        for(let i = 0; i < this.mapSize.y; i++) {
            tmpMap[i] = [];
            for(let j = 0; j < this.mapSize.x; j++) {
                let imgX = 0, imgY = 0;

                switch(json.layers[0].data[jsonIndex]) {
                    case 1: //grass
                        break;
                    case 2: //dry ground
                        imgX = 100;
                        break;
                    case 7: //sand
                        imgY = 100;
                        break;
                    case 13: //brick wall 
                        imgY = 200;
                        break;
                    case 14: //ruined brick wall
                        imgX = 100;
                        imgY = 200;
                        break;
                    case 19: //wooden floor
                        imgY = 300;
                        break;
                    case 25: //infinite wall
                        imgY = 400;
                        break;
                    case 43: //water
                        imgY = 700;
                        break;
                    case 0: //black tile
                        imgY = 600;
                        break;
                }

                tmpMap[i][j] = new Tile(tileX, tileY, imgX, imgY, json.layers[0].data[jsonIndex]);

                jsonIndex++;
                tileX += TILE_H;
            }
            tileY += TILE_H;
            tileX = 0;
        }

        this.map = tmpMap;
    }

    update(playerPos) {

        background(BGCOLOR_ALMOSTBLACK);

        let playerTileX = (playerPos.x / TILE_W) | 0;
        let playerTileY = (playerPos.y / TILE_H) | 0;

        let lW = playerTileX - REND_MAP_LEFT;
        let rW = playerTileX + REND_MAP_RIGHT;
        let uH = playerTileY - REND_MAP_UP;
        let dH = playerTileY + REND_MAP_DOWN;

        if(playerTileX < this.map[0].length / 2){
            if(lW < 0){
                lW = 0;
            }
        } else {
            if(rW > this.map[0].length){
                rW = this.map[0].length;
            }
        }

        if(playerTileY < this.map.length / 2){
            if(uH < 0){
                uH = 0;
            }
        } else {
            if(dH > this.map.length){
                dH = this.map.length;
            }
        }

        for(let i = lW; i < rW; i++) {
            for(let j = uH; j < dH; j++) {
                this.map[j][i].update();
            }
        }
    }
}


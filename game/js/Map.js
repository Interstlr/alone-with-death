class Map {
    constructor(objOrigin) {
        this.name = name;
        this.origin = {'x': objOrigin.x, 'y': objOrigin.y};
        this.map = [];
        this.imagesSet = null;
        this.activeMap = 'world';
        this.loaded = false;
        this.mapSize = {};

        this.locationsHouses = [];
        this.generatedHouses = [];
    }

    createMap(json) {

        this.mapSize.x = json.width;
        this.mapSize.y = json.height;

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
                    case 0: //black tile
                        imgY = 900;
                        break;
                    case 1: //grass top-left
                        break;
                    case 2: //grass top
                        imgX = 100;
                        break;
                    case 3: //grass top-right
                        imgX = 200;
                        break;
                    case 11: //grass left
                        imgY = 100;
                        break;
                    case 12: //grass center
                        imgX = 100;
                        imgY = 100;
                        break;
                    case 13: //grass right
                        imgX = 200;
                        imgY = 100;
                        break;
                    case 21: //grass down-left
                        imgY = 200;
                        break;
                    case 22: //grass down
                        imgX = 100;
                        imgY = 200;
                        break;
                    case 23: //grass down-right
                        imgX = 200;
                        imgY = 200;
                        break;

                    case 4: //ground top-left
                        imgX = 300;
                        break;
                    case 5: //ground top
                        imgX = 400;
                        break;
                    case 6: //ground top-right
                        imgX = 500;
                        break;
                    case 14: //ground left
                        imgX = 300;
                        imgY = 100;
                        break;
                    case 15: //ground center
                        imgX = 400;
                        imgY = 100;
                        break;
                    case 16: //ground right
                        imgX = 500;
                        imgY = 100;
                        break;
                    case 24: //ground down-left
                        imgX = 300;
                        imgY = 200;
                        break;
                    case 25: //ground down
                        imgX = 400;
                        imgY = 200;
                        break;
                    case 26: //ground down-right
                        imgX = 500;
                        imgY = 200;
                        break;
                    case 4: //ground top-left
                        imgX = 300;
                        break;
                    case 5: //ground top
                        imgX = 400;
                        break;
                    case 6: //ground top-right
                        imgX = 500;
                        break;
                    case 14: //ground left
                        imgX = 300;
                        imgY = 100;
                        break;
                    case 15: //ground center
                        imgX = 400;
                        imgY = 100;
                        break;
                    case 16: //ground right
                        imgX = 500;
                        imgY = 100;
                        break;
                    case 24: //ground down-left
                        imgX = 300;
                        imgY = 200;
                        break;
                    case 25: //ground down
                        imgX = 400;
                        imgY = 200;
                        break;
                    case 26: //ground down-right
                        imgX = 500;
                        imgY = 200;
                        break;

                    case 31: //water top-left
                        imgY = 300;
                        break;
                    case 32: //water top
                        imgY = 300;
                        imgX = 100;
                        break;
                    case 33: //water top-right
                        imgY = 300;
                        imgX = 200;
                        break;
                    case 41: //water left
                        imgY = 400;
                        break;
                    case 42: //water center
                        imgX = 100;
                        imgY = 400;
                        break;
                    case 43: //water right
                        imgY = 400;
                        imgX = 200;
                        break;
                    case 51: //water down-left
                        imgY = 500;
                        break;
                    case 52: //water down
                        imgX = 100;
                        imgY = 500;
                        break;
                    case 53: //water down-right
                        imgX = 200;
                        imgY = 500;
                        break;

                    case 71: //brick wall 
                        imgY = 700;
                        break;
                    case 71: //infinite brick wall 
                        imgY = 700;
                        imgX = 100;
                        break;
                    case 63: //ruined brick wall | gray
                        imgX = 200;
                        imgY = 600;
                        break;
                    case 64: //ruined brick wall | grass
                        imgX = 300;
                        imgY = 600;
                        break;
                    case 81: //concrete wall
                        imgY = 800;
                        break;
                    case 82: //infinite wall
                        imgX = 100;
                        imgY = 800;
                        break;
                    case 83: //wooden floor
                        imgY = 800;
                        imgX = 200;
                        break;
                    case 73: //gray roof
                        imgX = 200;
                        imgY = 700;
                        break;

                    //roads
                    case 7:
                        imgX = 600;
                        break;
                    case 8:
                        imgX = 700;
                        break;
                    case 9: //zebra vert
                        imgX = 800;
                        break;
                    case 17:
                        imgX = 600;
                        imgY = 100;
                        break;
                    case 18:
                        imgX = 700;
                        imgY = 100;
                        break;
                    case 19: //zebra vert
                        imgX = 800;
                        imgY = 100;
                        break;
                    case 27:
                        imgX = 600;
                        imgY = 200;
                        break;
                    case 28:
                        imgX = 700;
                        imgY = 200;
                        break;

                    case 61: //sidewalk 
                        imgY = 600;
                        break;
                    case 62: //building entrance 
                        imgY = 600;
                        imgX = 100;
                        break;
                }

                tmpMap[i][j] = new Tile(tileX, tileY, imgX, imgY, json.layers[0].data[jsonIndex], map.activeMap);

                jsonIndex++;
                tileX += TILE_H;
            }
            tileY += TILE_H;
            tileX = 0;
        }

        this.map = tmpMap;
    }

    update(playerPos) {

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
                if(!this.map[j][i]) {

                } else {
                    this.map[j][i].update();
                } 
            }
        }
    }
}


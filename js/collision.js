function handleCollisionWalls(objPos, map, maxDistArg) {
    const objTile = determineObjectTilePos(objPos, map);
    const isCollideObj = handleCollision(
        objPos, 
        map, 
        objTile.objTileX, 
        objTile.objTileY, 
        objTile.lW, 
        objTile.rW, 
        objTile.uH, 
        objTile.dH,
        maxDistArg
    );

    const returnObject = {
        isCollideObj: isCollideObj,
        objTile
    }
    return returnObject;
}

function handleCollision(objPos, map, objTileX, objTileY, lW, rW, uH, dH, maxDistArg) {

    //check and handle wall collisions 
    //up
    let collidingTile = {
        isCollide : false,
    };
    
    //ckeck if out of map borders
    if(objTileY < 0 ||
        objTileY >= map.mapSize.y - 1 ||
        objTileX < 0 ||
        objTileX >= map.mapSize.x - 1
    ) {
        return collidingTile;
    }

    //collision logic
    let maxDist;
    if(maxDistArg == undefined) {
        maxDist = 10;
    } else {
        maxDist = maxDistArg
    }
    
    //up
    if(map.map[uH][objTileX].hasOwnProperty('solid')) {
        if(objPos.y <= map.map[uH][objTileX].pos.y + TILE_H + maxDist) {
            objPos.y = map.map[uH][objTileX].pos.y + TILE_H + maxDist;
            collidingTile.isCollide = true;
            collidingTile.tileX = objTileX;
            collidingTile.tileY = uH;
        }
    }
    //right
    if(map.map[objTileY][rW].hasOwnProperty('solid')) {
        if(objPos.x >= map.map[objTileY][rW].pos.x - maxDist) {
            objPos.x = map.map[objTileY][rW].pos.x - maxDist;
            collidingTile.isCollide = true;
            collidingTile.tileX = rW;
            collidingTile.tileY = objTileY;
        }
    }
    //down
    if(map.map[dH][objTileX].hasOwnProperty('solid')) {
        if(objPos.y >= map.map[dH][objTileX].pos.y - maxDist) {
            objPos.y = map.map[dH][objTileX].pos.y - maxDist;
            collidingTile.isCollide = true;
            collidingTile.tileX = objTileX;
            collidingTile.tileY = dH;
        }
    }
    //left
    if(map.map[objTileY][lW].hasOwnProperty('solid')) {
        if(objPos.x <= map.map[objTileY][lW].pos.x + TILE_W + maxDist) {
            objPos.x = map.map[objTileY][lW].pos.x + TILE_W + maxDist;
            collidingTile.isCollide = true;
            collidingTile.tileX = lW;
            collidingTile.tileY = objTileY;
        }
    }

    return collidingTile;
}

function determineObjectTilePos(objPos, map) {

    let obj = {};

    let objTileX = (objPos.x / TILE_W) | 0;
    let objTileY = (objPos.y / TILE_H) | 0;

    let lW = objTileX - 1;
    let rW = objTileX + 1;
    let uH = objTileY - 1;
    let dH = objTileY + 1;

    if(objTileX < map.map[0].length / 2){
        if(lW < 0){
            lW = 0;
        }
    } else {
        if(rW > map.map[0].length){
            rW = map.map[0].length;
        }
    }

    if(objTileY < map.map.length / 2){
        if(uH < 0){
            uH = 0;
        }
    } else {
        if(dH > map.map.length){
            dH = map.map.length;
        }
    }

    obj.objTileX = objTileX;
    obj.objTileY = objTileY;

    obj.lW = lW;
    obj.rW = rW;
    obj.uH = uH;
    obj.dH = dH;

    return obj;
}
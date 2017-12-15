class Generation {
    constructor(map, jsonItems, player) {
        this.map = map;
        this.jsonItems = jsonItems;
        this.items = [];
        this.chance = 100;
        this.player = player;
    }

    generateEnemy(chance) {

    }

    //generate ammo, weapons, aid in map
    generateItems() {
        let randItemID = randInt(0, 0);
        if(randInt(0, this.chance) == 0) {
            this.addThing(
                randInt(TILE_W, 700),
                randInt(TILE_H, 700),
                randItemID
            );

            /*
                не удалять
                randInt(TILE_W, MAP_SIZE_X * TILE_W - TILE_W),
                randInt(TILE_H, MAP_SIZE_Y * TILE_H - TILE_H),
            );
            */
        }
    }

    updateItems(playerPos) {
        for(let i = 0, len = this.items.length; i < len; i++) {
            this.items[i].update();

            if(this.isIntersects(this.player.pos, this.items[i].pos)) {
                this.player.putThingInInventory(this.items[i]);
                this.items.splice(i, 1);
                len--;
            }
        }
    }

    isIntersects(playerPos, itemPos) {
        let d = dist(itemPos.x, itemPos.y, playerPos.x, playerPos.y);
        if(d < 50) {
            return true;
        }
        return false;
    }

    addThing(posX, posY, randItemID) {

        const item = JSON.parse(JSON.stringify(this.jsonItems.contents[randItemID]));
        item.pos.x = posX;
        item.pos.y = posY;

        this.items.push(new Thing(item));
    }
    
    addGLOCK17(xStart, yStart) {
        this.items.push(new Weapon({	//pistol
            name: 'glock17',
            kindBullets: 'glock17Ammo',
            damage: 40,
            countBullets: 72,
            countBulletsInHolder: 10,
            imagePos: {x: 0, y: 0},
            pos: {x: xStart, y: yStart},
            timeBetweenShots: 1200
        }));
    }
    
    addAK47(xStart, yStart) {
        this.items.push(new Weapon({	//pistol
            name: 'ak47',
            kindBullets: 'ak47Ammo',
            damage: 100,
            countBullets: 60,
            countBulletsInHolder: 30,
            imagePos: {x: 100, y: 0},
            pos: {x: xStart, y: yStart},
            timeBetweenShots: 140
        }));
    }
    
    addM4A1s(xStart, yStart) {
        this.items.push(new Weapon({	//pistol
            name: 'm4a1',
            kindBullets: 'm4a1Ammo',
            damage: 80,
            countBullets: 40,
            countBulletsInHolder: 20,
            imagePos: {x: 200, y: 0},
            pos: {x: xStart, y: yStart},
            timeBetweenShots: 140
        }));
    }
    
    addAWP(xStart, yStart) {
        this.items.push(new Weapon({	//pistol
            name: 'awp',
            kindBullets: 'awpAmmo',
            damage: 600,
            countBullets: 10,
            countBulletsInHolder: 1,
            imagePos: {x: 300, y: 0},
            pos: {x: xStart, y: yStart},
            timeBetweenShots: 2800
        }));
    }
}


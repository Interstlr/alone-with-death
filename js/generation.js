class Generation {
    constructor(map, jsonItems) {
        this.map = map;
        this.jsonItems = jsonItems;
        this.items = [];
        this.chance = 100;
    }

    generateEnemy(chance) {

    }

    //generate ammo, weapons, aid in map
    generateItems(chance) {
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

    update() {
        for(let i = 0, len = this.items.length; i < len; i++) {
            console.log(this.items[i]);
            this.items[i].update();
            if(distantionFromAtoB({x: player.pos.x + INVENTORY_THING_SIZE / 2, y:player.pos.y + INVENTORY_THING_SIZE / 2},this.items[i].pos) < INVENTORY_THING_SIZE * 2){
                //put thing in inventory and remove it from map
                if(player.putThingInInventory(this.items[i])){
                    this.items.splice(i, 1);
                }
                len--;
            }
        }
    }
    
    distantionFromAtoB(a,b) {
        return Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y))); 
    }

    addThing(posX, posY, randItemID) {

        let item = this.jsonItems.contents[randItemID];
        item.pos.x = posX;
        item.pos.y = posY;

        this.items.push(new Thing(item));
        /*
        this.items.push(new Thing({
            name: 'medicineKit',
            value: 50,
            pos: {x: xStart, y: yStart},
            imagePos: {x: 240, y: 0},
            size: {width: 60, height: 60},
        }));
        */
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


class Generation {
    constructor(map, jsonItems, jsonWeapon, player) {
        this.map = map;
        this.jsonItems = jsonItems;
        this.jsonWeapon = jsonWeapon;
        this.items = [];
        this.chanceItems = 2;  //larger value lower chance
        this.chanceWeapon = 0;
        this.generalChance = 100;
        this.player = player;
        this.mapMaxSize = {x: MAP_SIZE_X * TILE_W - 100, y: MAP_SIZE_Y * TILE_W - 100};
        this.generatedWeaponNames = [];
    }

    generateEnemy(chance) {

    }

    //generate ammo, weapons, aid in map
    generate() {
        if(randInt(0, this.generalChance) == 0) {
            //generate ammo, aid kit,
            if(randInt(0, this.chanceItems) == 0) {
                let randItemID = randInt(0, 4);
                this.addThing(
                    randInt(TILE_W, this.mapMaxSize.x),
                    randInt(TILE_H, this.mapMaxSize.y),
                    randItemID
                );
            }

            //generate weapon
            if(randInt(0, this.chanceWeapon) == 0) {
                let randItemID = randInt(0, 3);
                let weaponName = JSON.parse(JSON.stringify(this.jsonWeapon.contents[randItemID])).name;
                if(this.generatedWeaponNames.indexOf(weaponName) >= 0) {
                    return;
                } else {
                    this.generatedWeaponNames.push(weaponName);

                    this.addWeapon(
                        randInt(TILE_W, this.mapMaxSize.x),
                        randInt(TILE_H, this.mapMaxSize.y),
                        randItemID
                    );

                    console.log(this.generatedWeaponNames);
                }
            }
        }
    }

    addThing(posX, posY, randItemID) {

        const item = JSON.parse(JSON.stringify(this.jsonItems.contents[randItemID]));
        item.pos.x = posX;
        item.pos.y = posY;

        this.items.push(new Thing(item));
    }

    addWeapon(posX, posY, randItemID) {

        const item = JSON.parse(JSON.stringify(this.jsonWeapon.contents[randItemID]));
        item.pos.x = posX;
        item.pos.y = posY;

        this.items.push(new Weapon(item));
    }

    update() {
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
        if(d < 30) {
            return true;
        }
        return false;
    }
}


class Generation {
    constructor(map, jsonItems, jsonWeapon, player, enemies, enemySpriteSet, mapX, mapY) {
        this.map = map;
        this.generationArea = [];
        this.jsonItems = jsonItems;
        this.jsonWeapon = jsonWeapon;
        this.items = [];
        this.player = player;
        this.enemies = enemies;
        this.mapMaxSize = {x: mapX * TILE_W - 100, y: mapY * TILE_W - 100};
        this.generatedWeaponNames = [];
        this.enemySpriteSet = enemySpriteSet;

        this.chanceItems = 4; //larger value lower chance
        this.chanceWeapon = 40;
        this.generalChance = 50;
        this.chanceZombie = 100;
        this.generItemsTryNumber = 10; 
        this.generWeaponTryNumber = 2;

        this.enemiesOnScreen = [];
    }

    createGenerationArea(map) {
        this.generationArea.length = 0;
        let lenY = map.map.length;
        let lenX = map.map[0].length;

        for(let i = 0; i < lenY; i++) {
            for(let j = 0; j < lenX; j++) {
                if(map.map[i][j]) {
                    if(map.map[i][j].isWalkable) {
                        this.generationArea.push(map.map[i][j].pos);
                    }
                }
            }
        }
    }

    generateEnemy() {
        if(map.activeMap !== 'world') {
            return;
        }

        if(randInt(0, this.chanceZombie) == 0) {
            this.addEnemy();
        }
    }

    generateEnemyAmount(number) {
        for(let i = 0, len = number; i < len; i++) {
            this.addEnemy();
        }
    }

    generateItemsAmount() {
        let number = randInt(0, this.generationInHouseTryNumber);
        for(let i = 0, len = number; i < len; i++) {
            if(randInt(0, this.chanceItems) == 0) {
                let randItemID = randInt(0, 5);
                let randItemPosID = randInt(0, this.generationArea.length - 1);
                this.addThing(
                    this.generationArea[randItemPosID].x + 50,
                    this.generationArea[randItemPosID].y + 50,
                    randItemID
                );
            }
        }
    }

    generateWeaponAmount(number) {
        let number = randInt(0, this.generWeaponTryNumber);
        for(let i = 0, len = number; i < len; i++) {
            if(randInt(0, this.chanceWeapon) == 0) {
                let randItemID = randInt(0, 3);
                let weaponName = JSON.parse(JSON.stringify(this.jsonWeapon.contents[randItemID])).name;
                if(this.generatedWeaponNames.indexOf(weaponName) >= 0) {
                    return;
                } else {
                    this.generatedWeaponNames.push(weaponName);
                    let randItemID = randInt(0, 3);
                    let randItemPosID = randInt(0, this.generationArea.length - 1);
                    this.addWeapon(
                        this.generationArea[randItemPosID].x + 50,
                        this.generationArea[randItemPosID].y + 50,
                        randItemID
                    );
                }
            }
        }
    }

    genWeapon() {

    }

    genItem() {
        
    }

    //generate ammo, weapons, aid in map
    generateItems() {
        if(map.activeMap !== 'world') {
            return;
        }

        if(randInt(0, this.generalChance) == 0) {
            //generate ammo, aid kit,
            if(randInt(0, this.chanceItems) == 0) {
                let randItemID = randInt(0, 5);
                let randItemPosID = randInt(0, this.generationArea.length - 1);
                this.addThing(
                    this.generationArea[randItemPosID].x + 50,
                    this.generationArea[randItemPosID].y + 50,
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
                    let randItemID = randInt(0, 3);
                    let randItemPosID = randInt(0, this.generationArea.length - 1);
                    this.addWeapon(
                        this.generationArea[randItemPosID].x + 50,
                        this.generationArea[randItemPosID].y + 50,
                        randItemID
                    );
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

    addEnemy() {

        let randItemPosID = randInt(0, this.generationArea.length - 1);
        this.enemies.push(new Enemy(
            this.generationArea[randItemPosID].x + 50,
            this.generationArea[randItemPosID].y + 50,
            ENTITY_DIAMETR / 2,
            this.enemySpriteSet,
            3
        ));
    }

    updateItems() {
        for(let i = 0, len = this.items.length; i < len; i++) {
            this.items[i].update();

            if(this.isIntersects(this.player.pos, this.items[i].pos)) {
                if(this.player.putThingInInventory(this.items[i])) {
                    this.items.splice(i, 1);
                    len--;
                }
                else if(this.items[i] instanceof Thing) {
                    //add bullets in backpack
                    this.player.backpack.pushItem(this.items[i]);
                    this.items.splice(i, 1);
                    len--;
                }
            }
        }
    }

    updateEnemies(map, player) {

        for(let i = 0, len = this.enemies.length; i < len; i++) {

            this.enemies[i].update(player, map);

            const damage = this.enemies[i].damage;
            player.healthBar.value -= damage;
            //check player hp value
            if(player.getHealthValue() <= 0) {
            } else {
                player.healthBar.w -= damage;
            }

            //check if bullet hit an enemy
            if(player.currentWeaponInHand instanceof Weapon) {
                let bullets = player.currentWeaponInHand.bullets.bulletsList;
                for(let j = 0, lenBullets = bullets.length; j < lenBullets; j++) {
                    if(this.isIntersects({x : bullets[j].x, y : bullets[j].y}, this.enemies[i].pos)) {

                        this.enemies[i].hp -= bullets[j].penetrationCapacity;
                        bullets[j].penetrationCapacity -= this.enemies[i].hp;
                        if(bullets[j].penetrationCapacity <= 0) {
                            bullets.splice(j, 1);
                        }

                        blood.createBloodSpot(this.enemies[i].pos.x, this.enemies[i].pos.y);
                        lenBullets--;
                    }
                }
            }

            if(this.enemies[i].hp <= 0){
                this.enemies.splice(i, 1);
                len--;
                player.score.increaseScore();
            }
        }

        checkCollisionEnemies(this.enemiesOnScreen);
    }

    updateEnemiesSurvivalMode(map, player) {
        if(map.activeMap)

        for(let i = 0, len = this.enemies.length; i < len; i++) {

            this.enemies[i].update(player, map);

            const damage = this.enemies[i].damage;
            player.healthBar.value -= damage;
            //check player hp value
            if(player.getHealthValue() <= 0) {
            } else {
                player.healthBar.w -= damage;
            }

            //check if bullet hit an enemy
            if(player.currentWeaponInHand instanceof Weapon) {
                let bullets = player.currentWeaponInHand.bullets.bulletsList;
                for(let j = 0, lenBullets = bullets.length; j < lenBullets; j++) {
                    if(this.isIntersects({x : bullets[j].x, y : bullets[j].y}, this.enemies[i].pos)) {

                        this.enemies[i].hp -= bullets[j].penetrationCapacity;
                        bullets[j].penetrationCapacity -= this.enemies[i].hp;
                        if(bullets[j].penetrationCapacity <= 0) {
                            bullets.splice(j, 1);
                        }

                        blood.createBloodSpot(this.enemies[i].pos.x, this.enemies[i].pos.y);
                        lenBullets--;
                    }
                }
            }

            if(this.enemies[i].hp <= 0){
                this.enemies.splice(i, 1);
                len--;
                player.score.increaseScore();
            }
        }

        checkCollisionEnemies(this.enemiesOnScreen);
    }

    isIntersects(playerPos, itemPos) {
        let d = dist(itemPos.x, itemPos.y, playerPos.x, playerPos.y);
        if(d < 50) {
            return true;
        }
        return false;
    }

    findEnemiesOnScreen(enemiesList, playerPos) {
        this.enemiesOnScreen.length = 0;

        let renderBorderUp = playerPos.y - WIN_HEIGHT;
        let renderBorderDown = playerPos.y + WIN_HEIGHT;
        let renderBorderLeft = playerPos.x - WIN_WIDTH;
        let renderBorderRight = playerPos.x + WIN_WIDTH;
        
        for(let i = 0, len = enemiesList.length; i < len; i++) {
            if(this.isEnemyOnScreen(
                enemiesList[i].pos,
                renderBorderUp,
                renderBorderDown,
                renderBorderLeft,
                renderBorderRight
            )) {
                enemiesList[i].isOnScreen = true;
                this.enemiesOnScreen.push(enemiesList[i]);
            } else {
                enemiesList[i].isOnScreen = false;
            }
        }
    }

    isEnemyOnScreen(enemyPos, renderBorderUp, renderBorderDown, renderBorderLeft, renderBorderRight) {

        if(enemyPos.y < renderBorderUp) {
            return false;
        }

        if(enemyPos.y > renderBorderDown) {
            return false;
        }

        if(enemyPos.x < renderBorderLeft) {
            return false;
        }

        if(enemyPos.x > renderBorderRight) {
            return false;
        }

        return true;
    }
}


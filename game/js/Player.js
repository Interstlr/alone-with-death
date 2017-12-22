class Player {
    constructor(radius, windowDimentions, playerSprites) {
		this.r = radius;
		this.rHand = (radius / 4) | 0;
		this.pos = {'x': windowDimentions.x / 2, 'y': windowDimentions.y / 2};
		this.savedPosX;
		this.savedPosY;

		this.windowDimBy2 = this.pos;
		this.isblockRunning = false;

		this.inventory = new Inventory();
		this.backpack;

		this.minimap;

		this.queueBullets = null;

		this.playerSpeedNormal = 10;
		this.playerSpeed = this.playerSpeedNormal;
		this.playerspeedBoosted = this.playerSpeedNormal * 3;

		this.barsX = 10;
		this.barsY = 200;
		this.healthBar = new HealthBar(HP_BAR_COLOR);
		this.hungerBar = new HungerBar(HUNGER_BAR_COLOR);
		this.thirstBar = new ThirstBar(THIRST_BAR_COLOR);
		this.enduranceBar = new EnduranceBar(ENDURANCE_BAR_COLOR);

		this.score = new Score();

		this.playerSprites = playerSprites;
		this.currentSprite = playerSprites[0];
		
		this.bodySpriteCurrentWidth = 115;
		this.bodySpriteCurrentX = 0;

		this.bloodIntervalCounter = 0;
		
		this.entrancePause = true;
		
		this.actionKeyPressed = false;
		

		//this.animationIdle = new Animation(playerSprites); 
		//this.currentWeaponNumber = 0;
	}

	update(map, itemsGenerator) {
		
		push();

		imageMode(CENTER);
		translate(this.pos.x, this.pos.y);
		rotate(atan2(mouseY - WIN_HEIGHT_HALF, mouseX - WIN_WIDTH_HALF));

		image(this.currentSprite, this.bodySpriteCurrentX, 0, this.bodySpriteCurrentWidth, 115);
		
		pop();

		if(this.currentWeaponInHand instanceof Weapon) {
			
			//if reload, update circle animation
			if(this.currentWeaponInHand.reload) {
				this.currentWeaponInHand.updateRecharge(this.pos);
			}
			this.queueBullets = player.currentWeaponInHand.bullets;
		}

		if(this.queueBullets){
			//render and update bullets in queue
			this.queueBullets.update(0.02, map);
			this.queueBullets.render();
		}

		//update inventory
		this.inventory.update({
			'currentThingInHand':this.currentWeaponInHand,
			'pos': this.pos
		});

		if(this.minimap) {
			this.minimap.update(this.pos);
		}

		if(this.backpack) {
			this.backpack.update(this.pos);
			if(this.backpack.show) {
				this.handlingItems();
			}
		}

		this.score.update(this.pos);
		
		this.controller();
	
		if(map.activeMap !== 'world') {
			handleCollisionBorders(this.pos, map.mapSize);
		}
		
		const collistionObject = handleCollisionWalls(this.pos, map);
		this.checkEntranceTile(map, collistionObject, itemsGenerator);

		if(this.healthBar.w <= 1) {
			gameOver = true;
			$('.message').text('YOU DIED OF ZOMBIES');
		}
	}

	focusCamera() {
		camera(this.pos.x - this.windowDimBy2.x, this.pos.y - this.windowDimBy2.y);
	}

	makeBlood() {
		this.bloodIntervalCounter++;
		if(this.bloodIntervalCounter > 50) {
			blood.createBloodSpot(this.pos.x, this.pos.y);
			this.bloodIntervalCounter = 0;
		}
	}

	getHealthValue() {
		return this.healthBar.value;
	}

	updateStateBarsArcadeMode() {
		push();
		strokeWeight(2);

		this.barsX = this.pos.x - WIN_WIDTH_HALF + 10;
		this.barsY = this.pos.y + 225;

		this.healthBar.render(this.barsX, this.barsY);
		this.enduranceBar.render(this.barsX, this.barsY + 25);

		pop();

		if(this.enduranceBar.w < 150 && !this.blockRunning) {
			this.enduranceBar.w += 0.1;
		}
		if(this.blockRunning) {
			setTimeout(() => {
				this.blockRunning = false;
			}, 3000);
		}
	}

	updateStateBarsSurvivalMove() {
		push();
		strokeWeight(2);

		this.hungerBar.w -= 0.01;
		this.thirstBar.w -= 0.02;

		this.barsX = this.pos.x - WIN_WIDTH_HALF + 10;
		this.barsY = this.pos.y + 100;

		this.healthBar.render(this.barsX, this.barsY);
		this.hungerBar.render(this.barsX, this.barsY + 25);
		this.thirstBar.render(this.barsX, this.barsY + 50);
		this.enduranceBar.render(this.barsX, this.barsY + 75);
		pop();

		
		//check status bars
		if(this.enduranceBar.w < 150 && !this.blockRunning) {
			this.enduranceBar.w += 0.1;
		}
		if(this.blockRunning) {
			setTimeout(() => {
				this.blockRunning = false;
			}, 3000);
		}

		if(this.hungerBar.w <= 1) {
			$('.message').text('YOU DIED OF HUNGER');
			gameOver = true;
		}
		if(this.thirstBar.w <= 1) {
			$('.message').text('YOU DIED OF THIRST');
			gameOver = true;
		}
	}

	checkEntranceTile(map, collistionObject, itemsGenerator) {

		if(map.map[collistionObject.objTile.objTileY][collistionObject.objTile.objTileX]) {

			/*
			if(map.map[collistionObject.objTile.objTileY][collistionObject.objTile.objTileX].hasOwnProperty('isBunkerEntrance')) {
				if(map.activeMap === 'world') {
					map.activeMap = 'bunker';
					this.pos.x = 6 * TILE_W;
					this.pos.y = 17 * TILE_H + 100;
					map.createMap(jsonBunkerMap);
					itemsGenerator.createGenerationArea(map);
					background(BGCOLOR_GRAY);
					enemies.length = 0;
					blood.bloodList.length = 0;
				} else {
					map.activeMap = 'world';
					map.createMap(jsonMap, jsonMap.width, jsonMap.height);
					itemsGenerator.createGenerationArea(map);
					background(BGCOLOR_ALMOSTBLACK);
				}
			}
			*/

			if(map.map[collistionObject.objTile.objTileY][collistionObject.objTile.objTileX].hasOwnProperty('isHouseEntrance') && this.actionKeyPressed) {
				this.actionKeyPressed = false;
				if(map.activeMap === 'world') {

					map.activeMap = 'house';

					let randHouseNumber = randInt(0, map.locationsHouses.length - 1);
					let playerPos = map.locationsHouses[randHouseNumber].properties;
					let houseMap = map.locationsHouses[randHouseNumber];
					
					this.savedPosX = this.pos.x;
					this.savedPosY = this.pos.y;

					map.createMap(houseMap);
					itemsGenerator.createGenerationArea(map);

					this.pos.x = playerPos.playerStartX;
					this.pos.y = playerPos.playerStartY;
					
					itemsGenerator.enemies.length = 0;
					blood.bloodList.length = 0;

					//itemsGenerator.generateEnemyAmount(randInt(0, 5));
					
					return;

				}
				if(map.activeMap === 'house') {

					map.activeMap = 'world';
					map.createMap(jsonMap);
					itemsGenerator.enemies.length = 0;
					blood.bloodList.length = 0;

					this.pos.x = this.savedPosX;
					this.pos.y = this.savedPosY + 50;

					itemsGenerator.createGenerationArea(map);

					return;
				}
			}
		}
	}


	controller() {
		
		//w
		if(keyIsDown(87)){
			player.pos.y -= this.playerSpeed;
		}
		//a
		if(keyIsDown(65)){
			player.pos.x -= this.playerSpeed;
		}
		//s
		if(keyIsDown(83)){
			player.pos.y += this.playerSpeed;
		}
		//d
		if(keyIsDown(68)){
			player.pos.x += this.playerSpeed;
		}

		//fire
		if((keyIsDown(32) || mouseIsPressed)) {
			if(this.currentWeaponInHand instanceof Weapon){
				if(!this.backpack || (this.backpack && !this.backpack.show)) {
					this.currentWeaponInHand.makeShot(this);
				}
				
			}
		}

		//inventory
		
		//1
		if(keyIsDown(49)){
			this.processingCurrentInventorySbj(0);
		}
		//2
		if(keyIsDown(50)){
			this.processingCurrentInventorySbj(1);
		}
		//3
		if(keyIsDown(51)){
			this.processingCurrentInventorySbj(2);
		}
		//4
		if(keyIsDown(52)){
			this.processingCurrentInventorySbj(3);
		}
		//5
		if(keyIsDown(53)){
			this.processingCurrentInventorySbj(4);
		}	
		//6
		if(keyIsDown(54)){
			this.processingCurrentInventorySbj(5);
		}	
		//R - recharge
		if(keyIsDown(82)){
			if(this.currentWeaponInHand instanceof Weapon){
				this.currentWeaponInHand.initRecharge(this.currentWeaponInHand.name);
			}
		}

		//backpack
		if(keyIsDown(84)){
			if(this.backpack) {
				if(keyIsPressed){
					this.backpack.show = this.backpack.show ? false : true;
					keyIsPressed = false;
				}
			}
		}	

		//shift(boosted movement)
		if(keyIsDown(16) && !this.blockRunning){
			if(this.enduranceBar.w > 10) {
				this.enduranceBar.w -= 0;
				this.playerSpeed = this.playerspeedBoosted;
			} else {
				this.blockRunning = true;
			}
		} else {
			this.playerSpeed = this.playerSpeedNormal;
		}
	}

	putThingInInventory(thing) {
		return this.inventory.pushItem(thing);
	}

	changePlayerSkin(weaponName) {
		//if(currentObjectInHand instanceof Weapon || currentObjectInHand  instanceof Thing)
		switch(weaponName) {
			case 'glock17': 
				this.bodySpriteCurrentWidth = 115;
				this.bodySpriteCurrentX = 0;
				this.currentSprite = playerSprites[0];
				break;
			case 'ak47':
				this.bodySpriteCurrentWidth = 150;
				this.bodySpriteCurrentX = 20;
				this.currentSprite = playerSprites[1];
				break;
			case 'm4a1': 
				this.bodySpriteCurrentWidth = 150;
				this.bodySpriteCurrentX = 20;
				this.currentSprite = playerSprites[2];
				break;
			case 'awp':
				this.currentSprite = this.playerSprites[3];
				this.bodySpriteCurrentWidth = 167;
				this.bodySpriteCurrentX = 45;
				this.currentSprite = playerSprites[3];
				break;
			default:
				this.bodySpriteCurrentWidth = 115;
				this.bodySpriteCurrentX = 0;
				this.currentSprite = playerSprites[0];
				break;
		}
	}

	processingCurrentInventorySbj(index) {
		this.currentWeaponInHand = this.inventory.getItem(index);
		if(this.currentWeaponInHand) {
			this.changePlayerSkin(this.currentWeaponInHand.name);
			if(this.currentWeaponInHand.itemType == 'aid') {
				if(keyIsPressed){
				if((this.healthBar.w + this.currentWeaponInHand.value) < 150) {
					this.healthBar.w = (this.healthBar.w + this.currentWeaponInHand.value) % 150;
					this.healthBar.value = this.healthBar.w;
				}else {
					this.healthBar.w = 150;
					this.healthBar.value = 150;
				}
					if(this.currentWeaponInHand.count == 1){
						this.inventory.removeItem(index);
					}else {
						this.currentWeaponInHand.count--;
					}
					keyIsPressed = false;
				}
			}		
		}
	}

	handlingItems() {
		if(this.backpack.mouseOverItem(this.pos)) {
			if(mouseIsPressed && !this.backpack.rollAndDrop && !this.inventory.rollAndDrop) {
				this.backpack.chooseItem();
			}
		}
		else if(this.inventory.mouseOverItem()) {
			if(mouseIsPressed && !this.backpack.rollAndDrop && !this.inventory.rollAndDrop) {
				 this.inventory.chooseItemUnderMouse();
			}
		}  

		let mousePosX = (mouseX - WIN_WIDTH_HALF);
		let mousePosY = (mouseY - WIN_HEIGHT_HALF);
		
		if(this.backpack.processItem) {

			if(mouseIsPressed) {
				this.backpack.rollAndDrop = true;
				this.inventory.processItem = false;
				this.backpack.handlingBackpackItem(this.pos);
			}
			else {
				this.backpack.rollAndDrop = false;
				if(!this.inventory.processItem && !this.inventory.rollAndDrop) {
					if(this.inventory.pushItemInReqPos(this.backpack.processItem) || this.backpack.pushItemInReqPos(this.backpack.processItem)) {
						this.backpack.removeProcessingItem();
					}
					this.inventory.processItem = false;
					this.backpack.processItem = false;
					this.backpack.rollAndDrop = false;
				}
			}
		}
		else if(this.inventory.processItem) {
			if(mouseIsPressed) {
				this.inventory.rollAndDrop = true;
				this.backpack.rollAndDrop = false;
				this.inventory.handlingInventoryItem(this.pos);
				this.backpack.processItem = false;
			}
			else {
				if(this.inventory.pushItemInReqPos(this.inventory.processItem) || this.backpack.pushItemInReqPos(this.inventory.processItem)) {
					if(this.currentWeaponInHand == this.inventory.processItem) {
						this.currentWeaponInHand = 0;
					}
					this.inventory.removeProcessingItem();
				}
				this.inventory.processItem = false;
				this.backpack.processItem = false;
				this.inventory.rollAndDrop = false;
				this.backpack.rollAndDrop = false;
			}
		}

		if(this.backpack.rollAndDrop || this.inventory.rollAndDrop) {
			$('html').css('cursor','pointer');
		}
		
	}
}
class Inventory {
    constructor() {
        // this.inventoryThings = [];
        this.inventoryCeil = [
            {x: -150, y: WIN_HEIGHT_HALF - 150, thing: false},
            {x: -90, y: WIN_HEIGHT_HALF - 150, thing: false},
            {x: -30, y: WIN_HEIGHT_HALF - 150, thing: false},
            {x: 30, y: WIN_HEIGHT_HALF - 150, thing: false},
            {x: 90, y: WIN_HEIGHT_HALF - 150, thing: false},
            {x: 150, y: WIN_HEIGHT_HALF - 150, thing: false}
        ];
        this.ceilSize = 60;
        this.processItem = false;
        this.rollAndDrop = false;
    }

    pushItem(itemToAdd) {
        let added = false;
        let addGunToGun = false;
        this.inventoryCeil.forEach(function(item, index, obj) {
            if(added || addGunToGun){
                return;
            }
            if(item.thing){
                if(item.thing instanceof Weapon && itemToAdd instanceof Thing) {
                    if(itemToAdd.name == item.thing.bulletType){
                        item.thing.bulletAmount += itemToAdd.value;
                        added = true;
                    }
                }else if(item.thing instanceof Thing && itemToAdd instanceof Thing) {
                    if(itemToAdd.name == item.thing.name){
                        item.thing.incThing();
                        added = true;
                    }
                }else if(item.thing instanceof Weapon && itemToAdd instanceof Weapon){
                    if(itemToAdd.name == item.thing.name){
                        added = false;
                        addGunToGun = true;
                    }
                }
            }else {
                if(itemToAdd.itemType == 'aid' || itemToAdd instanceof Weapon ){
                    item.thing = itemToAdd;
                    added = true;
                }
            }
        }.bind(this));
        if(added){
            return true;
        }
        return false;
    }

    getItem(id) {
        return  id < this.inventoryCeil.length ? this.inventoryCeil[id].thing : 0;
    }

    removeItem(id) {
        if (id < this.inventoryCeil.length) {
            for(let i = this.inventoryCeil.length - 1; i >= 0; i--) {
                if(i == id) {
                    this.inventoryCeil[i].thing = false;
                    break;
                }
            }
        }
    }

    removeItemThrougnObject() {
        for(let i = 0; i < this.inventoryCeil.length; i++) {
            if(this.processItem.name == this.inventoryCeil[i].thing.name) {
                this.inventoryCeil[i].thing = false;
                break;
            }
        }
    }

    update(obj) {
		push();

		translate(obj.pos.x, obj.pos.y);
        colorMode(HSL);
        strokeWeight(2);
        //stroke('rgba(35, 35, 35, 1)');
        fill(50, 0.5); 

        this.inventoryCeil.forEach(function(item, index, object) {
            let currentThing = item.thing;
            if(obj.currentThingInHand == currentThing && currentThing) {
                fill(60, 0.7);
                rect(item.x,item.y,this.ceilSize,this.ceilSize);
            }else {
                fill(50, 0.5);
                rect(item.x,item.y,this.ceilSize,this.ceilSize);
            }
            
            if(currentThing) {
                //shwo gun sprite in inventory panel
                image(currentThing.img,
                    item.x + 10, 
                    item.y + 5, 
                    40, 
                    40,
                    currentThing.imagePos.x,
                    currentThing.imagePos.y,
                    currentThing.size.w + 9,
                    currentThing.size.h + 9
                );
                
                if(currentThing instanceof Weapon) {
                    fill('#fff');
                    textFont(font);
                    text(currentThing.bulletAmount + currentThing.bulletCurrentMagazine, item.x + 25, item.y + 55);
                }else {
                    fill('#fff');
                    textFont(font);
                    text(currentThing.count, item.x + 25, item.y + 55);
                }
            }
        }.bind(this));
        if(player.currentWeaponInHand instanceof Weapon) {
            fill('#fff');
            textSize(30);
            textFont(font);
            text(player.currentWeaponInHand.bulletCurrentMagazine + '/' + player.currentWeaponInHand.bulletAmount, WIN_WIDTH_HALF/2 + 80,WIN_HEIGHT_HALF - 120);
        }

		pop();
    }
    
    clearCellStrokeWidth() {
        
    }
    mouseOverItem() {
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);
        let nCeil = this.inventoryCeil.length;
        for(let i = 0; i < nCeil; i++) {
         
            if(mousePosX >= this.inventoryCeil[i].x && mousePosX <= this.inventoryCeil[i].x + this.ceilSize) {
                if(mousePosY >= this.inventoryCeil[i].y && mousePosY <= this.inventoryCeil[i].y + this.ceilSize && this.inventoryCeil[i].thing) {
                    $('html').css('cursor','pointer'); 
                    return true;
                }
            }else {
                $('html').css('cursor',' url("../game/img/player/crosshair.cur"), crosshair');
            }
        }
        return false;
    }

    chooseItemUnderMouse() {
        // if(this.processItem) {
        //     return;
        // }
        
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);
        let nCeil = this.inventoryCeil.length;
        for(let i = 0; i < nCeil; i++) {

            if(mousePosX >= this.inventoryCeil[i].x && mousePosX <= this.inventoryCeil[i].x + this.ceilSize) {
                if(mousePosY >= this.inventoryCeil[i].y && mousePosY <= this.inventoryCeil[i].y + this.ceilSize && this.inventoryCeil[i].thing) {
                    this.processItem = this.inventoryCeil[i].thing;
                    return this.processItem;
                }
            }
        }
    }

    handlingInventoryItem(pos) {
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);
        push();
        translate(pos.x,pos.y);
        image(this.processItem.img,
            mousePosX-20, 
            mousePosY-20, 
            40, 
            40,
            this.processItem.imagePos.x,
            this.processItem.imagePos.y,
            this.processItem.size.w + 9,
            this.processItem.size.h + 9
        );
        pop();
    }
}
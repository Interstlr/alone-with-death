class Backpack {
    constructor() {
        this.backpacksThings = [];
        this.ceilSize = 60;
        this.backpacksCeil = [
            {x: -150, y: -this.ceilSize, thing: false},
            {x: -90, y: -this.ceilSize, thing: false},
            {x: -30, y: -this.ceilSize, thing: false},
            {x: 30, y: -this.ceilSize, thing: false},
            {x: 90, y: -this.ceilSize, thing: false},
            {x: 150, y: -this.ceilSize, thing: false},
            {x: -150, y: 0, thing: false},
            {x: -90, y: 0, thing: false},
            {x: -30, y: 0, thing: false},
            {x: 30, y: 0, thing: false},
            {x: 90, y: 0, thing: false},
            {x: 150, y: 0, thing: false},
            {x: -150, y: this.ceilSize, thing: false},
            {x: -90, y: this.ceilSize, thing: false},
            {x: -30, y: this.ceilSize, thing: false},
            {x: 30, y: this.ceilSize, thing: false},
            {x: 90, y: this.ceilSize, thing: false},
            {x: 150, y: this.ceilSize, thing: false},
            {x: -150, y: this.ceilSize * 2, thing: false},
            {x: -90, y: this.ceilSize * 2, thing: false},
            {x: -30, y: this.ceilSize * 2, thing: false},
            {x: 30, y: this.ceilSize * 2, thing: false},
            {x: 90, y: this.ceilSize * 2, thing: false},
            {x: 150, y: this.ceilSize * 2, thing: false},
        ];
        this.processItem = false;
        this.rollAndDrop = false;
        this.show = false;

        this.isOpened = false;
    }

    update(pos) {
        if(!this.show) {
            return;
        }
		push();

		translate(pos.x, pos.y);
        
        fill(30);
        rect(-151,-90,this.ceilSize * 6 + 1, 30);
        fill('#fff');
        textSize(25);
        textFont(font);
        text('Backpack', -20, -68);
        textSize(15);
        colorMode(HSL);

        strokeWeight(2);
        //stroke('rgba(35, 35, 35, 1)');
        fill(50, 0.5); 

        this.backpacksCeil.forEach(function(item, index, object) {
            // let currentThing = this.backpacksThings[index];
            let currentThing = item.thing;
            fill(20, 0.8);
            rect(item.x,item.y,this.ceilSize,this.ceilSize);
            
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

		pop();
    }

    pushItem(itemToAdd) {
        console.log(itemToAdd)
        let added = false;
        this.backpacksCeil.forEach(function(item, index, obj) {
            if(added){
                return;
            }
            if(item.thing){
               if(item.thing instanceof Thing && itemToAdd instanceof Thing) {
                    if(itemToAdd.name == item.thing.name && itemToAdd.itemType == 'aid'){
                        item.thing.count += itemToAdd.count;
                        added = true;
                    }
                    if(itemToAdd.name == item.thing.name && itemToAdd.itemType == 'ammo'){
                        item.thing.count += itemToAdd.count;
                        added = true;
                    }
                }
            }else {
                if(itemToAdd instanceof Thing || itemToAdd instanceof Weapon ){
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

    pushItemInReqPos(itemToAdd) {
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);
        let added = false;

        this.backpacksCeil.forEach(function(item, index, obj) {
            if(mousePosX >= item.x && mousePosX <= item.x + this.ceilSize) {
                if(mousePosY >= item.y && mousePosY <= item.y + this.ceilSize) {
                    if(item.thing){
                        if(item.thing instanceof Thing && itemToAdd instanceof Thing) {
                            if(itemToAdd.name == item.thing.name){
                                item.thing.count += itemToAdd.count;
                                added = true;
                            }
                        }
                     }else {
                         if(itemToAdd instanceof Thing || itemToAdd instanceof Weapon ){
                            item.thing = itemToAdd;
                            added = true;
                         }
                     }
                }
            }
        }.bind(this));
        if(added){
            return true;
        }
        return false;
    }

    getItem(id) {
        return  id < this.backpacksThings.length ? this.backpacksThings[id] : 0;
    }

    removeItem() {
        for(let i = 0; i < this.backpacksCeil.length; i++) {
            if(this.backpacksCeil[i].thing && this.processItem.name == this.backpacksCeil[i].thing.name) {
                this.backpacksCeil[i].thing = false;
                break;
            }
        }
    }  

    mouseOverItem(pos) {
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);
       
        let nCeil = this.backpacksCeil.length;
        for(let i = 0; i < nCeil; i++) {
            if(mousePosX >= this.backpacksCeil[i].x && mousePosX <= this.backpacksCeil[i].x + this.ceilSize) {
                if(mousePosY >= this.backpacksCeil[i].y && mousePosY <= this.backpacksCeil[i].y + this.ceilSize && this.backpacksCeil[i].thing) {
                    $('html').css('cursor','pointer'); 
                    this.processItemInfo(pos,this.backpacksCeil[i].thing);
                    return true;
                }
            }else {
                $('html').css('cursor',' url("../game/img/player/crosshair.cur"), crosshair');
            }
        }
        return false;
    }


    chooseItem() {
        let mousePosX = (mouseX - WIN_WIDTH_HALF);
        let mousePosY = (mouseY - WIN_HEIGHT_HALF);

        let nCeil = this.backpacksCeil.length;
        for(let i = 0; i < nCeil; i++) {
            if(mousePosX >= this.backpacksCeil[i].x && mousePosX <= this.backpacksCeil[i].x + this.ceilSize) {
                if(mousePosY >= this.backpacksCeil[i].y && mousePosY <= this.backpacksCeil[i].y + this.ceilSize && this.backpacksCeil[i].thing) {
                    this.processItem = this.backpacksCeil[i].thing;
                   
                    return this.processItem;
                }
            }
        }
    }

    handlingBackpackItem(pos,thing) {

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

    processItemInfo(pos,thing) {

        push();
        translate(pos.x,pos.y);
        fill(30);
        rect(-350,-90,this.ceilSize * 3 + 1, 30);
        fill('#fff');
        textSize(25);
        textFont(font);

        text(thing.name, -300, -68);

        textSize(20);
        text('count: ' + thing.count, -280, -40);
        text('amount: ' + thing.count * thing.value, -280, -10);
        colorMode(HSL);
        fill(50, 0.5); 
        rect(-350,-90,this.ceilSize * 3 + 1, 90);

        image(thing.img,
            -350, 
            -60, 
            60, 
            60,
            thing.imagePos.x,
            thing.imagePos.y,
            thing.size.w + 9,
            thing.size.h + 9
        );
        pop();
    }
}
let map;
let player = {};
let techData;
let enemies;

let jsonMap;
let jsonBunkerMap;
let jsonHouse1;
let jsonHouse2;
let jsonHouse3;
let jsonHouse4;
let jsonHouse5;


let jsonItems;
let jsonWeapon;

let images;
let blood;
let spritesBlood; 
let playerSprites = [];
let gunSpriteSheet;
let zimbieSprites = [];

let itemsGenerator;
let itemsSpriteSheet;

let sounds = {};
let soundsQueue = [];

let things = [];    //things as medicine kit, ammo, weapons, etc. on the map

let gameOver = false;
let gameIsPaused = false;
let gameIsWon = false;
let keyIsPressed = false;

let font;

let minimapImage;

let fpsValue;

function preload() {
    jsonMap = loadJSON(SURVIVAL_MAP_JSON_PATH);
    jsonHouse1 = loadJSON(HOUSE1_JSON_PATH);
    jsonHouse2 = loadJSON(HOUSE2_JSON_PATH);
    jsonHouse3 = loadJSON(HOUSE3_JSON_PATH);
    jsonHouse4 = loadJSON(HOUSE4_JSON_PATH);
    jsonHouse5 = loadJSON(HOUSE5_JSON_PATH);

    jsonBunkerMap = loadJSON(BUNKER_JSON_PATH);
    jsonItems = loadJSON(ITEMS_JSON_PATH);
    jsonWeapon = loadJSON(WEAPON_JSON_PATH);

    minimapImage = loadImage('../game/img/minimap.png');

    font = loadFont('../game/fonts/SquadaOne-Regular.ttf');
    
    images = loadImage('../game/img/terrainSet.png');
    spritesBlood = loadImage('../game/img/blood_spot.png');
    gunSpriteSheet = loadImage('../game/img/gunSpriteSheet.png');
    itemsSpriteSheet = loadImage('../game/img/itemsSheet.png');

    sounds.glock17 = loadSound('../game/audio/gun/pistol_shot.wav');
    sounds.glock17Reload = loadSound('../game/audio/gun/pistol_reload.mp3');
    sounds.ak47 = loadSound('../game/audio/gun/ak47_shot.mp3');
    sounds.ak47Reload = loadSound('../game/audio/gun/ak47_reload.mp3');
    sounds.m4a1 = loadSound('../game/audio/gun/m4a1_shot.mp3');
    sounds.m4a1Reload = loadSound('../game/audio/gun/m4a1_reload.mp3');
    sounds.awp = loadSound('../game/audio/gun/awp_shot.mp3');
    sounds.awpReload = loadSound('../game/audio/gun/awp_reload.mp3');

    sounds.music = {};
    
    //sounds.music.track1 = loadSound('../game/audio/Resident_Evil_movie_soundtrack_2008.mp3');
    //sounds.music.track2 = loadSound('../game/audio/Resident_Evil_Corp_Umbrella.mp3');

    zimbieSprites[0] = [];
    for(let i = 0; i < 17; i++) {
        zimbieSprites[0][i] = loadImage('../game/img/enemy/zombieNormal/skeleton-move_' + i + '.png');
    }
    zimbieSprites[1] = [];
    for(let i = 0; i < 9; i++) {
        zimbieSprites[1][i] = loadImage('../game/img/enemy/zombieNormal/skeleton-attack_' + i + '.png');
    }

    playerSprites[0] = loadImage('../game/img/player/survivor-glock.png');
    playerSprites[1] = loadImage('../game/img/player/survivor-ak47.png');
    playerSprites[2] = loadImage('../game/img/player/survivor-m4a1.png');
    playerSprites[3] = loadImage('../game/img/player/survivor-awp.png');

}

function setup() {
    enemies = [];
    frameRate(60);
    createCanvas(WIN_WIDTH, WIN_HEIGHT);

    player = new Player(
        ENTITY_DIAMETR / 2,
        {
            'x': 2500,
            'y': 1700
        },
        playerSprites,
        minimapImage
    );
    
    map = new Map(
        {
            'x': 0,
            'y': 0
        }
    );

    map.imagesSet = images;
    map.createMap(jsonMap, jsonMap.width, jsonMap.height);

    map.locationsHouses.push(jsonHouse1);
    map.locationsHouses.push(jsonHouse2);
    map.locationsHouses.push(jsonHouse3);
    map.locationsHouses.push(jsonHouse4);
    map.locationsHouses.push(jsonHouse5);

    itemsGenerator = new Generation(map.map, jsonItems, jsonWeapon, player, enemies, zimbieSprites);
    itemsGenerator.createGenerationArea(map);
    setInterval(function() {
        itemsGenerator.findEnemiesOnScreen(enemies, player.pos);
    }.bind(this), 2000);

    blood = new Blood();

    sounds.glock17.setVolume(0.3);
    sounds.glock17Reload.setVolume(0.3);
    sounds.ak47.setVolume(0.3);
    sounds.ak47Reload.setVolume(0.3);
    sounds.m4a1.setVolume(0.3);
    sounds.m4a1Reload.setVolume(0.3);
    sounds.awp.setVolume(0.3);
    sounds.awpReload.setVolume(0.3);

    setStandartPlayerKit();

    //set fps update time
    setInterval(function() {
        fpsValue = frameRate().toFixed(0);
    }.bind(this), 500);

    itemsGenerator.addWeapon(2000, 2000, 1);
    itemsGenerator.addWeapon(2100, 2000, 2);
    itemsGenerator.addWeapon(2200, 2000, 3);
    itemsGenerator.addThing(2300, 2000, 0);
    itemsGenerator.addThing(2400, 2000, 1);

}

function draw() {
    if(gameOver) {
        gameIsPaused = true;
        $('.gameOverMenu').show();
        // $('.gameScore').text('score:' + player.score.value);
    }
    if(gameIsPaused) {
        return;
    }

    if(map.activeMap === 'world') {
        background(BGCOLOR_BLUE);
    } else {
        background(BGCOLOR_BLACK);
    }

    camera(player.pos.x - WIN_WIDTH_HALF, player.pos.y - WIN_HEIGHT_HALF);

    map.update(player.pos);

    blood.update();

    itemsGenerator.generateItems();
    itemsGenerator.updateItems();

    //itemsGenerator.generateEnemy();
    itemsGenerator.updateEnemiesSurvivalMode(map, player);

    printTechData( {
        'xPlayer': player.pos.x, 
        'yPlayer': player.pos.y,
        'frameRate': fpsValue,
        'enemiesNum': enemies.length
    });

    player.updateStateBarsSurvivalMove();
    player.update(map, itemsGenerator);
    
}

function setStandartPlayerKit() {
    //set standart inventory of player
    //glock17
    const item = JSON.parse(JSON.stringify(jsonWeapon.contents[0]));
    item.pos.x = 0;
    item.pos.y = 0;
    player.putThingInInventory(new Weapon(item));
    player.currentWeaponInHand = player.inventory.getItem(0);
    itemsGenerator.generatedWeaponNames.push(item.name);
    //
}

function keyPressed() {
    keyIsPressed = true;
    if(keyCode == 70) {
        player.actionKeyPressed = true;
    }
}

function keyReleased() {
    keyIsPressed = false;
    if(keyCode == 70) {
        player.actionKeyPressed = false;
    }

    if(keyCode == 77) {
        if(player.minimap.show) {
            player.minimap.show = false;
        } else {
            player.minimap.show = true;
        }
    }
}

function keyTyped() {
    if(player.backpack.show) {
        
    }
}
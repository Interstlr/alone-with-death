let map;
let player = {};
let techData;
let enemies;

let jsonMap;
let jsonBunkerMap;
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

let wavesEnemies;

let fpsValue;

function preload() {
    jsonMap = loadJSON(SHOOTER_MAP_JSON_PATH);
    jsonBunkerMap = loadJSON(BUNKER_JSON_PATH);
    jsonItems = loadJSON(ITEMS_JSON_PATH);
    jsonWeapon = loadJSON(WEAPON_JSON_PATH);

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

    player = new Player(ENTITY_DIAMETR / 2, {'x': 3500, 'y': 2000}, playerSprites);
    map = new Map(
        {
            'x': 0,
            'y': 0
        },
    );

    map.imagesSet = images;
    map.createMap(jsonMap);


    itemsGenerator = new Generation(map.map, jsonItems, jsonWeapon, player, enemies, zimbieSprites);
    itemsGenerator.createGenerationArea(map);
    setInterval(function() {
        itemsGenerator.findEnemiesOnScreen(enemies, player.pos);
    }.bind(this), 2000);

    wavesEnemies = new WaveEnemies();
    wavesEnemies.launchNewWaves();

    blood = new Blood();

    background(BGCOLOR_GRAY);

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

}

function draw() {
    if(gameOver) {
        gameIsPaused = true;
        if(gameIsWon) {
            $('.titleFinishMenu p').text('YOU SURVIVED');
            $('.titleFinishMenu').css('background','url(../game/img/win.jpg)');
            $('.resumeFinishBtn').text('RESUME');
            $('.titleFinishMenu').addClass('gameWon');
            $('.titleFinishMenu').removeClass('gameOver');
        } else {
            $('.titleFinishMenu p').text('GAME OVER');
            $('.titleFinishMenu').css('background','url(../game/img/game-over.jpg)');
            $('.resumeFinishBtn').text('RESTART');
            $('.titleFinishMenu').addClass('gameOver');
            $('.titleFinishMenu').removeClass('gameWon');
        }
        $('.finishMenu').show();
        // $('.gameScore').text('score:' + player.score.value);
    }
    if(gameIsPaused) {
        return;
    }
    background(BGCOLOR_ALMOSTBLACK);

    camera(player.pos.x - WIN_WIDTH_HALF, player.pos.y - WIN_HEIGHT_HALF);

    map.update(player.pos);

    blood.update();

    itemsGenerator.generateItems();
    itemsGenerator.updateItems();

    itemsGenerator.generateEnemy();
    itemsGenerator.updateEnemies(map, player);

    wavesEnemies.update(player.pos);

    printTechData( {
        'xPlayer': player.pos.x, 
        'yPlayer': player.pos.y,
        'frameRate': fpsValue,
        'enemiesNum': enemies.length
    });

    player.updateStateBarsArcadeMode();
    player.update(map);
    
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
}

function keyPressed() {
    keyIsPressed = true;
}

function keyReleased() {
    keyIsPressed = false;
}
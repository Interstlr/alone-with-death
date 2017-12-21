const WIN_WIDTH = window.outerWidth;
const WIN_HEIGHT = window.outerHeight;
const WIN_WIDTH_HALF = window.outerWidth / 2;
const WIN_HEIGHT_HALF = window.outerHeight / 2;

const TEXTSIZE_TECHDATA = 14;
const ENTITY_DIAMETR = 100;

//map
const MAP_SHOOTER_X = 40;
const MAP_SHOOTER_Y = 40;
const MAP_OPEN_WORLD_X = 320;
const MAP_OPEN_WORLD_Y = 320;

const TILE_W = 100; 
const TILE_H = 100; 

const REND_MAP_LEFT = ((WIN_WIDTH_HALF / TILE_W) | 0) + 1;
const REND_MAP_RIGHT = ((WIN_WIDTH_HALF / TILE_W) | 0) + 2;
const REND_MAP_UP = ((WIN_HEIGHT_HALF / TILE_H) | 0) + 1;
const REND_MAP_DOWN = ((WIN_HEIGHT_HALF / TILE_H) | 0) + 2;

//colors
const PLAYER_COLOR = '#8db0e8';
const ENEMY_COLOR = '#f73b3b';
const BGCOLOR_GRAY = '#686868';
const BGCOLOR_ALMOSTBLACK = '#080808';
const GRASS_COLOR = '#2e8c27';
const HP_BAR_COLOR = '#c01111';
const HUNGER_BAR_COLOR = '#1fc633';
const THIRST_BAR_COLOR = '#3b80ef';
const COLD_BAR_COLOR = '#1295d8';
const ENDURANCE_BAR_COLOR = '#b3ced6';
const BULLET_COLOR = '#fffb2d';

//things
const MEDICINE_KIT_WIDTH = 60;
const MEDICINE_KIT_HEIGHT = 60;
const AMMO_WIDTH = 60;
const AMMO_HEIGHT = 60;

//paths
const SHOOTER_MAP_JSON_PATH = '../game/js/shooterModeMAP.json';
const SURVIVAL_MAP_JSON_PATH = '../game/js/survivalModeMAP.json';
const HOUSE1_JSON_PATH = '../game/js/json/house1.json';
const HOUSE2_JSON_PATH = '../game/js/json/house2.json';
const HOUSE3_JSON_PATH = '../game/js/json/house3.json';
const HOUSE4_JSON_PATH = '../game/js/json/house4.json';
const HOUSE5_JSON_PATH = '../game/js/json/house5.json';

const ITEMS_SPRITE = '../game/img/itemsSheet.png'; 
const GUN_SPRITE_SHEET = '../game/img/gunSpriteSheet.png';
const ITEMS_JSON_PATH = '../game/js/itemsJSON.json';
const WEAPON_JSON_PATH = '../game/js/weaponJSON.json';
const BUNKER_JSON_PATH = '../game/js/bunkerJSON.json';

const INVENTORY_THING_SIZE = 100;
const ITEM_SIZE = 60;
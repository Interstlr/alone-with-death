class WaveEnemies {
    constructor() {
        this.nWave = 1;
        this.timeWaveS = 60;
        this.timeRestS = 20;
        this.timeForRest = false;
        this.timeFromStart= 0;
    }

    launchNewWaves() {
        setInterval(function(){
           
            if(!this.timeForRest && !gameIsPaused) {
                this.timeFromStart += 1;
            }
            if(this.timeFromStart == this.timeWaveS) {
                this.timeForRest = true;
                this.timeFromStart = 0;
                this.launchRest();
            }
            
        }.bind(this), 1000);
    }

    launchRest() { 
        //if game is finished show congratulations
        if(this.nWave == 5) {
			$('.message').text('');
            $('.finishMenu').show();
            gameIsWon = true;
            gameOver = true;
            gameIsPaused = true;
        }
        itemsGenerator.generalChanceZombie = Infinity;
        setTimeout(function(){
            this.timeForRest = false;
            this.nWave += 1;
            if((10 - this.nWave) > 0 && this.nWave < 5) {
                itemsGenerator.chanceZombie = 10 - this.nWave * 2;
            } else {
                itemsGenerator.chanceZombie = 1;
            }
            
        }.bind(this),this.timeRestS * 1000);
    }

    update(pos) {
        push();
        translate(pos.x, pos.y);
        
        textSize(36);
        textFont(font);
        fill('#FA3838');
        text('00:' + (60 - this.timeFromStart), -40, -WIN_HEIGHT_HALF + 40);
        textSize(26);
        fill('#fff');
        text('Wave: ' + this.nWave, -38, -WIN_HEIGHT_HALF + 80);
       
		pop();
    }
}
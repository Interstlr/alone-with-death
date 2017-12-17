class Score {
    constructor() {
        this.value = 0;
        this.kills = 0;
    }

    increaseScore() {
        this.value += 120;
        this.kills++;
    }

    update(pos) {
        push();
        translate(pos.x, pos.y);
        fill('#fff');
        textSize(30);
        text('score: ' + this.value, WIN_WIDTH_HALF/2 + 80, -WIN_HEIGHT_HALF + 50);
        text('kills:' + this.kills, WIN_WIDTH_HALF/2 + 80, -WIN_HEIGHT_HALF + 100);
        console.log( this.value )
		pop();
	}
}
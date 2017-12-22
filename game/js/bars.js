class Bar {
    constructor() {
        this.value = 150;
        this.cornerRad = 20;
        this.w = 150;
        this.h = 10;
        this.col = null;
        this.strokeCol = null;
    }

    render(barsX, barsY) {
        fill(this.col);
        stroke(this.strokeCol);
        rect(barsX, barsY, this.w, this.h, this.cornerRad);
    }

}

class HealthBar extends Bar {
    constructor(color) {
        super();
        this.col = color;
        this.strokeCol = '#820a0a';
    }
    
}

class HungerBar extends Bar {
    constructor(color) {
        super();
        this.col = color;
        this.strokeCol = '#138221';
    }

    update() {
        this.w -= 0.015;
        this.value -= 0.015;
    }

}

class EnduranceBar extends Bar {
    constructor(color) {
        super();
        this.col = color;
        this.strokeCol = '#8ca3aa';
    }
}

class ThirstBar extends Bar {
    constructor(color) {
        super();
        this.col = color;
        this.strokeCol = '#1c407a';
    }

    update() {
        this.w -= 0.01;
        this.value -= 0.02;
    }
}
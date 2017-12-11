class Bullet {
    constructor() {
        this.objects = [];
    }

    init(bullet) {
        bullet.vx = bullet.v * Math.cos(bullet.angle);
        bullet.vy = bullet.v * Math.sin(bullet.angle);
        bullet.xInit = bullet.x;
        bullet.yInit = bullet.y;
    }
    pushBullet(bullet) {
        this.init(bullet);
        this.objects.push(bullet);
    }
    update(dt) {
        this.objects.forEach(function(item, index, obj) {
            item.x += item.vx * dt;
            item.y += item.vy * dt;

            item.lifeTime -= 1;

            if(item.lifeTime <= 0) {
                obj.splice(index, 1);
            }
        });
    }
    render() {
        this.objects.forEach(function(item, index, obj) {
            push();
            
            fill(item.bulletsColor);            
            rectMode(CENTER);
            translate(item.x, item.y);
            rotate(item.angle);
            rect(0, 0, item.bulletsLength,3);

            pop();
        });
    }
    getBullets() {
        return this.objects;
    }
}
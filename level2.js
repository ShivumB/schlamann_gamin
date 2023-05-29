function Dust(x, y) {
    this.x = x;
    this.y = y;

    this.size = Math.random() * 20 + 10;
}

Dust.prototype.show = function () {
    fill(0, 0, 0, 125);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
};

function Vacuum(x, y) {

    this.theta = 0;
    this.omega = 0;

    this.x = x;
    this.y = y;

    this.vel = 0;

    this.sprite = loadImage("assets/images/level2/vacuum cleaner.png");

}

Vacuum.prototype.act = function (keys, dust) {

    if (keys[65]) this.omega++;
    if (keys[68]) this.omega--;

    if (keys[87]) this.vel++;

    if (this.vel > 7) this.vel = 7;

    if (!keys[68] && !keys[65]) this.omega *= 0.8;
    if (!keys[87]) this.vel *= 0.9;

    if (this.omega > 5) this.omega = 5;
    if (this.omega < -5) this.omega = -5;

    this.theta += this.omega + 360;

    this.theta %= 360;

    this.x += this.vel * cos(this.theta);
    this.y += this.vel * sin(this.theta);

    if (this.x < 0) this.x = 0;
    if (this.x > 600) this.x = 600;

    if (this.y < 0) this.y = 0;
    if (this.y > 600) this.y = 600;

    let r = 50;
    let distX = 0;
    let distY = 0;

    for (let i = dust.length - 1; i >= 0; i--) {

        distX = this.x - dust[i].x;
        distY = this.y - dust[i].y;

        if (Math.abs(distX) < 15 && Math.abs(distY) < 15) {
            dust.splice(i, 1);
        } else if (Math.abs(distX) < r * 3 / 4 && Math.abs(distY) < r * 3 / 4) {

            dust[i].x += 0.1 * distX;
            dust[i].y += 0.1 * distY;

        } else if (Math.abs(distX) < r && Math.abs(distY) < r) {

            let mag = Math.sqrt(distX * distX + distY * distY);

            dust[i].x += 0.05 * distX / mag;
            dust[i].y += 0.05 * distY / mag;


        }
    }


    push();

    translate(this.x, this.y);
    rotate(this.theta);

    //hitbox
    // stroke(255);
    // strokeWeight(3);
    // noFill();
    // rect(-80, -20, 80, 40);
    image(this.sprite, -80, -20, 80, 40);

    pop();

};

function Level2() {

    this.p = new Vacuum(width / 2, height / 2);

    this.dust = [];
    for (let i = 0; i < 1500; i++) {
        this.dust.push(new Dust(Math.random() * 580 + 10, Math.random() * 580 + 10));
    }

    this.win = false;

    this.keyX = Math.random() * 550 + 25;
    this.keyY = Math.random() * 550 + 25;

    for (let i = 0; i < 40; i++) {
        this.dust.push(new Dust(this.keyX + Math.random() * 64, this.keyY + Math.random() * 64));
    }

    this.keySprite = loadImage("assets/images/key.png");

    this.bg = loadImage("assets/images/level2/carpet.jpg");

}

Level2.prototype.play = function (keys) {

    image(this.bg, 0, 0, 600, 600);

    //hitbox
    // stroke(255);
    // noFill();
    // strokeWeight(3);
    // rect(this.keyX + 10, this.keyY, 40, 60);
    image(this.keySprite, this.keyX, this.keyY);

    for (var i = 0; i < this.dust.length; i++) {
        this.dust[i].show();
    }



    this.p.act(keys, this.dust);

    let pX = this.p.x - 40 * cos(this.p.theta);
    let pY = this.p.y - 40 * sin(this.p.theta);

    if (checkCollision(pX, pY, 80, 40, this.p.theta, (this.keyX + 20) + 10, this.keyY + 30, 40, 60)) {
        this.win = true;
    }
}

Level2.prototype.handleKeyPressed = function () { };
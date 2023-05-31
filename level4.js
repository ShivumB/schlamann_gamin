function Dog(x, y) {

    this.x = x;
    this.y = y;

    this.spawnX = x;
    this.spawnY = y;

    this.velX = 0;
    this.velY = 0;

    this.canJump = false;

    //0 is right, 1 is left
    this.facing = 0;

    this.frame = 0;

    this.sprites = [[], []];

    for (let i = 0; i < 6; i++) {
        this.sprites[0].push(loadImage("assets/images/level4/runR" + i + ".png"));
        this.sprites[1].push(loadImage("assets/images/level4/runL" + i + ".png"));
    }

}

Dog.prototype.act = function (blocks, spikes) {

    if (keys[81]) this.velX--;

    if (keys[80]) this.velX++;

    if (keys[82] && this.canJump) {
        this.velY = -18;
        this.canJump = false;
    }

    if (!keys[81] && !keys[80]) this.velX *= 0.8;
    this.velY += 1;

    if (this.velX < -10) this.velX = -10;
    else if (this.velX > 10) this.velX = 10;

    if (this.velY > 15) this.velY = 15;

    this.x += this.velX;

    if (this.x < 0) {
        this.x = 0;
        this.velX = 0;
    }

    if (this.x > 600 - 32) {
        this.x = 600 - 32;
        this.velX = 0;
    }

    for (let i = 0; i < blocks.length; i++) {
        if (this.x + 32 > blocks[i].x && this.x < blocks[i].x + 40 && this.y + 32 > blocks[i].y && this.y < blocks[i].y + 40) {
            if (this.x + 16 < blocks[i].x + 20) {
                this.x = blocks[i].x - 32;
                this.velX = 0;
            } else {
                this.x = blocks[i].x + 40;
                this.velX = 0;
            }
        }
    }

    this.y += this.velY;

    this.canJump = false;
    for (let i = 0; i < blocks.length; i++) {
        if (this.x + 32 > blocks[i].x && this.x < blocks[i].x + 40 && this.y + 32 > blocks[i].y && this.y < blocks[i].y + 40) {
            if (this.y + 16 < blocks[i].y + 20) {
                this.y = blocks[i].y - 32;
                this.canJump = true;
            } else {
                this.velY = 0;
                this.y = blocks[i].y + 40;
            }
        }
    }

    for (let i = 0; i < spikes.length; i++) {
        if (this.x + 32 > spikes[i].x && this.x < spikes[i].x + 40 && this.y < spikes[i].y + 40 && this.y + 32 > spikes[i].y) {

            this.x = this.spawnX;
            this.y = this.spawnY;

        }
    }

    if (this.velX > 0) this.facing = 0;
    if (this.velX < 0) this.facing = 1;

    if (Math.abs(this.velX) > 1) {

        image(this.sprites[this.facing][Math.floor(this.frame / 5) % 6], this.x, this.y);

    } else {
        image(this.sprites[this.facing][1], this.x, this.y);
    }

    this.frame++;

};

function Block(x, y, sprite) {
    this.x = x;
    this.y = y;

    this.sprite = sprite;
}

Block.prototype.show = function () {
    image(this.sprite, this.x, this.y);
};

function Spike(x, y, sprite) {

    this.x = x;
    this.y = y;

    this.sprite = sprite;
}

Spike.prototype.show = function () {

    image(this.sprite, this.x, this.y);

};

function Level4Goal(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = loadImage("assets/images/key.png");
}

Level4Goal.prototype.show = function () {
    image(this.sprite, this.x, this.y, 40, 40);
};

function Level4() {

    this.level = [
        1, 1, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 8, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 8, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 8, 0, 0, 0, 0, 8, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 8, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 8, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 8, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
    ];

    this.groundSprites = [];
    for(let i = 0; i < 4; i++) this.groundSprites.push(loadImage("assets/images/level4/ground" + i + ".png"));

    this.p = new Dog(560, 520);

    this.blocks = [];
    this.spikes = [];

    this.spikeSprite = loadImage("assets/images/level4/lava.png");

    this.goal;

    for (let i = 0; i < 15; i++) {

        for (let j = 0; j < 15; j++) {

            if (this.level[i * 15 + j] == 1) {
                this.blocks.push(new Block(j * 40, i * 40, this.groundSprites[Math.floor(Math.random()*4)]));
            }
            if (this.level[i * 15 + j] == 8) {
                this.spikes.push(new Spike(j * 40, i * 40, this.spikeSprite));
            }
            if (this.level[i * 15 + j] == 2) {
                this.goal = new Level4Goal(j * 40, i * 40);
            }

        }

    }

    this.win = false;

    this.bg = loadImage("assets/images/level4/hell.png");

}

Level4.prototype.play = function () {

    image(this.bg, 0, 0);
    background(0, 150);

    this.p.act(this.blocks, this.spikes);

    for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].show();
    }

    for (let i = 0; i < this.spikes.length; i++) {
        this.spikes[i].show();
    }

    if (this.p.x + 40 > this.goal.x && this.p.x < this.goal.x + 40 && this.p.y + 40 > this.goal.y && this.p.y < this.goal.y + 40) {
        this.win = true;
    }

    this.goal.show();

};

Level4.prototype.handleKeyPressed = function () { };
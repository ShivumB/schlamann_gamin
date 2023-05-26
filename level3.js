function Mole(x, y) {

    this.x = x;
    this.y = y;

    this.frame = 0;

    this.id = 0;

    this.height = 0;

    this.broken = false;

}

Mole.prototype.show = function (moleSprites) {

    if (this.broken) return;

    if (this.id == 1) {

        this.y = 360;

        if (this.frame < 20) {

            image(moleSprites[Math.floor(this.frame / 4)],this.x - 10,this.y - 5, 60, 60);

        } else if (this.frame < 80) {
            image(moleSprites[5],this.x - 10,this.y - 5, 60, 60);

        } else if(frame < 100) {

            image(moleSprites[4 - Math.floor((this.frame - 80) / 4)],this.x - 10,this.y - 5, 60, 60);
        }

    } else if (this.id == 2) {
        
        if(this.frame < 20) {

            this.y += 0.15*(340 - this.y);

        } else if(this.frame < 80) {
            this.y = 340;
        } else if(this.frame < 100) {
            this.y += 0.15*(400 - this.y);
        }

        image(moleSprites[6], this.x - 5, this.y, 60, 60);
    }

    this.frame++;
};


function MoleSystem(holeCount) {

    this.moles = [];

    let spacing = 600 / (holeCount + 1);

    for (let i = 0; i < holeCount; i++) {
        this.moles.push(new Mole(i * spacing + 75, 380));
    }


    this.frame = 0;

    this.goldMole = -1;

}


MoleSystem.prototype.act = function (moleSprites) {

    this.goldMole = -1;

    if (this.frame == 100) {

        for (let i = 0; i < this.moles.length; i++) {
            this.moles[i].id = Math.floor(Math.random() * 2);
            this.moles[i].frame = 0;

            this.moles[i].broken = false;

            fill(0);
        }

        if (Math.random() < 0.5) {
            this.moles[Math.floor(Math.random() * this.moles.length)].id = 2;

        }

    } else if (this.frame > 100) {

        for (let i = 0; i < this.moles.length; i++) {

            if(this.moles[i].id == 2) {
                this.goldMole = i;
                continue;
            }

            this.moles[i].show(moleSprites);
        }


    }

    this.frame++;
    this.frame %= 200;
};

function Hammer() {
    this.x = 40;
    this.y = 200;

    this.targetX = 0;

    this.selectedMole = 0;

    this.frame = 0;

    this.win = false;
}

Hammer.prototype.smash = function () {

    if (this.frame < 8) {
        this.y += (350 - this.y) * 0.5;
    }

    if (this.frame < 20) {
        this.y += (200 - this.y) * 0.2;
    }

    this.frame++;

};

Hammer.prototype.act = function (moles) {

    if (Math.abs(this.targetX - this.x) < 1) {
        this.x = this.targetX;
    }

    this.x += (this.targetX - this.x) * 0.2;

    fill(0);
    rect(this.x, this.y, 40, 40);

    this.smash();

    for (let i = 0; i < moles.length; i++) {

        if (moles[i].id > 0 && this.x + 40 > moles[i].x && this.x < moles[i].x + 40 && this.y + 40 > moles[i].y && this.y < moles[i].y + 40) {


            if (moles[i].id == 2) {
                this.win = true;
            }

            moles[i].broken = true;
        }
    }
};

function Level3() {

    this.p = new Hammer();

    this.ms = new MoleSystem(5);

    this.win = false;

    this.moleSprites = [];
    for(let i = 0; i < 6; i++) {
        this.moleSprites.push(loadImage("assets/level3/mole" + i + ".png"));
    }

    this.moleSprites.push(loadImage("assets/key.png"));

    this.bgClouds = loadImage("assets/level3/bgClouds.png");
    this.bgSea = loadImage("assets/level3/bgSea.png");
    this.bgGrass = loadImage("assets/level3/bgGrass.png");

    this.bgX = 0;
}

Level3.prototype.play = function (keys) {

    image(this.bgClouds, this.bgX, 0);
    image(this.bgClouds, this.bgX - 1400, 0);

    if(this.bgX > 2200) {
        this.bgX = 800;
    }

    this.bgX += 0.1;

    image(this.bgSea, 0, 0);

    if(this.ms.goldMole >= 0) this.ms.moles[this.ms.goldMole].show(this.moleSprites);

    image(this.bgGrass, 0, 0);

    this.ms.act(this.moleSprites);

    this.p.act(this.ms.moles);

    if (this.p.win) this.win = true;
}

Level3.prototype.handleKeyPressed = function () {

    var spacing = 600 / (5 + 1);

    if (keyCode === 65) {
        this.p.selectedMole = Math.max(0, this.p.selectedMole - 1);

        this.p.targetX = this.p.selectedMole * spacing + 75;
    }

    if (keyCode === 68) {

        this.p.selectedMole = Math.min(4, this.p.selectedMole + 1);
        this.p.targetX = this.p.selectedMole * spacing + 75;
    }

    if (keyCode === 83) {
        this.p.frame = 0;
        this.p.smash();
    }

};
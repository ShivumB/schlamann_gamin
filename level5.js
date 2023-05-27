function Dial(x, y) {

    this.theta = 0;
    this.omega = 4;

    this.x = x;
    this.y = y;
    this.r = 50;

    this.arcPos = Math.random() * 360;
    this.initArcWidth = 160;
    this.arcWidth = this.initArcWidth;
}

Dial.prototype.act = function() {

    fill(255,0,0);
    stroke(0);
    strokeWeight(3);
    ellipse(this.x, this.y, 2*this.r, 2*this.r);

    fill(255);
    arc(this.x, this.y, 2*this.r, 2*this.r, this.arcPos - this.arcWidth/2, this.arcPos + this.arcWidth/2);

    line(this.x, this.y, this.x + this.r*cos(this.theta), this.y + this.r*sin(this.theta));

    this.theta += this.omega;
    this.theta %= 360;

    if(this.theta < 0) this.theta += 360;
}

Dial.prototype.hit = function(bar, panda) {

    let low = (this.arcPos - this.arcWidth/2) % 360;
    let high = (this.arcPos + this.arcWidth/2) % 360;

    if(low < 0) low += 360;
    if(high < 0) high += 360;

    if((low < high && this.theta >= low && this.theta <= high) || (low > high && (this.theta >= low || this.theta <= high))) {

        this.arcPos = 360*Math.random();
        this.arcWidth = Math.max(0, this.arcWidth - 10);

        bar.targetProgress += bar.width/16;

        panda.success = true;

        this.omega *= -1;
        
    } else {
        this.arcWidth = Math.min(this.initArcWidth, this.arcWidth + 10);
        bar.targetProgress = Math.max(0, bar.targetProgress - bar.width/16);
        panda.success = false;
    }
}

function ProgressBar(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.progress = 0;
    this.targetProgress = 0;
}

ProgressBar.prototype.act = function(panda) {

    fill(0, 255, 0);

    if(!panda.success && panda.frame < 28) {
        fill(255,0,0);
    }

    noStroke();
    rect(this.x, this.y, this.progress, this.height, 10)

    strokeWeight(5);
    stroke(0);
    noFill();
    rect(this.x, this.y, this.width, this.height, 10);

    this.progress += 0.1*(this.targetProgress - this.progress);

}

function Level5Key(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = loadImage("assets/images/key.png");

    this.win = false;

    this.frame = 0;
}

function Panda(x, y) {
    this.x = x;
    this.y = y;

    this.sprites = [loadImage("assets/images/level5/panda0.png"), loadImage("assets/images/level5/panda1.png"), loadImage("assets/level5/panda2.png")];

    this.frame = 100;

    this.success = true;
}

Panda.prototype.act = function() {

    if(this.frame < 28) {

        if(this.success) {
            image(this.sprites[Math.min(2, Math.floor(this.frame / 7))], this.x, this.y);
        } else {
            image(this.sprites[1], this.x, this.y);
        }

        this.frame++;
    } else {
        image(this.sprites[0], this.x, this.y);
    }
}

Level5Key.prototype.act = function(bar) {
    image(this.sprite, this.x, this.y + 5 * Math.sin(this.frame / 30), 60, 60);

    this.frame++;
}

function Level5() {

  this.d = new Dial(450, 450);

  this.bar = new ProgressBar(25, 75, 450, 60);
  this.key = new Level5Key(500, 75);
  this.panda = new Panda(230, 400);

  this.win = false;

  this.bg = loadImage("assets/images/level5/bg.png");
}

Level5.prototype.play = function(keys) {
    
    image(this.bg, 0, 0);

    this.d.act();

    this.bar.act(this.panda);

    this.panda.act();

    this.key.act(this.bar);
  
    if(this.bar.progress >= this.bar.width - 0.5) this.win = true;

};

Level5.prototype.handleKeyPressed = function() {
    if(keyCode == 87) {
        this.d.hit(this.bar, this.panda);
        this.panda.frame = 0;
    }
};
function Bullet(r, theta, x, y, sprite) {
  
    this.initX = x;
    this.initY = y;
  
    this.theta = theta;
    this.r = r;
    
    this.speed = 12;
    
    this.broken = false;
  
    this.sprite = sprite;
    
}

Bullet.prototype.act = function(targets) {

    this.r += this.speed;
    
    let x = this.initX + this.r * cos(this.theta);
    let y = this.initY + this.r * sin(this.theta);
    
    for(let i = targets.length - 1; i >= 0; i--) {
        if(checkCollision(x, y, 30, 30, this.theta, targets[i].x + 20, targets[i].y + 20, 40, 40)) {
            targets[i].broken = true; 
            this.broken = true;
        }
    }
    
    push();
    
    translate(x, y);
    rotate(this.theta - 90);
  
    //rect(0, -5, 20, 10);
    
    image(this.sprite, -15, -15, 30, 30);
  
    pop();

};

function Gun() {
    this.theta = 0;
    this.omega = 0;
    
    this.timer = 0;
    
    this.x = 50;
    this.y = 550;

    //these control the size of the hitbox, not the image - the image is fixed
    this.width = 85;
    this.height = 35;
    
    this.velX = 0;
    this.velY = 0;
  
    this.sprite = loadImage("assets/images/level1/watergun.png");
}

Gun.prototype.act = function(keys, bullets, bulletSprite) {
  
    if(keys[85]) this.omega -= 0.5;   
    if(keys[73]) this.omega += 0.5;
    
    
    if(this.omega > 5) this.omega = 5;
    if(this.omega < -5) this.omega = -5;
    
    if(!keys[85] && !keys[73]) this.omega *= 0.8;   
    
    
    if(keys[76] && this.timer <= 0) {
        this.shoot(bullets, bulletSprite);
        this.timer = 10;
    }
    
    if(keys[68]) this.velX -= 0.5;
    if(keys[71]) this.velX += 0.5;
    if(keys[82]) this.velY -= 0.5;
    if(keys[70]) this.velY += 0.5;
    
    if(!keys[68] && !keys[71]) this.velX *= 0.8;
    if(!keys[82] && !keys[70]) this.velY *= 0.8;
    
    if(this.velX > 3) this.velX = 3;
    if(this.velX < -3) this.velX = -3;
    if(this.velY > 3) this.velY = 3;
    if(this.velY < -3) this.velY = -3;
    
    this.x += this.velX;
    this.y += this.velY;
    
    if(this.x < 0) this.x = 0;
    if(this.x > 600) this.x = 600;
    if(this.y < 0) this.y = 0;
    if(this.y > 600) this.y = 600;
    
    this.timer--;
  
    this.theta += this.omega;
    
    push();
    
    translate(this.x, this.y);
    
    rotate(this.theta);

    //use these to show hitbox
    // noFill();
    // stroke(0);
    // strokeWeight(3);
    // rect(-this.width/2, -this.height/2, this.width, this.height);
    image(this.sprite, -100/2,  -50/2, 100, 50);
  
    pop();
    
};

Gun.prototype.shoot = function(bullets, bulletSprite) {
    bullets.push(new Bullet(0, this.theta, this.x, this.y, bulletSprite));
};

function Target(x, y) {
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    
    this.broken = false;
}

Target.prototype.act = function(player, safeZones, bulletSprite) {
    
    this.velX += Math.random() - 0.5;
    this.velY += Math.random() - 0.5;

    if(this.velX > 2) this.velX = 2;
    if(this.velX < -2) this.velX = -2;

    if(this.velY > 2) this.velY = 2;
    if(this.velY < -2) this.velY = -2;

    this.x += this.velX;
    this.y += this.velY;

    if(this.x > 600) this.x = 600;
    if(this.x < 0) this.x = 0;
    
    if(this.y > 600) this.y = 600;
    if(this.y < 0) this.y = 0;
    
    if(checkCollision(player.x, player.y, player.width, player.height, player.theta, this.x + 20, this.y + 20, 40, 40)) {
        player.x = 75;
        player.y = 525;
    }

     for(let i = 0; i < safeZones.length; i++) {
        
        if(safeZones[i].x + safeZones[i].width > this.x && safeZones[i].x < this.x + 40 && safeZones[i].y + safeZones[i].height > this.y && safeZones[i].y < this.y + 40) {
            
            this.x = Math.random()*50 + height/2;
            this.y = Math.random()*50 + width/2;
        
        }
        
    }   
  
    fill(255, 0, 0, 100);
    stroke(0);
    rect(this.x, this.y, 40, 40);
    
};

function SafeZone(x, y) {
  this.x = x;
  this.y = y;

  this.width = 210;
  this.height = 210;
}

SafeZone.prototype.act = function() {    
    noStroke();
    fill(0,0,255,100);
    rect(this.x, this.y, this.width, this.height); 
};

function Level1() {
  
  this.p = new Gun();

  this.bullets = [];
  
  this.targets = [];
  for(var i = 0; i < 125; i++) {
      this.targets.push(new Target(Math.random()*580 + 10, Math.random()*580 + 10));   
  }
  
  this.safeZones = [new SafeZone(0,390), new SafeZone(390,0)];  
    
  this.keySprite = loadImage("assets/images/key.png");
  this.bulletSprite = loadImage("assets/images/level1/droplet.png");

  this.win = false;
  
}

Level1.prototype.play = function(keys) {

    background(255);
    background(0, 0, 0, 90);

    stroke(0, 50);
    strokeWeight(1);
    for(let i = 0; i < 600; i += 30) {
        line(i, 0, i, 600);
        line(0, i, 600, i);
    }
    
    for(let i = this.bullets.length - 1; i >= 0; i--) {
        
        if(this.bullets[i].broken) {
            this.bullets.splice(i,1);
            continue;
        }
        
        this.bullets[i].act(this.targets, this.p); 
        
        if(this.bullets[i].r > 600) {
            this.bullets.splice(i, 1);   
        }
    }
    
    for(let i = this.targets.length - 1; i >= 0; i--) {
     
        if(this.targets[i].broken) {
            this.targets.splice(i, 1);
            continue;
        }
        
        this.targets[i].act(this.p, this.safeZones);
        
    }
    
    for(let i = 0; i < this.safeZones.length; i++) {
        this.safeZones[i].act();   
    }
    
    
    this.p.act(keys, this.bullets, this.bulletSprite);
  
    if(checkCollision(this.p.x, this.p.y, this.p.width, this.p.height, this.p.theta, (480 + 10) + 20, (80) + 30, 40, 60)) {
      this.win = true;
    }
  
    fill(255, 255,0);
    
    //use these to show hitbox
    // noFill();
    // stroke(0);
    // strokeWeight(3);
    // rect(480 + 10, 80, 40, 60);

    //image is too big, so we pretend that the hitbox starts at 490, is only 40 / 60 px wide
    image(this.keySprite, 480, 80);
}

Level1.prototype.handleKeyPressed = function(){};
function Bullet(r, theta) {
  
    this.r = r;
    this.theta = theta;
    
    this.speed = 50;
    
    this.broken = false;
    
}

Bullet.prototype.act = function(targets, p) {

    this.r += this.speed;
    
    this.speed --;
    
    
    let x = p.x + this.r * cos(this.theta);
    let y = p.y + this.r * sin(this.theta);
    
    for(let i = targets.length - 1; i >= 0; i--) {
        if(Math.abs(x - targets[i].x) < 40 && Math.abs(y - targets[i].y) < 40) {
            targets[i].broken = true; 
            this.broken = true;
        }
    }
    
    push();
    
    translate(x, y);
    rotate(this.theta);
    
    fill(0);
    rect(0, -5, 20, 10);
    
    pop();

};

function Gun() {
    this.theta = 0;
    this.omega = 0;
    
    this.timer = 0;
    
    this.x = 50;
    this.y = 550;
    
    this.velX = 0;
    this.velY = 0;
}

Gun.prototype.act = function(keys, bullets) {
  
    if(keys[82]) this.omega -= 0.5;   
    if(keys[84]) this.omega += 0.5;
    
    
    if(this.omega > 5) this.omega = 5;
    if(this.omega < -5) this.omega = -5;
    
    if(!keys[82] && !keys[84]) this.omega *= 0.8;   
    
    
    if(keys[75] && this.timer <= 0) {
        this.shoot(bullets);
        this.timer = 5;
    }
    
    if(keys[65]) this.velX --;
    if(keys[68]) this.velX++;
    if(keys[87]) this.velY --;
    if(keys[83]) this.velY ++;
    
    if(!keys[65] && !keys[68]) this.velX *= 0.8;
    if(!keys[87] && !keys[83]) this.velY *= 0.8;
    
    if(this.velX > 10) this.velX = 10;
    if(this.velX < -10) this.velX = -10;
    if(this.velY > 10) this.velY = 10;
    if(this.velY < -10) this.velY = -10;
    
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
    
    fill(255, 0, 0, 100);
    rect(-30, -10, 60, 10);
    rect(-30, 0, 10, 10);
    
};

Gun.prototype.shoot = function(bullets) {
    bullets.push(new Bullet(0, this.theta));
};

function Target(x, y) {
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    
    this.broken = false;
}

Target.prototype.act = function(player, safeZones) {
    
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
    
    if(Math.abs(this.x - player.x) < 30 && Math.abs(this.y - player.y) < 30) {
        player.x = 75;
        player.y = 525;
    }

     for(let i = 0; i < safeZones.length; i++) {
        
        if(safeZones[i].x + 200 > this.x && safeZones[i].x < this.x + 40 && safeZones[i].y + 200 > this.y && safeZones[i].y < this.y + 40) {
            
            this.x = Math.random()*50 + height/2;
            this.y = Math.random()*50 + width/2;
        
        }
        
    }   
  
    fill(0, 0, 255, 100);
    stroke(0);
    rect(this.x, this.y, 40, 40);
    
};

function SafeZone(x, y) {
  this.x = x;
  this.y = y;
}

SafeZone.prototype.act = function() {    
    noStroke();
    fill(0,255,255,150);
    rect(this.x, this.y, 200, 200); 
};

function Level1() {
  
  this.p = new Gun();

  this.bullets = [];
  
  this.targets = [];
  for(var i = 0; i < 25; i++) {
      this.targets.push(new Target(Math.random()*580 + 10, Math.random()*580 + 10));   
  }
  
  this.safeZones = [new SafeZone(0,400), new SafeZone(400,0)];  
  
}

Level1.prototype.play = function(keys) {

    background(255);
    background(255, 255, 0, 100);
    
    for(let i = this.bullets.length - 1; i >= 0; i--) {
        
        if(this.bullets[i].broken) {
            this.bullets.splice(i,1);
            continue;
        }
        
        this.bullets[i].act(this.targets, this.p); 
        
        if(this.bullets[i].r > 450) {
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
    
    
    this.p.act(keys, this.bullets);

}

Level1.prototype.handleKeyPressed = function(){};
function Dog(x, y) {
    
    this.x = x;
    this.y = y;
    
    this.spawnX = x; 
    this.spawnY = y; 
    
    this.velX = 0;
    this.velY = 0;
    
    this.canJump = false;

}

Dog.prototype.act = function(blocks, spikes) {
    
    if(keys[65]) this.velX--;
  
    if(keys[68]) this.velX++;
  
    if(keys[87] && this.canJump) {
      this.velY = -18;
      this.canJump = false;
    }
    
    if(!keys[65] && !keys[68]) this.velX *= 0.8;
    this.velY += 1;
    
    if(this.velX < -10) this.velX = -10;
    else if(this.velX > 10) this.velX = 10;
    
    if(this.velY > 15) this.velY = 15;
    
    this.x += this.velX;
    
    if(this.x < 0) {
      this.x = 0;
      this.velX = 0;
    }
  
    if(this.x > 560) {
      this.x = 560;
      this.velX = 0;
    }
    
    for(let i = 0; i < blocks.length; i++) {
        if(this.x + 40 > blocks[i].x && this.x < blocks[i].x + 40 && this.y + 40 > blocks[i].y && this.y < blocks[i].y + 40) {
            if(this.x + 20 < blocks[i].x + 20) {
                this.x = blocks[i].x - 40;   
                this.velX = 0;
            } else {
                this.x = blocks[i].x + 40;
                this.velX = 0;
            }
        }
    }
    
    this.y += this.velY;
    
    this.canJump = false;
    for(let i = 0; i < blocks.length; i++) {
        if(this.x + 40 > blocks[i].x && this.x < blocks[i].x + 40 && this.y + 40 > blocks[i].y && this.y < blocks[i].y + 40) {
            if(this.y + 20 < blocks[i].y + 20) {
                this.y = blocks[i].y - 40;      
                this.canJump = true;
            } else {
                this.velY = 0;
                this.y = blocks[i].y + 40;
            }
        }
    }
    
    for(let i = 0; i < spikes.length; i++){
        if(this.x + 40 > spikes[i].x && this.x < spikes[i].x + 40 && this.y < spikes[i].y + 40 && this.y + 40 > spikes[i].y) {

          this.x = this.spawnX;   
          this.y = this.spawnY; 
        
        }
    }
    
    
    
    fill(255, 0, 255, 100);
    rect(this.x, this.y, 40, 40);
    
};

function Block(x, y) {
    this.x = x;
    this.y = y;
}

Block.prototype.show = function() {
    fill(0);
    rect(this.x, this.y, 40, 40);  
};

function Spike(x, y) {
  
    this.x = x;
    this.y = y;
}

Spike.prototype.show = function() {
  
    fill(227, 133, 50);
    rect(this.x, this.y, 40, 40);
    
};

function Level4Goal(x, y) {
  this.x = x;
  this.y = y;
}

Level4Goal.prototype.show = function() {
  
  fill(255, 255, 0);
  rect(this.x, this.y, 40, 40);
};

function Level4() {

  this.level = [
    1,1,1,8,0,0,0,0,0,0,0,0,0,0,1,1,1,1,8,0,0,0,0,0,0,0,0,0,0,1,1,1,1,8,0,0,1,1,1,1,1,0,0,0,1,1,1,8,0,0,0,1,1,1,0,0,0,0,1,1,1,8,0,0,0,0,8,1,1,0,0,0,0,1,1,1,0,0,0,0,8,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,8,1,0,0,0,0,0,1,1,1,1,0,0,0,0,8,1,0,0,1,1,1,1,1,1,1,0,0,0,0,8,1,0,0,0,0,1,1,1,1,1,8,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,8,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0

];
  
  this.p = new Dog(560, 520);
  this.blocks = [];
  this.spikes = [];
  
  this.goal;
  
  for(let i = 0; i < 15; i++) {
    
    for(let j = 0; j < 15; j++) {
     
        if(this.level[i*15 + j] == 1) {
            this.blocks.push(new Block(j * 40, i * 40));
        }
        if(this.level[i*15 + j] == 8) {
            this.spikes.push(new Spike(j * 40, i * 40));
        }
        if(this.level[i * 15 + j] == 2) {
          this.goal = new Level4Goal(j * 40, i * 40);
        }

    }
    
  }
  
  this.win = false;
  
}

Level4.prototype.play = function() {

    background(100, 100);
    
    this.p.act(this.blocks, this.spikes);
    
    for(let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].show();   
    }
    
    for(let i = 0; i < this.spikes.length; i++){
        this.spikes[i].show(); 
    }
  
    if(this.p.x + 40 > this.goal.x && this.p.x < this.goal.x + 40 && this.p.y + 40 > this.goal.y && this.p.y < this.goal.y + 40) {
        this.win = true;
    }
  
    this.goal.show();
  
};

Level4.prototype.handleKeyPressed = function() {};
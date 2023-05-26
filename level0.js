function Pawn(x, y) {
    this.x = x;
    this.y = y;
  
    this.width = 55;
    this.height = 55;
    
    this.targetX = this.x;
  
    this.sprite = loadImage("assets/level0/wP.png");
}

Pawn.prototype.act = function(rooks) {
    
    if(Math.abs(this.targetX - this.x) > 0.1) {
        this.x += 0.3*(this.targetX - this.x);
    }
    
    for(let i = 0; i < rooks.length; i++) {
        
        if(this.x + 55 > rooks[i].x && this.x < rooks[i].x + 55 && this.y + 55 > rooks[i].y && this.y < rooks[i].y + 55) {
            this.x = 0;
            this.y = 4 * 75;
            this.targetX = this.x;
        }
        
    }
    
    image(this.sprite, this.x + 4, this.y + 4);
};

function Rook(x, y) {
  
    this.x = x;
    this.y = y;
    
    this.targetY = 525;
  
    this.sprite = loadImage("assets/level0/bR.png");
}

Rook.prototype.act = function() {
  
    if(Math.abs(this.targetY - this.y) < 0.1) {
        this.targetY = 525 - this.targetY;
    }
    
    this.y += 0.2*(this.targetY - this.y);
    
    image(this.sprite, this.x + 4, this.y + 4);
  
};

function Level0() {
    
  this.p = new Pawn(0, 4 * 75);

  this.rooks = [];
  
  this.rooks.push(new Rook(1*75, 0));
  this.rooks.push(new Rook(3*75, 370));
  this.rooks.push(new Rook(5*75, 500));
  this.rooks.push(new Rook(6*75, 0));
  
  this.win = false;
  
  this.keySprite = loadImage("assets/key.png");
  
}

Level0.prototype.play = function(keys) {
  
    noStroke();
    for(let i = 0; i < 8; i ++) {
        for(let j = 0; j < 8; j ++) {
            
            if((i + j) % 2 == 1) {
                fill(50, 50, 70);
            } else {
                fill(30, 30, 40);
            }
            
            rect(i*75, j*75, 75, 75);
            
        }
    }
    
    this.p.act(this.rooks);
    
    for(let i = 0; i < this.rooks.length; i++) {
        this.rooks[i].act();   
    }
  
  
    if(this.p.x + this.p.width > 7*75 && this.p.x < 7*75 + 75 && this.p.y + this.p.height > 4*75 && this.p.y < 4*75 + 75) {
      this.win = true;
    }
  
  fill(0,255,255);
  
  
  image(this.keySprite, 7*75 + 4, 4*75 + 4);
    
}

Level0.prototype.handleKeyPressed = function() {
   if(keyCode == 82) {
      this.p.targetX += 75;
   }
}
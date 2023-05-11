function Pawn(x, y) {
    this.x = x;
    this.y = y;
    
    this.targetX = this.x;
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
    
    fill(0);
    noStroke();
    rect(this.x + 10, this.y + 10, 55, 55);
};

function Rook(x, y) {
  
    this.x = x;
    this.y = y;
    
    this.targetY = 525;
}

Rook.prototype.act = function() {
  
    if(Math.abs(this.targetY - this.y) < 0.1) {
        this.targetY = 525 - this.targetY;
    }
    
    this.y += 0.2*(this.targetY - this.y);
    
    fill(255, 0, 0);
    rect(this.x + 10, this.y + 10, 55, 55);
};

function Level0() {
    
  this.p = new Pawn(0, 4 * 75);

  this.rooks = [];
  
  this.rooks.push(new Rook(1*75, 0));
  this.rooks.push(new Rook(3*75, 370));
  this.rooks.push(new Rook(5*75, 500));
  this.rooks.push(new Rook(6*75, 0));

}

Level0.prototype.play = function(keys) {
  
    noStroke();
    for(let i = 0; i < 8; i ++) {
        for(let j = 0; j < 8; j ++) {
            
            if((i + j) % 2 == 1) {
                fill(227, 174, 100);
            } else {
                fill(255, 217, 163);
            }
            
            rect(i*75, j*75, 75, 75);
            
        }
    }
    
    this.p.act(this.rooks);
    
    for(let i = 0; i < this.rooks.length; i++) {
        this.rooks[i].act();   
    }
    
}

Level0.prototype.handleKeyPressed = function() {
   if(keyCode == 82) {
      this.p.targetX += 75;
   }  
}
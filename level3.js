function Mole(x, y) {
  
  this.x = x;
  this.y = y;
      
  this.frame = 0;

  this.id = 0;
  
  this.height = 0;
  
  this.broken = false;

}

Mole.prototype.show = function() {
    
    if(this.broken) return;
    
    if(this.frame < 40) {
        this.height = this.frame;
    } else if(this.frame > 60) {
        this.height = Math.max(40 - (this.frame - 60), 0); 
    } else {
        this.height = 40;   
    }
    
    if(this.id == 1) {
        fill(179, 112, 18);
        
        rect(this.x, this.y - this.height + 40, 40, this.height);
      
    } else if(this.id == 2) {
        fill(251, 255, 0);
        
        rect(this.x, this.y - this.height + 40, 40, this.height);
    }
    
    this.frame++;
};


function MoleSystem(holeCount) {
  
  this.moles = [];
  
  let spacing = 600/(holeCount + 1);
  
  for(let i = 0; i < holeCount; i++) {
    this.moles.push(new Mole(i * spacing + 75, 300));   
  }


  this.frame = 0;

}


MoleSystem.prototype.act = function() {
  
  for(let i = 0; i < this.moles.length; i++) {
    
    fill(0);
    rect(this.moles[i].x, 340, 40, 10);
     
  }
  
  if(this.frame == 100) {
      
      for(let i = 0; i < this.moles.length; i++) {
        this.moles[i].id = Math.floor(Math.random() * 2);
        this.moles[i].frame = 0;
        
        this.moles[i].broken = false;
        
        fill(0);
      }
      
        if(Math.random() < 0.5) {
            this.moles[Math.floor(Math.random()*this.moles.length)].id = 2;  
            
        }
      
  } else if(this.frame > 100) {
      
     for(let i = 0; i < this.moles.length; i++) {
        this.moles[i].show();
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
}

Hammer.prototype.smash = function() {
  
    if(this.frame < 8) {
        this.y += (350 - this.y) * 0.5;
    }
    
    if(this.frame < 20) {
        this.y += (200 - this.y) * 0.2;
    }
    
    this.frame++;
    
};

Hammer.prototype.act = function(moles) {
      
    if(Math.abs(this.targetX - this.x) < 1) {
        this.x = this.targetX;   
    }
    
    this.x += (this.targetX - this.x)*0.2;
    
    fill(0);
    rect(this.x, this.y, 40, 40);
    
    this.smash();
    
    for(let i = 0; i < moles.length; i++) {
        
        if(moles[i].id > 0 && this.x + 40 > moles[i].x && this.x < moles[i].x + 40 && this.y + 40 > moles[i].y && this.y < moles[i].y + 40) {
            moles[i].broken = true;
        }
    }
};

function Level3() {
  
  this.p = new Hammer();
  
  this.ms = new MoleSystem(5);
}

Level3.prototype.play = function(keys) {
    
    background(255);
    background(0,255,255,100);
    
    noStroke();
    fill(0,255,0,100);
    rect(0,340,600,300);
    
    this.ms.act();

    this.p.act(this.ms.moles);
}

Level3.prototype.handleKeyPressed = function() {
  
    var spacing = 600/(5 + 1);
  
    if(keyCode === 65) {
        this.p.selectedMole = Math.max(0, this.p.selectedMole - 1);
      
        this.p.targetX = this.p.selectedMole * spacing + 75;
    }
    
    if(keyCode === 68) {
        
        this.p.selectedMole = Math.min(4, this.p.selectedMole + 1);
        this.p.targetX = this.p.selectedMole * spacing + 75;
    }
    
    if(keyCode === 83) {
        this.p.frame = 0;
        this.p.smash();
    }
  
};
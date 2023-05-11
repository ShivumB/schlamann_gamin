function Dial() {
  
    this.theta = 0;
    this.omega = 5;
  
    this.isSpinning = true;
    this.target_theta = Math.random()*360 + 1;
    this.target_width = 120;
    
    this.hitStatus = false;  
}

Dial.prototype.spin = function(){
  
    line(300, 300, 300 + 50*cos(this.theta), 300 + 50*sin(this.theta));
  
    this.theta += this.omega;

    if(this.theta < 0) this.theta += 360;
    this.theta %= 360;
};

Dial.prototype.still = function() {
  
    ellipse(300, 300, 100, 100);
  
    fill(0);
    
    strokeWeight(10);
    line(300, 300, 300 + 50*cos(this.theta), 300 + 50*sin(this.theta));

};

Dial.prototype.target = function(){
  
    fill(255, 227, 201);
    
    arc(300, 300, 100, 100, this.target_theta - this.target_width/2, this.target_theta + this.target_width/2);
  
};

Dial.prototype.checkHit = function(){
  
    if(this.target_theta - this.target_width/2 < this.theta && this.theta < this.target_theta + this.target_width/2) {
        
      this.hitStatus = true;
      this.target_width *= 0.8;
      
    } else {
      
        this.hitStatus = true;
        this.target_width = 120;
    }
  
  this.target_theta = Math.random()*360 + 1;
};

function Level5() {
  this.d = new Dial();
}

Level5.prototype.play = function(keys) {
    
    background(255);
    background(255, 0, 0, 100);
    fill(255, 0, 0);
    ellipse(600/2, 600/2, 100, 100);
    
    if(this.d.isSpinning) {
        this.d.target();
        this.d.spin();
    } else {
        this.d.still();
    }
  
    if(this.d.hitStatus) {
        fill(255,0,0);
        textSize(100);
      
        text(this.d.text, 100, 98);
    }
  
};

Level5.prototype.handleKeyPressed = function() {
      if(keyCode === 87){
        this.d.checkHit();
        this.d.omega = -this.d.omega;
    }
};
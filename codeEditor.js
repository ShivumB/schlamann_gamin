function CodeEditor() {
  this.xSpacing = 150;
  this.selectedFile = 0;  
}

CodeEditor.prototype.play = function(fileNames, fileData) {
  
    push();
    
    translate(600, 0);
  
    fill(60, 65, 75);
    noStroke();
    rect(0, 0, 600, 600);  
  
    textSize(20);
    
    this.xSpacing = 600 / (fileNames.length);
    
    noStroke();
    fill(100, 100, 110);
    rect(this.selectedFile * this.xSpacing, 0, this.xSpacing, 80, 10);    
    
    fill(100, 100, 110);
    rect(0, 45, 600, 600);
    
  
  
    for(let i = 0; i < fileData.length; i++) {
        fill(255);
        textAlign(CENTER);

        text(fileNames[i], i*this.xSpacing + this.xSpacing/2, 30);
        
        if(i == this.selectedFile) {
            textAlign(LEFT);
            text(fileData[i], 50, 110);
        }
    }
  
  pop();
};
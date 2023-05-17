var scene;
var level;

var levels;

var keys;

var frame;

var selectedTextOption;
var textOptions;

var dialogue;
var dialoguePage;
var dialogueFrag;

var codeEditor;
var fileNames;
var fileData;


var questionY = 400;
var showAnswers = false;
var questions;
var questionPage;
var questionFrag;
var answers;
var selectedAnswer;

function setup() {
  createCanvas(1200, 600);

  angleMode(DEGREES);

  scene = "questions";
  level = 1;

  levels = [];
  levels.push(new Level0());
  levels.push(new Level1());
  levels.push(new Level2());
  levels.push(new Level3());
  levels.push(new Level4());
  levels.push(new Level5());

  keys = [];

  frame = 0;

  selectedTextOption = 0;
  textOptions = [];

  dialogue = [
    "hey there", "the name's schlamann", "i put them in jail", "hope they don't break out!!!"
  ];
  
  dialoguePage = 0;
  dialogueFrag = "";
  
  codeEditor = new CodeEditor();
  fileNames = [
    
    ["main.java", "pawn.java"],
    
    ["main.java", "toy.java", "watergun.java"],
    
    ["main.java", "animal.java", "dog.java"],
    
    ["main.java", "robot.java", "vacuum.java"],
    
    ["main.java", "tool.java", "hammer.java"],
    
    ["main.java", "panda.java", "buffPanda.java"]
    
  ];
  
  fileData = [
    
    [
      //level 0
      "public class Main {\npublic static void main(String[] args) {\nPawn player = new Pawn();\nwhile(true) {\nplayer.act();\nif(player.touches(orb)) win = true;;\n}\n}\n}",
      
      "public class Pawn {\npublic Pawn() {\n...\n}\nprivate void move() {\nif(pressedKeys.get(‘R’) {\nthis.x += 40;\n}\n}\n}"
      
    ],
    
    [
      //level 1
      "public class Main {\npublic static void main(String[] args) {\nWatergun player = new Watergun();\nwhile(true) {\nplayer.act();\nif(winCondition) return;\n}\n}\n}",
      
      "public class Toy extends GameObject {\npublic Toy() {\n//the super constructor takes two arguments - x and y position\nsuper(0, 200);\nthis.angle = 0;\n}\nprotected void rotate() {\nif(pressedKeys.get(‘O’) {\nangle++;\n}\nif(pressedKeys.get(‘P’) {\nangle--;\n}\n}\n}",
      
      "",
    ],
    
    [
      //level 2
      "",
      "",
      "",
    ],
    
    [
      //level 3
      "",
      "",
      "",
    ],
    
    [
      //level 4
      "",
      "",
      "",
    ],
    
    [
      //level 5
      "",
      "",
      "",
    ]
    
  ];
  
  questions = [
    
    ["so", "you", "beat", "the", "first", "level huh you silly little goose well you know what that's great for you and all"],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
  ];
  
  questionPage = 0;
  questionFrag = 0;
  
  answers = [
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
    ["", "", "", ""],
    
  ];
  
  selectedAnswer = [0, 0];
  
}

function keyPressed() {

  keys[keyCode] = true;

  if (scene == "game") {

    //dev shortcut
    if (keyCode == 32) level = Math.min(5, level + 1);

    //make it prettier, handle in level object
    levels[level].handleKeyPressed();

  }

  else if (scene == "talk") {

    if(keyCode == 38) selectedTextOption ++;
    if(keyCode == 40) selectedTextOption --;
    
    selectedTextOption += textOptions.length;
    selectedTextOption %= textOptions.length;

    if(keyCode == 13) {

      if(selectedTextOption == 0) {
        scene = "prologue";
        frame = 0;
      } else if(selectedTextOption == 1) {
        scene = "settings";
        textOptions = ["return"];
        selectedTextOption = 0;
      }

    }

  }

  else if(scene == "settings") {
    if(keyCode == 13) {
      scene = "talk";
      textOptions = ["talk to mr. schlamann", "options"];
      selectedTextOption = 0;
    }
  }

  else if(scene == "prologue") {
    if(keyCode == 13) {
      if(dialoguePage + 1 < dialogue.length) {

        dialoguePage ++;
        frame = 0;

      } else {

        scene = "game";

      }

    }
  }
  
  else if(scene == "questions") {
    
    if(keyCode == 13) {
      
      if(questionPage + 1 < questions.length) {

        questionPage ++;
        frame = 0;

      } else {
        
        showAnswers = true;
        
      }
      
    }

  }
  
  
  
}

function keyReleased() {

  keys[keyCode] = false;

}

function mouseClicked() {
  
  if(scene == "game") {
    if(mouseY < 50 && mouseX > 600) {
        codeEditor.selectedFile = Math.max(Math.floor((mouseX - 600)/codeEditor.xSpacing), 0);
    }
  }
  
}

function draw() {

  switch (scene) {

    case "game":

      levels[level].play(keys);

      codeEditor.play(fileNames[level], fileData[level]);
      
      if(levels[level].win) {
      
        level++;
      
        frame = 0;
        scene = "questions";  
        questionPage = 0;
      
        if(level >= levels.length) scene = "epilogue";
      
      }
      
      break;

    case "intro":

      background(0);

      push();

      if (frame <= 50) {

      } else if (frame > 50 && -2 * (frame - 50) > -3200) {
        translate(-2 * (frame - 50), 0);
      } else {
        translate(-2 * (frame - 50), 0);
        frame = 0;
        scene = "talk";
        textOptions = ["talk to mr. schlamann", "options"];
        selectedTextOption = 0;
      }

      for (let i = 0; i < 6; i++) {
        fill(255);
        rect(i * 500 + 300, 250, 100, 100);
      }

      rect(7 * 500 + 300, 250, 50, 100);

      pop();

      frame += 10;
      break;

    case "talk":

      background(0);

      fill(255);
      rect(600, 250, 50, 100);

      textSize(30);

      fill(255, 0.1 * frame * frame);


      for (let i = 0; i < textOptions.length; i++) {

        if (i == selectedTextOption) {

          if (frame > 100) {
            triangle(425, 450 + 50 * i, 425, 430 + 50 * i, 440, 440 + 50 * i);
          }

        }

        text(textOptions[i], 450, 450 + 50 * i);
      }

      frame++;

      break;


      case "prologue":

      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(600, 250, 50, 100);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, 400, 600, 150);

      dialogueFrag = dialogue[dialoguePage].substring(0, frame/4);

      if(frame/4 > dialogue[dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();

      textSize(30);
      text(dialogueFrag, 325, 450);

      frame ++;

      break;
      
      case "questions":
      
      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(600, questionY - 150, 50, 100);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, questionY, 600, 150);

      questionFrag = questions[level - 1][questionPage].substring(0, frame/4);

      if(!showAnswers && frame/4 > questions[level - 1][questionPage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();

      textSize(30);
      text(questionFrag, 325, questionY + 50);

      if(showAnswers) {
        
        questionY += 0.1*(200 - questionY);
        
        if(Math.abs(200 - questionY) < 1) questionY = 200;
        
        if(questionY == 200) {
          

          noFill();
          stroke(255);
          strokeWeight(3);
          
          rect(300, 400, 600, 150);
          
          text(answers[0], 300, 300);
          text(answers[1], 300, 300);
          text(answers[2], 300, 300);
          text(answers[3], 300, 300);
          
        }
      }
      
      frame ++;
      
      break;

      case "settings":

      background(0);

      text("no settings for you", width/2, height/2);

      for (let i = 0; i < textOptions.length; i++) {

        if (i == selectedTextOption) {

          if (frame > 100) {
            triangle(425, 450 + 50 * i, 425, 430 + 50 * i, 440, 440 + 50 * i);
          }

        }

        text(textOptions[i], 450, 450 + 50 * i);
      }

      break;

  }

}
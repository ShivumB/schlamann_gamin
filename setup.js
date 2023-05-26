var scene;
var level;

var levels;

var keys;

var frame;

var selectedTextOption;
var textOptions;

var prologue;
var dialoguePage;
var dialogueFrag;

var codeEditor;
var fileNames;
var fileData;

var questionY = 400;
var showAnswers = false;

var questions;

var answers;
var selectedAnswer;
var correctAnswers;
var answeredCorrectly;
var answeredQuestion;

var responses;

var epilogue;
var lastLines;

var spritesPos;

var prisonbg;

function setup() {
  createCanvas(1200, 600);

  angleMode(DEGREES);

  textFont(loadFont('assets/fonts/VT323/VT323-Regular.ttf'));

  scene = "intro";
  level = 0;

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

  prologue = [
    "hey there",
    "the name's schlamann",
    "i put them in jail",
    "hope they don't break out!!!",
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

    ["main.java", "panda.java", "buffPanda.java"],
  ];

  fileData = [
    [
      //level 0
      "public class Main {\npublic static void main(String[] args) {\nPawn player = new Pawn();\nwhile(true) {\nplayer.act();\nif(player.touches(orb)) win = true;\n}\n}\n}",

      "public class Pawn {\npublic Pawn() {\n...\n}\nprivate void move() {\nif(pressedKeys.get(‘R’) {\nthis.x += 40;\n}\n}\n}",
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
    ],
  ];

  questions = [
    ["so", "you", "beat", "the", "first", "level huh you silly little goose well you know what that's great for you and all"],

    ["lemon", "tangerine", "ar", "sun"],

    ["am", "ak", "albert", "can"],

    ["so", "lol", "never", "engorge"],

    ["seminar", "samoa", "cookie", "yes"],

    ["letters", "art", "truthfully", "you rock"],
  ];

  answers = [
    ["yama", "oops", "inheritance", "object class"],

    ["so stupid", "artistic", "singul", "crazy"],

    ["shunned", "god", "lmao", "lmafao"],

    ["godless", "puppies", "nothign", "lick"],

    ["eagerness", "short", "exchange", "stranger"],

    ["while", "energy", "traer", "jos"],
  ];

  selectedAnswer = [0, 0];

  correctAnswers = [0, 0, 0, 0, 0, 0];

  answeredCorrectly = 0;
  answeredQuestion = false;
  responses = [
    [["yo", "what's poppin", "you got it wrong!"], ["WHY", "I CANT BELIEVEIT", "YOU IDIOT", "YOU GOT IT RIGHT!!!"]],

    [["some", "artistic", "sins"], ["i can't", "do", "this"]],

    [["when you show up", "i will kill", "god"], ["albequrque", "i live at 409 S monegro st", "christ"]],

    [["support my business", "corks", "anfweljnfewl"], ["never!", "what singul behavior", "erwnwejfnjen ,r"]],

    [["asdnajd,sn,jqawndj", "arkadyevich", "nlasnsakd"], ["someone!", "stunned my hand", "mejtb krunch"]],

    [["so, you've come to me", "on the day of my"], ["trick god", "never!", "just kidding"]],
  
  ];
  
  epilogue = ["art", "I CANT BELIVE THIS", "HOW COULD YOU!?!?!", "YOULL NEVER GET ME ALIVE"];
  
  lastLines = ["WHAT NONSENSE--", "ARGHHHH", "NOOOO!!!!!"];
  
  spritesPos = [
    [300, -10],
    [600, -10],
    [900, -10],
    [900, 610],
    [600, 610],
    [300, 610],
  ];
  
  prisonbg = loadImage("assets/prisonbg.png");
  
}

function keyPressed() {
  
  keys[keyCode] = true;

  if (scene == "game") {
    //make it prettier, handle in level object
    levels[level].handleKeyPressed();
    
  } else if (scene == "start") {
    
    if (keyCode == 38) selectedTextOption++;
    if (keyCode == 40) selectedTextOption--;

    selectedTextOption += textOptions.length;
    selectedTextOption %= textOptions.length;

    if (keyCode == 13) {
      if (selectedTextOption == 0) {
        scene = "prologue";
        frame = 0;
      } else if (selectedTextOption == 1) {
        scene = "settings";
        textOptions = ["return"];
        selectedTextOption = 0;
      }
    }
    
  } else if (scene == "settings") {
    
    if (keyCode == 13) {
      scene = "start";
      textOptions = ["talk to mr. schlamann", "options"];
      selectedTextOption = 0;
    }
    
  } else if (scene == "prologue") {
    
    if (keyCode == 13) {
      if (dialoguePage + 1 < prologue.length) {
        dialoguePage++;
        frame = 0;
      } else {
        scene = "game";
      }
    }
    
  } else if (scene == "questions") {
    
    if (keyCode == 13) {
      
      if (!answeredQuestion && dialoguePage + 1 < questions[level].length) {
        dialoguePage ++;
        frame = 0;
        
      } else if (!answeredQuestion) {
        
        if (!showAnswers) {
          showAnswers = true;
        } else {
          
          frame = 0;
          dialoguePage = 0;
          answeredQuestion = true;

          if (selectedAnswer[0] * 2 + selectedAnswer[1] == correctAnswers[level]) {
            answeredCorrectly = 1;
          } else {
            answeredCorrectly = 0;
          }
          
        }
        
      } else {
        
        if (dialoguePage + 1 < responses[level][answeredCorrectly].length) {
          
          dialoguePage++;
          frame = 0;
                    
        } else {
          
          if(answeredCorrectly == 1) {
            level++;
          } else {
            switch(level) {
              case 0: levels[0] = new Level0(); break;
              case 1: levels[1] = new Level1(); break;
              case 2: levels[2] = new Level2(); break;
              case 3: levels[3] = new Level3(); break;
              case 4: levels[4] = new Level4(); break;
              case 5: levels[5] = new Level5(); break;
            }
          }
          
          scene = "game";
        }
        
        
      }
    }

    if (showAnswers) {
      if (keyCode == 37 || keyCode == 39)
        selectedAnswer[1] = (selectedAnswer[1] + 1) % 2;
      if (keyCode == 38 || keyCode == 40)
        selectedAnswer[0] = (selectedAnswer[0] + 1) % 2;
    }
    
  } else if(scene == "epilogue") {
    
    
    if (keyCode == 13) {
      
      if (dialoguePage + 1 < epilogue.length) {
        dialoguePage++;
        frame = 0;
      } else {
        frame = 0;
        dialoguePage = 0;
        scene = "end";
      }
      
    }
    
    
  }
}

function keyReleased() {
  keys[keyCode] = false;
}

function mouseClicked() {
  if (scene == "game") {
    if (mouseY < 50 && mouseX > 600) {
      codeEditor.selectedFile = Math.max(
        Math.floor((mouseX - 600) / codeEditor.xSpacing),
        0
      );
    }
  }
}
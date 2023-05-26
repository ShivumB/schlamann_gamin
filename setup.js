let scene;
let level;

let levels;

let keys;

let frame;

let selectedTextOption;
let textOptions;

let prologue;
let dialoguePage;
let dialogueFrag;

let codeEditor;
let fileNames;
let fileData;

let questionY = 400;
let showAnswers = false;

let questions;

let answers;
let selectedAnswer;
let correctAnswers;
let answeredCorrectly;
let answeredQuestion;

let responses;

let epilogue;
let lastLines;

let spritesPos;

let prisonbg;

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
    ["Main.java", "Game.java", "Pawn.java"],

    ["Main.java", "Game.java", "Toy.java", "Watergun.java"],

    ["Main.java", "Game.java", "DogGame.java", "Dog.java"],

    ["Main.java", "Game.java", "VacuumGame.java", "Vacuum.java"],

    ["Main.java", "Game.java", "HammerGame.java", "Hammer.java"],

    ["Main.java", "Game.java", "Panda.java", "BuffPanda.java"],
  ];

  fileData = [
    [
      //level 0
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n"

      "class Game {\n\t// other variables and methods not shown\n\n\tprivate Pawn pawn = new Pawn();\n\tprivate boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“r”))\n\t\t\t\tpawn.move();\n\t\t\tif (proximity(pawn, enemies) == 0)\n\t\t\t\treset();\n\t\t\tif (proximity(pawn, key) == 0)\n\t\t\t\twin = true;\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",

      "class Pawn {\n\t// other variables and methods not shown\n\n\tprivate int x = 0;\n\tprivate int y = 300;\n\t\n\tPawn() {}\n\n\tvoid move() {\n\t\tthis.x += 40;\n\t}\n}\n",
    ],

    [
      //level 1
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",

      "class Game {\n\t// other variables and methods not shown\n\n\tprivate Watergun watergun = new Watergun();\n\tprivate boolean win = false;\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“o”))\n\t\t\t\twatergun.rotate(true);\n\t\t\tif (getKeysPressed().contains(“p”))\n\t\t\t\twatergun.rotate(true);\n\t\t\tif (getKeysPressed().contains(“q”))\n\t\t\t\twatergun.shoot();\n\t\t\tif (proximity(watergun, enemies) == 0)\n\t\t\t\treset();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",

      "class Toy {\n\t// other variables and methods not shown\n\n\tToy() { ... }\n\n\tvoid rotate(boolean counterclockwise) {\n\t\tif (counterclockwise) angle++;\n\t\telse angle--;\n\t}\n}\n",

      "class Watergun extends Toy {\n\t// other variables and methods not shown\n\n\tWatergun() { ... }\n\n\tvoid shoot() {\n\t\t...\n\t}\n}\n",
    ],

    [
      //level 2
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tDogGame g = new DogGame();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprotected Dog dog = new Dog();\n\tprotected Lava[] lava = { ... };\n\tprotected boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“p”))\n\t\t\t\tdog.left();\n\t\t\tif (getKeysPressed().contains(“w”))\n\t\t\t\tdog.right();\n\t\t\tif (getKeysPressed().contains(“r”))\n\t\t\t\tdog.jump;\n\t\t\tif (proximity(dog, lava) == 0)\n\t\t\t\treset();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",
      
      "class DogGame {\n\t// other variables and methods not shown\n\n\tDogGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“s”))\n\t\t\t\tdog.left();\n\t\t\tif (getKeysPressed().contains(“d”))\n\t\t\t\tdog.right();\n\t\t\tif (getKeysPressed().contains(“l”))\n\t\t\t\tdog.jump;\n\t\t\tif (proximity(dog, enemies) == 0)\n\t\t\t\treset();\n\t\t}\n\t}\n}\n",

      "class Dog {\n\t// other variables and methods not shown\n\nDog() { ... }\n\n\tvoid left() {\n\t\tthis.velX--;\n\t}\n\n\tvoid right() {\n\t\tthis.velX++;\n\t}\n\n  \tvoid jump() {\n\t\tif(this.y == 0)\n\t\t\tthis.velY = -15;\n\t}\n}\n"
    ],

    [
      //level 3
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new VacuumGame();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprotected Vacuum robot = new Vacuum();\n\tprotected boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile (true) {\n\t\t\tif (getKeysPressed().contains(“k”))\n\t\t\t\trobot.move();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",
      
      "class VacuumGame extends Game {\n\t// other variables and methods not shown\n\n\tVacuumGame() { ... }\n\t\n\tvoid instantWin() {\n\t\twin = true;\n\t}\n}\n",

      "class Vacuum {\n\t// other variables and methods not shown\n\n\tVacuum() { ... }\n\n\tvoid move() {\n\t\t...\n\t}\n}\n"
    ],

    [
      //level 4
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new HammerGame(“k”, “o”);\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprotected Hammer hammer = new Hammer();\n\tprotected Set<Enemy> enemies = new Set();\n\tprotected boolean win = false;\n\tprotected String moveKey;\n\tprotected String hitKey;\n\t\n\tGame(String moveKey, String hitKey) {\n\tthis.moveKey = moveKey;\n\tthis.hitKey = hitKey;\n}\n\n\tvoid addEnemy(Enemy e) {\n\t\tenemies.add(e);\n\t}\n\n\tvoid run() {\n\t\twhile (true) {\n\t\t\tif (getKeysPressed().contains(moveKey))\n\t\t\t\thammer.move();\n\t\t\tif (getKeysPressed().contains(hitKey))\n\t\t\t\thammer.hit();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n} \n",
      
      "class HammerGame extends Game {\n\t// other variables and methods not shown\n\n\tHammerGame() { ... }\n\n\tHammerGame() {\n\t\tsuper.moveKey = “r”;\n\t\tsuper.hitKey = “l”;\n\t}\n}\n",

      "class Hammer {\n\t// other variables and methods not shown\n\nHammer() { ... }\t\n\n\tvoid move() {\n\t\t...\n\t}\n\n\tvoid hit() {\n\t\t...\n\t}\n}\n"
    ],

    [
      //level 5
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprivate Panda panda = new BuffPanda();\n\tprivate boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“w”))\n\t\t\t\tpanda.startCurlUps();\n\t\t\tif (getKeysPressed().contains(“q”))\n\t\t\t\tpanda.addCurlUps();\n\t\t\tif (getKeysPressed().contains(“r”))\n\t\t\t\tpanda.addCurlUpsTimesTen();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",
      
      "class Panda {\n\t// other variables and methods not shown\n\n\tprivate int numCurlUps;\n\t\n\tPanda() { ... }\n\t\n\tvoid addCurlUp() {\n\t\tnumCurlUps++;\n\t}\n\n\tvoid addCurlUpsTimesTen() {\n\t\tnumPushUps += 10; \n\t}\n\n\tvoid startCurlUps() {\n\t\t...\n\t}\n}\n",

      "class BuffPanda extends Panda {\n\t// other variables and methods not shown\n\n\tBuffPanda() { ... }\n\n\tvoid addCurlUpsTimesTen(int n) {\n\t\tnumCurlUps += n * 10;\n\t}\n}\n"
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
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
var pSprites;

var cell;
var bars;
var deepslate;

var schlamann;

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
    "alright, bubs...",
    "or should i say, SCHL-ODERS...",
    "did i ever tell you about the time that i - ",
    "never mind.",
    "anyways...",
    "you know why you're in jail?",
    "YOU SCHL-ODERS DESERVE IT!!!!",
    "YOU'VE CHAT GPT'd EVERY GODDAMN ASSIGNMENT, ",
    "CTR + C, CTR + V'd YOUR WAY THROUGH MY CLASS,",
    "AND COUNTERFEITED TOO MANY SCHLOTTO TICKETS TO \nCOUNT.",
    "and also you didn't laugh at my jokes.",
    "AND NOW YOU SHALL FACE THE CONSEQUENCES:",
    "A LIFETIME IN SCHL-AIL.",
    "enjoy your stay, SCHL-ODERS; the only way \nyou're getting out is if you code your way \nout.",
    "too bad you don't understand simple \nPOLYMORPHISM,",
    "and even more unfortunate that you wouldn't \nknow how to READ THE CODE to figure out my \ntraps..."
  ];

  dialoguePage = 0;
  dialogueFrag = "";

  codeEditor = new CodeEditor();

  fileNames = [
    ["Main.java", "Game.java", "Pawn.java"],

    ["Main.java", "Game.java", "Toy.java", "Watergun.java"],

    ["Main.java", "Game.java", "VacuumGame.java", "Vacuum.java"],

    ["Main.java", "Game.java", "DogGame.java", "Dog.java"],

    ["Main.java", "Game.java", "HammerGame.java", "Hammer.java"],

    ["Main.java", "Game.java", "Panda.java", "BuffPanda.java"],
  ];

  fileData = [
    [
      //level 0
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",

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
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tGame g = new VacuumGame();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprotected Vacuum robot = new Vacuum();\n\tprotected boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile (true) {\n\t\t\tif (getKeysPressed().contains(“k”))\n\t\t\t\trobot.move();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",
      
      "class VacuumGame extends Game {\n\t// other variables and methods not shown\n\n\tVacuumGame() { ... }\n\t\n\tvoid instantWin() {\n\t\twin = true;\n\t}\n}\n",

      "class Vacuum {\n\t// other variables and methods not shown\n\n\tVacuum() { ... }\n\n\tvoid move() {\n\t\t...\n\t}\n}\n"
    ],

    [
      //level 3
      "class Main {\n\tpublic static void main(String[] args) {\n\t\tDogGame g = new DogGame();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
      
      "class Game {\n\t// other variables and methods not shown\n\n\tprotected Dog dog = new Dog();\n\tprotected Lava[] lava = { ... };\n\tprotected boolean win = false;\n\t\n\tGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“p”))\n\t\t\t\tdog.left();\n\t\t\tif (getKeysPressed().contains(“w”))\n\t\t\t\tdog.right();\n\t\t\tif (getKeysPressed().contains(“r”))\n\t\t\t\tdog.jump;\n\t\t\tif (proximity(dog, lava) == 0)\n\t\t\t\treset();\n\t\t}\n\t}\n\n\tList<String> getKeysPressed() {\n\t\t...\n\t}\n}\n",
      
      "class DogGame {\n\t// other variables and methods not shown\n\n\tDogGame() { ... }\n\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tif (getKeysPressed().contains(“s”))\n\t\t\t\tdog.left();\n\t\t\tif (getKeysPressed().contains(“d”))\n\t\t\t\tdog.right();\n\t\t\tif (getKeysPressed().contains(“l”))\n\t\t\t\tdog.jump;\n\t\t\tif (proximity(dog, enemies) == 0)\n\t\t\t\treset();\n\t\t}\n\t}\n}\n",

      "class Dog {\n\t// other variables and methods not shown\n\nDog() { ... }\n\n\tvoid left() {\n\t\tthis.velX--;\n\t}\n\n\tvoid right() {\n\t\tthis.velX++;\n\t}\n\n  \tvoid jump() {\n\t\tif(this.y == 0)\n\t\t\tthis.velY = -15;\n\t}\n}\n"
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
    [
      "huh. not bad.",
      "SCHLE-BASTIAN! STOP PLAYING CHESS!",
      "anyways,",
      "of course, you SCHL-ODERS probably have no \nidea what any of that code means.",
      "give me the superclass of the Game class."
    ],

    [
      "not too SCHLA-BBY, SCHL-ODER.",
      "it seems you have a somewhat functional frontal lobe.",
      "now, tell me, which method was inherited by the Watergun class."
    ],

    [
      "i might give you a SCHLOTTO ticket for that one...",
      "SCHL-ODER,",
      "if i wasn't 100% sure that you guessed.",
      "i'm gonna drop you like a helicopter-bench on my high school football field",
      "what did this game test?"
    ],

    [
      "well, well, well...",
      "you've gone further than the last SCHLA-MINION...",
      "but i have a way to SCHL-OP you right in your tracks...",
      "tell me, SCHL-ODER, what change would have made the instant win method work?"
    ],

    [
      "this is...",
      "SCHL-OCKING...",
      "to be honest, i didn't think a SCHL-ODER could get this far...",
      "Give me the constructor that's called. \"Game g = new HammerGame(\"k\",\"o\");\""
    ],

    [
      "it seems we're on the last SCHL-EVEL, SCHL-ODER.",
      "did i ever tell you how i got this scar on my mouth?",
      "try not to ride this horse into a tree branch.",
      "which statement, much like yourself, is incorrect?"
    ],
  ];

  answers = [
    [
      "Nothing",
      "Player class",
      "Object class",
      "Game class"
    ],

    [
      "shoot()",
      "rotate()",
      "run()",
      "Toy()"
    ],

    [
      "Overridden methods",
      "Inaccessible methods",
      "Overloading methods",
      "Inheriting constructors"
    ],

    [
      "Set 'win' to `true` instead of false in its declaration in the Game class",
      "Change the declaration in the Main class to \"VacuumGame g = new VacuumGame()\"",
      "Change the return type of instantWin() to something that's not void",
      "Change the declaration in the Main class to \"VacuumGame g = new Game()\""
    ],

    [
      "Game()",
      "Object()",
      "Main()",
      "HammerGame()"
    ],

    [
      "If Class1 is a superclass of Class2, and Class2 is a superclass of Class3, and Class2 has no overridden methods, Class3 inherits all the public methods of Class1. ",
      "A public method in a subclass that is not in its superclass is not accessible by the superclass.",
      "A private method in a superclass is not inherited by its subclass.",
      "Two different subclasses of the same superclass inherit the same methods of the superclass.",
      "Writing two subclass methods with the same name but different parameters is called method overriding."
    ],
  ];

  selectedAnswer = [0, 0];

  correctAnswers = [0, 0, 0, 0, 0, 0];

  answeredCorrectly = 0;
  answeredQuestion = false;
  responses = [
    [
      [
        "Wrong!",
        "I knew you didn't know!", 
        "Go back and try again."
      ],
      [
        "Fine.", 
        "You were correct.", 
        "But... the next one is gonna stump you for sure."
      ]
    ],

    [
      [
        "Ha! I knew it was just a fluke.", 
        "Maybe if you try again you'll figure it out."
      ],
      [
        "No way! You actually got it!", 
        "Either you know more than I thought...", 
        "Or, you're learning.",
        "This isn't good.",
        "Let's make things a little harder then!"
      ]
    ],

    [
      [
        "GREAT!", 
        "Phew, I was actually scared you were getting it for a minute there.",
        "I'll let you try again though."
      ],
      [
        "ARGH!", 
        "How did you get that?!", 
        "This is where you'll fail for sure."
      ]
    ],

    [
      [
        "Ha!", 
        "Luck will only get you so far in life. ", 
        "Scurry on back now and try again."
      ],
      [
        "Grrrrrr.", 
        "You got this far...", 
        "But I won't let you get any further!"
      ]
    ],

    [
      [
        "Whew.", 
        "That was close.", 
        "But too bad for YOU!",
        "Because that was WRONG!",
        "Try again."
      ],
      [
        "NO!", 
        "You can't be getting everything right.", 
        "You will NOT be getting through every single level I have prepared for you."
      ]
    ],

    [
      [
        "HA!", 
        "Nice try!", 
        "I guess you didn't get my lesson then...",
        "Time to try again!"
      ],
      [
        "NOOO!!!", 
        "THIS ISN'T POSSIBLE!!!", 
        "YOU WON!!!"
      ]
    ]
  ];
  
  epilogue = ["...", "...", "...", "what", "the", "...", "you freed them all?", "let me you a story,", "of a young boy on the football team in his high school...", "he had a dream...", "that he would teach the Computer Sciences...", "and he succeeded!!!", "I TRICKED YOU!!!", "I WON THIS GAME!!!", "I MADE YOU LEARN POLYMORPHISM!!", "MWAHAHAHAHH!"];
  
  lastLines = ["WHAT!?!? PAWNY!?!?", "ARGHHHH", "NOOOO!!!!!", "MY REMOTE!!!!", "YOU CAN'T", "DO THIS-"];

  spritesPos = [
    [300, -10],
    [600, -10],
    [900, -10],
    [900, 610],
    [600, 610],
    [300, 610],
  ];

  cell = loadImage("assets/images/cell.png");
  bars = loadImage("assets/images/bars.png");
  deepslate = loadImage("assets/images/deepslate.png");

  pSprites = [
    levels[0].p.sprite,
    levels[1].p.sprite,
    levels[2].p.sprite,
    levels[3].p.sprite,
    levels[4].p.sprites[0][1],
    levels[5].panda.sprites
  ];

  schlamann = loadImage("assets/images/schlamann.png");

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
        dialoguePage++;
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

          if (answeredCorrectly == 1) {
            level++;
          } else {
            switch (level) {
              case 0: levels[0] = new Level0(); break;
              case 1: levels[1] = new Level1(); break;
              case 2: levels[2] = new Level2(); break;
              case 3: levels[3] = new Level3(); break;
              case 4: levels[4] = new Level4(); break;
              case 5: levels[5] = new Level5(); break;
            }
          }

          if (level == 6) {
            scene = "epilogue";
          } else {
            scene = "game";
          }
        }


      }
    }

    if (showAnswers) {
      if (keyCode == 37 || keyCode == 39)
        selectedAnswer[1] = (selectedAnswer[1] + 1) % 2;
      if (keyCode == 38 || keyCode == 40)
        selectedAnswer[0] = (selectedAnswer[0] + 1) % 2;
    }

  } else if (scene == "epilogue") {


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
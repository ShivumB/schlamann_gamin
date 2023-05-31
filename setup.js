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
    "YOU'VE CHAT GPT'd EVERY ASSIGNMENT, ",
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


    ["Main.java", "Game.java", "Robot.java", "Vacuum.java"],


    ["Main.java", "Game.java", "Tool.java", "Hammer.java"],


    ["Main.java", "Game.java", "Animal.java", "Dog.java"],


    ["Main.java", "Game.java", "Panda.java", "BuffPanda.java"],
  ];


  fileData = [
    [
      //level 0
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",


      "class Game {\n//some code hidden!\n\tprivate Pawn pawn = new Pawn(...);\n\tprivate Rook[] rooks;\n\tprivate Key key;\n\t\n\tvoid run() {\n\t\twhile(true) {\n\t\t\tpawn.act();\n\t\t\t\n\t\t\tfor(Rook e : rooks) {\n\t\t\t\te.act();\n\t\t\t\tif(collision(pawn, e)) reset();\n\t\t\t}\n\t\t\t\n\t\t\tif (collision(pawn, key)) win = true;\n\t\t}\n\t}\n}\n",


      "class Pawn {\n//some code hidden!\n\tprivate int x = 0;\n\tprivate int y = 300;\n\n\tpublic void act() {\n\t\tif (Game.keyPressed(“r”)) this.x += 40;\n\t\t...\n\t}\n}\n"
    ],


    [
      //level 1
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",

      "class Game {\n//some code hidden!\n\tprivate Watergun watergun = new Watergun();\n\tprivate Target[] targets;\n\tprivate Key key;\n\n\t// other variables and methods not shown\n\tvoid run() {\n\t\twhile(true) {\n\t\t\twatergun.act();\n\n\t\t\tfor(Target e : targets) {\n\t\t\t\te.act();\n\t\t\t\tif(collision(watergun, e)) reset();\n\t\t\t}\n\nif(collision(watergun, key)) win = true;\n\t\t}\n\t}\n}\n",
     
      "class Toy {\n//some code hidden!\n\tvoid rotate() {\n\t\tif (Game.keyPressed(“u”)) angle++;\n\t\tif(Game.keyPressed(“i”)) angle--;\n\t}\n}\n",

      "class Watergun extends Toy {\r\n\t//some code hidden!\r\n\tvoid shoot() {\r\n\t\tif(Game.getKeyPressed(“l”)) {\r\n\t\t\t...\r\n        }\r\n    }\r\n\r\n\tvoid act() {\r\n\t\trotate();\r\n\t\tshoot();\r\n\r\n\t\tif(Game.getKeyPressed(“r”)) this.velY--;\r\n\t\tif(Game.getKeyPressed(“f”)) this.velY++;\r\n\t\tif(Game.getKeyPressed(“d”)) this.velX--;\r\n        if(Game.getKeyPressed(“g”)) this.velX++;\r\n        ...\r\n\t}\r\n}\r\n"
    ],


    [
      //level 2
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
     
      "class Game {\r\n\t//some code hidden!\r\n\tprivate Robot vacuum = new Vacuum(...);\r\n\tprivate Dust[] dust;\r\n\tprivate Key key;\r\n\t\r\n\tvoid run() {\r\n\t\twhile (true) {\t\t\t\r\n\t\t\tvacuum.act(dust);\r\n\t\t\tif(collision(vacuum, key)) win = true;\r\n\t\t}\r\n\t}\r\n\r\n}\r\n",


      "class Robot {\r\n\t//some code hidden!\r\n\tprotected void act(Dust[] dust) {\r\n\t\tif(Game.getKeyPressed(“q”)) this.vel++;\r\n\t\tif(Game.getKeyPressed(“w)) this.angle--;\r\n\t\tif(Game.getKeyPressed(“e”)) this.angle++;\r\n\t\t...\r\n    }\r\n}\r\n",


      "class Vacuum extends Robot {\r\n\t//some code hidden!\r\n\tprotected void act(Dust[] dust) {\r\n\t\tif(Game.getKeyPressed(“i”)) this.vel++;\r\n\t\tif(Game.getKeyPressed(“j”)) this.angle--;\r\n\t\tif(Game.getKeyPressed(“l”)) this.angle++;\r\n\t\t...\r\n    }\r\n\r\n\tprivate void WIN_GAME_NOW_PRESS_ME() {\r\n\t\tif(Game.getKeyPressed(“q”)) {\r\n\t\t\t...\r\n        } \r\n\t}\r\n}"
    ],




    [
      //level 3
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
     
      "class Game {\r\n\t//some code hidden!\r\n\tprivate Hammer hammer = new Hammer(...);\r\n\tprivate Mole[] moles;\r\n\tprivate Key key;\r\n\t\r\n\tvoid run() {\r\n\t\twhile (true) {\r\n\t\t\thammer.act();\r\n\r\n\t\t\tfor(Mole e : moles) {\r\n\t\t\t\tif(collision(hammer, e)) e.gone = true;\r\n            }\r\n\r\n            if(collision(hammer,key)) win = true;\r\n\t    }\r\n\t}\r\n} \r\n",


      "class Tool {\r\n\t//some code hidden!\r\n\tprotected leftKey;\r\n\tprotected rightKey;\r\n\tprotected smashKey;\r\n\tprotected useNextKeyInAlphabet = false;\r\n\r\n\tpublic Tool(...) {\r\n\t\tleftKey = “o”;\r\n\t\trightKey = “p”;\r\n\t\tsmashKey = “t”;\r\n\r\n\t\tuseNextKeyInAlphabet = true;\r\n        ...\r\n    }\r\n\r\n}\r\n",


      "class Hammer {\r\n\t//some code hidden!\r\n    public Hammer(...) {\r\n\t    leftKey = “r”;\r\n\t    rightKey = “g”;\r\n\t    smashKey = “n”;\r\n\t    //is this constructor missing anything? like, another constructor or something?\r\n\t    //if it is, what does the compiler do?\r\n    }\t\r\n}\r\n"
    ],


    [
      //level 4
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
     
      "class Game {\r\n\t//some code hidden!\r\n\tprivate Animal dog = new Dog(...);\r\n\tprivate Lava[] lava;\r\n\tprivate Key key;\r\n\t\r\n\tvoid run() {\r\n\t\twhile(true) {\r\n\t\t\tdog.act();\r\n\r\n            for(Lava e : lava) {\r\n\t            if(collision(dog, e)) reset();\r\n            }\t\t\t\r\n\r\n\t\t\tif(collision(dog, key)) win = true;\r\n\t\t}\r\n\t}\r\n}\r\n",


      "class Animal {\r\n\t//some code hidden!\r\n\tprotected void move() {\r\n\t\tif(Game.getKeyPressed(“v”)) this.velX --;\r\n\t\tif(Game.getKeyPressed(“m”)) this.velX++;\r\n\t\tif(Game.getKeyPressed(“p”)) this.velY = -15;\r\n}\r\n\r\n\tprotected void act() {\r\n\t\tmove();\r\n\t\t...\r\n    }\r\n\r\n}\r\n",


      "class Dog extends Animal {\r\n    //some code hidden!\r\n    private void move() {\r\n\t    if(Game.getKeyPressed(“q”)) this.velX --;\r\n\t    if(Game.getKeyPressed(“p”)) this.velX++;\r\n\t    if(Game.getKeyPressed(“r”)) this.velY = -15;\r\n    }\r\n}\r\n"
    ],




    [
      //level 5
      "class Main {\n\t//some code hidden!\n\tpublic static void main(String[] args) {\n\t\tGame g = new Game();\n\t\t...\n\t\tg.run();\n\t}\n}\n",
     
      "class Game {\r\n\t//some code hidden!\r\n\tprivate Panda panda = new BuffPanda();\r\n\tprivate Dial dial;\r\n\tprivate ProgressBar bar;\r\n\t\r\n\tvoid run() {\r\n\t\twhile(true) {\r\n\t\t\t\r\n\t\t\tbar.addProgress(panda.curl(dial));\r\n\r\n            if(bar.getProgress() >= 80) win = true;\r\n\t\t}\r\n\t}\r\n}\r\n",


      "class Panda {\r\n\t//some code hidden!\r\n\tpublic void curl(Dial dial) {\r\n\t\tif(Game.getKeyPressed(“n”)) {\r\n\t\t\tif(dial.checkHit()) return 5;\r\n\t\t\telse return -5;\r\n        }\r\n        return 0;\r\n    }\r\n}\r\n",


      "class BuffPanda extends Panda {\r\n\t//some code hidden!\r\n\tpublic void curl(Dial dial) {\r\n\t\tint ans = -100;\r\n\r\n\t\tif(Game.getKeyPressed(“a”)) ans += 10000;\r\n\t\tif(Game.getKeyPressed(“b”)) ans -= 10000;\r\n\r\n\t\tif(Math.random() * 2 < 0.4) ans = 0;\r\n\r\n\t\tans = super.curl();\r\n\t\treturn ans;\r\n    }\r\n}\r\n"
    ],
  ];


  questions = [
    [
      "huh. not bad.",
      "SCHLE-BASTIAN! STOP PLAYING CHESS!",
      "anyways,",
      "you SCHL-ODERS probably have no idea what \nany of that code means.",
      "give me the superclass of the Game class."
    ],


    [
      "not too SCHLA-BBY, SCHL-ODER.",
      "which method was inherited by the \nWatergun class?"
    ],


    [
      "i might give you a SCHLOTTO ticket for that \none...",
      "SCHL-ODER,",
      "i'm gonna drop you like a helicopter-bench on \nmy high school football field",
      "why didn't the vacuum's instant win \nmethod work?"
     
    ],


    [
      "well, well, well...",
      "you've gone further than the last SCHLODER...",
      "but i have a way to SCHL-OP you right in your \ntracks...",
      "what happens if a subclass constructor (SBC) is called \nif the subclass doesn’t explicitly call its \nsuperclass constructor (SPC)?"
     
    ],


    [
      "this is...",
      "SCHL-OCKING...",
      "to be honest, i didn't think a SCHL-ODER \ncould get this far...",
      "what did this game test?"
    ],


    [
      "it seems we're on the last SCHL-EVEL, \nSCHL-ODER.",
      "did i ever tell you how i got this scar on \nmy mouth?",
      "try not to ride this horse into a tree branch.",
      "If a superclass method was overridden in \nthe subclass, what would happen if \nsuper.method was called?"
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
      "Not public",
      "Declared as Robot",
      "Hidden code failed",
      "It did"
    ],


    [
      "SPC at start",
      "SPC at end",
      "SPC ignored",
      "SBC overrides SPC"      
    ],


    [
      "Overriding",
      "Pseudo-objects",
      "Overloading",
      "False constructs"
    ],


    [
      "Overriden method",
      "Compile error",
      "Nothing",
      "Superclass method"
    ],
  ];


  selectedAnswer = [0, 0];


  correctAnswers = [2, 1, 1, 0, 0, 3];


  answeredCorrectly = 0;
  answeredQuestion = false;
  responses = [
    [
      [
        "alright, no SCHLOTTO ticket for you.",
        "try again, SCHLODER.",
      ],
      [
        "wow. you're better at chess than my son...",
        "not that that's saying much...",
        "i'm just kidding. he's getting pretty good.",
        "not sure if i can say the same for you."
      ]
    ],


    [
      [
        "what, Chat-GPT couldn't solve that one?",
        "maybe you'll pay more attention in class now..."
      ],
      [
        "impressive,",
        "for a SCHLODER,"
      ]
    ],


    [
      [
        "did i ever tell you that my kid wants to make \nvideo games on Roblox?",
        "he's made some pretty cool ones on Scratch.",
        "put a lot of effort into them...",
        "what i mean to say is"
      ],


      [
        "alright, not bad.",
        "but you can make it better.",
        "https://www.youtube.com/@johnschlamann3146"
      ]
    ],


    [
      [
        "you know, you remind of one of jerry's riddles",
        "nigh incomprehensible",
        "how was i supposed to guess it was jeremy lin",
      ],


      [
        "i'm proud of you",
        "...",
        "...",
        "...",
        "...",
        "...",
        "...",
        "...",
        "...",
        "...",
      ]
    ],


    [
      [
        "is your head screwed on properly?",
        "beep boop"
      ],
      [
        "what's up? what's up????",
        "my blood pressure is up, SCHLODER.",
        "move on."
      ]
    ],


    [
      [
        "i'm going to have your mom on the phone...",
      ],
      [
        "...",
        "...",
        "..."
      ]
    ]
  ];
 
  epilogue = ["what", "the", "...", "you freed them all?", "let me tell you a story,", "of a young boy on the football team in his high \nschool...", "he had a dream...", "that he would teach the Computer Sciences...", "and he succeeded!!!", "I TRICKED YOU!!!", "I WON THIS GAME!!!", "I MADE YOU LEARN POLYMORPHISM!!", "MWAHAHAHAHH!"];
 
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


        //got rid of ending animation - change to "end" to see
        scene = "credits";
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
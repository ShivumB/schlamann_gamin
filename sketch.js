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

function setup() {
  createCanvas(1200, 600);

  angleMode(DEGREES);

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

  dialogue = [
    ["hey there", "the name's schlamann", "i put them in jail", "hope they don't break out!!!"],

    ["alrbert.ior", "what no it doesn't", "schlamann youre ip again"],

    ["huh"],

    ["no thanks", "i'll have a #7", "you know it"],

    ["yepso plaese", "i im lcato", "aardvark"],

    ["what no you've gon so far"],

    ["you'll never win!"],
  ];
  
  dialoguePage = 0;
  dialogueFrag = "";
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
        scene = "monologue";
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

  else if(scene == "monologue") {
    if(keyCode == 13) {
      if(dialoguePage + 1 < dialogue[level].length) {

        dialoguePage ++;
        frame = 0;

      }else {

        scene = "game";

      }

    }
  }
}

function keyReleased() {

  keys[keyCode] = false;

}

function draw() {

  switch (scene) {

    case "game":

      levels[level].play(keys);

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


      case "monologue":

      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(600, 250, 50, 100);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, 400, 600, 150);

      dialogueFrag = dialogue[0][dialoguePage].substring(0, frame/4);

      if(frame/4 > dialogue[0][dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();

      textSize(30);
      text(dialogueFrag, 325, 450);

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
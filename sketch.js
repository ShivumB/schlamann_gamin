function draw() {
  switch (scene) {
      
    case "game":
      levels[level].play(keys);

      codeEditor.play(fileNames[level], fileData[level]);

      if (levels[level].win) {

        frame = 0;
        scene = "questions";
        dialoguePage = 0;
        showAnswers = false;
        answeredQuestion = false;
        questionY = 400;

        if (level >= levels.length) scene = "epilogue";
      }

      break;

    case "intro":
      
      image(prisonbg, 0, 0, 600, 600);

      push();

      if (frame <= 50) {
      } else if (frame > 50 && -2 * (frame - 50) > -3200) {
        
        translate(-2 * (frame - 50), 0);
        
      } else {
        translate(-2 * (frame - 50), 0);
        frame = 0;
        scene = "start";
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

    case "start":
      background(0);

      fill(255);
      rect(600, 250, 50, 100);

      
      for (let i = 0; i < textOptions.length; i++) {
        if (i == selectedTextOption) {
          if (frame > 100) {
            strokeWeight(3);
            noFill();
            stroke(255);
            triangle(425, 450 + 50 * i, 425, 430 + 50 * i, 440, 440 + 50 * i);
          }
        }
        
        textSize(30);
        fill(255, 0.1 * frame * frame);
        strokeWeight(1);
        stroke(0);
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

      dialogueFrag = prologue[dialoguePage].substring(0, frame / 4);

      if (frame / 4 > prologue[dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();

      textSize(30);
      text(dialogueFrag, 325, 450);

      frame++;

      break;

    case "questions":
      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      //schlamann placeholder
      rect(600, questionY - 150, 50, 100);

      //dialogue box
      noFill();
      stroke(255);
      strokeWeight(3);
      rect(300, questionY, 600, 150);
            
      //triangle for next page of dialogue
      if (!showAnswers && frame / 4 > questions[level][dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      } else if (answeredQuestion && frame / 4 > responses[level][answeredCorrectly][dialoguePage].length + 5) {
        triangle(860, 315, 870, 315, 865, 325);
      }

      //generate question fragment

      if (!answeredQuestion) {
        dialogueFrag = questions[level][dialoguePage].substring(0, frame / 4);
        
      } else {
        dialogueFrag = responses[level][answeredCorrectly][dialoguePage].substring(0, frame / 4);
      }

      fill(255);
      noStroke();
      textSize(30);

      text(dialogueFrag, 325, questionY + 50);

      if (showAnswers) {
        questionY += 0.1 * (200 - questionY);

        if (Math.abs(200 - questionY) < 1) questionY = 200;

        if (questionY == 200) {
          
          noFill();
          stroke(255);
          strokeWeight(3);

          rect(300, 400, 600, 150);

          let x = selectedAnswer[1] * 325 + 345;
          let y = selectedAnswer[0] * 60 + 442;

          if (!answeredQuestion) {
            triangle(x, y + 8, x, y - 8, x + 13, y);
          }

          noStroke();
          fill(255);
          text(answers[level][0], 375, 450);
          text(answers[level][1], 700, 450);
          text(answers[level][2], 375, 510);
          text(answers[level][3], 700, 510);
        }
      }

      frame ++;

      break;
      
      case "epilogue":
      
      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      //schlamann
      rect(600, 250, 50, 100);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, 400, 600, 150);

      dialogueFrag = epilogue[dialoguePage].substring(0, frame / 4);

      if (frame / 4 > epilogue[dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();
      textSize(30);
      text(dialogueFrag, 325, 450);

      frame++;
      
      break;
      
      
    case "end":
    
      if(frame < 430) {
      background(0, 50);

      fill(255);
      stroke(0);
      strokeWeight(1);
      //schlamann
      rect(600, 250, 50, 100);

      fill(0);
      stroke(255);
      strokeWeight(3);
      rect(300, 400, 600, 150);
      
      dialogueFrag = lastLines[dialoguePage].substring(0, frame / 4);
      
      fill(255);
      noStroke();
      textSize(30);
      text(dialogueFrag, 325, 450);   
      }
      
      if(frame < 60) {
        
      } else if (frame < 120) {        
        
        dialoguePage = 1;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[0][0] - 600) < 5 && Math.abs(spritesPos[0][1] - 300) < 5) {
          
        
        ellipse(spritesPos[0][0] + Math.random()*30, spritesPos[0][1] + Math.random()*30, 180, 180);
          
        } else {
          ellipse(spritesPos[0][0], spritesPos[0][1], 180, 180);
        }
        
        
        spritesPos[0][0] += 0.3*(600 - spritesPos[0][0]);
        spritesPos[0][1] += 0.3*(300 - spritesPos[0][1]);
        
        
      } else if(frame < 160) {
        dialoguePage = 1;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[0][0], spritesPos[0][1], 180, 180);
        
        spritesPos[0][0] += 0.3*(1100 - spritesPos[0][0]);
        spritesPos[0][1] += 0.3*(800 - spritesPos[0][1]);
        
      } else if(frame < 210) {
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[1][0] - 600) < 5 && Math.abs(spritesPos[1][1] - 300) < 5) {
          
        
        ellipse(spritesPos[1][0] + Math.random()*30, spritesPos[1][1] + Math.random()*30, 180, 180);
        } else {
          
          ellipse(spritesPos[1][0], spritesPos[1][1], 180, 180);
        }
        
        
        spritesPos[1][0] += 0.3*(600 - spritesPos[1][0]);
        spritesPos[1][1] += 0.3*(300 - spritesPos[1][1]);
        
      } else if(frame < 240) {
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[1][0], spritesPos[1][1], 180, 180);
        
        spritesPos[1][0] += 0.3*(600 - spritesPos[1][0]);
        spritesPos[1][1] += 0.3*(800 - spritesPos[1][1]);
        
      } else if(frame < 280) {
        
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[2][0] - 600) < 5 && Math.abs(spritesPos[2][1] - 300) < 5) {
          
          ellipse(spritesPos[2][0] + Math.random()*30, spritesPos[2][1] + Math.random()*30, 180, 180);
        } else {
          ellipse(spritesPos[2][0], spritesPos[2][1], 180, 180);
        }
        
        
        spritesPos[2][0] += 0.3*(600 - spritesPos[2][0]);
        spritesPos[2][1] += 0.3*(300 - spritesPos[2][1]);
        
      } else if(frame < 300) {
        

        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[2][0], spritesPos[2][1], 180, 180);
        
        spritesPos[2][0] += 0.3*(100 - spritesPos[2][0]);
        spritesPos[2][1] += 0.3*(800 - spritesPos[2][1]);
        
      } else if(frame < 330) {
        
          
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[3][0] - 600) < 5 && Math.abs(spritesPos[3][1] - 300) < 5) {
          
          ellipse(spritesPos[3][0] + Math.random()*30, spritesPos[3][1] + Math.random()*30, 180, 180);
        } else {
          ellipse(spritesPos[3][0], spritesPos[3][1], 180, 180);
        }
        
        
        spritesPos[3][0] += 0.3*(600 - spritesPos[3][0]);
        spritesPos[3][1] += 0.3*(300 - spritesPos[3][1]);
        
      } else if(frame < 350) {
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[3][0], spritesPos[3][1], 180, 180);
        
        spritesPos[3][0] += 0.3*(100 - spritesPos[3][0]);
        spritesPos[3][1] += 0.3*(-200 - spritesPos[3][1]);
        
      } else if(frame < 370) {
        
        
          
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[4][0] - 600) < 5 && Math.abs(spritesPos[4][1] - 300) < 5) {
          
          ellipse(spritesPos[4][0] + Math.random()*30, spritesPos[4][1] + Math.random()*30, 180, 180);
        } else {
          ellipse(spritesPos[4][0], spritesPos[4][1], 180, 180);
        }
        
        
        spritesPos[4][0] += 0.3*(600 - spritesPos[4][0]);
        spritesPos[4][1] += 0.3*(300 - spritesPos[4][1]);
        
      } else if(frame < 390) {
        
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[4][0], spritesPos[4][1], 180, 180);
        
        spritesPos[4][0] += 0.3*(600 - spritesPos[4][0]);
        spritesPos[4][1] += 0.3*(-200 - spritesPos[4][1]);
        
      } else if(frame < 410) {
        
        
          
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        
        if(Math.abs(spritesPos[5][0] - 600) < 5 && Math.abs(spritesPos[5][1] - 300) < 5) {
          
          ellipse(spritesPos[5][0] + Math.random()*30, spritesPos[5][1] + Math.random()*30, 180, 180);
        } else {
          ellipse(spritesPos[5][0], spritesPos[5][1], 180, 180);
        }
        
        
        spritesPos[5][0] += 0.3*(600 - spritesPos[5][0]);
        spritesPos[5][1] += 0.3*(300 - spritesPos[5][1]);
        
      } else if(frame < 430) {
        
        
        dialoguePage = 2;
        
        strokeWeight(1);
        fill(255,255,0);
        ellipse(spritesPos[5][0], spritesPos[5][1], 180, 180);
        
        spritesPos[5][0] += 0.3*(1100 - spritesPos[5][0]);
        spritesPos[5][1] += 0.3*(-200 - spritesPos[5][1]);
        
      } else if(frame < 600) {
        
        
        background(255);
        
      } else if(frame < 1400) {
                
        background(0, 5);
        
      } else if(frame == 1400) {
        frame = 0;
        scene = "credits";
      }
      
      
      frame++;
    
      
    break;
      
    case "credits":
      
    background(0);
    fill(255);
    textSize(30);
      
    if(frame < 1600) {
      
      push();
      
      translate(0, -frame*2);
      
      textAlign(CENTER);
      
      text("directed by shivum banerjee", 600, 600);
      
      text("problems by maria jiao & alex yang", 600, 1100);
      
      text("web design by elyssa chandler", 600, 1400);
      
      text("art by maria jiao & elyssa chandler", 600, 1700);
      
      text("playtesting by keyan ___", 600, 2000);
      
      text("story by shivum banerjee", 600, 2300);
      
      text("minigames by shivum banerjee & alex yang", 600, 2600);
      
      text("animations by shivum banerjee", 600, 2900);
      
      pop();
    } else if (frame < 1750) {
      
      textSize(30);
      text("thanks for playing!", width/2, height/2);
      textSize(15);
      text("- the schlamann gamin team", width/2 + 55, height/2 + 20);
      
    } 
    
    frame++;
      
    break;

    case "settings":
      background(0);

      text("no settings for you", width / 2, height / 2);

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

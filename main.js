
// 2025 ok so lines pop top priority
// transition density instead of pop
// centre weighting
// transition between col palettes?!

let points = [];
let newPoints = [];
let amount;
let newAmount;
let lerpedAmount;
let lerpTo = amount;
let margins;
let margin;
let marginX;
let marginY;
let marginFactor = 0.1;
let counter = 0;
let increment = 0.01;
let easy;
let pause;
let pointRefresh;
let minimumSpacing;
let rCol2D, rHeight2D, rExtrude2D, rDisplay2D;
let colourful;
let fillColour2D;
let fillGrey2D;

// auto //
let colourDensity;
let displayDensity;
let displayRotation;
let extrudeChance;
let strokeChance;
let strokeVariance;
let centreWeighted;
let lightnessVariance;
let positionAdjust;
let strokeW;
let strokeWB;
////////

let gridVals = [10, 17, 17, 17, 17, 17, 31, 37, 60];
let gridWidth, gridHeight;

let bottomMargin, blockUnit;
let newBottomMargin;
let heightFactor;
let rLine2D;
let rLightness;
let rLineThickness2D;
let rLineThickness2Dnew;
let frameLine;
let border;
let fps = 0;
let lerpPoints;
let reScale;
let bug, info;

let updateNext = false;
let colourPalette = 0;
let hueShift = 0;

let texture;
let faceA, faceB, faceC;
let heightCalc;
let scaledown;
let autoMove;
let tick = 0;

let blockCounter = [];
let blockHCounter = [];
let lineHDisplay = [];
let lineVDisplay = [];

function preload() {
  texture = loadImage('assets/grain.png');
}
function textureOverlay() {
  push();
  blendMode(OVERLAY);
  let textureScale = 1;
  let tileX = Math.floor(width / texture.width * textureScale) + 1;
  let tileY = Math.floor(height / texture.height * textureScale) + 1;
  for (let i = 0; i < tileX; i++) {
    for (let j = 0; j < tileY; j++) {
      image(texture, i * texture.width * textureScale, j * texture.height * textureScale, texture.width * textureScale, texture.height * textureScale);
    }
  }
  pop();
}
function setup() {
  // createCanvas(2160, 3840);
  // pixelDensity(1);
  createCanvas(windowHeight / 16 * 9, windowHeight);
  blockUnit = width / 36;
  reScale = height / 3840;
  fullScreen();
  displayDensity = setValue();
  colourDensity = setValue();
  displayRotation = setValue();
  extrudeChance = setValue();
  strokeChance = setValue();
  strokeVariance = setValue();
  centreWeighted = setValue();
  positionAdjust = setValue();
  lightnessVariance = setValue();
  strokeW = setValue();
  strokeWB = setValue();
  for (let i = 0; i < 70; i++) {
    blockCounter[i] = [];
    blockHCounter[i] = [];
    lineHDisplay[i] = setValue();
    lineVDisplay[i] = setValue();
    for (let j = 0; j < 70; j++) {
      blockCounter[i][j] = setValue();
      blockHCounter[i][j] = setValue();
    }
  }
  panelSet();
  colorMode(HSL);
  amount = newAmount;
  lerpTo = amount;
  minimumSpacing = 40 * reScale;
  bottomMargin = newBottomMargin;
  margins = marginCalc(gridWidth, gridHeight, bottomMargin);
  points = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, amount, minimumSpacing);
  newPoints = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, amount, minimumSpacing);
  rHeight2D = random2D(amount * amount + 100, 1, 7);
  rExtrude2D = random2D(amount * amount + 100, 0, 10);
  rDisplay2D = random2D(amount * amount + 100, 0, 10);
  rLine2D = random2D(amount * amount + 100, 0, 10);
  rLightness = random2D(amount * amount + 100, 0, 10);
  rLineThickness2Dnew = random2D(amount * amount + 100, 1, 9); // old way of doing it?
  rLineThickness2D = rLineThickness2Dnew;
  fillColour2D = random2D(amount * amount + 100, 0, 10);
  rCol2D = random2D(amount * amount + 100, 0, swatchHSL[0][1].length);
  strokeCap(SQUARE);
}
function draw() {
  background(swatchHSL[colourPalette][0][0][0], swatchHSL[colourPalette][0][0][1], swatchHSL[colourPalette][0][0][2]);
  panelSet();
  strokeWeight(strokeW.base);
  if (counter < 1) {
    counter += increment;
  }
  listen();
  margins = marginCalc(gridWidth, gridHeight, bottomMargin);
  if (frameCount % pause == 0 && counter >= 1) {
    tick++;
  }
  pointUpdater();
  lineUpdater();
  lerpPoints = pointLerper(amount, counter);
  auto(tick);
  gridDisplay();
  lineDisplay();
  textureOverlay();
  if (bug) {
    debug();
  }
  if (info) {
    infoPanel();
  }
  if(border){
    push();
    fill(255);
    rect(0, 0, margins.startX, height);
    rect(margins.endX, 0, width, height);
    rect(0, 0, width, margins.startY);
    rect(0, margins.endY, width, height);
    pop();
  }
}
function listen() {
  updateValue(displayDensity);
  listenforValue(displayDensity);
  updateValue(colourDensity);
  listenforValue(colourDensity);
  updateValue(displayRotation);
  listenforValue(displayRotation);
  updateValue(extrudeChance);
  listenforValue(extrudeChance);
  updateValue(strokeChance);
  listenforValue(strokeChance);
  updateValue(strokeVariance);
  listenforValue(strokeVariance);
  updateValue(centreWeighted);
  listenforValue(centreWeighted);
  updateValue(positionAdjust);
  listenforValue(positionAdjust);
  updateValue(lightnessVariance);
  listenforValue(lightnessVariance);
  updateValue(strokeW);
  listenforValue(strokeW);
  updateValue(strokeWB);
  listenforValue(strokeWB);
  for (let i = 0; i < 70; i++) {
    updateValue(lineHDisplay[i]);
    listenforValue(lineHDisplay[i]);
    updateValue(lineVDisplay[i]);
    listenforValue(lineVDisplay[i]);
    for (let j = 0; j < 70; j++) {
      updateValue(blockCounter[i][j]);
      listenforValue(blockCounter[i][j]);
      updateValue(blockHCounter[i][j]);
      listenforValue(blockHCounter[i][j]);
    }
  }
}
function auto(tempo) {
  if (!autoPaused && frameCount % pause == 0 && tempo % 3 == 0 && autoMove) {
    newAmount = Math.floor(random(4, 31));
    panel1.setValue("Block Density", newAmount);
    autoValue(displayDensity, 3, 10, 50);
    panel1.setValue("Display Chance", displayDensity.to);
    autoValue(colourDensity, 0, 10, 50);
    panel1.setValue("Colour Density", colourDensity.to);
    autoValue(displayRotation, 0, 1, 50);
    panel2.setValue("Rotation", displayRotation.to * 45);
    autoValue(extrudeChance, 0, 10, 50);
    panel1.setValue("Extrude Chance", extrudeChance.to);
    random(100) < 50 ? gridWidth = gridVals[Math.floor(random(gridVals.length))] : null;
    panel2.setValue("Width", gridWidth);
    random(100) < 50 ? gridHeight = gridVals[Math.floor(random(gridVals.length))] : null;
    panel2.setValue("Height", gridHeight);
    // 
    autoValue(strokeChance, 0, 3, 50);
    panel4.setValue("Display Chance", strokeChance.to);
    autoValue(strokeVariance, 0, 5, 50);
    panel4.setValue("Balance", strokeVariance.to);
    autoValue(centreWeighted, 0, 10, 10);
    panel2.setValue("Centre Weighted", centreWeighted.to);
    for (let i = 0; i < 70; i++) {
      autoValue(lineHDisplay[i], 0, 1, 50, true);
      autoValue(lineVDisplay[i], 0, 1, 50, true);
    }
  }
}
function marginCalc(artWidth, artHeight, bot) {
  let a = artWidth * blockUnit;
  let b = artHeight * blockUnit;
  let c = bot * blockUnit;
  return {
    startX: width / 2 - a,
    endX: width / 2 + a,
    startY: height / 2 - b,
    endY: height / 2 + b - c
  }
}
function infoPanel() {
  if (frameCount % 10 == 0) {
    fps = frameRate();
  }
  push();
  let xpos = 100 * reScale;
  let ypos = height * 0.9;
  let step = 20 * reScale;
  fill(0, 0, 90);
  noStroke();
  rect(xpos - 20 * reScale, ypos - 30 * reScale, 150 * reScale, 130 * reScale);
  textSize(20 * reScale);
  fill(40);
  noStroke();
  text("01 ", xpos, ypos);
  text("Rate: " + fps.toFixed(2), xpos, ypos + step);
  text("Density: " + newAmount, xpos, ypos + step * 2);
  pop();
}
function debug() {
  push();
  for (let i = 0; i < amount; i++) {
    noFill();
    stroke(0);
    strokeWeight(1);
    line(lerpPoints.x[0], lerpPoints.y[i], lerpPoints.x[amount - 1], lerpPoints.y[i]);
    line(lerpPoints.x[i], lerpPoints.y[0], lerpPoints.x[i], lerpPoints.y[amount - 1]);
    ellipse(lerpPoints.x[i], lerpPoints.y[i], 20);
    for (let j = 0; j < amount; j++) {

      ellipse(lerpPoints.x[i], lerpPoints.y[j], 10);
      push();
      fill(255);
      noStroke();
      text(i + j * amount, lerpPoints.x[i] + 10, lerpPoints.y[j] + 20);
      text(rCol2D[i][j], lerpPoints.x[i] + 25, lerpPoints.y[j] + 20);
      pop();
    }
  }
  pop();
}
function random2D(amount, min, max, increment = 1) {
  let randomValue = [];
  for (let i = 0; i < amount; i++) {
    randomValue[i] = [];
    for (let j = 0; j < amount; j++) {
      randomValue[i][j] = Math.floor(random(min, max)) * increment;
    }
  }
  return randomValue
}
function pointMaker(startX, startY, endX, endY, amount, spacing, partial = 0) {
  let newPointX = [];
  let newPointY = [];
  let diffX = endX - startX;
  let diffY = endY - startY;
  let focusX = diffX / 2 * (centreWeighted.base / 10);
  let focusY = diffY / 2 * (centreWeighted.base / 10);
  let w = diffX;
  let h = diffY;
  newPointX[0] = startX;
  newPointY[0] = startY;
  for (let i = 1; i < amount - 1; i++) {
    let randomX = Math.round(random(0 + focusX, w - focusX) / spacing) * spacing;
    let randomY = Math.round(random(0 + focusY, h - focusY) / spacing) * spacing;
    while (randomX + spacing * 0.8 >= w) { randomX = Math.round(random(0 + focusX, w - focusX) / spacing) * spacing; };
    while (randomY + spacing * 0.8 >= h) { randomY = Math.round(random(0 + focusY, h - focusY) / spacing) * spacing; };
    if (partial == 1 && random() < (1 - pointRefresh)) {
      // keep existing points
      newPointX[i] = newPoints.x[i];
      newPointY[i] = newPoints.y[i];
    } else {
      newPointX[i] = startX + randomX;
      newPointY[i] = startY + randomY;
    }
  }
  newPointX[amount - 1] = endX;
  newPointY[amount - 1] = endY;

  if (centreWeighted.base != 0) {
    if (random() < 0.1) {
      newPointX[amount - 2] = endX;
      newPointY[amount - 2] = endY;
    }
    if (random() < 0.1) {
      newPointX[1] = startX;
      newPointY[1] = startY;
    }
  }
  let sortedX = sort(newPointX, newPointX.length);
  let sortedY = sort(newPointY, newPointY.length);
  return {
    x: sortedX,
    y: sortedY
  }
}
function pointUpdater() {
  if (frameCount % pause == 0 && counter >= 1) {
    if (amount <= newAmount) {
      points = newPoints;
    }
    if (amount == newAmount) {
      newPoints = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, amount, minimumSpacing, 1);
      diffCount = 0;
      updateNext = false;
    }
    if (amount < newAmount) { // points added
      let diff = newAmount - amount;
      diffCount = 0;
      let borderX = points.x[points.x.length - 1]
      let borderY = points.y[points.y.length - 1]
      for (let i = 0; i < diff; i++) {
        points.x.push(borderX);
        points.y.push(borderY);
        // points.x.push(margins.endX); // original
        // points.y.push(margins.endY);
      }
      amount = newAmount;
      newPoints = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, amount, minimumSpacing);
      updateNext = false;
    }
    if (amount > newAmount && updateNext == false) { // points removed
      let diff = amount - newAmount;
      points = newPoints;
      newPoints = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, newAmount, minimumSpacing);
      for (let i = 0; i < diff; i++) {
        newPoints.x.push(margins.endX);
        newPoints.y.push(margins.endY);
      }
      updateNext = true;
    } else if (amount > newAmount && updateNext == true) {
      let diff = amount - newAmount;
      points = newPoints;
      amount = newAmount;
      newPoints = pointMaker(margins.startX, margins.startY, margins.endX, margins.endY, amount, minimumSpacing);
      points.x.splice(points.x.length, diff);
      points.y.splice(points.y.length, diff);
      updateNext = false;
    }
    
    counter = 0;
    lerpTo = newAmount; // <<< update to new method? // YES
  }
}
function lineUpdater() {
  if (frameCount % pause == 0 && counter >= 1) {
    ///////////////////////////////////////////////////////////// ------------------------------------- HERE
    // line updater
    rLineThickness2D = rLineThickness2Dnew;
    if (strokeChance.base == 0) {
      rLine2D = random2D(amount * amount + 100, 0, 10);
    }
    if (random() < 0.2) {
      rLineThickness2D = rLineThickness2Dnew;
      rLineThickness2Dnew = random2D(amount * amount + 100, 1, 9);
    }
    ////////////////////////////////////////////////////////////
  }
}
function pointLerper(amount, t) {
  let lerpX = [];
  let lerpY = [];
  for (let i = 0; i < amount; i++) {
    lerpX[i] = lerp(points.x[i], newPoints.x[i], ezEase(t, easy));
    lerpY[i] = lerp(points.y[i], newPoints.y[i], ezEase(t, easy));
  }
  return {
    x: lerpX,
    y: lerpY
  }
}
function gridDisplay() {
  for (let i = amount - 2; i >= 0; i--) {
    for (let j = 0; j < amount - 1; j++) {
      let w = lerpPoints.x[i + 1] - lerpPoints.x[i];
      let h = lerpPoints.y[j + 1] - lerpPoints.y[j];
      let artW = margins.endX - margins.startX;
      let artH = margins.endY - margins.startY;
      lerpedAmount = lerp(amount, lerpTo, ezEase(counter, easy));
      switch (heightCalc) {
        case 0:
          scaledown = map(w * h, 0, (artW * artH) / (lerpedAmount * lerpedAmount), 0, 1, true);
          // scaledown = map(w, 0, artW / lerpedAmount, 0, 1, true) * map(h, 0, artH / lerpedAmount, 0, 1, true);
          break;
        case 1:
          scaledown = map(w, 0, artW / lerpedAmount * 2, 0, 1) * map(h, 0, artH / lerpedAmount * 2, 0, 1);
          break;
        case 2:
          scaledown = map(w, 0, artW, 0, 10) * map(h, 0, artH, 0, 10);
          break;
        case 3:
          scaledown = map(w, 0, width, 0, 10) * map(h, 0, height, 0, 10);
          break;
      }
      // this calculates coords, and passes them into display //
      blockDisplay(blockCalc(i, j));
      // reroll..
      if (scaledown == 0) {
        rCol2D[i][j] = Math.floor(random(0, swatchHSL[0][1].length));
        rExtrude2D[i][j] = Math.floor(random(0, 10));
        rHeight2D[i][j] = Math.floor(random(1, 7));
        rExtrude2D[i][j] = Math.floor(random(0, 10));
        rDisplay2D[i][j] = Math.floor(random(0, 10));
      }
    }
  }
  // lineDisplay();
}
function lineDisplay() {
  let lineCol = loadLineColour();
  stroke(lineCol.h, lineCol.s, lineCol.l);
  if (extrudeChance.base == 0) {
    for (let i = 1; i < amount - 1; i++) {
      push();
      translate(width / 2, height / 2);
      translate(0, positionAdjust.base);
      rotate(displayRotation.base * QUARTER_PI * -1);
      if (rLine2D[0][i] < strokeChance.base) {
        let fadeWeight = 1; // used for edge, keep in place
        if (lerpPoints.x[i] > margins.endX - minimumSpacing) {
          fadeWeight = map(lerpPoints.x[i], margins.endX - minimumSpacing, margins.endX, 1, 0, true);
        }
        // ------------------
        // this shouldnt be a simple switch, 
        // each line should be assigned weight based on balance, strokeChance, user input [user done]
        let A, B;
        rLineThickness2D[0][i] > strokeVariance.base ? A = strokeW.base : A = strokeWB.base;
        rLineThickness2Dnew[0][i] > strokeVariance.base ? B = strokeW.base : B = strokeWB.base;
        let lineWeight = lerp(A, B, counter);
        // -------------------
        strokeWeight(lineWeight * fadeWeight);
        // lineWeightV[i];
        line(lerpPoints.x[i] - width / 2, lerpPoints.y[0] - height / 2, lerpPoints.x[i] - width / 2, lerpPoints.y[amount - 1] - height / 2);
      }
      if (rLine2D[1][i] < strokeChance.base) {
        let fadeWeight = 1;
        if (lerpPoints.y[i] > margins.endY - minimumSpacing) {
          fadeWeight = map(lerpPoints.y[i], margins.endY - minimumSpacing, margins.endY, 1, 0, true);
        }
        // ------------------
        let A, B;
        rLineThickness2D[1][i] > strokeVariance.base ? A = strokeW.base : A = strokeWB.base;
        rLineThickness2Dnew[1][i] > strokeVariance.base ? B = strokeW.base : B = strokeWB.base;
        let lineWeight = lerp(A, B, counter);
        // -------------------
        strokeWeight(lineWeight * fadeWeight);
        line(lerpPoints.x[0] - width / 2, lerpPoints.y[i] - height / 2, lerpPoints.x[amount - 1] - width / 2, lerpPoints.y[i] - height / 2);
      }
      pop();
    }
    if (frameLine) {
      push();
      translate(width / 2, height / 2);
      translate(0, positionAdjust.base);
      rotate(displayRotation.base * QUARTER_PI * -1);
      strokeWeight(strokeW.base);
      noFill();
      rect(lerpPoints.x[0] - width / 2, lerpPoints.y[0] - height / 2, lerpPoints.x[amount - 1] - lerpPoints.x[0], lerpPoints.y[amount - 1] - lerpPoints.y[0]);
      pop();
    }
  }
}
function blockCalc(i, j) {
  let switchLines = 1;
  extrudeChance.base != 0 ? switchLines = 1 : switchLines = 0;
  let colShift = 0;
  if (fillColour2D[i][j] >= colourDensity.base) {
    colShift = 1;
  }
  let w = lerpPoints.x[i + 1] - lerpPoints.x[i];
  let h = lerpPoints.y[j + 1] - lerpPoints.y[j];
  if (rDisplay2D[i][j] < displayDensity.base) {
    blockCounter[i][j].user = 1;
  } else {
    blockCounter[i][j].user = 0;
  }
  if (rExtrude2D[i][j] < extrudeChance.base) {
    blockHCounter[i][j].user = 1;
  } else {
    blockHCounter[i][j].user = 0;
  }
  let transitionPointX = lerp(lerpPoints.x[i], lerpPoints.x[i + 1], blockCounter[i][j].base);
  let bleed = map(w, 0, minimumSpacing, 0, 1, true) * map(h, 0, minimumSpacing, 0, 1, true) / 4;
  let fade = map(w, 0, minimumSpacing, 0, 1, true) * map(h, 0, minimumSpacing, 0, 1, true);
  let adjust = (strokeW.base * sqrt(2) - strokeW.base) / sqrt(2) * fade * switchLines;
  let thisCol = loadColour(i, j, colShift);
  let sWeight = strokeW.base * fade * switchLines;
  let offset = rHeight2D[i][j] * heightFactor * scaledown * blockCounter[i][j].base * blockHCounter[i][j].base;
  let transpose = createVector(width / 2, height / 2);
  let p = [];
  p[0] = createVector(lerpPoints.x[i] - bleed, lerpPoints.y[j] - bleed + adjust);
  p[1] = createVector(transitionPointX + bleed - adjust, lerpPoints.y[j] - bleed + adjust);
  p[2] = createVector(transitionPointX + bleed - adjust, lerpPoints.y[j + 1] + bleed);
  p[3] = createVector(lerpPoints.x[i] - bleed, lerpPoints.y[j + 1] + bleed);
  p[4] = createVector(lerpPoints.x[i] - bleed + offset, lerpPoints.y[j] - bleed + adjust - offset);
  p[5] = createVector(transitionPointX + bleed - adjust + offset, lerpPoints.y[j] - bleed + adjust - offset);
  p[6] = createVector(transitionPointX + bleed - adjust + offset, lerpPoints.y[j + 1] + bleed - offset);
  p[7] = createVector(lerpPoints.x[i] - bleed + offset, lerpPoints.y[j + 1] + bleed - offset);
  let adj = minorAdjustment(sWeight);
  p[8] = p[0].copy();
  p[8].add(adj, adj);
  p[9] = p[2].copy();
  p[9].sub(adj, adj);
  p[10] = p[4].copy();
  p[10].add(adj, adj);
  p[11] = p[6].copy();
  p[11].sub(adj, adj);

  for (let i = 0; i < p.length; i++) {
    p[i].sub(transpose);
    p[i].rotate(displayRotation.base * QUARTER_PI * -1);
    p[i].add(transpose);
    p[i].add(0, positionAdjust.base);
  }
  return {
    i: i,
    j: j,
    base: p,
    col: thisCol,
    weight: sWeight,
    fade: fade
  }
}
function blockDisplay(input) {
  let i = input.i;
  let j = input.j;
  if (blockCounter[i][j].base > 0.005) {
    fill(input.col.h, input.col.s, input.col.l);
    strokeWeight(input.weight);
    beginShape();
    vertex(input.base[0].x, input.base[0].y);
    vertex(input.base[1].x, input.base[1].y);
    vertex(input.base[2].x, input.base[2].y);
    vertex(input.base[3].x, input.base[3].y);
    endShape(CLOSE);
  }
  if (heightFactor != 0 && blockHCounter[i][j].base > 0.01 && blockCounter[i][j].base > 0.005) { // 
    // face Left
    fill(input.col.h, input.col.s, input.col.l - 5);
    strokeWeight(0);
    beginShape();
    vertex(input.base[0].x, input.base[0].y);
    vertex(input.base[4].x, input.base[4].y);
    vertex(input.base[7].x, input.base[7].y);
    vertex(input.base[3].x, input.base[3].y);
    endShape(CLOSE);
    // face Bottom
    fill(input.col.h, input.col.s, input.col.l - 10);
    beginShape();
    vertex(input.base[7].x, input.base[7].y);
    vertex(input.base[6].x, input.base[6].y);
    vertex(input.base[2].x, input.base[2].y);
    vertex(input.base[3].x, input.base[3].y);
    endShape(CLOSE);
    strokeWeight(input.weight);
    //strokeWeight(strokeW.base * input.fade);
    strokeJoin(MITER);
    noFill();
    beginShape();
    vertex(input.base[3].x, input.base[3].y);
    vertex(input.base[0].x, input.base[0].y);
    endShape();
    beginShape();
    vertex(input.base[8].x, input.base[8].y);
    vertex(input.base[10].x, input.base[10].y);
    endShape();
    beginShape();
    vertex(input.base[3].x, input.base[3].y);
    vertex(input.base[2].x, input.base[2].y);
    endShape();
    beginShape();
    vertex(input.base[9].x, input.base[9].y);
    vertex(input.base[11].x, input.base[11].y);
    endShape();
    beginShape();
    vertex(input.base[3].x, input.base[3].y);
    vertex(input.base[7].x, input.base[7].y);
    endShape();
    strokeWeight(input.weight);
    // face Front
    fill(input.col.h, input.col.s, input.col.l);
    strokeJoin(MITER);
    beginShape();
    vertex(input.base[4].x, input.base[4].y);
    vertex(input.base[5].x, input.base[5].y);
    vertex(input.base[6].x, input.base[6].y);
    vertex(input.base[7].x, input.base[7].y);
    endShape(CLOSE);
  }
}
function loadColour(i, j, colShift) {
  let h, s, l;
  h = swatchHSL[colourPalette][1 + colShift][rCol2D[i][j]][0] + hueShift;
  s = swatchHSL[colourPalette][1 + colShift][rCol2D[i][j]][1];
  l = swatchHSL[colourPalette][1 + colShift][rCol2D[i][j]][2] + (rLightness[i][j] - 6) * lightnessVariance.base / 50;
  return {
    h: h,
    s: s,
    l: l
  }
}
function loadLineColour() {
  let h, s, l;
  h = swatchHSL[colourPalette][0][1][0];
  s = swatchHSL[colourPalette][0][1][1];
  l = swatchHSL[colourPalette][0][1][2];
  return {
    h: h,
    s: s,
    l: l
  }
}
function minorAdjustment(a) {
  // sort out that little jagged edge
  let b = a * sqrt(2);
  let c = (a - b) / 2;
  let d = c / sqrt(2);
  return d;
}
function ezEase(x, curve) {
  let a = curve; //5
  return x < 0.5 ? (Math.pow(2, a - 1) * Math.pow(x, a)) : 1 - (Math.pow(-2 * x + 2, a) / 2);
}
function fullScreen() {
  const div = document.getElementById('defaultCanvas0');
  if (div != null) {
    document.addEventListener('keyup', (e) => {
      if (e.key == 'f') {
        div.requestFullscreen();
      }
    });
  }
}
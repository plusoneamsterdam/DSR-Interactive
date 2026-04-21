// SIZE SLIDER - Dark blue large circle, moves vertically
let sizeSliderY = 130;
let draggingSizeSlider = false;
const sizeSliderX = 190;
const sizeSliderRadius = 70;
const sizeSliderMinY = 110;
const sizeSliderMaxY = 450;

// extrusion SLIDER - Red/rust small circle, moves vertically
let extrudeSliderY = 180;
let draggingExtrudeSlider = false;
const extrudeSliderX = 269;
const extrudeSliderRadius = 17.5;
const extrudeSliderMinY = 160;
const extrudeSliderMaxY = 294;

// density SLIDER - Red/rust large circle, moves horizontally
let densitySliderX = 110;
let draggingDensitySlider = false;
const densitySliderY = 380;
const densitySliderRadius = 55;
const densitySliderMinX = 100;
const densitySliderMaxX = 310;

// visibility SLIDER - Dark blue small circle, moves vertically
let visibilitySliderY = 310;
let draggingVisibilitySlider = false;
const visibilitySliderX = 285;
const visibilitySliderRadius = 15;
const visibilitySliderMinY = 190;
const visibilitySliderMaxY = 310;

// ROTATION SLIDER - Golden/yellow medium circle, moves horizontally
let rotationSliderX = 100;
let rotationSliderTargetX = 100;  // Target position for smooth animation
let rotationSliderDragStart = 0;  // Initial mouse X position when drag starts
let draggingRotationSlider = false;
const rotationSliderY = 253;
const rotationSliderRadius = 22.5;
const rotationSliderMinX = 100;
const rotationSliderMaxX = 244;
const rotationSliderAnimationSpeed = 12;  // pixels per frame

// look SLIDER - Red/rust tiny circle, moves horizontally
let lookSliderX = 350;
let draggingLookSlider = false;
const lookSliderY = 525;
const lookSliderRadius = 25;
const lookSliderMinX = 100;
const lookSliderMaxX = 350;

// lines SLIDER - Dark blue small circle, moves horizontally
let linesSliderX = 120;
let draggingLinesSlider = false;
const linesSliderY = 555;
const linesSliderRadius = 20;
const linesSliderMinX = 100;
const linesSliderMaxX = 250;

// color SLIDER - Golden/yellow very large circle, moves vertically
let colorSliderY = 470;
let draggingColorSlider = false;
const colorSliderX = 195;
const colorSliderRadius = 42.5;
const colorSliderMinY = 350;
const colorSliderMaxY = 590;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

// Helper function to draw any slider circle
function drawSliderCircle(x, y, size, color) {
    fill(color);
    noStroke();
    circle(x, y, size);
}

// SIZE SLIDER - Dark blue large circle, moves vertically
function sizeSlider() {
    drawSliderCircle(sizeSliderX, sizeSliderY, 140, "#344474");
}

// extrusion SLIDER - Red/rust small circle, moves vertically
function extrusionSlider() {
    drawSliderCircle(extrudeSliderX, extrudeSliderY, 35, "#C04021");
}

// density SLIDER - Red/rust large circle, moves horizontally
function densitySlider() {
    drawSliderCircle(densitySliderX, densitySliderY, 110, "#C04021");
}

// visibility SLIDER - Dark blue small circle, moves vertically
function visibilitySlider() {
    drawSliderCircle(visibilitySliderX, visibilitySliderY, 30, "#344474");
}

// ROTATION SLIDER - Golden/yellow medium circle, moves horizontally
function rotationSlider() {
    // Animate rotation slider toward target
    if (rotationSliderX !== rotationSliderTargetX) {
        let diff = rotationSliderTargetX - rotationSliderX;
        if (Math.abs(diff) < rotationSliderAnimationSpeed) {
            rotationSliderX = rotationSliderTargetX;
        } else if (diff > 0) {
            rotationSliderX += rotationSliderAnimationSpeed;
        } else {
            rotationSliderX -= rotationSliderAnimationSpeed;
        }
    }
    drawSliderCircle(rotationSliderX, rotationSliderY, 45, "#EBC942");
}

// LOOK SLIDER - Red/rust tiny circle, moves horizontally
function lookSlider() {
    drawSliderCircle(lookSliderX, lookSliderY, 20, "#C04021");
}

// LINES SLIDER - Dark blue small circle, moves horizontally
function linesSlider() {
    drawSliderCircle(linesSliderX, linesSliderY, 40, "#344474");
}

// COLOR SLIDER - Golden/yellow very large circle, moves vertically
function colorSlider() {
    drawSliderCircle(colorSliderX, colorSliderY, 85, "#EBC942");
}


const a = 220;
const b = 30;
const c = 110;
const d = 390;

const s1 = 580;
const s2 = 230;
const s3 = 260;
const s4 = 150;
const s5 = 180;

// Helper function to draw lines with consistent style
function drawLine(x1, y1, x2, y2, weight = 1) {
    stroke(0);
    strokeWeight(weight);
    line(x1, y1, x2, y2);
}

function thickLines() {
    stroke(0);
    strokeWeight(2);
    line(a, b, a, b + s1);
    line(a + 49, b + 100, a + 49, b + 60 + s2);
    line(c, d, c + 30 + s2, d);
    line(a - 10, d + 124, a + s4, d + 124);
    line(b + 14, d - 50, b + 14, d - 60 + s4);
}

function thinLines() {
    stroke(0);
    strokeWeight(1);
    line(b + 45, a + 10, b + 35 + s5, a + 10);
    line(b, d - 114, b + 40 + s3, d - 114);
    line(a + 80, a - 40, a + 80, a + s4);
    line(30, d - 20, s3, d - 20);
    line(b + 30, d + 145, b + 50 + s5, d + 145);
    line(a - 20, d - 90, a - 20, d + s3);
}

// function sliders() {
//     thickLines();
//     sizeSlider();
//     colorSlider();
//     extrudeSlider();
//     rotationSlider();
//     lookSlider();
//     secSlider();
//     visibilitySlider();
//     lineSlider();
// }

function draw() {
    background("#f0f0f0");
    thickLines();
    thinLines();
    sizeSlider();
    drawLine(a - 20, d - 90, a - 20, d + s3, 1);
    densitySlider();
    drawLine(c, d, c + 30 + s2, d, 2);
    drawLine(a + 80, a - 40, a + 80, a + s4, 1);
    colorSlider();
    // drawLine(c, d, c + 30 + s2, d, 2);
    drawLine(a - 10, d + 124, a + s4, d + 124, 2);
    drawLine(b + 30, d + 145, b + 50 + s5, d + 145, 1);
    rotationSlider();
    linesSlider();
    extrusionSlider();
    drawLine(a + 49, b + 100, a + 49, b + 60 + s2, 2);
    visibilitySlider();
    lookSlider();
}

// Helper function to check slider clicks
function checkSliderClick(sliderName, sliderX, sliderY, sliderRadius) {
    return dist(mouseX, mouseY, sliderX, sliderY) < sliderRadius;
}

function mousePressed() {
    // Reset all dragging flags
    draggingSizeSlider = false;
    draggingExtrudeSlider = false;
    draggingDensitySlider = false;
    draggingVisibilitySlider = false;
    draggingLookSlider = false;
    draggingLinesSlider = false;
    draggingColorSlider = false;
    draggingRotationSlider = false;

    if (checkSliderClick('look', lookSliderX, lookSliderY, lookSliderRadius)) draggingLookSlider = true;
    else if (checkSliderClick('visibility', visibilitySliderX, visibilitySliderY, visibilitySliderRadius)) draggingVisibilitySlider = true;
    else if (checkSliderClick('extrude', extrudeSliderX, extrudeSliderY, extrudeSliderRadius)) draggingExtrudeSlider = true;
    else if (checkSliderClick('lines', linesSliderX, linesSliderY, linesSliderRadius)) draggingLinesSlider = true;
    else if (checkSliderClick('rotation', rotationSliderX, rotationSliderY, rotationSliderRadius)) {
        draggingRotationSlider = true;
        rotationSliderDragStart = mouseX;
    }
    else if (checkSliderClick('color', colorSliderX, colorSliderY, colorSliderRadius)) draggingColorSlider = true;
    else if (checkSliderClick('density', densitySliderX, densitySliderY, densitySliderRadius)) draggingDensitySlider = true;
    else if (checkSliderClick('size', sizeSliderX, sizeSliderY, sizeSliderRadius)) draggingSizeSlider = true;
}

function mouseDragged() {
    if (draggingSizeSlider) sizeSliderY = constrain(mouseY, sizeSliderMinY, sizeSliderMaxY);
    else if (draggingExtrudeSlider) extrudeSliderY = constrain(mouseY, extrudeSliderMinY, extrudeSliderMaxY);
    else if (draggingDensitySlider) densitySliderX = constrain(mouseX, densitySliderMinX, densitySliderMaxX);
    else if (draggingVisibilitySlider) visibilitySliderY = constrain(mouseY, visibilitySliderMinY, visibilitySliderMaxY);
    else if (draggingRotationSlider) {
        rotationSliderTargetX = (mouseX > rotationSliderDragStart) ? rotationSliderMaxX : rotationSliderMinX;
    }
    else if (draggingLookSlider) lookSliderX = constrain(mouseX, lookSliderMinX, lookSliderMaxX);
    else if (draggingLinesSlider) linesSliderX = constrain(mouseX, linesSliderMinX, linesSliderMaxX);
    else if (draggingColorSlider) colorSliderY = constrain(mouseY, colorSliderMinY, colorSliderMaxY);
}

function mouseReleased() {
    draggingSizeSlider = false;
    draggingExtrudeSlider = false;
    draggingDensitySlider = false;
    draggingVisibilitySlider = false;
    draggingRotationSlider = false;
    draggingLookSlider = false;
    draggingLinesSlider = false;
    draggingColorSlider = false;
    draggingSevenSlider = false;
}

// Function to get all slider values for sending to display
function getControlsData() {
    // Map rotation slider target position to boolean: left (100) = 0 (OFF), right (244) = 1 (ON)
    const rotationValue = rotationSliderTargetX <= (rotationSliderMinX + rotationSliderMaxX) / 2 ? 0 : 1;

    return {
        size: Math.round(map(sizeSliderY, sizeSliderMinY, sizeSliderMaxY, 10, 34)),
        density: Math.round(map(densitySliderX, densitySliderMinX, densitySliderMaxX, 4, 30)),
        extrude: Math.round(map(extrudeSliderY, extrudeSliderMinY, extrudeSliderMaxY, 0, 10)),
        visibility: Math.round(map(visibilitySliderY, visibilitySliderMinY, visibilitySliderMaxY, 3, 10)),
        look: constrain(map(lookSliderX, lookSliderMinX, lookSliderMaxX, 1, 0), 0, 1),
        lines: Math.round(map(linesSliderX, linesSliderMinX, linesSliderMaxX, 0, 10)),
        displayRotation: rotationValue,  // Rotation ON/OFF based on slider position
        colour: Math.round(map(colorSliderY, colorSliderMinY, colorSliderMaxY, 0, 10)),

        // Default values for other controls
        sizeLink: true,
        auto: false,
        hueShift: 0,
        lightnessVariance: 0,
        extrudeHeight: 20,
        bottomMargin: 0,
        positionAdjust: 0,
        centreWeighted: 0,
        transitionSpeed: 7,
        easing: 5,
        pause: 100,
        refresh: 0.6,
        lineWeight: 1.5,
        lineWeightB: 20,
        balance: 3,
        frame: false,
        border: false,
        debug: false,
        info: false,
        heightCalc: 3
    };
}
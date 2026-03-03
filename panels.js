var panel0 = QuickSettings.create(630, 50, "Shortlist")
  .addRange("Size", 1, 64, 17, 1)
  .addRange("Density", 4, 30, 14, 1)
  .addRange("Colour", 0, 10, 5, 1)
  .addRange("Visibility", 0, 10, 10, 1)
  .addRange("Lines", 0, 10, 2, 1)
  .addRange("Look", 0, 4, 1, 1)
  .addRange("Extrude", 0, 10, 0, 1)
  .addButton("Rotate", function () { toggleRotate() })
  .addBoolean("Auto", false)
  
  var panel1 = QuickSettings.create(850, 250, "Look")
  .addRange("Hue Shift", -100, 100, 0, 1)
  .addRange("Lightness Variance", 0, 100, 0, 1)
  .addRange("Extrude Height", 0, 100, 20, 0.1)
  
  var panel2 = QuickSettings.create(850, 50, "Placement")
  .addRange("Bottom Margin", 0, 2, 0, 1)
  .addRange("Position Adjust", -10, 10, 0, 0.1)
  .addRange("Centre Weighted", 0, 10, 0, 1)
  
  var panel3 = QuickSettings.create(850, 500, "Movement")
  .addRange("Transition Speed", 0, 50, 7, 1)
  .addRange("Easing", 1, 10, 5, 1)
  .addRange("Pause", 1, 200, 100, 1)
  .addRange("Refresh", 0, 1, 0.6, 0.1)
  
  var panel4 = QuickSettings.create(630, 550, "Lines")
  .addRange("Line Weight", 0, 50, 1.5, 0.5)
  .addRange("Line Weight B", 0, 50, 20, 0.5)
  .addRange("Balance", 0, 10, 3, 1)
  .addBoolean("Frame", false)
  .addBoolean("Border", false)

  var panel5 = QuickSettings.create(850, 730, "Other")
  .addButton("Print", function () { saveFrame() })
  .addBoolean("Debug", false)
  .addBoolean("Info", false)
  .addRange("Height Calc", 0, 3, 3, 1)
  .addBoolean("Size Link", true)

// Track toggle state for the Rotate button
let isRotated = false;
  
function panelSet() {
  sizeLink = panel5.getValue("Size Link");
  gridWidth = panel0.getValue("Size");
  if (sizeLink) {
    gridHeight = gridWidth;
   //panel0.setValue("Height", gridHeight);
  } else {  
    //gridHeight = panel0.getValue("Height");
  }
  newAmount = panel0.getValue("Density");
  colourDensity.user = panel0.getValue("Colour");
  displayDensity.user = panel0.getValue("Visibility");
  strokeChance.user = panel0.getValue("Lines"); 
  colourPalette = panel0.getValue("Look");
  extrudeChance.user = panel0.getValue("Extrude");
  autoMove = panel0.getValue("Auto");

  // Frame on when Lines is 10, off otherwise
  frameLine = strokeChance.user === 10;
  panel4.setValue("Frame", frameLine);
  
  hueShift = panel1.getValue("Hue Shift");
  lightnessVariance.user = panel1.getValue("Lightness Variance");
  heightFactor = panel1.getValue("Extrude Height") * reScale;
  
  newBottomMargin = panel2.getValue("Bottom Margin");
  positionAdjust.user = panel2.getValue("Position Adjust") * blockUnit;
  centreWeighted.user = panel2.getValue("Centre Weighted"); 
  
  increment = panel3.getValue("Transition Speed") * 0.001;
  easy = panel3.getValue("Easing");
  pause = panel3.getValue("Pause");
  pointRefresh = panel3.getValue("Refresh");
  
  strokeW.user = panel4.getValue("Line Weight") * reScale;
  strokeWB.user = panel4.getValue("Line Weight B") * reScale;
  strokeVariance.user = panel4.getValue("Balance"); 
  border = panel4.getValue("Border");

  bug = panel5.getValue("Debug");
  info = panel5.getValue("Info");
  heightCalc = panel5.getValue("Height Calc");
  
}

function toggleRotate() {
  // Toggle between 0° and 45° using the existing easing/value system
  isRotated = !isRotated;
  const targetRotation = isRotated ? 1 : 0; // 1 = 45°, 0 = 0°
  // Use the value system to lerp to the new rotation
  displayRotation.user = targetRotation;
}

function saveFrame() {
  // updateObj();
  // console.log(variables);
  // let now = new Date();
  // let filename = 
  // now.getMonth() + 1 +
  //   pad(now.getDate()) + "_" +
  //   pad(now.getHours()) + "-" +
  //   pad(now.getMinutes()) + "-" +
  //   pad(now.getSeconds());
  // let writer = createWriter(filename + ".txt");
  // writer.write(JSON.stringify(variables)); // Stringify the object
  // writer.close();
  saveCanvas('hello', 'png', 2160, 3840);
  // saveCanvas(filename, 'png');
}
function pad(num) {
  return num < 10 ? '0' + num : num;
}
panel1.collapse();
panel2.collapse();
panel3.collapse();
panel4.collapse();
panel5.collapse();
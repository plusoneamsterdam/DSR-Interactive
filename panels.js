var panel1 = QuickSettings.create(630, 50, "Look")
  .addRange("Block Density", 4, 45, 4, 1)
  .addRange("Colour Density", 0, 10, 5, 1)
  .addRange("Display Chance", 0, 10, 10, 1)
  .addRange("Colour Palette", 0, 4, 1, 1)
  .addRange("Hue Shift", -100, 100, 0, 1)
  .addRange("Lightness Variance", 0, 100, 0, 1)
  .addRange("Extrude Height", 0, 100, 5, 0.1)
  .addRange("Extrude Chance", 0, 10, 0, 1)
  
  var panel2 = QuickSettings.create(850, 50, "Placement")
  .addRange("Width", 1, 64, 17, 1)
  .addRange("Height", 1, 64, 31, 1)
  .addRange("Rotation", 0, 45, 0, 45)
  .addRange("Bottom Margin", 0, 2, 0, 1)
  .addRange("Position Adjust", -10, 10, 0, 0.1)
  .addRange("Centre Weighted", 0, 10, 0, 1)
  
  var panel3 = QuickSettings.create(850, 410, "Movement")
  .addRange("Transition Speed", 0, 50, 7, 1)
  .addRange("Easing", 1, 10, 5, 1)
  .addRange("Pause", 1, 200, 100, 1)
  .addRange("Refresh", 0, 1, 0.6, 0.1)
  .addBoolean("Auto", false)
  
  var panel4 = QuickSettings.create(630, 550, "Lines")
  .addRange("Line Weight", 0, 50, 1.5, 0.5)
  .addRange("Line Weight B", 0, 50, 20, 0.5)
  .addRange("Display Chance", 0, 10, 2, 1)
  .addRange("Balance", 0, 10, 3, 1)
  .addBoolean("Frame", false)
  .addBoolean("Border", true)

  var panel5 = QuickSettings.create(850, 700, "Other")
  .addButton("Print", function () { saveFrame() })
  .addBoolean("Debug", false)
  .addBoolean("Info", false)
  .addRange("Height Calc", 0, 3, 3, 1)
  
function panelSet() {
  newAmount = panel1.getValue("Block Density");
  colourDensity.user = panel1.getValue("Colour Density");
  displayDensity.user = panel1.getValue("Display Chance");
  colourPalette = panel1.getValue("Colour Palette");
  hueShift = panel1.getValue("Hue Shift");
  lightnessVariance.user = panel1.getValue("Lightness Variance");
  heightFactor = panel1.getValue("Extrude Height") * reScale;
  extrudeChance.user = panel1.getValue("Extrude Chance");
  
  gridWidth = panel2.getValue("Width");
  gridHeight = panel2.getValue("Height");
  displayRotation.user = panel2.getValue("Rotation") / 45;
  newBottomMargin = panel2.getValue("Bottom Margin");
  positionAdjust.user = panel2.getValue("Position Adjust") * blockUnit;
  centreWeighted.user = panel2.getValue("Centre Weighted"); 
  
  increment = panel3.getValue("Transition Speed") * 0.001;
  easy = panel3.getValue("Easing");
  pause = panel3.getValue("Pause");
  pointRefresh = panel3.getValue("Refresh");
  autoMove = panel3.getValue("Auto");
  
  strokeW.user = panel4.getValue("Line Weight") * reScale;
  strokeWB.user = panel4.getValue("Line Weight B") * reScale;
  strokeChance.user = panel4.getValue("Display Chance"); 
  strokeVariance.user = panel4.getValue("Balance"); 
  frameLine = panel4.getValue("Frame");
  border = panel4.getValue("Border");

  bug = panel5.getValue("Debug");
  info = panel5.getValue("Info");
  heightCalc = panel5.getValue("Height Calc");

}

function updateObj() {
  variables = {
    BlockDensity: panel1.getValue("Block Density"),
    ColourDensity: panel1.getValue("Colour Density"),
    DisplayChance: panel1.getValue("Display Chance"),
    ColourPalette: panel1.getValue("Colour Palette"),
    HueShift: panel1.getValue("Hue Shift"),
    LightnessVariance: panel1.getValue("Lightness Variance"),
    ExtrudeHeight: panel1.getValue("Extrude Height"),
    ExtrudeChance: panel1.getValue("Extrude Chance"),
    ScaleToZero: panel1.getValue("Scale to Zero"),
    
    GridWidth: panel2.getValue("Width"),
    GridHeight: panel2.getValue("Height"),
    Rotation: panel2.getValue("Rotation"),
    BottomMargin: panel2.getValue("Bottom Margin"),
    PositionAdjust: panel2.getValue("Position Adjust"),
    CentreWeighted: panel2.getValue("Centre Weighted"),
    
    TransitionSpeed: panel3.getValue("Transition Speed"),
    Easing: panel3.getValue("Easing"),
    Pause: panel3.getValue("Pause"),
    PointRefresh: panel3.getValue("Refresh"),
    AutoMove: panel3.getValue("Auto"),

    LineWeight: panel4.getValue("Line Weight"),
    LineWeightB: panel4.getValue("Line Weight B"),
    StrokeChance: panel4.getValue("Display Chance"),
    StrokeBalance: panel4.getValue("Balance"),
    Frame: panel4.getValue("Frame"),
    Border: panel4.getValue("Border"),

    Bug: panel5.getValue("Debug"),
    Info: panel5.getValue("Info"),
    HeightCalc: panel5.getValue("Height Calc")
  }
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
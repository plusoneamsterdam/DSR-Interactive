var panel0 = QuickSettings.create(10, 10, "Shortlist")
  .addRange("Size", 1, 64, 17, 1)
  .addRange("Density", 4, 30, 14, 1)
  .addRange("Colour", 0, 10, 5, 1)
  .addRange("Visibility", 0, 10, 10, 1)
  .addRange("Lines", 0, 10, 2, 1)
  .addRange("Look", 0, 1, 1, 1)
  .addRange("Extrude", 0, 10, 0, 1)
  .addButton("Rotate", function () { toggleRotate() })

var panel1 = QuickSettings.create(10, 280, "Look")
  .addRange("Hue Shift", -100, 100, 0, 1)
  .addRange("Lightness Variance", 0, 100, 0, 1)
  .addRange("Extrude Height", 0, 100, 20, 0.1)

var panel2 = QuickSettings.create(10, 400, "Placement")
  .addRange("Bottom Margin", 0, 2, 0, 1)
  .addRange("Position Adjust", -10, 10, 0, 0.1)
  .addRange("Centre Weighted", 0, 10, 0, 1)

var panel3 = QuickSettings.create(10, 520, "Movement")
  .addRange("Transition Speed", 0, 50, 7, 1)
  .addRange("Easing", 1, 10, 5, 1)
  .addRange("Pause", 1, 200, 100, 1)
  .addRange("Refresh", 0, 1, 0.6, 0.1)

var panel4 = QuickSettings.create(10, 680, "Lines")
  .addRange("Line Weight", 0, 50, 1.5, 0.5)
  .addRange("Line Weight B", 0, 50, 20, 0.5)
  .addRange("Balance", 0, 10, 3, 1)
  .addBoolean("Frame", false)
  .addBoolean("Border", false)

var panel5 = QuickSettings.create(10, 880, "Other")
  .addButton("Print", function () { saveFrame() })
  .addBoolean("Debug", false)
  .addBoolean("Info", false)
  .addRange("Height Calc", 0, 3, 3, 1)
  .addBoolean("Size Link", true)

// Track toggle state for the Rotate button
let isRotated = false;

function toggleRotate() {
  // Toggle between 0° and 45° locally on remote
  isRotated = !isRotated;
  console.log('Remote: Rotate toggle -', isRotated ? 'ON (45°)' : 'OFF (0°)');
  // Data will be sent via socket automatically
}

function saveFrame() {
  console.log('Remote: Save frame button pressed');
  // Data will be sent via socket automatically

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
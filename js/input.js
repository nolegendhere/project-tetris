//map of keyCodes for the playerOne
var arrowCodes1  = {97: "turnLeft", 74: "turnLeftMac",  98: "turnRight", 75: "turnRightMac", 37: "left",123: "leftMac", 38: "up", 126: "upMac", 39: "right", 124: "rightMac", 40: "down", 125: "downMac", 80: "pause", 35: "pauseMac"};

//map of keyCodes for the playerTwo
var arrowCodes2  = {71: "turnLeft", 5:"turnLeftMac", 72: "turnRight", 4:"turnRightMac", 65: "left", 0: "leftMac", 87: "up", 13: "upMac", 68: "right", 2: "rightMac", 83: "down", 1: "downMac", 80: "pause", 35: "pauseMac"};

//Function that returns an object with the mapped keyCodes returning true if they are pressed or false if they are released
function trackKeysDown(codes) {
  var pressed = Object.create(null);
  var unpressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      var up = event.type == "keyup";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

//playerOne
var arrows1 = trackKeysDown(arrowCodes1);
//playerTwo
var arrows2 = trackKeysDown(arrowCodes2);

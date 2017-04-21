//map of keyCodes for the playerOne
// var arrowCodes1  = {70: "turnLeft", 14:"turnLeftMac", 71: "turnRight", 15:"turnRightMac", 65: "left", 0: "leftMac", 87: "up", 13: "upMac", 68: "right", 2: "rightMac", 83: "down", 1: "downMac", 80: "pause", 35: "pauseMac"};
//PlayerOne
var arrowCodes1  = {70: "turnLeft", 71: "turnRight",  65: "left", 87: "up", 68: "right", 83: "down", 80: "pause"};

//map of keyCodes for the playerTwo
// var arrowCodes2  = {73: "turnLeft", 34: "turnLeftMac",  79: "turnRight", 31: "turnRightMac", 72: "left",123: "leftMac", 85: "up", 126: "upMac", 75: "right", 124: "rightMac", 74: "down", 125: "downMac", 80: "pause", 35: "pauseMac"};
//PlayerTwo
var arrowCodes2  = {73: "turnLeft", 79: "turnRight", 72: "left", 85: "up",  75: "right", 74: "down", 80: "pause"};


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

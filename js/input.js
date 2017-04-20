
//map of keyCodes for the playerOne
var arrowCodes1  = {97: "turnLeft", 98: "turnRight", 37: "left", 38: "up", 39: "right", 40: "down", 80: "pause"};

//map of keyCodes for the playerTwo
var arrowCodes2  = {71: "turnLeft", 72: "turnRight", 65: "left", 87: "up", 68: "right", 83: "down", 80: "pause"};

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

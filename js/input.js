var arrowCodes1  = {97: "turnLeft", 98: "turnRight", 37: "left", 38: "up", 39: "right", 40: "down", 80: "pause"};

var arrowCodes2  = {71: "turnLeft", 72: "turnRight", 65: "left", 87: "up", 68: "right", 83: "down", 80: "pause"};

function trackKeysDown(codes) {
  var pressed = Object.create(null);
  var unpressed = Object.create(null);
  function handler(event) {
    //console.log(event);
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      var up = event.type == "keyup";
      pressed[codes[event.keyCode]] = down;
      unpressed[codes[event.keyCode]] = up;
      //console.log("pressed",pressed);
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

function trackKeysUp(codes) {
  var unpressed = Object.create(null);
  function handler(event) {
    //console.log(event);
    if (codes.hasOwnProperty(event.keyCode)) {
      var up = event.type == "keyup";
      unpressed[codes[event.keyCode]] = up;
      //console.log("pressed",pressed);
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return unpressed;
}

var arrows1 = trackKeysDown(arrowCodes1);
var arrows1up = trackKeysUp(arrowCodes1);
var arrows2 = trackKeysDown(arrowCodes2);
var arrows2up = trackKeysUp(arrowCodes2);

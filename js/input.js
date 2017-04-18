var arrowCodes1  = {97: "turnLeft", 98: "turnRight", 37: "left", 38: "up", 39: "right", 40: "down", 80: "pause"};

var arrowCodes2  = {71: "turnLeft", 72: "turnRight", 65: "left", 87: "up", 68: "right", 83: "down", 80: "pause"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    //console.log(event);
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      //console.log("pressed",pressed);
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

var arrows1 = trackKeys(arrowCodes1);
var arrows2 = trackKeys(arrowCodes2);

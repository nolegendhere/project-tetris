function Game2(options) {

  this.fpsDisplay = options.fpsDisplay;
  this.limit = options.limit;
  this.lastFrameTimeMs = options.lastFrameTimeMs;
  this.maxFPS = options.maxFPS;
  this.delta = options.delta;
  this.timestep = options.timestep;
  this.fps = options.fps;
  this.framesThisSecond = options.framesThisSecond;
  this.lastFpsUpdate = options.lastFpsUpdate;
  this.running = options.running;
  this.started = options.started;
  this.frameID = options.frameID;

  // this.box = options.box;
  // this.boxPos = options.boxPos;
  // this.boxLastPos = options.boxLastPos;
  // this.boxVelocity = options.boxVelocity;

  this.rows = options.rows;
  this.columns = options.columns;
  this.width = options.width;
  this.height = options.height;
  this.regions = [];
  this.levelLeft = options.levelLeft;
  this.levelTop = options.levelTop;

}

Game2.prototype.update = function () {

    // this.boxLastPos = this.boxPos;
    // this.boxPos += this.boxVelocity * this.delta;
    // // Switch directions if we go too far
    // if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
};


Game2.prototype.draw = function(interp) {
    // this.box.style.left = (this.boxLastPos + (this.boxPos - this.boxLastPos) * interp) + 'px';
    this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS';
};


Game2.prototype.panic = function() {
    this.delta = 0;
};

Game2.prototype.begin = function(timestamp, delta) {
};

Game2.prototype.end = function(fps) {
    if (fps < 25) {
        // this.box.style.backgroundColor = 'black';
    }
    else if (fps > 30) {
        // this.box.style.backgroundColor = 'red';
    }
};

Game2.prototype.stop = function() {
    this.running = false;
    this.started = false;
    cancelAnimationFrame(frameID);
};

Game2.prototype.startGame = function() {
    if (!this.started) {
        this.started = true;
        this.generateRegions();
        this.frameID = requestAnimationFrame(function(timestamp) {
            this.draw(1);
            this.running = true;
            this.lastFrameTimeMs = timestamp;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            //console.log("this",this);
        }.bind(this));
    }
};

Game2.prototype.mainLoop=function(timestamp) {
    // Throttle the frame rate.
    //console.log("this",this);
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
        this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
        return;
    }

    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    //this.begin(timestamp, this.delta);

    if (timestamp > this.lastFpsUpdate + 1000) {
        this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

        this.lastFpsUpdate = timestamp;
        this.framesThisSecond = 0;
    }
    this.framesThisSecond++;

    var numUpdateSteps = 0;
    while (this.delta >= this.timestep) {
        this.update(this.timestep);
        this.delta -= this.timestep;
        if (++this.numUpdateSteps >= 240) {
            this.panic();
            break;
        }
    }

    //console.log("this",this);
    this.draw(this.delta / this.timestep);

    this.end(this.fps);

    this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
};


Game2.prototype.generateRegions = function () {
  this.cellWidth = this.width / this.columns;
  this.cellHeight = this.height / this.rows;
  var region;
  for (var rowIndex = 0; rowIndex < this.rows; rowIndex++)
  {
    var tempArray=[];
    console.log("rowIndex",rowIndex);
    for (var columnIndex = 0; columnIndex < this.columns; columnIndex++)
    {
      console.log("columnIndex",columnIndex);
      region = new Region( this.levelLeft + columnIndex* this.cellWidth, this.levelTop - rowIndex*this.cellHeight, this.levelLeft + (columnIndex+1) * this.cellWidth, this.levelTop - (rowIndex+1) * this.cellHeight);

      tempArray.push(region);

      $('.container').append($('<div>').addClass('cell board').attr('data-row', rowIndex).attr('data-column', columnIndex));

    }
    this.regions.push(tempArray);
  }
};

$(document).ready(function(){

  var arrowCodes  = {190: "turnLeft", 189: "turnRight", 37: "left", 38: "up", 39: "right", 40: "down", 80: "pause"};

  function trackKeys(codes) {
    var pressed = Object.create(null);
    function handler(event) {
      console.log(event);
      if (codes.hasOwnProperty(event.keyCode)) {
        var down = event.type == "keydown";
        pressed[codes[event.keyCode]] = down;
        console.log("pressed",pressed);
        event.preventDefault();
      }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
  }
  console.log("hi2");
  var arrows = trackKeys(arrowCodes);// Initial values

  var game2 = new Game2({
      // box :document.getElementById('box'),
      // boxPos : 10,
      // boxLastPos : 10,
      // boxVelocity : 0.08,
      fpsDisplay : document.getElementById('fpsDisplay'),
      limit : 300,
      lastFrameTimeMs : 0,
      maxFPS : 60,
      delta : 0,
      timestep : 1000 / 60,
      fps : 60,
      framesThisSecond : 0,
      lastFpsUpdate : 0,
      running : false,
      started : false,
      frameID : 0,
      rows: 50,
      columns: 50,
      width: 640,
      height: 480,
      levelLeft: 0,
      levelTop: 640
  });


  game2.startGame();
  console.log(game2.regions);
});

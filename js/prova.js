
function Game2(options) {
  this.box = options.box;
  this.fpsDisplay = options.fpsDisplay;
  this.boxPos = options.boxPos;
  this.boxLastPos = options.boxLastPos;
  this.boxVelocity = options.boxVelocity;
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
}

Game2.prototype.update = function () {

    this.boxLastPos = this.boxPos;
    this.boxPos += this.boxVelocity * this.delta;
    // Switch directions if we go too far
    if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
};


Game2.prototype.draw = function(interp) {
    this.box.style.left = (this.boxLastPos + (this.boxPos - this.boxLastPos) * interp) + 'px';
    this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS';
};


Game2.prototype.panic = function() {
    this.delta = 0;
};

Game2.prototype.begin = function(timestamp, delta) {
};

Game2.prototype.end = function(fps) {
    if (fps < 25) {
        this.box.style.backgroundColor = 'black';
    }
    else if (fps > 30) {
        this.box.style.backgroundColor = 'red';
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
        this.frameID = requestAnimationFrame(function(timestamp) {
            this.draw(1);
            this.running = true;
            this.lastFrameTimeMs = timestamp;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            console.log("this",this);
        }.bind(this));
    }
};

Game2.prototype.mainLoop=function(timestamp) {
    // Throttle the frame rate.
    console.log("this",this);
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

$(document).ready(function(){

var game2 = new Game2({
      box :document.getElementById('box'),
      fpsDisplay : document.getElementById('fpsDisplay'),
      boxPos : 10,
      boxLastPos : 10,
      boxVelocity : 0.08,
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
      frameID : 0
});


    game2.startGame();
});

function Game(options) {

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

  this.box = options.box;
  this.boxPos = options.boxPos;
  this.boxLastPos = options.boxLastPos;
  this.boxVelocity = options.boxVelocity;

  this.rows = options.rows;
  this.columns = options.columns;
  this.regions = [];
  this.keys = options.keys;

  this.movementCount = 0;
  this.movementCountLength = 10;
  this.rotateCount = 0;
  this.rotateCountLength = 20;
  this.directionLeft = false;
  this.directionRight = false;
  this.rotateLeft = false;
  this.rotateRight = false;

  this.width = options.width;
  this.height = options.height;
  this.offset = {
    row: options.offsetRow,
    column: options.offsetColumn
  };
  this.initialRegion = {
    row: options.initialRegionRow,
    column: options.initialRegionColumn
  };

}

Game.prototype.update = function () {
  console.log("entra update");
  if(this.pieceGenerator.actualPiece().contact)
  {
    this.pieceGenerator.generatePiece({initialRegionRow: this.initialRegion.row, initialRegionColumn: this.initialRegion.column, regions: this.regions});
  }

  this.movementCount++;
  this.rotateCount++;
  this.assignControlKeys();

  if(this.movementCount==this.movementCountLength)
  {
    console.log("moveDown from update");
    this.pieceGenerator.actualPiece().moveDown(this.rows,this.columns);
    this.movementCount=0;
  }
  if(this.rotateCount==this.rotateCountLength)
  {
    this.rotateCount=0;
  }

    // this.boxLastPos = this.boxPos;
    // this.boxPos += this.boxVelocity * this.delta;
    // // Switch directions if we go too far
    // if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
};


Game.prototype.draw = function(interp) {
    // this.box.style.left = (this.boxLastPos + (this.boxPos - this.boxLastPos) * interp) + 'px';
    this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS';
    // this.pieceGenerator.clearPieces();
    this.pieceGenerator.drawPieces();
};


Game.prototype.panic = function() {
    this.delta = 0;
};

Game.prototype.begin = function(timestamp, delta) {
};

Game.prototype.end = function(fps) {
    if (fps < 25) {
        // this.box.style.backgroundColor = 'black';
    }
    else if (fps > 30) {
        // this.box.style.backgroundColor = 'red';
    }
};

Game.prototype.stop = function() {
    this.running = false;
    this.started = false;
    cancelAnimationFrame(frameID);
};

Game.prototype.startGame = function() {
    if (!this.started) {
        this.started = true;
        this.generateRegions();
        // $('.container').append($('<div>').addClass('cell'));
        //console.log("this.regions",this.regions);
        this.pieceGenerator.generatePiece({initialRegionRow:this.initialRegion.row, initialRegionColumn: this.initialRegion.column, regions: this.regions});
        this.frameID = requestAnimationFrame(function(timestamp) {
            this.draw(1);
            this.running = true;
            this.lastFrameTimeMs = timestamp;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            //console.log("entra2");
        }.bind(this));
    }
};

Game.prototype.mainLoop=function(timestamp) {
    // Throttle the frame rate.
    //console.log("mainloop");
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


Game.prototype.generateRegions = function () {
  this.cellWidth = this.width / this.columns;
  this.cellHeight = this.height / this.rows;
  this.levelLeft = this.offset.column;
  this.levelTop = this.offset.row;
  var region;
  for (var rowIndex = 0; rowIndex < this.rows; rowIndex++)
  {
    var tempArray=[];
    //console.log("rowIndex",rowIndex);
    for (var columnIndex = 0; columnIndex < this.columns; columnIndex++)
    {
      //console.log("columnIndex",columnIndex);

      region = new Region({ left: this.levelLeft + columnIndex* this.cellWidth, top: this.levelTop + rowIndex*this.cellHeight, right: this.levelLeft + (columnIndex+1) * this.cellWidth,bottom: this.levelTop + (rowIndex+1) * this.cellHeight, state: true});

      tempArray[columnIndex] = region;
      // tempArray[columnIndex] = true;

      // $('.container').append($('<div>').addClass('cell board').attr('data-row', rowIndex).attr('data-column', columnIndex));

    }
    this.regions.push(tempArray);
  }

  this.pieceGenerator = new PieceGenerator(this.regions);
};

Game.prototype.assignControlKeys = function () {
  if(!this.paused)
  {
    if(this.keys.turnLeft)
    {
      //TurnLeft
      this.rotateLeft = true;
    }

    if(this.rotateLeft && this.rotateCount === this.rotateCountLength)
    {
      //TurnRight
      this.rotateLeft = false;

      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceLeft(this.rows, this.columns);
    }

    if(this.keys.turnRight)
    {
      //TurnRight
      this.rotateRight = true;
    }

    if(this.rotateRight && this.rotateCount === this.rotateCountLength)
    {
      //TurnRight
      this.rotateRight = false;
      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceRight(this.rows, this.columns);
    }

    if(this.keys.left)
    {
      //Left
      this.directionLeft = true;
    }

    if(this.directionLeft && this.movementCount === this.movementCountLength)
    {
      //Left
      this.directionLeft = false;
      this.pieceGenerator.actualPiece().goLeft(this.columns);
    }

    if(this.keys.right)
    {
      //Right
      this.directionRight = true;
    }

    if(this.directionRight && this.movementCount === this.movementCountLength)
    {
      //Right
      this.directionRight = false;
      this.pieceGenerator.actualPiece().goRight(this.columns);
    }
    //console.log("entra1");
    if(this.keys.pause)
    {
      console.log("ENTRA");
      this.paused = true;
    }
  }
  else {
    console.log("entra2");
    if(this.keys.pause)
    {
        this.paused = false;
    }
  }

};

$(document).ready(function(){

  var arrowCodes  = {190: "turnLeft", 189: "turnRight", 37: "left", 38: "up", 39: "right", 40: "down", 80: "pause"};

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
  console.log("hi2");
  var arrows = trackKeys(arrowCodes);// Initial values

  var game = new Game({
      box :document.getElementById('box'),
      boxPos : 10,
      boxLastPos : 10,
      boxVelocity : 0.08,
      fpsDisplay : document.getElementById('fpsDisplay'),
      limit : 300,
      lastFrameTimeMs : 0,
      maxFPS : 60,
      delta : 0,
      timestep : 1000 / 60,
      fps : 30,
      framesThisSecond : 0,
      lastFpsUpdate : 0,
      running : false,
      started : false,
      frameID : 0,
      rows: 50,
      columns: 50,
      keys: arrows,
      width: 640,
      height: 480,
      offsetRow: 20,
      offsetColumn: 20,
      initialRegionRow: 25,
      initialRegionColumn: 25,
  });


  game.startGame();
  console.log("game.regions from document jquery",game.regions);
});

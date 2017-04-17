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

  // this.box = options.box;
  // this.boxPos = options.boxPos;
  // this.boxLastPos = options.boxLastPos;
  // this.boxVelocity = options.boxVelocity;

  this.rows = options.rows;
  this.columns = options.columns;
  this.limitRowBottom = options.limitRowBottom;
  this.limitColumnLeft = options.limitColumnLeft;
  this.limitColumnRight = options.limitColumnRight; //not used yet
  this.regions = [];
  this.keys = options.keys;



  this.directionLeft = false;
  this.directionRight = false;
  this.rotateLeft = false;
  this.rotateRight = false;

  this.movementCount = 0;
  this.movementCountLength = 10;
  this.inputResponseLeft = 0;
  this.inputResponseLeftLength = 10;
  this.inputResponseRight = 0;
  this.inputResponseRightLength = 10;
  this.inputResponseRotateLeft = 0;
  this.inputResponseRotateLeftLength = 10;
  this.inputResponseRotateRight = 0;
  this.inputResponseRotateRightLength = 10;

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
  //console.log("entra update");
  if(this.pieceGenerator.actualPiece().contact)
  {
    this.pieceGenerator.actualPiece().updateRegions();
    this.pieceGenerator.generatePiece({initialRegionRow: this.initialRegion.row, initialRegionColumn: this.initialRegion.column, regions: this.regions});
  }

  this.movementCount++;
  this.rotateCount++;
  this.assignControlKeys();
  console.log("this.rotateCount",this.rotateCount);
  if(this.movementCount==this.movementCountLength)
  {
    //console.log("moveDown from update");
    this.pieceGenerator.actualPiece().moveDown(this.limitRowBottom);
    this.movementCount=0;
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
  console.log("this.cellWidth",this.cellWidth);
  this.cellHeight = this.height / this.rows;
  console.log("this.cellHeight",this.cellHeight);
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
    if(this.rotateLeft && this.inputResponseRotateLeft>=this.inputResponseRotateLeftLength && !this.keys.turnLeft)
    {
      //TurnRight
      console.log("rotateLeft");
      this.rotateLeft = false;
      this.inputResponseRotateLeft = 0;

      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceLeft(this.limitRowBottom, this.limitColumnRight);
    }
    else if(this.keys.turnLeft && this.inputResponseRotateLeft===0)
    {
      //TurnLeft
      this.rotateLeft = true;
      this.inputResponseRotateLeft++;
    }
    else if(this.inputResponseRotateLeft>0)
    {
      this.inputResponseRotateLeft++;
    }


    if(this.rotateRight && this.inputResponseRotateRight>=this.inputResponseRotateRight && !this.keys.turnRight)
    {
      //TurnRight
      console.log("rotateRight");
      this.rotateRight = false;
      this.inputResponseRotateRight = 0;

      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceRight(this.limitRowBottom, this.limitColumnRight);
    }
    else if(this.keys.turnRight && this.inputResponseRotateRight===0)
    {
      //TurnRight
      this.rotateRight = true;
      this.inputResponseRotateRight++;
    }
    else if(this.inputResponseRotateRight>0)
    {
      this.inputResponseRotationRight++;
    }

    if(this.directionLeft && this.inputResponseLeft>=this.inputResponseLeftLength)
    {
      //Left
      this.directionLeft = false;
      this.inputResponseLeft = 0;
      this.pieceGenerator.actualPiece().goLeft(this.limitColumnRight);
    }
    else if(this.keys.left && this.inputResponseLeft===0)
    {
      //Left
      this.directionLeft = true;
      this.inputResponseLeft++;

    }
    else if(this.inputResponseLeft>0)
    {
      this.inputResponseLeft++;
    }

    if(this.directionRight  && this.inputResponseRight>=this.inputResponseRightLength)
    {
      //Right
      this.directionRight = false;
      this.inputResponseRight = 0;
      this.pieceGenerator.actualPiece().goRight(this.limitColumnRight);
    }
    else if(this.keys.right && this.inputResponseRight===0)
    {
      //Right
      this.directionRight = true;
      this.inputResponseRight++;
    }
    else if(this.inputResponseRight>0)
    {
      this.inputResponseRight++;
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
      maxFPS : 100,
      delta : 0,
      timestep : 1000 / 100,
      fps : 60,
      framesThisSecond : 0,
      lastFpsUpdate : 0,
      running : false,
      started : false,
      frameID : 0,
      rows: 50,
      columns: 50,
      limitRowBottom: 40,
      limitColumnLeft: 0,
      limitColumnRight: 10,
      keys: arrows,
      width: 650,
      height: 650,
      offsetRow: 20,
      offsetColumn: 20,
      initialRegionRow: 1,
      initialRegionColumn: 5,
  });


  game.startGame();
  console.log("game.regions from document jquery",game.regions);
});

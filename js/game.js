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
  this.rowsToComplete = [];
  this.keys = options.keys;

  this.directionLeft = false;
  this.directionRight = false;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.pausePressed = false;

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

  this.inputResponsePause = 0;
  this.inputResponsePauseLength = 10;

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

  this.playerNumber = options.playerNumber;
  this.playerScore = 0;

  this.gamePaused = false;

}


Game.prototype.update = function () {

  if(!this.gamePaused)
  {
    if(this.pieceGenerator.actualPiece().contact)
    {
      this.playerScore+=this.pieceGenerator.updateRegions();
      this.pieceGenerator.actualPiece().drawPiece();
      this.pieceGenerator.generatePiece({initialRegionRow: this.initialRegion.row, initialRegionColumn: this.initialRegion.column, regions: this.regions, limitRowBottom: this.limitRowBottom, limitColumnRight: this.limitColumnRight});
    }
  }

  if(!this.gamePaused)
  {
    this.movementCount++;

    if(this.movementCount==this.movementCountLength)
    {
      this.pieceGenerator.actualPiece().moveDown();
      this.movementCount=0;
    }
  }

  this.assignControlKeys();

    // this.boxLastPos = this.boxPos;
    // this.boxPos += this.boxVelocity * this.delta;
    // // Switch directions if we go too far
    // if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
};

Game.prototype.draw = function(interp) {
    // this.box.style.left = (this.boxLastPos + (this.boxPos - this.boxLastPos) * interp) + 'px';
    this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS';

    if(!this.gamePaused)
    {
      this.pieceGenerator.drawPiece();
      this.displayResult();
    }
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
        this.generateLayout();
        this.generateRegions();
        this.generateInPlayMenu();
        this.pieceGenerator.generatePiece({initialRegionRow: this.initialRegion.row, initialRegionColumn: this.initialRegion.column, regions: this.regions, limitRowBottom: this.limitRowBottom, limitColumnRight: this.limitColumnRight});
        this.frameID = requestAnimationFrame(function(timestamp) {
            this.draw(1);
            this.running = true;
            this.lastFrameTimeMs = timestamp;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
        }.bind(this));
    }
};

Game.prototype.mainLoop=function(timestamp) {
    // Throttle the frame rate.
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

    this.draw(this.delta / this.timestep);
    this.end(this.fps);
    this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
};

Game.prototype.generateLayout = function () {

  this.playerLayout='[player-number-layout='+this.playerNumber.toString()+']';

  $('.ingame-layout').append($('<div>').addClass('player-layout').attr('player-number-layout',this.playerNumber.toString()));

};

Game.prototype.generateRegions = function () {
  this.cellWidth = this.width / this.columns;
  //console.log("this.cellWidth",this.cellWidth);
  this.cellHeight = this.height / this.rows;
  //console.log("this.cellHeight",this.cellHeight);
  this.levelLeft = this.offset.column;
  this.levelTop = this.offset.row;
  var region;

  this.boardSelector ='[player-number-board='+this.playerNumber.toString()+']';

  $(this.playerLayout).append($('<div>').addClass('player-board').attr('player-number-board',this.playerNumber.toString()));

  for (var rowIndex = 0; rowIndex < this.limitRowBottom; rowIndex++)
  {
    var tempArray=[];
    this.rowsToComplete.push(0);

    for (var columnIndex = 0; columnIndex < this.limitColumnRight; columnIndex++)
    {
      // var selector ='[player-number-region='+this.playerNumber.toString()+'][data-row='+rowIndex.toString()+'][data-column='+ columnIndex.toString() +']';

      region = new Region({ left: this.levelLeft + columnIndex* this.cellWidth, top: this.levelTop + rowIndex*this.cellHeight, right: this.levelLeft + (columnIndex+1) * this.cellWidth,bottom: this.levelTop + (rowIndex+1) * this.cellHeight, state: true, regionColor: 'black'});

      tempArray[columnIndex] = region;

      $(this.boardSelector).append($('<div>').addClass('cell board').attr('player-number-region',this.playerNumber.toString()).attr('data-row', rowIndex).attr('data-column', columnIndex).css({backgroundColor: region.regionColor, position: 'absolute', top: region.center.row.toString()+'px', left: region.center.column.toString()+'px'}));
    }
    this.regions.push(tempArray);
  }

  $(this.boardSelector).append($('<div>').addClass('piece-generator').attr('player-number-piece-generator',this.playerNumber.toString()));

  this.pieceGeneratorSelector = '[player-number-piece-generator='+this.playerNumber.toString()+']';

  this.pieceGenerator = new PieceGenerator({playerNumber: this.playerNumber,pieceGeneratorSelector: this.pieceGeneratorSelector,rowsToComplete: this.rowsToComplete,regions:this.regions,limitColumnRight:this.limitColumnRight});
};

Game.prototype.assignControlKeys = function () {
  if(!this.gamePaused)
  {
    if(this.rotateLeft && this.inputResponseRotateLeft>=this.inputResponseRotateLeftLength && !this.keys.turnLeft)
    {
      //TurnRight
      this.rotateLeft = false;
      this.inputResponseRotateLeft = 0;
      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceLeft();
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
      this.rotateRight = false;
      this.inputResponseRotateRight = 0;
      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceRight();
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
      this.pieceGenerator.actualPiece().goLeft();
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
      this.pieceGenerator.actualPiece().goRight();
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

    if(this.pausePressed && this.inputResponsePause>=this.inputResponsePauseLength && !this.keys.pause)
    {
      //Pause
      this.pausePressed = false;
      this.gamePaused = true;
      this.inputResponsePause = 0;
    }
    else if(this.keys.pause && this.inputResponsePause===0)
    {
      //Pause
      this.pausePressed = true;
      this.inputResponsePause++;
    }
    else if(this.inputResponsePause>0)
    {
      this.inputResponsePause++;
    }
  }
  else {

    if(this.pausePressed && this.inputResponsePause>=this.inputResponsePauseLength && !this.keys.pause)
    {
      //Pause
      console.log("entra2 PauseFalse 1");
      this.pausePressed = false;
      this.gamePaused = false;
      this.inputResponsePause = 0;
    }
    else if(this.keys.pause && this.inputResponsePause===0)
    {
      //Pause
      this.pausePressed = true;
      console.log("entra2 PauseFalse 2");
      this.inputResponsePause++;
    }
    else if(this.inputResponsePause>0)
    {
      console.log("entra2 PauseFalse 3");
      this.inputResponsePause++;
    }
  }
};

Game.prototype.generateInPlayMenu = function (){

  this.InPlayMenuSelector ='[player-number-inplaymenu='+this.playerNumber.toString()+']';

  $(this.playerLayout).append($('<div>').addClass('player-inplaymenu').attr('player-number-inplaymenu',this.playerNumber.toString()));

  this.playerScoreSelector ='#player-number-score'+this.playerNumber.toString();

  $(this.InPlayMenuSelector).append($('<div>').addClass('score').attr('id','player-number-score'+this.playerNumber.toString()).append($('<p>')));

};

Game.prototype.displayResult = function () {
  //console.log("entra",$(this.playerScoreSelector));
  $(this.playerScoreSelector+' p').html(this.playerScore.toString());
  //console.log("this",this);
};

Game.prototype.restartGame = function () {
  console.log("restart");
  $(this.playerLayout).remove();
};

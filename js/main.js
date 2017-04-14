function Game(options){
    this.rows = options.rows;
    this.columns = options.columns;
    this.pieceGenerator = options.pieceGenerator;
    this.paused = false;
    this.updatesPerSec = options.updatesPerSec;
    this.skipTicks = 1000/this.updatesPerSec;
    this.gameRunning = true;
    this.nextUpdate = new Date();
    this.currentTime = new Date();

    for(var rowIndex = 0; rowIndex < this.rows; rowIndex++) {

      for(var columnIndex = 0; columnIndex < this.columns; columnIndex++) {

        $('.container').append($('<div>').addClass('cell board').attr('data-row', rowIndex).attr('data-column', columnIndex));
      }
    }
}

Game.prototype.startGame = function (arrows) {

  // while(true) {
  //
  //     // Update current time
  //     var currentTime = this.currentTime.getTime();
  //
  //     // While we are behind in updates, do updates! Keep doing them till we catch up.
  //     while(this.nextUpdate < currentTime) {
  //         this.update(arrows);
  //         this.nextUpdate += this.skipTicks;
  //     }
  //
  //     // Calculate how far in between updates we are:
  //     // Near 0.0 values: update just occurred.
  //     // Near 1.0 values: update about to happen.
  //     // Read this equation till it makes sense what's happening here:
  //     var interpolation = (currentTime + this.skipTicks - this.nextUpdate) / this.skipTicks;
  //     this.renderGame(interpolation);
  // }

};

Game.prototype.renderGame = function(interpolation)
{
  if(!this.paused)
  {
    this.pieceGenerator.clearPieces();
    this.pieceGenerator.drawPieces();
  }

};

Game.prototype.update = function (arrows) {
  // update game logic & physics here
  this.assignControlKeys(arrows);

  if(!this.paused)
  {
    this.pieceGenerator.actualPiece().moveDown(this.rows,this.columns);
  }

};


//TO-DO: add rotateLeft, rotateDown; change goDown in order to go down faster
Game.prototype.assignControlKeys = function (arrows) {
  if(!this.paused)
  {
    if(arrows.turnLeft)
    {
      //TurnLeft
      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceLeft(this.rows, this.columns);
    }

    if(arrows.turnRight)
    {
      //TurnRight
      this.pieceGenerator.actualPiece().defineRotationPoint();
      this.pieceGenerator.actualPiece().rotatePieceRight(this.rows, this.columns);
    }

    if(arrows.left)
    {
      //Left
      this.pieceGenerator.actualPiece().goLeft(this.columns);
    }

    if(arrows.right)
    {
      //Right
      this.pieceGenerator.actualPiece().goRight(this.columns);
    }
    console.log("entra1");
    if(arrows.pause)
    {
      console.log("ENTRA");
      this.paused = true;
    }
  }
  else {
    console.log("entra2");
    if(arrows.pause)
    {
        this.paused = false;
    }
  }

};


$(document).ready(function(){
  console.log("hi1");
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

  var game = new Game({
    rows: 50,
    columns: 50,
    pieceGenerator: new PieceGenerator(),
    updatesPerSec: 25
  });

   console.log("hi3");
  game.startGame(arrows);

});

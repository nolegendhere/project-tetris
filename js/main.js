function Game(options){
    this.rows = options.rows;
    this.columns = options.columns;
    this.pieceGenerator = options.pieceGenerator;

    for(var rowIndex = 0; rowIndex < this.rows; rowIndex++) {

      for(var columnIndex = 0; columnIndex < this.columns; columnIndex++) {

        $('.container').append($('<div>').addClass('cell board').attr('data-row', rowIndex).attr('data-column', columnIndex));
      }
    }
}

Game.prototype.startGame = function () {
  this.intervalID = setInterval(this.update.bind(this),100);
};

Game.prototype.update = function () {
  this.pieceGenerator.actualPiece().moveDown(this.rows,this.columns);
  this.pieceGenerator.clearPieces();
  this.pieceGenerator.drawPieces();
};

//TO-DO: add rotateLeft, rotateDown; change goDown in order to go down faster
Game.prototype.assignControlKeys = function () {

  $('body').on('keydown',function(e){
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 190:
        //TurnLeft
        this.pieceGenerator.actualPiece().defineRotationPoint();
        this.pieceGenerator.actualPiece().rotatePieceLeft(this.rows, this.columns);
        break;
      case 37:
        //Left
        this.pieceGenerator.actualPiece().goLeft(this.columns);
        break;
      case 38:
        //Up
        break;
      case 189:
        //TurnRight
        this.pieceGenerator.actualPiece().defineRotationPoint();
        this.pieceGenerator.actualPiece().rotatePieceRight(this.rows, this.columns);
        break;
      case 39:
        //Right
        this.pieceGenerator.actualPiece().goRight(this.columns);
        break;
      case 40:
        //Down
        break;
      case 80:
        //P
        if(this.intervalID)
        {
          this.stopGame();
        }
        else
        {
            this.startGame();
        }
    }
  }.bind(this));
};


$(document).ready(function(){

  var game = new Game({
    rows: 50,
    columns: 50,
    pieceGenerator: new PieceGenerator()
  });

  game.assignControlKeys();
  game.startGame();

});

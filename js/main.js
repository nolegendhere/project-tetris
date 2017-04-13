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

    switch (e.keyCode) {
      case 37:
        this.snake.goLeft();
        break;
      case 38:
        this.snake.goUp();
        break;
      case 39:
        this.snake.goRight();
        break;
      case 40:
        this.snake.goDown();
        break;
      case 80:
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

function PieceGenerator(){

  this.actualPieceMoved = undefined;
  this.generatedPieces = [];
  this.generatePiece();

}

//Creates one pieces at a time
PieceGenerator.prototype.generatePiece = function () {

  var pieceGenerated = new Piece();
  this.actualPieceMoved = pieceGenerated;
  this.generatedPieces.push(pieceGenerated);

};

//Returns the actual piece being controlled
PieceGenerator.prototype.actualPiece = function(){
  return this.actualPieceMoved;
};

//Draw all the pieces with the divs calling their function to do it
PieceGenerator.prototype.drawPieces = function (){
  this.generatedPieces.forEach(function(piece){
    piece.drawPiece();
  });
};

//Clear all the pieces of the divs calling their function to do it
PieceGenerator.prototype.clearPieces = function (){
  this.generatedPieces.forEach(function(piece){
    piece.clearPiece();
  });
};

//TO-DO: see if the pieces are makin a line with their blocks; in that case, delete the row and move down all the pieces
//Make every row has a counter of cells filled, When it is filled, make it disappear.

function PieceGenerator(){

  this.actualPieceMoved = undefined;
  this.generatedPieces = [];
  this.generatePiece();

}


PieceGenerator.prototype.generatePiece = function () {

  var pieceGenerated = new Piece();
  this.actualPieceMoved = pieceGenerated;
  this.generatedPieces.push(pieceGenerated);

};

PieceGenerator.prototype.actualPiece = function(){
  return this.actualPieceMoved;
};

PieceGenerator.prototype.drawPieces = function (){
  this.generatedPieces.forEach(function(piece){
    piece.drawPiece();
  });
};

PieceGenerator.prototype.clearPieces = function (){
  this.generatedPieces.forEach(function(piece){
    piece.clearPiece();
  });
};

//TO-DO: see if the pieces are makin a line with their blocks; in that case, delete the row and move down all the pieces

function PieceGenerator(regions){

  this.actualPieceMoved = undefined;
  this.generatedPieces = [];
  this.regions = regions;

}

//Creates one pieces at a time
PieceGenerator.prototype.generatePiece = function () {
  //console.log("generatePiece");
  var pieceGenerated = new Piece(this.regions);
  this.actualPieceMoved = pieceGenerated;
  this.generatedPieces.push(pieceGenerated);

};

//Returns the actual piece being controlled
PieceGenerator.prototype.actualPiece = function(){
  return this.actualPieceMoved;
};

//Draw all the pieces with the divs calling their function to do it
PieceGenerator.prototype.drawPieces = function (){
  //console.log("this.generatedPieces.length",this.generatedPieces.length);
  this.generatedPieces.forEach(function(piece){
    piece.drawPiece();
  });
};

//Clear all the pieces of the divs calling their function to do it
PieceGenerator.prototype.clearPieces = function (){
  //console.log("this.generatedPieces.length",this.generatedPieces.length);
  this.generatedPieces.forEach(function(piece){
    piece.clearPiece();
  });
};

//TO-DO: see if the pieces are makin a line with their blocks; in that case, delete the row and move down all the pieces
//Make every row has a counter of cells filled, When it is filled, make it disappear.

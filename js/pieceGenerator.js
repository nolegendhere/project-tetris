function PieceGenerator(){

  this.actualPieceMoved = undefined;
  this.generatedPieces = [];

}

//Creates one pieces at a time
PieceGenerator.prototype.generatePiece = function (options) {
  //console.log("generatePiece");
  var pieceGenerated = new Piece(options);
  this.actualPieceMoved = pieceGenerated;
  this.generatedPieces.push(pieceGenerated);
  console.log("generate");

  for (var i = 0; i < pieceGenerated.body.length; i++)
  {
      // $('.container').append($('<div>').addClass('cell piece index'+i.toString()+"'").css({position: 'absolute', top: pieceGenerated.body[i].position.row.toString()+'px', left: pieceGenerated.body[i].position.column.toString()+'px'}));
      // pieceGenerated.body[i].selector =   $('.index'+i.toString()+"'");
      console.log("i",i);
      $('.container').append($('<div>').addClass('cell piece').attr('index', i.toString()).css({position: 'absolute', top: pieceGenerated.body[i].position.row.toString()+'px', left: pieceGenerated.body[i].position.column.toString()+'px'}));
      var selector ='[index='+i.toString()+']';
      pieceGenerated.body[i].selector =   $(selector);

  }

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
// PieceGenerator.prototype.clearPieces = function (){
//   //console.log("this.generatedPieces.length",this.generatedPieces.length);
//   this.generatedPieces.forEach(function(piece){
//     piece.clearPiece();
//   });
// };

//TO-DO: see if the pieces are makin a line with their blocks; in that case, delete the row and move down all the pieces
//Make every row has a counter of cells filled, When it is filled, make it disappear.

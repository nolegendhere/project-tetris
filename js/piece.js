function Piece(){
  //this.direction ='right';
  this.body = [
    // {row:1, column:5},
    // {row:1, column:4},
    // {row:1, column:3},
    // {row:1, column:2},
    // {row:1, column:1}
    {row:5, column:1},
    {row:4, column:1},
    {row:3, column:1},
    {row:2, column:1},
    {row:1, column:1}
  ];

  this.contact = false;
}

Piece.prototype.drawPiece = function () {
  this.body.forEach(function(position){
    var selector ='[data-row='+position.row+'][data-column='+ position.column +']';
    $(selector).addClass('piece');
  });
};

Piece.prototype.clearPiece = function () {
  $('.piece').removeClass('piece');
};

//TO-DO: contact with maxRos done, but have to do contact with other pieces
Piece.prototype.moveDown = function (maxRows,maxColumns) {
  var arrayTemp=[];
  this.body.forEach(function(position){
    if(position.row+1<=maxRows-1 && !this.contact)
    {
      console.log(position.row);
      position.row++;
    }
    else {
      this.contact = true;
    }
  }.bind(this));
};

//TO-DO: rotate left the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceLeft = function () {

};
//TO-DO: rotate right the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceRight = function () {

};

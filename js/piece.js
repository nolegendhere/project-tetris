function Piece(){
  //this.direction ='right';
  this.body = [
    // {row:5, column:25, rotationPoint: false},
    // {row:4, column:25, rotationPoint: false},
    // {row:3, column:25, rotationPoint: true},
    // {row:2, column:25, rotationPoint: false},
    // {row:1, column:25, rotationPoint: false}
    // {row:5, column:25, rotationPoint: false},
    // {row:4, column:25, rotationPoint: false},
    // {row:3, column:25, rotationPoint: true},
    // {row:2, column:25, rotationPoint: false},
    // {row:1, column:25, rotationPoint: false},
    // {row:1, column:24, rotationPoint: false},
    // {row:1, column:23, rotationPoint: false},
    // {row:1, column:23, rotationPoint: false},
    {row:5, column:1, rotationPoint: false},
    {row:4, column:1, rotationPoint: false},
    {row:3, column:1, rotationPoint: true},
    {row:2, column:1, rotationPoint: false},
    {row:1, column:1, rotationPoint: false},
    {row:1, column:2, rotationPoint: false},
    {row:1, column:2, rotationPoint: false},
    {row:1, column:2, rotationPoint: false},
  ];

  this.rotationPoint = 2;
  this.rotationMatrixLeft = [[0,-1],[1,0]];
  this.rotationMatrixRight = [[0,1],[-1,0]];

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
  if(!this.collisionTestmoveDown(maxRows,maxColumns))
  {
    var arrayTemp=[];
    this.body.forEach(function(position){
        position.row++;
    }.bind(this));
  }
};

//TO-DO: define collisions with ground
Piece.prototype.collisionTestmoveDown = function (maxRows,maxColumns) {
  this.body.forEach(function(position){
    if(position.row+1>maxRows-1)
    {
      this.contact = true;
    }
  }.bind(this));
  return this.contact;
};

//TO-DO: define rotationPoint;
Piece.prototype.defineRotationPoint = function () {

  this.body.forEach(function(position, index){
    if(position.rotationPoint)
    {
      this.rotationPoint = index;
    }
  }.bind(this));

};

//TO-DO: rotate left the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceLeft = function () {

  var tempArray = [];
  var tempRow;
  var tempRow2;
  var tempColumn;
  var tempColumn2;

  this.body.forEach(function(position){

    tempRow = position.row - this.body[this.rotationPoint].row;

    tempColumn = position.column  - this.body[this.rotationPoint].column;

    tempRow2 = this.rotationMatrixLeft[0][0] * tempRow + this.rotationMatrixLeft[0][1] * tempColumn;

    tempColumn2 = this.rotationMatrixLeft[1][0] * tempRow + this.rotationMatrixLeft[1][1] * tempColumn;

    tempRow = tempRow2 + this.body[this.rotationPoint].row;

    tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

    tempArray.push({row: tempRow , column: tempColumn});

  }.bind(this));

  this.body = tempArray;

};
//TO-DO: rotate right the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceRight = function () {
  var tempArray = [];
  var tempRow;
  var tempRow2;
  var tempColumn;
  var tempColumn2;

  this.body.forEach(function(position){

    tempRow = position.row - this.body[this.rotationPoint].row;

    tempColumn = position.column  - this.body[this.rotationPoint].column;

    tempRow2 = this.rotationMatrixRight[0][0] * tempRow + this.rotationMatrixRight[0][1] * tempColumn;

    tempColumn2 = this.rotationMatrixRight[1][0] * tempRow + this.rotationMatrixRight[1][1] * tempColumn;

    tempRow = tempRow2 + this.body[this.rotationPoint].row;

    tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

    tempArray.push({row: tempRow , column: tempColumn});

  }.bind(this));

  this.body = tempArray;
};

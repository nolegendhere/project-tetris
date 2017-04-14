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
    // {row:5, column:1, rotationPoint: false},
    // {row:4, column:1, rotationPoint: false},
    // {row:3, column:1, rotationPoint: true},
    // {row:2, column:1, rotationPoint: false},
    // {row:1, column:1, rotationPoint: false},
    // {row:1, column:2, rotationPoint: false},
    // {row:1, column:2, rotationPoint: false},
    // {row:1, column:2, rotationPoint: false},
    {row:5, column:0, rotationPoint: false},
    {row:4, column:0, rotationPoint: false},
    {row:3, column:0, rotationPoint: true},
    {row:2, column:0, rotationPoint: false},
    {row:1, column:0, rotationPoint: false},
    {row:1, column:1, rotationPoint: false},
    {row:1, column:1, rotationPoint: false},
    {row:1, column:1, rotationPoint: false}
  ];

  this.rotationPoint = 2;
  this.rotationMatrixLeft = [[0,-1],[1,0]];
  this.rotationMatrixRight = [[0,1],[-1,0]];

  this.contact = false;
}

//Draw the piece with divs
Piece.prototype.drawPiece = function () {
  this.body.forEach(function(position){
    var selector ='[data-row='+position.row+'][data-column='+ position.column +']';
    $(selector).addClass('piece');
  });
};

//Clear the piece of the divs
Piece.prototype.clearPiece = function () {
  $('.piece').removeClass('piece');
};

//TO-DO: contact with maxRos done, but have to do contact with other pieces
Piece.prototype.moveDown = function (maxRows,maxColumns) {
  if(!this.contact)
  {
    var tempRow;
    var tempArray=[];

    this.body.forEach(function(position){
      if(!this.contact)
      {
        tempRow = position.row;
        tempRow++;

        tempArray.push({row: tempRow , column: position.column, rotationPoint: position.rotationPoint });

        this.collisionTestmoveDown(maxRows,tempRow);
      }
    }.bind(this));

    if(!this.contact)
    {
      this.body = tempArray;
    }
  }
};

//TO-DO: move the piece to the left
Piece.prototype.goLeft = function (maxColumns) {
  var tempColumn;
  var tempArray=[];
  var lateralCollision = false;
  this.body.forEach(function(position){
    if(!lateralCollision)
    {
      tempColumn = position.column;
      tempColumn--;

      tempArray.push({row: position.row , column: tempColumn, rotationPoint: position.rotationPoint });

      lateralCollision = this.collisionTestLaterals(maxColumns,tempColumn);
    }
  }.bind(this));

  if(!lateralCollision)
  {
    this.body = tempArray;
    //console.log("this.body",this.body);
  }
};
//TO-DO move the piece to the right
Piece.prototype.goRight = function (maxColumns) {

  var tempColumn;
  var tempArray=[];
  var lateralCollision = false;
  this.body.forEach(function(position){
    if(!lateralCollision)
    {
      tempColumn = position.column;
      tempColumn++;

      tempArray.push({row: position.row , column: tempColumn, rotationPoint: position.rotationPoint });

      lateralCollision = this.collisionTestLaterals(maxColumns,tempColumn);
    }
  }.bind(this));

  if(!lateralCollision)
  {
    this.body = tempArray;
    //console.log("this.body",this.body);
  }
};
//TO-DO move the piece down faster

//Define collisions with ground
Piece.prototype.collisionTestmoveDown = function (maxRows,row) {

  if(row>maxRows-1)
  {
    this.contact = true;
  }
};

//Define collisions with laterals
Piece.prototype.collisionTestLaterals = function (maxColumns,column) {
  var lateralContact = false;

  if(column>maxColumns-1 || column < 0)
  {
    lateralContact = true;
  }

  return lateralContact;
};


//Define rotationPoint;
Piece.prototype.defineRotationPoint = function () {

  this.body.forEach(function(position, index){
    if(position.rotationPoint)
    {
      this.rotationPoint = index;
    }
  }.bind(this));

};

//Rotate left the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceLeft = function (maxColumns) {

  var tempArray = [];
  var tempRow;
  var tempRow2;
  var tempColumn;
  var tempColumn2;

  var lateralCollision = false;

  this.body.forEach(function(position){
    if(!lateralCollision)
    {
      tempRow = position.row - this.body[this.rotationPoint].row;

      tempColumn = position.column  - this.body[this.rotationPoint].column;

      tempRow2 = this.rotationMatrixLeft[0][0] * tempRow + this.rotationMatrixLeft[0][1] * tempColumn;

      tempColumn2 = this.rotationMatrixLeft[1][0] * tempRow + this.rotationMatrixLeft[1][1] * tempColumn;

      tempRow = tempRow2 + this.body[this.rotationPoint].row;

      tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

      tempArray.push({row: tempRow , column: tempColumn, rotationPoint: position.rotationPoint });

      lateralCollision=this.collisionTestLaterals(maxColumns,tempColumn);
    }

  }.bind(this));

  if(!lateralCollision)
  {
    this.body = tempArray;
  }
  console.log("tempArray",tempArray);

};

//Rotate right the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceRight = function (maxColumns) {
  var tempArray = [];
  var tempRow;
  var tempRow2;
  var tempColumn;
  var tempColumn2;

  var lateralCollision = false;

  this.body.forEach(function(position){
    if(!lateralCollision)
    {
      tempRow = position.row - this.body[this.rotationPoint].row;

      tempColumn = position.column  - this.body[this.rotationPoint].column;

      tempRow2 = this.rotationMatrixRight[0][0] * tempRow + this.rotationMatrixRight[0][1] * tempColumn;

      tempColumn2 = this.rotationMatrixRight[1][0] * tempRow + this.rotationMatrixRight[1][1] * tempColumn;

      tempRow = tempRow2 + this.body[this.rotationPoint].row;

      tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

      tempArray.push({row: tempRow , column: tempColumn, rotationPoint: position.rotationPoint });

      lateralCollision=this.collisionTestLaterals(maxColumns,tempColumn);
    }

  }.bind(this));

  if(!lateralCollision)
  {
    this.body = tempArray;
  }
  console.log("tempArray",tempArray);
};

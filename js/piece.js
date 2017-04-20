//object that represents the pieces created by the pieceGenerator
function Piece(options){
  //the limit row and column where the piece can be moved
  this.limitRowBottom = options.limitRowBottom;
  this.limitColumnRight= options.limitColumnRight;
  //array of the regions present in the grid; for the movement of the pieces
  this.regions = options.regions;

  //index that points to the block of the piece from where the rotation takes place
  this.rotationPoint = -1;
  //matrix to rotate to the left
  this.rotationMatrixLeft = [[0,-1],[1,0]];
  //matrix to rotate to the right
  this.rotationMatrixRight = [[0,1],[-1,0]];
  //state of the piece; if true, it means that the piece has stopped because there is another piece down or because it is the limit of the grid
  this.contact = false;
  this.update = false;
}

//It checks if it can be spawned; if there is a piece in the regions of spawning, it retunrs false and the player will have lost the game
Piece.prototype.checkDeploy = function () {
  var respawn = true;
  this.body.forEach(function(element){
    if(!this.regions[element.row][element.column].state)
    {
      respawn = false;
    }
  }.bind(this));
  return respawn;
};

//move automatically piece down;
Piece.prototype.moveDown = function () {
  if(!this.contact)
  {
    var tempRow;
    var tempArray=[];
    //checks each block of the piece
    this.body.forEach(function(element){
      if(!this.contact)
      {
        tempRow = element.row;
        tempRow++;

        this.collisionTestmoveDown(tempRow, element.column);

        if(!this.contact)
        {
          tempArray.push({row: tempRow , column: element.column , rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][element.column].center.row , column: this.regions[tempRow][element.column].center.column }, pieceNumber: element.pieceNumber});
        }
      }
    }.bind(this));

    if(!this.contact)
    {
      this.body = tempArray;
    }
  }
};

//move the piece to the left
Piece.prototype.goLeft = function () {
  if(!this.contact)
  {
    var tempColumn;
    var tempArray=[];
    var lateralCollision = false;
    this.body.forEach(function(element){
      if(!lateralCollision)
      {
        tempColumn = element.column;
        tempColumn--;

        lateralCollision = this.collisionTestLaterals(tempColumn, element.row);

        if(!lateralCollision)
        {
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }, pieceNumber: element.pieceNumber});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
    }
  }
};

//move the piece to the right;
Piece.prototype.goRight = function () {
  if(!this.contact)
  {
    var tempColumn;
    var tempArray=[];
    var lateralCollision = false;
    this.body.forEach(function(element){
      if(!lateralCollision)
      {
        tempColumn = element.column;
        tempColumn++;

        lateralCollision = this.collisionTestLaterals(tempColumn, element.row);
        if(!lateralCollision)
        {
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }, pieceNumber: element.pieceNumber});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
    }
  }
};

//TO-DO move the piece down faster
Piece.prototype.goDownFaster = function (maxRows) {
  return 20;
};

//Define collisions with ground
Piece.prototype.collisionTestmoveDown = function (row, column) {

  if(row>this.limitRowBottom-1)
  {
    this.contact = true;
  }
  else if(!this.regions[row][column].state)
  {
    this.contact = true;
  }
};

//Define collisions with laterals
Piece.prototype.collisionTestLaterals = function (column,row) {
  var lateralContact = false;

  if(column>this.limitColumnRight-1 || column < 0 || row<0)
  {
    lateralContact = true;
  }
  else if(!this.regions[row][column].state)
  {
    lateralContact = true;
  }

  return lateralContact;
};


//Define rotationPoint;
Piece.prototype.defineRotationPoint = function () {

  this.body.forEach(function(element, index){
    if(element.rotationPoint)
    {
      this.rotationPoint = index;
    }
  }.bind(this));

};

//Rotate left the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceLeft = function () {

  if(!this.contact && this.rotationPoint!==-1)
  {
    var tempArray = [];
    var tempRow;
    var tempRow2;
    var tempColumn;
    var tempColumn2;

    var lateralCollision = false;

    this.body.forEach(function(element){
      if(!lateralCollision && !this.contact)
      {
        tempRow = element.row - this.body[this.rotationPoint].row;

        tempColumn = element.column - this.body[this.rotationPoint].column;

        tempRow2 = this.rotationMatrixLeft[0][0] * tempRow + this.rotationMatrixLeft[0][1] * tempColumn;

        tempColumn2 = this.rotationMatrixLeft[1][0] * tempRow + this.rotationMatrixLeft[1][1] * tempColumn;

        tempRow = tempRow2 + this.body[this.rotationPoint].row;

        tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

        lateralCollision=this.collisionTestLaterals(tempColumn, tempRow);

        if(!lateralCollision)
        {
          tempArray.push({row:tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }, pieceNumber: element.pieceNumber});
        }
      }

    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
    }
  }
};

//Rotate right the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceRight = function () {
  if(!this.contact && this.rotationPoint!==-1)
  {
    var tempArray = [];
    var tempRow;
    var tempRow2;
    var tempColumn;
    var tempColumn2;

    var lateralCollision = false;

    this.body.forEach(function(element){
      if(!lateralCollision && !this.contact)
      {
        tempRow = element.row - this.body[this.rotationPoint].row;

        tempColumn = element.column  - this.body[this.rotationPoint].column;

        tempRow2 = this.rotationMatrixRight[0][0] * tempRow + this.rotationMatrixRight[0][1] * tempColumn;

        tempColumn2 = this.rotationMatrixRight[1][0] * tempRow + this.rotationMatrixRight[1][1] * tempColumn;

        tempRow = tempRow2 + this.body[this.rotationPoint].row;

        tempColumn = tempColumn2 + this.body[this.rotationPoint].column;

        lateralCollision=this.collisionTestLaterals(tempColumn, tempRow);

        if(!lateralCollision)
        {
          tempArray.push({row: tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }, pieceNumber: element.pieceNumber});
        }
      }

    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
    }
  }
};

//Draw the piece with divs
Piece.prototype.drawPiece = function () {
  this.body.forEach(function(element){
      element.selector.css({top: element.position.row.toString()+'px', left: element.position.column.toString()+'px'});
  });

};

Piece.prototype.updateRegions = function (){
  this.body.forEach(function(element){
    this.regions[element.row][element.column].state = false;
  }.bind(this));

};

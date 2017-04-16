function Piece(options){
  //this.direction ='right';


  this.initialRegion = {
      row: options.initialRegionRow,
      column: options.initialRegionColumn
  };

  this.regions = options.regions;
  //console.log("this.regions from piece",this.regions);

  this.body = [

    {row:3, column:0, rotationPoint: false, selector: "", position: {row: this.regions[3][0].center.row, column: this.regions[3][0].center.column}},
    {row:2, column:0, rotationPoint: false, selector: "", position: {row: this.regions[2][0].center.row, column: this.regions[2][0].center.column}},
    {row:1, column:0, rotationPoint: true, selector: "", position: {row: this.regions[1][0].center.row, column: this.regions[1][0].center.column}},
    {row:1, column:1, rotationPoint: false, selector: "", position: {row: this.regions[1][1].center.row, column: this.regions[1][1].center.column}},

  ];


  this.rotationPoint = 2;
  this.rotationMatrixLeft = [[0,-1],[1,0]];
  this.rotationMatrixRight = [[0,1],[-1,0]];

  this.contact = false;
}

//Draw the piece with divs
Piece.prototype.drawPiece = function () {
  //console.log("entra1");
  //console.log("this.body",this.body);
  this.body.forEach(function(element){
    //console.log("element.position.row",element.position.row);
    //console.log("element.position.column",element.position.column);
    $(element.selector).css({top: element.position.row.toString()+'px', left: element.position.column.toString()+'px'});
  });

};

//Clear the piece of the divs
// Piece.prototype.clearPiece = function () {
//   $('.piece').removeClass('piece');
// };

//TO-DO: move automatically piece down; ; without collisions between pieces
Piece.prototype.moveDown = function (maxRows,maxColumns) {
  if(!this.contact)
  {
    var tempRow;
    var tempArray=[];

    this.body.forEach(function(element){
      if(!this.contact)
      {
        //console.log("entra en moveDown contact");
        tempRow = element.row;
        tempRow++;

        this.collisionTestmoveDown(maxRows,tempRow);

        if(!this.contact)
        {
          tempArray.push({row: tempRow , column: element.column , rotationPoint: element.rotationPoint, selector: element.selector, position: {row: this.regions[tempRow][element.column].center.row , column: this.regions[tempRow][element.column].center.column }});
        }
      }
    }.bind(this));
    //console.log("tempArray",tempArray);
    if(!this.contact)
    {
      this.body = tempArray;
    }
  }
};

//TO-DO: move the piece to the left; without collisions between pieces
Piece.prototype.goLeft = function (maxColumns) {
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

        lateralCollision = this.collisionTestLaterals(maxColumns,tempColumn);

        if(!lateralCollision)
        {
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
      //console.log("this.body",this.body);
    }
  }

};
//TO-DO move the piece to the right; without collisions between pieces
Piece.prototype.goRight = function (maxColumns) {
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

        lateralCollision = this.collisionTestLaterals(maxColumns,tempColumn);
        if(!lateralCollision)
        {
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      this.body = tempArray;
      //console.log("this.body",this.body);
    }
  }
};

//TO-DO move the piece down faster
Piece.prototype.goDownFaster = function (maxRows) {

};

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

  this.body.forEach(function(element, index){
    if(element.rotationPoint)
    {
      this.rotationPoint = index;
    }
  }.bind(this));

};

//Rotate left the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceLeft = function (maxRows, maxColumns) {

  if(!this.contact)
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

        this.collisionTestmoveDown(maxRows,tempRow);
        lateralCollision=this.collisionTestLaterals(maxColumns,tempColumn);

        if(!lateralCollision && !this.contact )
        {
          tempArray.push({row:tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }});
        }
      }

    }.bind(this));

    if(!lateralCollision && !this.contact)
    {
      this.body = tempArray;
    }
    //console.log("tempArray",tempArray);
  }
};

//Rotate right the piece, if it can be rotatet looking at maxColumns
Piece.prototype.rotatePieceRight = function (maxRows, maxColumns) {
  if(!this.contact)
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


        this.collisionTestmoveDown(maxRows, tempRow);
        lateralCollision=this.collisionTestLaterals(maxColumns,tempColumn);

        if(!lateralCollision && !this.contact)
        {
          tempArray.push({row: tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }});
        }
      }

    }.bind(this));

    if(!lateralCollision && !this.contact)
    {
      this.body = tempArray;
    }
    //console.log("tempArray",tempArray);
  }

};

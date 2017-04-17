function Piece(options, numberOfPieces,generatedPieces ){
  //this.direction ='right';


  this.initialRegion = {
      row: options.initialRegionRow,
      column: options.initialRegionColumn
  };

  this.limitRowBottom = options.limitRowBottom;
  this.limitColumnRight= options.limitColumnRight;

  this.regions = options.regions;
  this.rowsToComplete = options.rowsToComplete;
  this.numberOfPieces = numberOfPieces;
  this.generatedPieces = generatedPieces;

  this.listOfColors = [
    'yellow','red','blue','grey','purple','orange','green'
  ];

  this.listOfBodies = [

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.column}},

      {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},

    ],

    [
      {row:this.initialRegion.row-1, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column+1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacemente: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

      {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},

    ],

    [{row:this.initialRegion.row-1, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column-1].center.column}},

    {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},
  ],

  [
    {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column-2, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-2].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-2].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},
  ],

  [
    {row:this.initialRegion.row-1, column:this.initialRegion.column, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row-1][this.initialRegion.column].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column+1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column+1].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column-1, rotationPoint: false, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column-1].center.column}},

    {row:this.initialRegion.row, column:this.initialRegion.column, rotationPoint: true, selector: "", erase: false, erased:false, displacement: 0, position: {row: this.regions[this.initialRegion.row][this.initialRegion.column].center.row, column: this.regions[this.initialRegion.row][this.initialRegion.column].center.column}},
  ]
];


  this.rotationPoint = -1;
  this.rotationMatrixLeft = [[0,-1],[1,0]];
  this.rotationMatrixRight = [[0,1],[-1,0]];

  this.contact = false;
  this.update = false;
}


//TO-DO: move automatically piece down; ; without collisions between pieces
Piece.prototype.moveDown = function () {
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

        this.collisionTestmoveDown(tempRow, element.column);

        if(!this.contact)
        {
          tempArray.push({row: tempRow , column: element.column , rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][element.column].center.row , column: this.regions[tempRow][element.column].center.column }});
        }
      }
    }.bind(this));
    //console.log("tempArray",tempArray);
    if(!this.contact)
    {
      //this.body = tempArray;
      //this.futureBody = tempArray;
      this.body = tempArray;
    }
  }
};

//TO-DO: move the piece to the left; without collisions between pieces
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
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      //this.futureBody = tempArray;
      this.body = tempArray;
      //console.log("this.body",this.body);
    }
  }

};
//TO-DO move the piece to the right; without collisions between pieces
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
          tempArray.push({row: element.row , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[element.row][tempColumn].center.row , column: this.regions[element.row][tempColumn].center.column }});
        }
      }
    }.bind(this));

    if(!lateralCollision)
    {
      //this.futureBody = tempArray;
      this.body = tempArray;
      //console.log("this.body",this.body);
    }
  }
};

//TO-DO move the piece down faster
Piece.prototype.goDownFaster = function (maxRows) {

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

  if(column>this.limitColumnRight-1 || column < 0)
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
          tempArray.push({row:tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }});
        }
      }

    }.bind(this));

    if(!lateralCollision)
    {
      //this.futureBody = tempArray;
      this.body = tempArray;
    }
    //console.log("tempArray",tempArray);
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
          tempArray.push({row: tempRow , column: tempColumn, rotationPoint: element.rotationPoint, selector: element.selector, erase: element.erase, erased: element.erased, displacement: element.displacement, position: {row: this.regions[tempRow][tempColumn].center.row , column: this.regions[tempRow][tempColumn].center.column }});
        }
      }

    }.bind(this));

    if(!lateralCollision)
    {
      //this.futureBody = tempArray;
      this.body = tempArray;
    }
    //console.log("tempArray",tempArray);
  }

};

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

Piece.prototype.updateRegions = function (){
  //console.log("this.regions",this.regions);
  this.body.forEach(function(element){
    //console.log("this.regions[element.row][element.column]",this.regions[element.row][element.column]);
    this.regions[element.row][element.column].state = false;
    // this.regions[element.row][element.column].regionColor = this.bodyColor;

    //$(element.selector).remove();

    this.rowsToComplete[element.row]++;

  }.bind(this));
  console.log("this.regions from updateRegions",this.regions);

  //console.log()
  for(var i=this.rowsToComplete.length-1; i>=0;i--)
  {
    if(this.rowsToComplete[i]===this.limitColumnRight)
    {
      console.log("HIIIIIIIIIII");
      for(var j=0; i<this.generatedPieces.length;i++)
      {
        for(var k=0; k<this.generatedPieces[j].body.length;k++)
        {
          if(!this.generatedPieces[j].body[k].erased)
          {
            if(this.generatedPieces[j].body[k].row === i)
            {
              this.generatedPieces[j].body[k].erase = true;
              console.log("erase");
            }
            else if(this.generatedPieces[j].body[k].row<i)
            {
              this.generatedPieces[j].body[k].displacement++;
              console.log("displacement");
            }
          }
        }
      }

      // this.generatedPieces.forEach(function(piece){
      //   piece.body.forEach(function(block){
      //     block.row++;
      //     $(block.selector).css({top: block.position.row.toString()+'px', left: block.position.column.toString()+'px'});
      //   }.bind(this));
      // }.bind(this));
    }
  }

  for(var j=0; i<this.generatedPieces.length;i++)
  {
    for(var k=0; k<this.generatedPieces[j].body.length;k++)
    {
      if(!this.generatedPieces[j].body[k].erased)
      {
        if(this.generatedPieces[j].body[k].erase === true)
        {
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column] = true;
          $(this.generatedPieces[j].body[k].selector).remove();
        }
        else if(this.generatedPieces[j].body[k].displacement>0)
        {
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column] = true;
          this.generatedPieces[j].body[k].row+=this.generatedPieces[j].body[k].displacement;
          this.generatedPieces[j].body[k].displacement = 0;
          var selector = this.generatedPieces[j].body[k].selector;
          $(selector).css({top: this.generatedPieces[j].body[k].position.row.toString()+'px', left: this.generatedPieces[j].body[k].position.column.toString()+'px'});

          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column] = false;
        }
      }
    }
  }

};

Piece.prototype.chooseBody = function (){
  this.numberOfBlocks = 7;
  this.body = this.listOfBodies[Math.floor(Math.random()*this.numberOfBlocks)];
};

Piece.prototype.chooseColor = function(){
  this.numberOfColors = 7;
  this.bodyColor = this.listOfColors[Math.floor(Math.random()*this.numberOfColors)];

};

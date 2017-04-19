function PieceGenerator(options){

  this.actualPieceMoved = undefined;
  this.actualPieceMovedDual = undefined;
  this.futurePieces = [];
  this.futurePiecesCounter = 0;
  this.generatedPieces = [];
  this.numberOfPieces = 0;
  this.numberOfPiecesDual = 0;
  this.playerNumber = options.playerNumber;
  this.boardSelector = options.pieceGeneratorSelector;
  this.rowsToComplete = options.rowsToComplete;
  this.regions = options.regions;
  this.initialRegionRow = options.initialRegionRow; this.initialRegionColumn = options.initialRegionColumn;
  this.limitRowBottom = options.limitRowBottom;
  this.limitColumnRight = options.limitColumnRight;
  this.numberOfBlocks = 7;
  this.numberOfColors = 7;

  this.listData = new ListData({initialRegionRow:this.initialRegionRow,initialRegionColumn:this.initialRegionColumn,regions:this.regions });

  this.listOfBodies = this.listData.listOfBodies;
  this.listOfColors = this.listData.listOfColors;

}

PieceGenerator.prototype.chooseBody = function (){
  return this.listOfBodies[Math.floor(Math.random()*this.numberOfBlocks)];
  // this.body = this.listOfBodies[5];
};

PieceGenerator.prototype.chooseColor = function(){
  return this.listOfColors[Math.floor(Math.random()*this.numberOfColors)];

};

PieceGenerator.prototype.deployFirstTime = function () {
  console.log("deploy0***********************************************");
    this.deployPiece();
    this.numberOfPieces++;
    this.numberOfPiecesDual++;
    this.generatedPieces.push(this.actualPieceMoved);
    this.deployPieceDual();
};

PieceGenerator.prototype.deploy = function () {

  if(this.numberOfPieces%2!==0)
  {
    console.log("deploy1**********************************************");
    this.numberOfPieces++;
    this.numberOfPiecesDual++;
    this.generatedPieces.push(this.actualPieceMovedDual);
    this.deployPiece();

  }
  else
  {
    console.log("deploy2***********************************************");
    this.numberOfPieces++;
    this.numberOfPiecesDual++;
    this.generatedPieces.push(this.actualPieceMoved);
    this.deployPieceDual();
  }
};

//Creates one pieces at a time
PieceGenerator.prototype.deployPiece = function () {

  this.actualPieceMoved = new Piece({regions: this.regions, limitRowBottom: this.limitRowBottom, limitColumnRight: this.limitColumnRight});
  this.actualPieceMoved.body = this.chooseBody();
  this.actualPieceMoved.bodyColor = this.chooseColor();

  for (var i = 0; i < this.actualPieceMoved.body.length; i++)
  {
      $(this.boardSelector).append($('<div>').addClass('cell piece').attr('player-number-piece',this.playerNumber.toString()).attr('index', i.toString()).attr('piece',this.numberOfPieces.toString()).css({backgroundColor: this.actualPieceMoved.bodyColor, position: 'absolute', top: this.actualPieceMoved.body[i].position.row.toString()+'px', left: this.actualPieceMoved.body[i].position.column.toString()+'px'}));
      console.log("this.numberOfPieces",this.numberOfPieces);
      console.log("this.numberOfPieces",this.numberOfPiecesDual);
      this.actualPieceMoved.body[i].pieceNumber = this.numberOfPieces;
      console.log("this.actualPieceMoved.body[i].pieceNumber = this.numberOfPiecesDual",this.actualPieceMoved.body[i].pieceNumber = this.numberOfPiecesDual);
      var selector ='[player-number-piece='+this.playerNumber.toString()+'][index='+i.toString()+'][piece='+ this.numberOfPieces +']';
      this.actualPieceMoved.body[i].selector = $(selector);
  }

  console.log("this.actualPieceMoved",this.actualPieceMoved);
  console.log("this.actualPieceMoved.body[0].selector",this.actualPieceMoved.body[0].selector);
};

PieceGenerator.prototype.deployPieceDual = function () {

  this.actualPieceMovedDual = new Piece({regions: this.regions, limitRowBottom: this.limitRowBottom, limitColumnRight: this.limitColumnRight});
  this.actualPieceMovedDual.body = this.chooseBody();
  this.actualPieceMovedDual.bodyColor = this.chooseColor();

  for (var i = 0; i < this.actualPieceMovedDual.body.length; i++)
  {
      $(this.boardSelector).append($('<div>').addClass('cell piece').attr('player-number-piece',this.playerNumber.toString()).attr('index', i.toString()).attr('piece',this.numberOfPieces.toString()).css({backgroundColor: this.actualPieceMovedDual.bodyColor, position: 'absolute', top: this.actualPieceMovedDual.body[i].position.row.toString()+'px', left: this.actualPieceMovedDual.body[i].position.column.toString()+'px'}));
      console.log("this.numberOfPieces",this.numberOfPieces);
      console.log("this.numberOfPieces",this.numberOfPiecesDual);
      this.actualPieceMovedDual.body[i].pieceNumber = this.numberOfPiecesDual;
      console.log("this.actualPieceMovedDual.body[i].pieceNumber = this.numberOfPiecesDual",this.actualPieceMovedDual.body[i].pieceNumber = this.numberOfPiecesDual);
      var selector ='[player-number-piece='+this.playerNumber.toString()+'][index='+i.toString()+'][piece='+ this.numberOfPiecesDual +']';
      this.actualPieceMovedDual.body[i].selector = $(selector);
  }


  console.log("this.actualPieceMovedDual",this.actualPieceMovedDual);
  console.log("this.actualPieceMovedDual.body[0].selector",this.actualPieceMovedDual.body[0].selector);
};


//Returns the actual piece being controlled
PieceGenerator.prototype.actualPiece = function(){
  if(this.numberOfPieces%2!==0)
  {
    console.log("actual1");
    console.log("this.actualPieceMoved",this.actualPieceMoved);
    console.log("this.actualPieceMoved.body[0].selector",this.actualPieceMoved.body[0].selector);
    if(this.actualPieceMoved.contact)
    {
      console.log("contact1-----------------------------------------");
      console.log("this.actualPieceMoved",this.actualPieceMoved);
      console.log("this.actualPieceMoved.body[0].selector",this.actualPieceMoved.body[0].selector);
    }

    return this.actualPieceMoved;
  }
  else
  {
    console.log("actual2");
    console.log("this.actualPieceMovedDual",this.actualPieceMovedDual);
    console.log("this.actualPieceMovedDual.body[0].selector",this.actualPieceMovedDual.body[0].selector);
    if(this.actualPieceMovedDual.contact)
    {
      console.log("contact2-------------------------------------------");
      console.log("this.actualPieceMovedDual",this.actualPieceMovedDual);
      console.log("this.actualPieceMovedDual.body[0].selector",this.actualPieceMovedDual.body[0].selector);
    }

    return this.actualPieceMovedDual;
  }
};

//Draw all the pieces with the divs calling their function to do it
PieceGenerator.prototype.drawPiece = function (){

  if(this.numberOfPieces%2!==0)
  {
    this.actualPieceMoved.drawPiece();
  }
  else
  {
    this.actualPieceMovedDual.drawPiece();
  }
};

PieceGenerator.prototype.updateRegions = function (){
  if(this.numberOfPieces%2!==0)
  {
    this.actualPieceMoved.updateRegions();
  }
  else
  {
    this.actualPieceMovedDual.updateRegions();
  }

  var completedRows = 0;

  for(var i=this.rowsToComplete.length-1; i>=0;i--)
  {
    this.rowsToComplete[i]=0;
  }

  for(var j=0; j<this.generatedPieces.length;j++)
  {
    for(var k=0; k<this.generatedPieces[j].body.length;k++)
    {
      if(!this.generatedPieces[j].body[k].erased)
      {
        this.rowsToComplete[this.generatedPieces[j].body[k].row]++;
      }
    }
  }

  for(var i=this.rowsToComplete.length-1; i>=0;i--)
  {
    if(this.rowsToComplete[i]===this.limitColumnRight)
    {
      completedRows++;
      // console.log("HIIIIIIIIIII");
      // console.log("this.generatedPieces.length",this.generatedPieces.length);
      for(var j=0; j<this.generatedPieces.length;j++)
      {
        for(var k=0; k<this.generatedPieces[j].body.length;k++)
        {
          // console.log("this.generatedPieces[j].body[k].erased",this.generatedPieces[j].body[k].erased);
          if(!this.generatedPieces[j].body[k].erased)
          {
            if(this.generatedPieces[j].body[k].row === i)
            {
              this.generatedPieces[j].body[k].erase = true;
              // console.log("erase");
            }
            else if(this.generatedPieces[j].body[k].row<i)
            {
              this.generatedPieces[j].body[k].displacement++;
              // console.log("displacement", this.generatedPieces[j].body[k].displacement);
            }
          }
        }
      }
    }
  }

  for(var j=0; j<this.generatedPieces.length;j++)
  {
    // console.log("piece " + j +" this.generatedPieces[j].body.length"+this.generatedPieces[j].body.length);
    for(var k=0; k<this.generatedPieces[j].body.length;k++)
    {
      if(!this.generatedPieces[j].body[k].erased)
      {
        // console.log("About to insepct this.generatedPieces[j].body[k].row",this.generatedPieces[j].body[k].row);
        // console.log("About to insepct this.generatedPieces[j].body[k].column",this.generatedPieces[j].body[k].column);
        if(this.generatedPieces[j].body[k].erase === true)
        {
          // console.log("erase j",j);
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].state = true;
          this.generatedPieces[j].body[k].erased = true;
          // console.log("this.generatedPieces[j].body[k].row",this.generatedPieces[j].body[k].row);
          // console.log("this.generatedPieces[j].body[k].column",this.generatedPieces[j].body[k].column);
          $(this.generatedPieces[j].body[k].selector).remove();
        }
        else if(this.generatedPieces[j].body[k].displacement>0)
        {
          // console.log("displace j",j);
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].state = true;
          // console.log("before this.generatedPieces[j].body[k].row",this.generatedPieces[j].body[k].row);
          // console.log("before this.generatedPieces[j].body[k].column",this.generatedPieces[j].body[k].column);
          this.generatedPieces[j].body[k].row+=this.generatedPieces[j].body[k].displacement;
          // console.log("after this.generatedPieces[j].body[k].row",this.generatedPieces[j].body[k].row);
          // console.log("after this.generatedPieces[j].body[k].column",this.generatedPieces[j].body[k].column);
          this.generatedPieces[j].body[k].position.row = this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].center.row;
          this.generatedPieces[j].body[k].displacement = 0;
          var selector = this.generatedPieces[j].body[k].selector;
          selector.css({top: this.generatedPieces[j].body[k].position.row.toString()+'px', left: this.generatedPieces[j].body[k].position.column.toString()+'px'});
        }
      }
    }
  }

  var tempArray = [];
  for(var j=0; j<this.generatedPieces.length;j++)
  {
    var counterBlocks = 0;
    for(var k=0; k<this.generatedPieces[j].body.length;k++)
    {
      if(!this.generatedPieces[j].body[k].erased)
      {
        this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].state = false;
      }
      else {
        counterBlocks++;
      }
    }
    if(counterBlocks<this.generatedPieces[j].body.length)
    {
      tempArray.push(this.generatedPieces[j]);
    }
  }

  this.generatedPieces = tempArray;

  //console.log("this.regions from updateRegions after",this.regions);
  return completedRows;
};

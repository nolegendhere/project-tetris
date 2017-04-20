//Object that has generates the different kind of pieces, that controls: the drawing of the pieces; the actual piece moved; the update of the regions in the grid in order to know which are occupied by static pieces; the rows that have to be erased.
function PieceGenerator(options){

  //the actual piece moved
  this.actualPieceMoved = undefined;
  //an array with the pieces created
  this.generatedPieces = [];
  //the number of pieces created
  this.numberOfPieces = 0;
  //the player to whom it belongs this pieceGenerator (each player has its own pieceGenerator)
  this.playerNumber = options.playerNumber;
  //the board to which the pieceGenerator has to spawn the pieces
  this.boardSelector = options.pieceGeneratorSelector;
  //The rows completed when a piece stops; its an array of integers; the length of the array is equal to the rows created by the game
  this.rowsToComplete = options.rowsToComplete;
  //a two dimensional array with all the regions of the grid created, with its row and column, its center in px respect to the player's board and its state ( true if there is no block of any piece in the region, false if there is a block of a piece)
  this.regions = options.regions;
  //the initial row where a piece has to be spawned
  this.initialRegionRow = options.initialRegionRow;
  //the initial columnwhere a piece has to be spawned
  this.initialRegionColumn = options.initialRegionColumn;
  //the limit of rows of the grid of regions; for the movement of the actual piece
  this.limitRowBottom = options.limitRowBottom;
  //the limit of columns of the grid of regions; for the movement of the actual piece
  this.limitColumnRight = options.limitColumnRight;
  //an object with all the bodies and colors for the pieces to generate
  this.listData = new ListData({initialRegionRow:this.initialRegionRow,initialRegionColumn:this.initialRegionColumn,regions:this.regions });
  //types of bodies for the pieces
  this.listOfBodies = this.listData.listOfBodies;
  //different colors for the pieces
  this.listOfColors = this.listData.listOfColors;
  //number of types of bodies for the pieces
  this.numberOfBodies = this.listOfBodies.length;
  //number of colors for the pieces
  this.numberOfColors = this.listOfColors.length;
}

//choose the type of body to generate
PieceGenerator.prototype.chooseBody = function (){
  return this.listOfBodies[Math.floor(Math.random()*this.numberOfBodies)];
};

//choose the color of the body to generate
PieceGenerator.prototype.chooseColor = function(){
  return this.listOfColors[Math.floor(Math.random()*this.numberOfColors)];
};


//Creates one pieces at a time
PieceGenerator.prototype.deployPiece = function () {

  //creates the new piece and assings it to the actual piece moved
  this.actualPieceMoved = new Piece({regions: this.regions, limitRowBottom: this.limitRowBottom, limitColumnRight: this.limitColumnRight});
  this.actualPieceMoved.body = this.chooseBody();
  this.actualPieceMoved.bodyColor = this.chooseColor();

  //generates each block of the piece
  for (var i = 0; i < this.actualPieceMoved.body.length; i++)
  {
      //creates the block in the DOM with absolute position
      $(this.boardSelector).append($('<div>').addClass('cell piece').attr('player-number-piece',this.playerNumber.toString()).attr('index', i.toString()).attr('piece',this.numberOfPieces.toString()).css({backgroundColor: this.actualPieceMoved.bodyColor, position: 'absolute', top: this.actualPieceMoved.body[i].position.row.toString()+'px', left: this.actualPieceMoved.body[i].position.column.toString()+'px'}));

      //passes the piece to whom the block belongs, just for debugging porpuses
      this.actualPieceMoved.body[i].pieceNumber = this.numberOfPieces;

      //generates the selector with which the block in the DOM will be referenced by the actual block in the actual piece in order to represent its movement in the DOM
      var selector ='[player-number-piece='+this.playerNumber.toString()+'][index='+i.toString()+'][piece='+ this.numberOfPieces +']';
      this.actualPieceMoved.body[i].selector = $(selector);
  }
  //increments the number of pieces created
  this.numberOfPieces++;
  //push the piece created into an array of existend pieces; this array will be used for erasing rows
  this.generatedPieces.push(this.actualPieceMoved);

};


//Returns the actual piece being controlled
PieceGenerator.prototype.actualPiece = function(){
  return this.actualPieceMoved;
};

//Draw all the pieces with the divs calling their function to do it
PieceGenerator.prototype.drawPiece = function (){
  this.actualPieceMoved.drawPiece();
};

//updates the values of the grid with the actual piece moved being stopped and with the rows erased and displaced of all the pieces created
PieceGenerator.prototype.updateRegions = function (){

  this.actualPieceMoved.updateRegions();
  this.eraseRows();

};

//Algorithm to erase and displace all the rows in the grid depending if any row has been completed. It deletes and displaces the blocks of the pieces created. It retunrs the rows completed
PieceGenerator.prototype.eraseRows = function (){
  //Var for the completed rows
  var completedRows = 0;
  //Initialates
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

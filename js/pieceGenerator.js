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
  return this.eraseRows();

};

//Algorithm to erase and displace all the rows in the grid depending if any row has been completed. It deletes and displaces the blocks of the pieces created. It returns the completed rows for the score of the player
PieceGenerator.prototype.eraseRows = function (){
  //Var for the completed rows
  var completedRows = 0;
  //Initialize the array of rows that will count how many columns have been occupied in each row
  for(var i=this.rowsToComplete.length-1; i>=0;i--)
  {
    this.rowsToComplete[i]=0;
  }

  //Counts how many columns have been occupied in each row
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

  //Counts the completed rows, and marks the blocks that has to be erased and displaced
  for(var i=this.rowsToComplete.length-1; i>=0;i--)
  {
    if(this.rowsToComplete[i]===this.limitColumnRight)
    {
      //Row completed
      completedRows++;

      for(var j=0; j<this.generatedPieces.length;j++)
      {
        for(var k=0; k<this.generatedPieces[j].body.length;k++)
        {
          //If a block is already erased is not taken into account
          if(!this.generatedPieces[j].body[k].erased)
          {
            //if a block is in the row to be erased, it is marked to be erased
            if(this.generatedPieces[j].body[k].row === i)
            {
              this.generatedPieces[j].body[k].erase = true;
            }
            //if a block is in a row below in index (so over the row in the screen) its value to ble desplaced is increased; if a block has to be displaced more than one row because more than one row have been erased, its value of displacement will take it into account
            else if(this.generatedPieces[j].body[k].row<i)
            {
              this.generatedPieces[j].body[k].displacement++;
            }
          }
        }
      }
    }
  }

  //erase and displace the rows in each block of each piece present in the grid
  for(var j=0; j<this.generatedPieces.length;j++)
  {
    for(var k=0; k<this.generatedPieces[j].body.length;k++)
    {
      //If a block is already erased is not taken into account
      if(!this.generatedPieces[j].body[k].erased)
      {
        if(this.generatedPieces[j].body[k].erase === true)
        {
          //mark the region/cell in the grid as true because the block in it will be displaced
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].state = true;
          ///mark a block as erased
          this.generatedPieces[j].body[k].erased = true;
          //remove the block in the DOM
          $(this.generatedPieces[j].body[k].selector).remove();
        }
        else if(this.generatedPieces[j].body[k].displacement>0)
        {
          //mark the region/cell in the grid as true because the block in it will be displaced
          this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].state = true;
          //adds to the value of the row of the block the amount of rows to be displaced
          this.generatedPieces[j].body[k].row+=this.generatedPieces[j].body[k].displacement;
          //changes the position of the block according to its new row
          this.generatedPieces[j].body[k].position.row = this.regions[this.generatedPieces[j].body[k].row][this.generatedPieces[j].body[k].column].center.row;
          this.generatedPieces[j].body[k].displacement = 0;
          //Displaces the block in the DOM in px respect to the player's board
          var selector = this.generatedPieces[j].body[k].selector;
          selector.css({top: this.generatedPieces[j].body[k].position.row.toString()+'px', left: this.generatedPieces[j].body[k].position.column.toString()+'px'});
        }
      }
    }
  }

  //Puts the state of the regions/cells of the grid to false if a block is occupying them, also, it creates a new Array of pieces only taking into account the ones that have at least one block not erased
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
  //Now, the array of generated pieces only will have pieces with at least one block not erased, This way, each time we look at this array when we call this function, it only iterates through the pieces that are present (not wasting time looking into the pieces completely erased)
  this.generatedPieces = tempArray;

  //returns the completed rows for the score of the player
  return completedRows;
};

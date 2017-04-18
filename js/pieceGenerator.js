function PieceGenerator(options){

  this.actualPieceMoved = undefined;
  this.generatedPieces = [];
  this.numberOfPieces = 0;
  this.playerNumber = options.playerNumber;
  this.boardSelector = options.pieceGeneratorSelector;
  this.rowsToComplete = options.rowsToComplete;
  this.regions = options.regions;
  this.limitColumnRight = options.limitColumnRight;

}

//Creates one pieces at a time
PieceGenerator.prototype.generatePiece = function (options) {

  var pieceGenerated = new Piece(options,this.numberOfPieces,this.generatedPieces);
  pieceGenerated.chooseBody();
  pieceGenerated.chooseColor();

  for (var i = 0; i < pieceGenerated.body.length; i++)
  {
      $(this.boardSelector).append($('<div>').addClass('cell piece').attr('player-number-piece',this.playerNumber.toString()).attr('index', i.toString()).attr('piece',this.numberOfPieces.toString()).css({backgroundColor: pieceGenerated.bodyColor, position: 'absolute', top: pieceGenerated.body[i].position.row.toString()+'px', left: pieceGenerated.body[i].position.column.toString()+'px'}));

      var selector ='[player-number-piece='+this.playerNumber.toString()+'][index='+i.toString()+'][piece='+ this.numberOfPieces +']';
      pieceGenerated.body[i].selector = $(selector);
  }

  this.actualPieceMoved = pieceGenerated;
  this.generatedPieces.push(pieceGenerated);
  this.numberOfPieces++;

};

//Returns the actual piece being controlled
PieceGenerator.prototype.actualPiece = function(){
  return this.actualPieceMoved;
};

//Draw all the pieces with the divs calling their function to do it
PieceGenerator.prototype.drawPiece = function (){
  this.actualPieceMoved.drawPiece();
};

PieceGenerator.prototype.updateRegions = function (){

  this.actualPieceMoved.updateRegions();
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
          $(selector).css({top: this.generatedPieces[j].body[k].position.row.toString()+'px', left: this.generatedPieces[j].body[k].position.column.toString()+'px'});
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

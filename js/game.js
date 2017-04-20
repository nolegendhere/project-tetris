function Game(options) {

  //parameters to control the fps
  this.fpsDisplay = options.fpsDisplay;
  this.limit = options.limit;
  this.lastFrameTimeMs = options.lastFrameTimeMs;
  this.maxFPS = options.maxFPS;
  this.delta = options.delta;
  this.timestep = options.timestep;
  this.fps = options.fps;
  this.framesThisSecond = options.framesThisSecond;
  this.lastFpsUpdate = options.lastFpsUpdate;
  this.running = options.running;
  this.started = options.started;
  this.frameID = options.frameID;

  //The maximum width and height of the grid in pixels; with this.rows and this.columns, they are used to calculate the height and width of the regions/cells in the logic
  this.width = options.width;
  this.height = options.height;
  //an offset in pixels where the grid will be printed
  this.offset = {
    row: options.offsetRow,
    column: options.offsetColumn
  };
  //the initial row and column where the pieces have to be spawned in the grid
  this.initialRegion = {
    row: options.initialRegionRow,
    column: options.initialRegionColumn
  };
  //the number of rows to calculate the size of a region/cell in the logic
  this.rows = options.rows;
  //the number of columns to calculate the size of a region/cell in the logic
  this.columns = options.columns;
  //marks the limit of rows in the grid, it doesn't have to be the value of this.rows, it restricts the grid generated
  this.limitRowBottom = options.limitRowBottom;
  //not used
  this.limitColumnLeft = options.limitColumnLeft;
  //marks the limit of columns in the grid; it doesn't have to be the value of this.columns, it restricts the grid generated
  this.limitColumnRight = options.limitColumnRight;
  //The array where the regions7cells of the board will be stored
  this.regions = [];
  //Array of integers that represents all the blocks occupied in each row; in order to control the rows completed
  this.rowsToComplete = [];
  //map of the keys pressed/unpressed
  this.keys = options.keys;
  //booleans in order to know which actions to perform depengin of the keys pressed and be able to apply a certain delay
  this.directionLeft = false;
  this.directionRight = false;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.pausePressed = false;
  //parameters to apply velocity in the movement of the pieces
  //acts asthe position inbetween centers of regions/cells
  this.movementCount = 0;
  //acts as the velocity of the piece; depending of the level choosed it will have different values; it has the value of the level choosed by the player
  this.movementCountVelocity = options.numberForLevel;
  //value stored in order to restablish the this.movementCountVelocity original value in case the key arrow down has been pressed and released (pressing this key increments the velocity of movement in the downwards direction)
  this.movementCountVelocityOriginal = options.numberForLevel;
  //acts like the distance between centers of the regions/cells of the grid
  this.movementCountLength = 1000;

  //like the past movementCount parameters, but with the different actions that can be performed. They also add a certain delay in the response when a key is pressed; that way, the precision when moving the key as a key is pressed is greater
  this.inputResponseDown = 0;
  this.inputResponseDownVelocity = 10;
  this.inputResponseDownLength = 1000;

  this.inputResponseLeft = 0;
  this.inputResponseLeftVelocity = 10;
  this.inputResponseLeftLength = 1000;

  this.inputResponseRight = 0;
  this.inputResponseRightVelocity = 10;
  this.inputResponseRightLength = 1000;

  this.inputResponseRotateLeft = 0;
  this.inputResponseRotateLeftVelocity = 10;
  this.inputResponseRotateLeftLength = 1000;

  this.inputResponseRotateRight = 0;
  this.inputResponseRotateRightVelocity = 10;
  this.inputResponseRotateRightLength = 1000;

  //The same as before with the button pause
  this.inputResponsePause = 0;
  this.inputResponsePauseVelocity = 10;
  this.inputResponsePauseLength = 1000;

  //the number of players in the session
  this.numberOfPlayers = options.numberOfPlayers;
  //the number of the player in the session
  this.playerNumber = options.playerNumber;
  //the socre of the player
  this.playerScore = 0;
  //the score to obtain in order to win the game
  this.numberForVictory = options.numberForVictory;
  //states of the game
  this.gamePaused = false;
  this.gameLost = false;
  this.gameWon = false;

}

//function that updates the game logic
Game.prototype.update = function (delta) {
  //if the game has ben won or lost, it doesn't updates anymore
  if(!this.gameLost && !this.gameWon)
  {
    //if the game is paused, it doesn't updates
    if(!this.gamePaused)
    {
      //if the game has been won by the opponent, it changes the state of the gameLost to true; the player has lost the game
      if(this.rivalPlayer.gameWon)
      {
        this.gameLost = true;
      }
      //if the game has been lost by the opponent, it changes the state of the gameWon to true; the player has won the game
      else if(this.rivalPlayer.gameLost)
      {
        this.gameWon = true;
      }
      //else, it updates the logic of the game
      else
      {
        //it the actual piece moved stops
        if(this.pieceGenerator.actualPiece().contact)
        {
          //updates the sate of the regions/cells with the piece generator and returns the score obtained with the erased rows
          this.playerScore+=this.pieceGenerator.updateRegions();

          //if the actual score is bigger than the number required for the victory, the state gameWon changes to true; the player has won the game
          if(this.playerScore>=this.numberForVictory)
          {
            this.gameWon = true;
          }
          //because a piece has been stopped, another piece is created by the pieceGenerator; the new piece created is the new actual piece moved
          this.pieceGenerator.deployPiece();

          //if the piece actual piece moved just created coincides in the initial spawn regions with another piece, the state gameLost changes to false; the player has lost the game
          if(!this.pieceGenerator.actualPiece().checkDeploy())
          {
            this.gameLost = true;
          }
        }

        //the value movementCount (acting as a position between centers of regions) is incremented by the movementCountVelocity multiplied by delta, that is the time between frames (that way, when the piece is moved, it not depends of the frame rate, but instead it relies in the time between frames)
        this.movementCount += this.movementCountVelocity*delta;
        //if the movementCount is bigger that the movementCountlength (that acts as the distance between the centers of the regions/cells), the actual piece moved perfomrs the action moveDown(), which displaces the piece down into the grid if there is no other piece in the nexts regions/cells or its not the end of the grid
        if(this.movementCount>=this.movementCountLength)
        {
          this.pieceGenerator.actualPiece().moveDown();
          //resets movementCount to zero, so the new position between the blocks of the piece and the next regions has to be completed again from 0
          this.movementCount=0;
        }
      }
    }
    //function that listens to the keys pressed by the player and perfomrs the actions to displace right/left, rotate right/left, go down faster of the piece and pause the game. It takes into account the time delta between frames
    this.assignControlKeys(delta);
  }

};
//It drawns the pieces and refresh the score of the player uf the game is not paused; the value interp it is not being used (we draw the pieces just with the movement obtained in the update function)(interp is used because the draw function is called less times than the update function, so interp can make the visual movement smoother)
Game.prototype.draw = function(interp) {
    //Commented
    // this.fpsDisplay.textContent = Math.round(this.fps) + ' FPS';
    if(!this.gamePaused)
    {
      this.pieceGenerator.drawPiece();
      this.displayResult();
    }
};

//function for the flow of the execution of the game, just in case the time between frames gets much bigger than wanted
Game.prototype.panic = function() {
    this.delta = 0;
};

//not used
//in order to perform actions in the logic of the game in the beginning of the principal loop (acts as an early update)
Game.prototype.begin = function(timestamp, delta) {
};

//not used
//in order to perform actions in the logic of the game in the end of the principal loop (acts as an late update)
Game.prototype.end = function(fps) {
    if (fps < 25) {
    }
    else if (fps > 30) {
    }
};

//not used
//can stop the execution of the game
Game.prototype.stop = function() {
    this.running = false;
    this.started = false;
    cancelAnimationFrame(frameID);
};

//initialization of the execution of the game; the ingame layout is generated, as the layout for the score, the board of the player with its grid, and the pieceGenerator; the first piece is desployed; the main loop is called for the first time
Game.prototype.startGame = function() {
    if (!this.started) {
      //the game has started; not used
        this.started = true;
        //the player ingame layout is generated
        this.generateLayout();
        //the layout for the score is generated
        this.generateInPlayMenu();
        //the board of the player with its grid is generated
        this.generateRegions();
        this.generatePieceGenerator();
        //the first piece is desployed
        this.pieceGenerator.deployPiece();
        //timeStamp is the mark of time returned by requestAnimationFrame each time is called; it is used to build the fps, delta time, etc
        this.frameID = requestAnimationFrame(function(timestamp) {
            //the first draw is called
            this.draw(1);
            //the game is running; not used
            this.running = true;
            //the timeStamp is assigned to the times of the last and update frames in order to build the fps, delta time, etc
            this.lastFrameTimeMs = timestamp;
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
            //the main loop is called for the first time
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
        }.bind(this));
    }
};

//The main loop; here the update and draw functions are called; the fps is calculated, as the delta time, etc
//tutorial in https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
Game.prototype.mainLoop=function(timestamp) {
    // Throttle the frame rate.
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
        this.frameID = requestAnimationFrame(this.mainLoop.bind(this));

        return;
    }

    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    //this.begin(timestamp, this.delta);

    if (timestamp > this.lastFpsUpdate + 1000) {
        this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

        this.lastFpsUpdate = timestamp;
        this.framesThisSecond = 0;
    }
    this.framesThisSecond++;

    var numUpdateSteps = 0;
    while (this.delta >= this.timestep) {
      // console.log("before request1");
        this.update(this.timestep);
        // console.log("after request1");
        this.delta -= this.timestep;
        if (++this.numUpdateSteps >= 240) {
            this.panic();
            break;
        }
    }

    this.draw(this.delta / this.timestep);
    this.end(this.fps);
    this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
};

//It generates the layout for the ingame
Game.prototype.generateLayout = function () {
  //If the players of the session are two
  if(this.numberOfPlayers==2)
  {
    if(this.playerNumber===1)
    {
      //It generates in the DOM the ingame layout of the player two and its selector
      this.playerLayout='[player-number-layout='+this.playerNumber.toString()+']';

      $('.ingame-layout #row-players').append($('<div>').addClass('col-xs-offset-2 col-xs-2 col-md-offset-2 col-md-2').attr('id','column-player'+this.playerNumber.toString()));

      $('#column-player'+this.playerNumber.toString()).append($('<div>').addClass('player-layout').attr('player-number-layout',this.playerNumber.toString()));

      //It generates a selector to remove from the DOM the layout created
      this.playerLayoutRemove='#column-player'+this.playerNumber.toString();
    }
    else
    {
      //It generates in the DOM the ingame layout of the player one and its selector
      this.playerLayout='[player-number-layout='+this.playerNumber.toString()+']';

      $('.ingame-layout #row-players').append($('<div>').addClass('col-xs-offset-1 col-xs-2 col-md-offset-3 col-md-2').attr('id','column-player'+this.playerNumber.toString()));

      $('#column-player'+this.playerNumber.toString()).append($('<div>').addClass('player-layout').attr('player-number-layout',this.playerNumber.toString()));
      //It generates a selector to remove from the DOM the layout created
      this.playerLayoutRemove='#column-player'+this.playerNumber.toString();
    }
  }
  //if there is only one players in the session
  else
  {
    //It generates in the DOM the ingame layout of the player two and its selector
    this.playerLayout='[player-number-layout='+this.playerNumber.toString()+']';

    $('.ingame-layout #row-players').append($('<div>').addClass('col-xs-offset-4 col-xs-2 col-md-offset-5 col-md-2').attr('id','column-player'+this.playerNumber.toString()));

    $('#column-player'+this.playerNumber.toString()).append($('<div>').addClass('player-layout').attr('player-number-layout',this.playerNumber.toString()));

    //It generates a selector to remove from the DOM the layout created
    this.playerLayoutRemove='#column-player'+this.playerNumber.toString();

  }


};

//it generates the regions of the grid in the board of the player
Game.prototype.generateRegions = function () {
  //It calculates the width and height of the regions/cells in the logic
  this.cellWidth = this.width / this.columns;
  this.cellHeight = this.height / this.rows;
  //offset to where generate the grid
  this.levelLeft = this.offset.column;
  this.levelTop = this.offset.row;
  //var that will be used in the creation of the regions
  var region;
  //selector of the player's board where the grid will be generated
  this.boardSelector ='[player-number-board='+this.playerNumber.toString()+']';
  //append the player's board into the players layout
  $(this.playerLayout).append($('<div>').addClass('player-board').attr('player-number-board',this.playerNumber.toString()));
  //generate all the regions of the grid in the player's board
  for (var rowIndex = 0; rowIndex < this.limitRowBottom; rowIndex++)
  {
    var tempArray=[];
    //initializes the array of integers named rowsToComplete
    this.rowsToComplete.push(0);

    for (var columnIndex = 0; columnIndex < this.limitColumnRight; columnIndex++)
    {

      region = new Region({ left: this.levelLeft + columnIndex* this.cellWidth, top: this.levelTop + rowIndex*this.cellHeight, right: this.levelLeft + (columnIndex+1) * this.cellWidth,bottom: this.levelTop + (rowIndex+1) * this.cellHeight, state: true, regionColor: 'black'});

      tempArray[columnIndex] = region;

      $(this.boardSelector).append($('<div>').addClass('cell board').attr('player-number-region',this.playerNumber.toString()).attr('data-row', rowIndex).attr('data-column', columnIndex).css({backgroundColor: region.regionColor, position: 'absolute', top: region.center.row.toString()+'px', left: region.center.column.toString()+'px'}));
    }
    this.regions.push(tempArray);
  }
};

Game.prototype.generatePieceGenerator = function () {
  $(this.boardSelector).append($('<div>').addClass('piece-generator').attr('player-number-piece-generator',this.playerNumber.toString()));

  this.pieceGeneratorSelector = '[player-number-piece-generator='+this.playerNumber.toString()+']';

  this.pieceGenerator = new PieceGenerator({playerNumber: this.playerNumber,pieceGeneratorSelector: this.pieceGeneratorSelector,rowsToComplete: this.rowsToComplete, initialRegionRow: this.initialRegion.row, initialRegionColumn: this.initialRegion.column,regions:this.regions, limitRowBottom: this.limitRowBottom,limitColumnRight:this.limitColumnRight});
};

//Maps the key inputs to actions of the controled piece; there is an input delay/Length response; with delta time, a velocity in the input delay response and movement can be used.
Game.prototype.assignControlKeys = function (delta) {
  if(!this.gameLost)
  {
    if(!this.gamePaused)
    {
      //If the rotationLeft delay has been completed, then the action is performed
      if(this.rotateLeft && this.inputResponseRotateLeft>=this.inputResponseRotateLeftLength && !this.keys.turnLeft)
      {
        //TurnRight
        this.rotateLeft = false;
        this.inputResponseRotateLeft = 0;
        this.pieceGenerator.actualPiece().defineRotationPoint();
        this.pieceGenerator.actualPiece().rotatePieceLeft();
      }
      else if(this.keys.turnLeft && this.inputResponseRotateLeft===0)
      {
        //TurnLeft
        this.rotateLeft = true;
        this.inputResponseRotateLeft+=this.inputResponseRotateLeftVelocity*delta;
      }
      else if(this.inputResponseRotateLeft>0)
      {
        this.inputResponseRotateLeft+=this.inputResponseRotateLeftVelocity*delta;
      }

      if(this.rotateRight && this.inputResponseRotateRight>=this.inputResponseRotateRight && !this.keys.turnRight)
      {
        //TurnRight
        this.rotateRight = false;
        this.inputResponseRotateRight = 0;
        this.pieceGenerator.actualPiece().defineRotationPoint();
        this.pieceGenerator.actualPiece().rotatePieceRight();
      }
      else if(this.keys.turnRight && this.inputResponseRotateRight===0)
      {
        //TurnRight
        this.rotateRight = true;
        this.inputResponseRotateRight+=this.inputResponseRotateRightVelocity*delta;
      }
      else if(this.inputResponseRotateRight>0)
      {
        this.inputResponseRotateRight+=this.inputResponseRotateRightVelocity*delta;
      }

      if(this.directionDown && this.inputResponseDown>=this.inputResponseDownLength)
      {
        //Left
        this.directionDown = false;
        this.inputResponseDown = 0;
        this.movementCountVelocity = this.pieceGenerator.actualPiece().goDownFaster();
      }
      else if(this.keys.down && this.inputResponseDown===0)
      {
        //Left
        this.directionDown = true;
        this.inputResponseDown+=this.inputResponseDownVelocity*delta;

      }
      else if(this.inputResponseDown>0)
      {
        this.inputResponseDown+=this.inputResponseDownVelocity*delta;
      }

      if(!this.keys.down)
      {
        this.movementCountVelocity = this.movementCountVelocityOriginal;
      }

      if(this.directionLeft && this.inputResponseLeft>=this.inputResponseLeftLength)
      {
        //Left
        this.directionLeft = false;
        this.inputResponseLeft = 0;
        this.pieceGenerator.actualPiece().goLeft();
      }
      else if(this.keys.left && this.inputResponseLeft===0)
      {
        //Left
        this.directionLeft = true;
        this.inputResponseLeft+=this.inputResponseLeftVelocity*delta;

      }
      else if(this.inputResponseLeft>0)
      {
        this.inputResponseLeft+=this.inputResponseLeftVelocity*delta;
      }

      if(this.directionRight  && this.inputResponseRight>=this.inputResponseRightLength)
      {
        //Right
        this.directionRight = false;
        this.inputResponseRight = 0;
        this.pieceGenerator.actualPiece().goRight();
      }
      else if(this.keys.right && this.inputResponseRight===0)
      {
        //Right
        this.directionRight = true;
        this.inputResponseRight+=this.inputResponseRightVelocity*delta;
      }
      else if(this.inputResponseRight>0)
      {
        this.inputResponseRight+=this.inputResponseRightVelocity*delta;
      }

      if(this.pausePressed && this.inputResponsePause>=this.inputResponsePauseLength && !this.keys.pause)
      {
        //Pause
        this.pausePressed = false;
        this.gamePaused = true;
        this.inputResponsePause = 0;
      }
      else if(this.keys.pause && this.inputResponsePause===0)
      {
        //Pause
        this.pausePressed = true;
        this.inputResponsePause+=this.inputResponsePauseVelocity*delta;
      }
      else if(this.inputResponsePause>0)
      {
        this.inputResponsePause+=this.inputResponsePauseVelocity*delta;
      }
    }
    else
    {
      if(this.pausePressed && this.inputResponsePause>=this.inputResponsePauseLength && !this.keys.pause)
      {
        //Pause
        this.pausePressed = false;
        this.gamePaused = false;
        this.inputResponsePause = 0;
      }
      else if(this.keys.pause && this.inputResponsePause===0)
      {
        //Pause
        this.pausePressed = true;
        this.inputResponsePause+=this.inputResponsePauseVelocity*delta;
      }
      else if(this.inputResponsePause>0)
      {
        this.inputResponsePause+=this.inputResponsePauseVelocity*delta;
      }
    }
  }
};

Game.prototype.generateInPlayMenu = function (){

  this.InPlayMenuSelector ='[player-number-inplaymenu='+this.playerNumber.toString()+']';

  $(this.playerLayout).append($('<div>').addClass('player-inplaymenu').attr('player-number-inplaymenu',this.playerNumber.toString()));

  this.playerScoreSelector ='#player-number-score'+this.playerNumber.toString();

  $(this.InPlayMenuSelector).append($('<div>').addClass('score').attr('id','player-number-score'+this.playerNumber.toString()).append($('<h3>')));

};

Game.prototype.displayResult = function () {
  //console.log("entra",$(this.playerScoreSelector));
  $(this.playerScoreSelector+' h3').html(this.playerScore.toString()+'PTS');
  //console.log("this",this);
};

Game.prototype.restartGame = function () {
  $(this.playerLayoutRemove).remove();
};

Game.prototype.addRivalPlayer = function(options){
  if(this.numberOfPlayers === 2)
  {
    this.rivalPlayer = options.rivalPlayer;
  }
  else
  {
    this.rivalPlayer ={
      gameWon : false,
      gameLost : false
    };
  }
};

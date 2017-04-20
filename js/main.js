
//Object that manages the game
function Menu(){

}
//starts the management of the game
Menu.prototype.startApp = function () {
  this.generateMenu();
};
//checks if the actual game is finished, it could be also done in the object game, but it was decided to be done here in order to apply some of the tools learned during the first module; returns which player has won and which has lost
Menu.prototype.checkStateGame = function () {

  if(this.lastPlayedNumberOfPlayers===1)
  {
    this.intervalID = setInterval(function(){
      if(this.playerOne.gameWon)
      {
        $(this.playerOne.boardSelector).append($('<h3>').addClass('player-message win').attr('id','win1').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#win1').html('PLAYER 1 WINS');

        this.checkStateGameClear();
      }
      else if(this.playerOne.gameLost)
      {
        $(this.playerOne.boardSelector).append($('<h3>').addClass('player-message lose').attr('id','lose1').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#lose1').html('PLAYER 1 LOSES');

        this.checkStateGameClear();
      }

    }.bind(this), 100);
  }
  else
  {
    this.intervalID = setInterval(function(){
      if(this.playerOne.gameWon || this.playerTwo.gameLost)
      {
        $(this.playerOne.boardSelector).append($('<h3>').addClass('player-message win').attr('id','win1').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#win1').html('PLAYER 1 WINS');

        $(this.playerTwo.boardSelector).append($('<h3>').addClass('player-message lose').attr('id','lose2').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#lose2').html('PLAYER 2 LOSES');

        this.checkStateGameClear();
      }
      else if(this.playerOne.gameLost || this.playerTwo.gameWon)
      {
        $(this.playerOne.boardSelector).append($('<h3>').addClass('player-message lose').attr('id','lose1').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#lose1').html('PLAYER 1 LOSES');

        $(this.playerTwo.boardSelector).append($('<h3>').addClass('player-message win').attr('id','win2').css({position: 'absolute', top: '100px', left: '20px', color: 'red', backgroundColor: 'white'}));
        $('#win2').html('PLAYER 2 WINS');

        this.checkStateGameClear();
      }

    }.bind(this), 100);
  }
};

//Clears the setInterval of the anterior function
Menu.prototype.checkStateGameClear = function () {
  clearInterval(this.intervalID);
};

//generates the different menus that manages the game
Menu.prototype.generateMenu = function (){

  //selectors of the menus and layouts
  this.menuLayoutStartSelector = '#menu-layout-start';
  this.playerLayoutSelector = '#ingame-layout';
  this.menuLayoutRestartSelector = '#menu-layout-restart';

  //selectors of the buttons
  this.startListener = '#start-button';
  this.numberOfPlayerListener = '#number-player-button';
  this.numberForVictoryListener = '#number-victory-button';
  this.numberForLevelListener = '#number-level-button';
  this.resumeListener = '#resume-button';
  this.restartListener = '#restart-button';
  this.goBackMenuStart = '#go-back-menu-start-button';
  //initializates the listeners
  this.addListenerToStart();
  this.addListenerToNumberOfPLayers();
  this.addListenerToNumberForVictory();
  this.addListenerToNumberForLevel();
  this.addListenerToResume();
  this.addListenerToRestart();
  this.addListenerToGoBackmenuStart();
  //hide some of the menues in the start manue
  $(this.menuLayoutRestartSelector).hide();
  $(this.playerLayoutSelector).hide();
  $(this.resumeListener).hide();
  //if there is a delay in the execution of one action, this boolean allows to control that the other buttons that can be pressed are not taken into account
  this.inactiveButton = false;

};

//Checks the level of difficulty choosen
Menu.prototype.addListenerToNumberForLevel = function()
{
  this.numberForLevel=1;
  this.lastnumberForLevel=this.numberForlevel;

  $(this.numberForLevelListener).on('click', function(){

    var tempString = this.numberForLevelListener+' h3';
    this.numberForLevel+=1;
    if(this.numberForLevel%21===0)
    {
      this.numberForLevel = 1;
    }

    $(tempString).html('LEVEL '+this.numberForLevel.toString());

  }.bind(this));
};

//checks the number of points choosen to win the game
Menu.prototype.addListenerToNumberForVictory = function()
{
  this.numberForVictory=10;
  this.lastnumberForVictory=this.numberForVictory;

  $(this.numberForVictoryListener).on('click', function(){

    var tempString = this.numberForVictoryListener+' h3';
    this.numberForVictory+=10;
    if(this.numberForVictory%110===0)
    {
      this.numberForVictory = 10;
    }

    $(tempString).html(this.numberForVictory.toString()+"PTS TO WIN");

  }.bind(this));
};

//checks the number of players choosen
Menu.prototype.addListenerToNumberOfPLayers = function()
{
  this.numberOfPlayers=1;
  this.lastPlayedNumberOfPlayers=1;

  $(this.numberOfPlayerListener).on('click', function(){

    var tempString = this.numberOfPlayerListener+' h3';
    this.numberOfPlayers++;
    if(this.numberOfPlayers%3===0)
    {
      this.numberOfPlayers = 1;
      $(tempString).html('ONE PLAYER');
    }
    else
    {
      this.numberOfPlayers = 2;
      $(tempString).html('TWO PLAYERS');
    }

  }.bind(this));
};

//resumes to the ongoing game
Menu.prototype.addListenerToResume = function()
{
  $(this.resumeListener).on('click', function(){
    if(!this.inactiveButton)
    {
      $(this.menuLayoutStartSelector).hide();
      //$(this.resumeListener).hide();
      $(this.menuLayoutRestartSelector).show();
      $(this.playerLayoutSelector).show();

      if(this.lastPlayedNumberOfPlayers===1)
      {
        this.playerOne.gamePaused = false;
      }
      else
      {
        this.playerOne.gamePaused = false;
        this.playerTwo.gamePaused = false;
      }

      this.checkStateGame();
    }
  }.bind(this));
};

//allows to go back to the main menu
Menu.prototype.addListenerToGoBackmenuStart = function()
{
  $(this.goBackMenuStart).on('click', function(){
    if(!this.inactiveButton)
    {
      if(this.lastPlayedNumberOfPlayers===1)
      {
        this.playerOne.gamePaused = true;
      }
      else
      {
        this.playerOne.gamePaused = true;
        this.playerTwo.gamePaused = true;
      }

      $(this.menuLayoutStartSelector).show();
      $(this.resumeListener).show();
      $(this.menuLayoutRestartSelector).hide();
      $(this.playerLayoutSelector).hide();

      this.checkStateGameClear();
    }
  }.bind(this));
};

//restarts the game
Menu.prototype.addListenerToRestart = function()
{
  $(this.restartListener).on('click', function(){
    if(!this.inactiveButton)
    {
      this.inactiveButton = true;
      if(this.lastPlayedNumberOfPlayers===1)
      {
        this.checkStateGameClear();
        this.playerOne.restartGame();
        this.playerOne.gamePaused = true;
        delete this.playerOne.pieceGenerator;
        delete this.playerOne;
        this.playerOne = new Game({
            box :document.getElementById('box'),
            boxPos : 10,
            boxLastPos : 10,
            boxVelocity : 0.08,
            fpsDisplay : document.getElementById('fpsDisplay'),
            limit : 300,
            lastFrameTimeMs : 0,
            maxFPS : 100,
            delta : 0,
            timestep : 1000 / 100,
            fps : 60,
            framesThisSecond : 0,
            lastFpsUpdate : 0,
            running : false,
            started : false,
            frameID : 0,
            rows: 50,
            columns: 50,
            limitRowBottom: 30,
            limitColumnLeft: 0,
            limitColumnRight: 10,
            keys: arrows1,
            width: 650,
            height: 650,
            offsetRow: 0,
            offsetColumn: 0,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 0,
            numberForVictory: this.lastnumberForVictory,
            numberForLevel: this.lastnumberForLevel,
            numberOfPlayers: this.lastPlayedNumberOfPlayers
        });

        this.playerOne.addRivalPlayer();

        setTimeout(function(){
          this.playerOne.startGame();
          this.inactiveButton=false;
          this.checkStateGame();
        }.bind(this), 1000);
      }
      else
      {
        this.checkStateGameClear();
        this.playerOne.restartGame();
        this.playerTwo.restartGame();
        this.playerOne.gamePaused = true;
        this.playerTwo.gamePaused = true;
        delete this.playerOne.pieceGenerator;
        delete this.playerOne;
        delete this.playerTwo.pieceGenerator;
        delete this.playerTwo;

        this.playerOne = new Game({
            box :document.getElementById('box'),
            boxPos : 10,
            boxLastPos : 10,
            boxVelocity : 0.08,
            fpsDisplay : document.getElementById('fpsDisplay'),
            limit : 300,
            lastFrameTimeMs : 0,
            maxFPS : 100,
            delta : 0,
            timestep : 1000 / 100,
            fps : 60,
            framesThisSecond : 0,
            lastFpsUpdate : 0,
            running : false,
            started : false,
            frameID : 0,
            rows: 50,
            columns: 50,
            limitRowBottom: 30,
            limitColumnLeft: 0,
            limitColumnRight: 10,
            keys: arrows1,
            width: 650,
            height: 650,
            offsetRow: 0,
            offsetColumn: 0,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 0,
            numberForVictory: this.lastnumberForVictory,
            numberForLevel: this.lastnumberForLevel,
            numberOfPlayers: this.lastPlayedNumberOfPlayers
        });

        this.playerTwo = new Game({
            box :document.getElementById('box'),
            boxPos : 10,
            boxLastPos : 10,
            boxVelocity : 0.08,
            fpsDisplay : document.getElementById('fpsDisplay'),
            limit : 300,
            lastFrameTimeMs : 0,
            maxFPS : 100,
            delta : 0,
            timestep : 1000 / 100,
            fps : 60,
            framesThisSecond : 0,
            lastFpsUpdate : 0,
            running : false,
            started : false,
            frameID : 0,
            rows: 50,
            columns: 50,
            limitRowBottom: 30,
            limitColumnLeft: 0,
            limitColumnRight: 10,
            keys: arrows2,
            width: 650,
            height: 650,
            offsetRow: 0,
            offsetColumn: 0,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 1,
            numberForVictory: this.lastnumberForVictory,
            numberForLevel: this.lastnumberForLevel,
            numberOfPlayers: this.lastPlayedNumberOfPlayers
        });

        this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

        this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

        setTimeout(function(){
          this.playerOne.startGame();
          this.playerTwo.startGame();
          this.inactiveButton = false;
          this.checkStateGame();
        }.bind(this), 1000);
      }
    }


  }.bind(this));
};

//Starts the new game
Menu.prototype.addListenerToStart = function()
{
  this.OnePlayer = false;
  this.TwoPlayers = false;

  $(this.startListener).on('click', function(){
    if(!this.inactiveButton)
    {
      this.inactiveButton=true;
      if(this.numberOfPlayers===1)
      {
        if(!this.OnePlayer && !this.TwoPlayers)
        {
          this.OnePlayer = true;
          this.lastPlayedNumberOfPlayers=1;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;

          $(this.menuLayoutStartSelector).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer();

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.playerOne.restartGame();
          this.playerOne.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer();

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.TwoPlayers = false;
          this.OnePlayer = true;
          this.playerOne.restartGame();
          this.playerTwo.restartGame();
          this.playerOne.gamePaused = true;
          this.playerTwo.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          delete this.playerTwo.pieceGenerator;
          delete this.playerTwo;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer();

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
      }
      else
      {
        if(!this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.TwoPlayers = true;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;

          $(this.menuLayoutStartSelector).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerTwo = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows2,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.OnePlayer = false;
          this.TwoPlayers = true;
          this.playerOne.restartGame();
          this.playerOne.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerTwo = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows2,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.playerOne.restartGame();
          this.playerTwo.restartGame();
          this.playerOne.gamePaused = true;
          this.playerTwo.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          delete this.playerTwo.pieceGenerator;
          delete this.playerTwo;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows1,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerTwo = new Game({
              box :document.getElementById('box'),
              boxPos : 10,
              boxLastPos : 10,
              boxVelocity : 0.08,
              fpsDisplay : document.getElementById('fpsDisplay'),
              limit : 300,
              lastFrameTimeMs : 0,
              maxFPS : 100,
              delta : 0,
              timestep : 1000 / 100,
              fps : 60,
              framesThisSecond : 0,
              lastFpsUpdate : 0,
              running : false,
              started : false,
              frameID : 0,
              rows: 50,
              columns: 50,
              limitRowBottom: 30,
              limitColumnLeft: 0,
              limitColumnRight: 10,
              keys: arrows2,
              width: 650,
              height: 650,
              offsetRow: 0,
              offsetColumn: 0,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
              numberForVictory: this.numberForVictory,
              numberForLevel: this.numberForLevel,
              numberOfPlayers: this.numberOfPlayers
          });

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
            this.checkStateGame();
          }.bind(this), 1000);
        }
      }
    }
  }.bind(this));
};


$(document).ready(function(){

  var menu = new Menu();

  menu.startApp();

});

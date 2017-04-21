
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

  //loading
  this.loadingLayoutSelector = '#loading-layout';
  this.loadingSelector = '#loading';

  //selectors of the menus and layouts
  this.menuLayoutStartSelector = '#menu-layout-start';
  this.playerLayoutSelector = '#ingame-layout';
  this.menuLayoutRestartSelector = '#menu-layout-restart';

  //selectors of the buttons
  this.startListener = '#start-button';
  this.numberOfPlayerListener = '#number-player-button';
  this.numberForVictoryListener = '#number-victory-button';
  this.numberForLevelListener = '#number-level-button';
  this.computerTypeListener = '#computer-type-button';
  this.resumeListener = '#resume-button';
  this.restartListener = '#restart-button';
  this.goBackMenuStart = '#go-back-menu-start-button';
  //initializates the listeners
  this.addListenerToStart();
  this.addListenerToNumberOfPLayers();
  this.addListenerToNumberForVictory();
  this.addListenerToNumberForLevel();
  this.addListenerComputerType();
  this.addListenerToResume();
  this.addListenerToRestart();
  this.addListenerToGoBackmenuStart();
  //hide some of the menues in the start manue
  $(this.menuLayoutRestartSelector).hide();
  $(this.playerLayoutSelector).hide();
  $(this.resumeListener).hide();
  $(this.loadingLayoutSelector).hide();
  //if there is a delay in the execution of one action, this boolean allows to control that the other buttons that can be pressed are not taken into account
  this.inactiveButton = false;

};

//Chosing the computer type
Menu.prototype.addListenerComputerType = function()
{
  var tempString = this.computerTypeListener +' h3';
  this.computerType = 'PC';
  this.lastPlayedComputerType = this.computerType;
  $(this.computerTypeListener).on('click', function(){
    if(this.computerType === 'PC')
    {
      this.computerType = 'MAC';
      $(tempString).html('MAC');
    }
    else
    {
       this.computerType = 'PC';
       $(tempString).html('PC');
    }

  }.bind(this));
};

//Loading screen; adds pause before beginning, for resume
Menu.prototype.displayLoadingLayoutResume = function(){
  var counter = 3;
  var tempString = this.loadingSelector +' h3';
  $(tempString).html('READY '+ counter.toString() +'...');

  this.intervalID2 = setInterval(function(){
    counter--;
    if(counter===-1)
    {
      $(this.loadingLayoutSelector).hide();

      if(this.lastPlayedNumberOfPlayers===1)
      {
        $(this.menuLayoutRestartSelector).show();
        $(this.playerLayoutSelector).show();
        setTimeout(function(){
          this.playerOne.gamePaused=false;
          this.inactiveButton=false;
          this.checkStateGame();
        }.bind(this),1000 );
      }
      else
      {
        $(this.menuLayoutRestartSelector).show();
        $(this.playerLayoutSelector).show();
        this.playerOne.startGame();
        this.playerTwo.startGame();
        setTimeout(function(){
          this.playerOne.gamePaused=false;
          this.playerTwo.gamePaused=false;
          this.inactiveButton=false;
          this.checkStateGame();
        }.bind(this),1000 );
      }

      clearInterval(this.intervalID2);
    }
    $(tempString).html('READY '+ counter.toString() +'...');
  }.bind(this), 1000);
};


//Loading screen; adds pause before beginning
Menu.prototype.displayLoadingLayout = function(){
  var counter = 3;
  var tempString = this.loadingSelector +' h3';
  $(tempString).html('READY '+ counter.toString() +'...');

  this.intervalID2 = setInterval(function(){
    counter--;
    if(counter===-1)
    {
      $(this.loadingLayoutSelector).hide();

      if(this.lastPlayedNumberOfPlayers===1)
      {
        $(this.menuLayoutRestartSelector).show();
        $(this.playerLayoutSelector).show();
        this.playerOne.gamePaused = true;
        this.playerOne.startGame();
        setTimeout(function(){
          this.playerOne.gamePaused=false;
          this.inactiveButton=false;
          this.checkStateGame();
        }.bind(this),1000 );
      }
      else
      {
        $(this.menuLayoutRestartSelector).show();
        $(this.playerLayoutSelector).show();
        this.playerOne.gamePaused = true;
        this.playerTwo.gamePaused = true;
        this.playerOne.startGame();
        this.playerTwo.startGame();
        setTimeout(function(){
          this.playerOne.gamePaused=false;
          this.playerTwo.gamePaused=false;
          this.inactiveButton=false;
          this.checkStateGame();
        }.bind(this),1000 );
      }

      clearInterval(this.intervalID2);
    }
    $(tempString).html('READY '+ counter.toString() +'...');
  }.bind(this), 1000);
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
      $(this.loadingLayoutSelector).show();

      this.displayLoadingLayoutResume();
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

Menu.prototype.initializePlayer = function (playerNumber, keyBinding) {
  return new Game({
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
      keys: keyBinding,
      width: 650,
      height: 650,
      offsetRow: 0,
      offsetColumn: 0,
      initialRegionRow: 1,
      initialRegionColumn: 5,
      playerNumber: playerNumber,
      numberForVictory: this.lastnumberForVictory,
      numberForLevel: this.lastnumberForLevel,
      numberOfPlayers: this.lastPlayedNumberOfPlayers,
      computerType: this.lastPlayedComputerType
  });

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

        this.playerOne = this.initializePlayer(1,arrows2);

        this.playerOne.addRivalPlayer();

        $(this.menuLayoutRestartSelector).hide();
        $(this.playerLayoutSelector).hide();
        $(this.loadingLayoutSelector).show();

        this.displayLoadingLayout();
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

        this.playerOne = this.initializePlayer(1,arrows2);
        this.playerTwo = this.initializePlayer(2,arrows1);

        this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

        this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

        $(this.menuLayoutRestartSelector).hide();
        $(this.playerLayoutSelector).hide();
        $(this.loadingLayoutSelector).show();

        this.displayLoadingLayout();
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
          this.lastPlayedComputerType = this.computerType;

          this.playerOne = this.initializePlayer(1,arrows2);

          this.playerOne.addRivalPlayer();

          $(this.menuLayoutStartSelector).hide();
          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.lastPlayedComputerType = this.computerType;
          this.playerOne.restartGame();
          this.playerOne.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = this.initializePlayer(1,arrows2);

          this.playerOne.addRivalPlayer();

          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.lastPlayedComputerType = this.computerType;
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

          this.playerOne = this.initializePlayer(1,arrows2);

          this.playerOne.addRivalPlayer();

          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
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
          this.lastPlayedComputerType = this.computerType;

          $(this.menuLayoutStartSelector).hide();

          this.playerOne = this.initializePlayer(1,arrows2);
          this.playerTwo = this.initializePlayer(2,arrows1);

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.lastPlayedComputerType = this.computerType;
          this.OnePlayer = false;
          this.TwoPlayers = true;
          this.playerOne.restartGame();
          this.playerOne.gamePaused = true;
          delete this.playerOne.pieceGenerator;
          delete this.playerOne;
          $(this.menuLayoutStartSelector).hide();
          $(this.resumeListener).hide();

          this.playerOne = this.initializePlayer(1,arrows2);
          this.playerTwo = this.initializePlayer(2,arrows1);

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.lastnumberForVictory = this.numberForVictory;
          this.lastnumberForLevel = this.numberForLevel;
          this.lastPlayedComputerType = this.computerType;
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

          this.playerOne = this.initializePlayer(1,arrows2);
          this.playerTwo = this.initializePlayer(2,arrows1);

          this.playerOne.addRivalPlayer({rivalPlayer:this.playerTwo});

          this.playerTwo.addRivalPlayer({rivalPlayer:this.playerOne});

          $(this.loadingLayoutSelector).show();

          this.displayLoadingLayout();
        }
      }
    }
  }.bind(this));
};


$(document).ready(function(){

  var menu = new Menu();

  menu.startApp();


});

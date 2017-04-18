
function Menu(){

}

Menu.prototype.startApp = function () {
  this.generateMenu();
};

Menu.prototype.generateMenu = function (){
  $('.container').append($('<div>').addClass('menu-layout-start').attr('id','menu-layout-start'));
  $('.menu-layout-start').append($('<div>').addClass('start-game'));
  $('.start-game').append($('<button>').addClass('btn').attr('id','start-button').append($('<h3>')));
  $('#start-button h3').html('START GAME');
  $('.start-game').append($('<button>').addClass('btn').attr('id','number-player-button').append($('<h3>')));
  $('#number-player-button h3').html('ONE PLAYER');
  $('.start-game').append($('<button>').addClass('btn').attr('id','resume-button').append($('<h3>')));
  $('#resume-button h3').html('RESUME GAME');

  $('.container').append($('<div>').addClass('ingame-layout').attr('id','ingame-layout'));


  $('.container').append($('<div>').addClass('menu-layout-restart').attr('id','menu-layout-restart'));
  $('.menu-layout-restart').append($('<div>').addClass('restart-game'));
  $('.restart-game').append($('<button>').addClass('btn').attr('id','restart-button').append($('<h3>')));
  $('#restart-button h3').html('RESTART GAME');
  $('.menu-layout-restart').append($('<div>').addClass('go-back-menu-start'));
  $('.go-back-menu-start').append($('<button>').addClass('btn').attr('id','go-back-menu-start-button').append($('<h3>')));
  $('#go-back-menu-start-button h3').html('MAIN PAGE');

  this.menuLayoutStartSelector = '#menu-layout-start';
  this.playerLayoutSelector = '#ingame-layout';
  this.menuLayoutRestartSelector = '#menu-layout-restart';

  this.startListener = '#start-button';
  this.numberOfPlayerListener = '#number-player-button';
  this.resumeListener = '#resume-button';
  this.restartListener = '#restart-button';
  this.goBackMenuStart = '#go-back-menu-start-button';

  this.addListenerToStart();
  this.addListenerToNumberOfPLayers();
  this.addListenerToResume();
  this.addListenerToRestart();
  this.addListenerToGoBackmenuStart();

  $(this.menuLayoutRestartSelector).hide();
  $(this.playerLayoutSelector).hide();
  $(this.resumeListener).hide();

  this.inactiveButton = false;

};

Menu.prototype.addListenerToNumberOfPLayers = function()
{
  this.numberOfPlayers=1;
  this.lastPlayedNumberOfPlayers=1;
  console.log(this.numberOfPlayers);
  $(this.numberOfPlayerListener).on('click', function(){
    this.numberOfPlayers++;
    var tempString = this.numberOfPlayerListener+' h3';

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

    console.log(this.numberOfPlayers);
  }.bind(this));
};

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
    }
  }.bind(this));
};


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
    }
  }.bind(this));
};

Menu.prototype.addListenerToRestart = function()
{
  $(this.restartListener).on('click', function(){
    if(!this.inactiveButton)
    {
      this.inactiveButton = true;
      if(this.lastPlayedNumberOfPlayers===1)
      {
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
            offsetColumn: 50,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 0,
        });

        setTimeout(function(){
          this.playerOne.startGame();
          this.inactiveButton=false;
        }.bind(this), 3000);
      }
      else
      {
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
            offsetColumn: 50,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 0,
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
            offsetColumn: 50,
            initialRegionRow: 1,
            initialRegionColumn: 5,
            playerNumber: 1,
        });

        setTimeout(function(){
          this.playerOne.startGame();
          this.playerTwo.startGame();
          this.inactiveButton = false;
        }.bind(this), 3000);
      }
    }


  }.bind(this));
};

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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=1;
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
      }
      else
      {
        if(!this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
          this.TwoPlayers = true;

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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
        else if(this.OnePlayer && !this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
        else if(this.TwoPlayers)
        {
          this.lastPlayedNumberOfPlayers=2;
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 0,
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
              offsetColumn: 50,
              initialRegionRow: 1,
              initialRegionColumn: 5,
              playerNumber: 1,
          });

          setTimeout(function(){
            $(this.menuLayoutRestartSelector).show();
            $(this.playerLayoutSelector).show();
            this.playerOne.startGame();
            this.playerTwo.startGame();
            this.inactiveButton=false;
          }.bind(this), 3000);
        }
      }
    }
  }.bind(this));
};


$(document).ready(function(){

  var menu = new Menu();

  menu.startApp();
  // $('body').on('keydown',function(e){
  //   console.log(e.keyCode);
  // });

  // Initial values

  // var game1 = new Game({
  //     box :document.getElementById('box'),
  //     boxPos : 10,
  //     boxLastPos : 10,
  //     boxVelocity : 0.08,
  //     fpsDisplay : document.getElementById('fpsDisplay'),
  //     limit : 300,
  //     lastFrameTimeMs : 0,
  //     maxFPS : 100,
  //     delta : 0,
  //     timestep : 1000 / 100,
  //     fps : 60,
  //     framesThisSecond : 0,
  //     lastFpsUpdate : 0,
  //     running : false,
  //     started : false,
  //     frameID : 0,
  //     rows: 50,
  //     columns: 50,
  //     limitRowBottom: 40,
  //     limitColumnLeft: 0,
  //     limitColumnRight: 10,
  //     keys: arrows1,
  //     width: 650,
  //     height: 650,
  //     offsetRow: 0,
  //     offsetColumn: 50,
  //     initialRegionRow: 1,
  //     initialRegionColumn: 5,
  //     playerNumber: 0,
  // });

  // var game2 = new Game({
  //     box :document.getElementById('box'),
  //     boxPos : 10,
  //     boxLastPos : 10,
  //     boxVelocity : 0.08,
  //     fpsDisplay : document.getElementById('fpsDisplay'),
  //     limit : 300,
  //     lastFrameTimeMs : 0,
  //     maxFPS : 100,
  //     delta : 0,
  //     timestep : 1000 / 100,
  //     fps : 60,
  //     framesThisSecond : 0,
  //     lastFpsUpdate : 0,
  //     running : false,
  //     started : false,
  //     frameID : 0,
  //     rows: 50,
  //     columns: 50,
  //     limitRowBottom: 40,
  //     limitColumnLeft: 0,
  //     limitColumnRight: 10,
  //     keys: arrows2,
  //     width: 650,
  //     height: 650,
  //     offsetRow: 0,
  //     offsetColumn: 50,
  //     initialRegionRow: 1,
  //     initialRegionColumn: 5,
  //     playerNumber: 1,
  // });

  // game1.startGame();
  // game2.startGame();
  // console.log("game.regions from document jquery",game2.regions);
});


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

  $('.container').append($('<div>').addClass('ingame-layout').attr('id','ingame-layout'));


  $('.container').append($('<div>').addClass('menu-layout-restart').attr('id','menu-layout-restart'));
  $('.menu-layout-restart').append($('<div>').addClass('restart-game'));
  $('.restart-game').append($('<button>').addClass('btn').attr('id','restart-button').append($('<h3>')));
  $('#restart-button h3').html('RESTART GAME');
  $('.menu-layout-restart').append($('<div>').addClass('go-back-menu-start'));
  $('.go-back-menu-start').append($('<button>').addClass('btn').attr('id','go-back-menu-start-button').append($('<h3>')));
  $('#go-back-menu-start-button h3').html('MAIN PAGE');

  this.menuLayoutStartSelector = $('#menu-layout-start');
  this.playerLayoutSelector = $('#ingame-layout');
  this.menuLayoutRestartSelector = $('#menu-layout-restart');
  this.startListener = $('#start-button');
  this.restartListener = $('#restart-button');
  this.goBackMenuStart = $('#go-back-menu-start-button');

  this.addListenerToStart();
  this.addListenerToRestart();
  this.addListenerToRGoBackmenuStart();

  $(this.menuLayoutRestartSelector).hide();
  $(this.playerLayoutSelector).hide();
};


Menu.prototype.addListenerToRGoBackmenuStart = function()
{
  $(this.goBackMenuStart).on('click', function(){
    $(this.menuLayoutStartSelector).show();//('menu-layout');
    $(this.menuLayoutRestartSelector).hide();
    $(this.playerLayoutSelector).hide();
  }.bind(this));
};

Menu.prototype.addListenerToRestart = function()
{
  $(this.restartListener).on('click', function(){

    this.playerOne.restartGame();
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
    }.bind(this), 3000);

  }.bind(this));



};

Menu.prototype.addListenerToStart = function()
{
  $(this.startListener).on('click', function(){

    $(this.menuLayoutStartSelector).hide();//('menu-layout');

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
    }.bind(this), 3000);


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

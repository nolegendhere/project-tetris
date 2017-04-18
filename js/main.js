
function Menu(){

}

Menu.prototype.startApp = function () {
  this.generateMenu();
  this.addListenerToStart();
};

Menu.prototype.generateMenu = function (){
  $('.container').append($('<div>').addClass('menu-layout').attr('id','menu-layout'));
  $('.menu-layout').append($('<div>').addClass('start-game'));
  $('.start-game').append($('<button>').addClass('btn').attr('id','start-button').append($('<h3>')));
  $('#start-button h3').html('START GAME');

  this.menuLayoutSelector = $('#menu-layout');
  this.startListener = $('#start-button');
};

Menu.prototype.addListenerToStart = function()
{
  $(this.startListener).on('click', function(){

    $(this.menuLayoutSelector).hide();//('menu-layout');

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
        limitRowBottom: 40,
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

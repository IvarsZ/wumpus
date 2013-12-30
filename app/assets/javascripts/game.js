Game = {

  // Initialize and start the game.
  start: function() {

    // Init crafty and set background color.
    Crafty.init(544, 306);
    Crafty.background("rgb(200, 250, 250)");

    // Simply start the 'Game' scene to get things going.
    Crafty.scene("Game");
  },

  // Stop and clear the game.
  stop: function() {
    Game.components = Crafty.components();
    Crafty.stop(true);
  },

  params: {

    numberOfRows: 8,
    numberOfColumns: 12
  },

  tile: {
    
    width: 32,
    height: 32
  },

  sideBarWidth: 160,
  topBarHeight: 50
}

function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

Game = {

  // Initialize and start the game.
  start: function() {

    // Start crafty and set a background color so that we can see it's working.
    Crafty.init(400, 400);
    Crafty.background("rgb(200, 250, 250)");
    

    // Simply start the 'Game' scene to get things going.
    Crafty.scene("Game");
  },

  // Stop and clear the game.
  stop: function() {
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

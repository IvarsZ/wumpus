Game = {

  // Initialize and start the game.
  start: function() {

    // Init crafty and set background color.
    Crafty.init(544, 306);
    Crafty.background(Game.colors.background);

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
  topBarHeight: 50,
  
  colors: {
    background: "rgb(20, 20, 20)",
    sideBar: "rgb(60, 60, 60)",
    topBar: "rgb(150, 150, 150)",
    text: "rgb(256, 256, 256)"
  }
}

// CSS
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }

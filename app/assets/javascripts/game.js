Game = {

  // Initialize and start the game.
  start: function() {

    // Init crafty and set background color.
    Crafty.init(544, 306);
    Crafty.background(Game.colors.background);

    Scenes.createGame();
  },

  // Stop and clear the game.
  stop: function() {
    Game.components = Crafty.components();
    Crafty.stop(true);
  },

  params: {

    numberOfRows: 8,
    numberOfColumns: 12,

    toAjaxData: function() {
      return {
        "game" : {
          "number_of_rows" : this.numberOfRows,
          "number_of_columns" : this.numberOfColumns
        }
      };
    }
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
  },

  urls: {
    createGame: "games/create"
  }
}

// CSS
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }

Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);
  Crafty.canvas.init();

  Game.player = Crafty.e("Player")
    .placeAt(2, 3);

  // Create sidebar only once.
  if (Game.sideBar === undefined) {
    Scenes.buildSideBar(height); // Take up the whole screen height wise.
  }
  else {
    Scenes.resizeSideBar(height);
  }

  // Create topBar only once.
  if (Game.topBar === undefined) {
    Scenes.buildTopBar(width - Game.sideBarWidth); // Take up the whole screen width wise, except sidebar.
  }
  else {
    Scenes.resizeTopBar(width - Game.sideBarWidth);
  }
});

Scenes = {

  newGame: function() {

    // Get new params.
    Game.params.numberOfRows = Game.rowsSlider.getValue();
    Game.params.numberOfColumns = Game.columnsSlider.getValue();

    // Reload game.
    Crafty.scene('Game');
  },

  buildSideBar: function(height) {
    
    Game.sideBar = Crafty.e("2D, Canvas, Color, Persist")
      .attr({
        x: 0,
        y: 0,
        w: Game.sideBarWidth,
        h: height 
      })
      .color(Game.colors.sideBar);

    // Sliders.
    var sliderBarOffsetY = 40;
    var sliderPadding = 13;

    Game.rowsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 0, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of rows", Game.params.numberOfRows, 8, 15);

    Game.columnsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of columns", Game.params.numberOfColumns, 5, 15);

    // Buttons.
    var buttonPadding = 3;
    Game.newGameButton = Crafty.e("Button, Persist").button(buttonPadding, 5 * sliderBarOffsetY, Game.sideBarWidth - 2 * buttonPadding - 1, 30, "New Game", Scenes.newGame);
  },

  resizeSideBar: function(height) {
    Game.sideBar.h = height;
  },

  buildTopBar: function(width) {

    Game.topBar = Crafty.e("2D, Canvas, Color, Persist")
      .attr({
        x: Game.sideBarWidth,
        y: 0,
        w: width,
        h: Game.topBarHeight
      })
      .color(Game.colors.topBar);
  },

  resizeTopBar: function(width) {
    Game.topBar.w = width;
  }
}

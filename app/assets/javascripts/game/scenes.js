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
    Game.params.numberOfPits = Game.pitsSlider.getValue();
    Game.params.numberOfBats = Game.batsSlider.getValue();
    Game.params.numberOfArrows = Game.arrowsSlider.getValue();

    // Create new game.
    Scenes.createGame();
  },

  // Connect to server and create the game.
  createGame: function() {
    $.ajax({
      url : Game.urls.createGame,
      type : "POST",
      data : Game.params.toAjaxData(),
      success : function(data) {
        if (data.ok) {
          this.id = data.id;
          Crafty.scene('Game');
          Scenes.updateNotifications(data);
        }
        else {
          alert("Server error: ", data.error);
        }
      },
      error: function() {
        alert("Couldn't connect to server refresh page to try again");
      }
    });
  },

  updateNotifications: function(data) {
    Game.pitsIcon.visible = data.nearby_pit;
    Game.wumpusIcon.visible = data.nearby_wumpus;
    Game.treasureIcon.visible = data.nearby_treasure;
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
      .slider(sliderPadding, sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of columns", Game.params.numberOfColumns, 8, 15);

    Game.pitsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 2 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of pits", Game.params.numberOfPits, 0, 16);

    Game.batsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 3 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of bats", Game.params.numberOfBats, 0, 16);

    Game.arrowsSlider = Crafty.e("Slider, Persist")
      .slider(sliderPadding, 4 * sliderBarOffsetY, Game.sideBarWidth - 2 * sliderPadding - 3, 5, "No. of arrows", Game.params.numberOfArrows, 0, 16);

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

    // Notification icons.
    var iconPadding = 9;
    var iconOffsetX = 50;
    Game.pitsIcon = Crafty.e("2D, Canvas, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height
      });
    Game.pitsIcon.visible = false;

    Game.wumpusIcon = Crafty.e("2D, Canvas, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding + iconOffsetX,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height
      });
    Game.wumpusIcon.visible = false;

    Game.treasureIcon = Crafty.e("2D, Canvas, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding + 2 * iconOffsetX,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height
      });
    Game.treasureIcon.visible = false;
  },

  resizeTopBar: function(width) {
    Game.topBar.w = width;
  }
}

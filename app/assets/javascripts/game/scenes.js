Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);

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

  Game.treasureFound = false;
  Game.is_over = false;
  delete Scenes.textLabel;
});

Scenes = {

  newGame: function() {

    // Get new params.
    Game.params.numberOfRows = Game.rowsSlider.getValue();
    Game.params.numberOfColumns = Game.columnsSlider.getValue();
    Game.params.numberOfPits = Game.pitsSlider.getValue();
    Game.params.numberOfBats = Game.batsSlider.getValue();
    Game.params.numberOfArrows = Game.arrowsSlider.getValue();

    // Create new game and load it.
    Scenes.createGame();
  },

  // Connect to server and create the game.
  createGame: function() {
    $.ajax({
      url : Game.urls.createGame,
      type : "POST",
      data : Game.params.toAjaxData(),
      success : function(response) {
                
        Crafty.scene("Game");
        Game.id = response.id;
        if (Game.player === undefined) {
          Game.player = Crafty.e("Player, Persist");
        }
        Game.player.placeAt(response.row, response.column);
        Scenes.updateNotifications(response.notifications);
      },
      error: function(e) {

        // TODO pretty output
        alert(JSON.stringify(e.responseJSON.errors));
      }
    });
  },

  updateNotifications: function(data) {
    Game.pitsIcon.visible = data.nearby_pits;
    Game.wumpusIcon.visible = data.nearby_wumpus;
    Game.treasureIcon.visible = data.nearby_treasure || Game.treasureFound;

    if (data.on_wumpus) {
      Scenes.showText("Game over: wumpus ate you");
      Game.is_over = true;
    }
    if (data.on_pit) {
      Scenes.showText("Game over: you fell into a dark pit");
      Game.is_over = true;
    }
    if (data.treasure_found) {
      // TODO Scenes.showText("You found the treasure");
      Game.treasureFound = true;
      Game.treasureIcon.visible = true;
      Game.treasureIcon.visible;
      Game.treasureIcon.color("rgb(24, 67, 100)");
    }
    if (data.on_door) {
      if (data.game_won) {
        Scenes.showText("Game won: you found the treasure and the door");
        Game.is_over = true;
      }
      else {
        // TODO Scenes.showText("Found door");
        this.drawDoor(Game.player.getRow(), Game.player.getColumn());
      }
    }
  },

  showText: function(text) {

    if (this.textLabel === undefined) {
      this.textLabel = Crafty.e("2D, DOM, Text")
        .attr({
          x: Game.sideBarWidth + 5,
          y: Game.topBarHeight - 18,
          z: 1,
          h: 18,
          w: Game.tile.width * Game.params.numberOfColumns - 5})
        .textColor("#FFFFFF")
        .textFont({ family: "Arial", size: "15px"});
    }
    
    this.textLabel.text(text);
  },

  drawDoor: function(row, column) {
    var door = Crafty.e("Actor, Color")
      .placeAt(row, column)
      .color("rgb(50, 100, 200)");
    door.z = 100;
  },

  buildSideBar: function(height) {
    
    Game.sideBar = Crafty.e("2D, DOM, Color, Persist")
      .attr({
        x: 0,
        y: 0,
        w: Game.sideBarWidth,
        h: height,
        z: Game.order.menuElements
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

    Game.topBar = Crafty.e("2D, DOM, Color, Persist")
      .attr({
        x: Game.sideBarWidth,
        y: 0,
        w: width,
        h: Game.topBarHeight,
        z: Game.order.menuElements
      })
      .color(Game.colors.topBar);

    // Notification icons.
    var iconPadding = 5;
    var iconOffsetX = 50;
    Game.pitsIcon = Crafty.e("2D, DOM, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height,
        z: Game.order.menuElements
      });
    Game.pitsIcon.visible = false;

    Game.wumpusIcon = Crafty.e("2D, DOM, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding + iconOffsetX,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height,
        z: Game.order.menuElements
      });
    Game.wumpusIcon.visible = false;

    Game.treasureIcon = Crafty.e("2D, DOM, Color, Persist")
      .color("rgb(120, 75, 40)")
      .attr({
        x: Game.sideBarWidth + iconPadding + 2 * iconOffsetX,
        y: iconPadding,
        w: Game.tile.width,
        h: Game.tile.height,
        z: Game.order.menuElements
      });
    Game.treasureIcon.visible = false;
  },

  resizeTopBar: function(width) {
    Game.topBar.w = width;
  }
}

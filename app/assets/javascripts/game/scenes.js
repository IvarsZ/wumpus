Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);

  // Resize canvas.
  $(Crafty.canvas._canvas).attr({width: width});
  $(Crafty.canvas._canvas).attr({height: height});

  // Create sidebar only once.
  if (Game.sideBar === undefined) {
    Scenes.buildSideBar(height); // Take up the whole screen height wise.
  }
  else {
    Scenes.resizeSideBar(height);

    // HACK - Make the persist entities from previous scenes (menu elements) to be on top.
    $(Crafty.stage.elem).children().last().css({"z-index": "9"});
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
  Game.treasureIcon.close();
  delete Scenes.textLabel;

  Game.is_visited = new Array(Game.params.numberOfRows);
  for (var i = 0; i < Game.params.numberOfRows; i++) {
    Game.is_visited[i] = new Array(Game.params.numberOfColumns);
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
        Game.player = Crafty.e("Player");
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
      Game.treasureIcon.open();
    }
    if (data.on_door) {
      if (data.game_won) {
        Scenes.showText("Game won: you found the treasure and the door");
        Game.is_over = true;
      }
      this.drawDoor(Game.player.getRow(), Game.player.getColumn());
    }

    if (!Game.is_visited[Game.player.getRow()][Game.player.getColumn()]) {
      Game.is_visited[Game.player.getRow()][Game.player.getColumn()] = true;
      Crafty.e("Tile").placeAt(Game.player.getRow(), Game.player.getColumn());
    }
  },

  showText: function(text) {

    if (this.textLabel === undefined) {
      this.textLabel = Crafty.e("2D, DOM, Text")
        .attr({
          x: Game.sideBarWidth + 5,
          y: Game.topBarHeight - 18,
          z: Game.order.menuElements,
          h: 18,
          w: Game.tile.width * Game.params.numberOfColumns - 5})
        .textColor("#FFFFFF")
        .textFont({ family: "Arial", size: "15px"});
    }
    
    this.textLabel.text(text);
  },

  drawDoor: function(row, column) {
    var door = Crafty.e("Door")
      .placeAt(row, column)
      .attr({z: Game.order.door});
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
    Game.pitsIcon = Crafty.e("PitIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding,
        y: iconPadding,
        z: Game.order.menuElements
      });
    Game.pitsIcon.visible = false;

    Game.wumpusIcon = Crafty.e("WumpusIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding + iconOffsetX,
        y: iconPadding,
        z: Game.order.menuElements
      });
    Game.wumpusIcon.visible = false;

    Game.treasureIcon = Crafty.e("ChestIcon, Persist")
      .attr({
        x: Game.sideBarWidth + iconPadding + 2 * iconOffsetX,
        y: iconPadding,
        z: Game.order.menuElements
      });
    Game.treasureIcon.visible = false;
  },

  resizeTopBar: function(width) {
    Game.topBar.w = width;
  }
}

// Loading scene that loads binary assets such as images and audio files.
Crafty.scene('Loading', function(){

  // Load our image and audio assets.
  Crafty.load(['assets/32x32_tiles.gif',
               'assets/adventurer.png'
               ], function() {
    // Once the assets are loaded...

    // Define the individual tile sprites.
    Crafty.sprite(32, 'assets/32x32_tiles.gif', {
      spr_tile_1:       [0, 0],
      spr_tile_2:       [1, 0],
      spr_tile_3:       [2, 0],
      spr_door:         [0, 1],
      spr_open_chest:   [1, 1],
      spr_closed_chest: [2, 1],
      spr_pit:          [0, 2],
      spr_wumpus:       [1, 2],
      spr_bat:          [2, 2]
    });

    // Define the PC's sprite to be the first sprite in the third row of the animation sprite map.
    Crafty.sprite(32, 'assets/adventurer.png', {
      spr_player: [0, 2],
    }, 0, 0);

    // Now that our sprites are ready to draw start the game.
    Scenes.createGame();
  })
});

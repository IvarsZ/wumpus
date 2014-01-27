Crafty.scene("Game", function() {

  GameModel.init();
  AI.init();
  UI.init();
});

// Loading scene that loads binary assets such as images and audio files.
Crafty.scene("Loading", function(){

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

    // Define the PC's sprite to be the second sprite in the third row of the animation sprite map.
    Crafty.sprite(32, 'assets/adventurer.png', {
      spr_player: [1, 2]
    }, 0, 0);

    // Now that our sprites are ready to draw start the game.
    UI.init(); // TODO have a special init for this case.
    NewGameService.execute();
  })
});
Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);
  Crafty.canvas.init();

  Scenes.buildSideBar(height); // Take up the whole screen height wise.
  Scenes.buildTopBar(width - Game.sideBarWidth); // Take up the whole screen width wise, except sidebar.

  Game.player = Crafty.e("Player")
    .placeAt(2, 3);
});

Scenes = {

  buildSideBar: function(height) {
    
    Game.sideBar = Crafty.e('2D, Canvas, Color')
      .attr({
        x: 0,
        y: 0,
        w: Game.sideBarWidth,
        h: height 
      })
      .color(Game.colors.sideBar);
  },

  buildTopBar: function(width) {

    Game.topBar = Crafty.e('2D, Canvas, Color')
      .attr({
        x: Game.sideBarWidth,
        y: 0,
        w: width,
        h: Game.topBarHeight
      })
      .color(Game.colors.topBar);
  }
}

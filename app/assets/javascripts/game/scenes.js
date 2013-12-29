Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);
  Crafty.canvas.init();

  var player = Crafty.e("Player")
    .placeAt(2, 3);
});

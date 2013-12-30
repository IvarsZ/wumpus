Crafty.scene("Game", function() {

  var width = Game.tile.width * Game.params.numberOfColumns + Game.sideBarWidth;
  var height = Game.tile.height * Game.params.numberOfRows + Game.topBarHeight;

  Crafty.init(width, height);
  Crafty.background("rgb(200, 250, 250)");
  Crafty.canvas.init();

  Game.player = Crafty.e("Player")
    .placeAt(2, 3);

  //Game.player.trigger("KeyDown", 65);
});

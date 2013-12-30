describe("Game", function() {

  beforeEach(function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      Game.id = 1;
      Crafty.scene('Game');
    });

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;

    Game.params.numberOfRows = 8;
    Game.params.numberOfColumns = 12;  

    Game.start();
  });

  it("has correct width and height", function() {
    expect($(Crafty.stage.elem).width()).toEqual(544);
    expect($(Crafty.stage.elem).height()).toEqual(306);
  });
});

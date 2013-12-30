describe("Game", function() {

  beforeEach(function() {

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

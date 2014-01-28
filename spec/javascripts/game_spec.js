describe("Game", function() {

  beforeEach(function() {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;

    Helper.newGame();
  });

  it("has correct width and height", function() {
    expect($(Crafty.stage.elem).width()).toEqual(544);
    expect($(Crafty.stage.elem).height()).toEqual(306);
  });

  describe("on new game", function() {

    beforeEach(function() {

      // Change slider values.
      UI.rowsSlider.setValue(10);
      UI.columnsSlider.setValue(10);

      // Start new game.
      UI.newGameButton.click();
    });

    it("is resized", function() {
      expect($(Crafty.stage.elem).width()).toEqual(480);
      expect($(Crafty.stage.elem).height()).toEqual(370);
    });
  });
});
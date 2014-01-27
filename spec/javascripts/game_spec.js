describe("GameModel", function() {

  beforeEach(function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {     
      Crafty.scene('GameModel');
      GameModel.id = 1;
      GameModel.player = Crafty.e("Player");
      GameModel.player.placeAt(1, 1);
    });

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;

    Service.createGame();
  });

  it("has correct width and height", function() {
    expect($(Crafty.stage.elem).width()).toEqual(544);
    expect($(Crafty.stage.elem).height()).toEqual(306);
  });

  describe("on new game", function() {

    beforeEach(function() {

      // Change slider values.
      GameModel.rowsSlider.setValue(10);
      GameModel.columnsSlider.setValue(10);

      // Start new game.
      GameModel.newGameButton.click();
    });

    it("is resized", function() {
      expect($(Crafty.stage.elem).width()).toEqual(480);
      expect($(Crafty.stage.elem).height()).toEqual(370);
    });
  });
});

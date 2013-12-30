describe("Menu", function() {

  beforeEach(function() {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;

    Game.params.numberOfRows = 8;
    Game.params.numberOfColumns = 12;   

    Game.start();
  });

  it("Side bar has correct width and height", function() {
    expect(Game.sideBar.w).toEqual(160);
    expect(Game.sideBar.h).toEqual(306);
  });

  it("Side bar is in correct position", function() {
    expect(Game.sideBar.x).toEqual(0);
    expect(Game.sideBar.y).toEqual(0);
  });

  it("Top bar has correct width and height", function() {
    expect(Game.topBar.w).toEqual(384);
    expect(Game.topBar.h).toEqual(50);
  });

  it("Top bar is in correct position", function() {
    expect(Game.topBar.x).toEqual(160);
    expect(Game.topBar.y).toEqual(0);
  });

  describe("on new game", function() {

    var oldSideBar;
    var oldTopBar;
    var oldRowsSlider;
    var oldColumnSlider;
    var oldNewGameButton;

    beforeEach(function() {

      // Change slider values.
      Game.rowsSlider.setValue(10);
      Game.columnsSlider.setValue(10);

      // Keep old bars, sliders and buttons.
      oldSideBar = Game.sideBar;
      oldTopBar = Game.topBar;
      oldRowsSlider = Game.rowsSlider;
      oldColumnsSlider = Game.columnsSlider;
      oldNewGameButton = Game.newGameButton;

      // Start new game.
      Game.newGameButton.click();
    });

    it("has correct width and height", function() {
      expect($(Crafty.stage.elem).width()).toEqual(480);
      expect($(Crafty.stage.elem).height()).toEqual(370);
    });

    it("side bar is resized", function() {
      expect(Game.sideBar.w).toEqual(160);
      expect(Game.sideBar.h).toEqual(370);
    });

    it("top bar is resized", function() {
      expect(Game.topBar.w).toEqual(320);
      expect(Game.topBar.h).toEqual(50);
    });

    it("bars, sliders and buttons are persistent", function() {
      expect(Game.sideBar).toEqual(oldSideBar);
      expect(Game.topBar).toEqual(oldTopBar);
      expect(Game.rowsSlider).toEqual(oldRowsSlider);
      expect(Game.columnsSlider).toEqual(oldColumnsSlider);
      expect(Game.newGameButton).toEqual(oldNewGameButton);
    });
  });
});

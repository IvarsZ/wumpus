describe("Menu", function() {

  beforeEach(function() {

    // Mock ajax requests to server.
    spyOn($, "ajax").and.callFake(function(options) {
      Crafty.scene('Game');
    });

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;

    Game.params.numberOfRows = 8;
    Game.params.numberOfColumns = 12;
    Game.params.numberOfPits = 6;
    Game.params.numberOfBats = 4;
    Game.params.numberOfArrrows = 2;

    Game.start();
  });

  it("side bar has correct width and height", function() {
    expect(Game.sideBar.w).toEqual(160);
    expect(Game.sideBar.h).toEqual(306);
  });

  it("side bar is in correct position", function() {
    expect(Game.sideBar.x).toEqual(0);
    expect(Game.sideBar.y).toEqual(0);
  });

  it("top bar has correct width and height", function() {
    expect(Game.topBar.w).toEqual(384);
    expect(Game.topBar.h).toEqual(50);
  });

  it("top bar is in correct position", function() {
    expect(Game.topBar.x).toEqual(160);
    expect(Game.topBar.y).toEqual(0);
  });

  it("has rows slider with number of rows param", function() {
    expect(Game.rowsSlider.getValue()).toEqual(8);
  });

  it("has columns slider with number of columns param", function() {
    expect(Game.columnsSlider.getValue()).toEqual(12);
  });

  it("has pits slider with number of pits param", function() {
    expect(Game.pitsSlider.getValue()).toEqual(6);
  });

  it("has bats slider with number of bats param", function() {
    expect(Game.batsSlider.getValue()).toEqual(4);
  });

  it("has arrows slider with number of arrows param", function() {
    expect(Game.arrowsSlider.getValue()).toEqual(2);
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

describe("Side Bar", function() {

  beforeEach(function() {

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;
    GameModel.params.pitsCount = 6;
    GameModel.params.batsCount = 4;
    GameModel.params.numberOfArrrows = 2;

    // Reset sidebar.
    UI.sideBar = undefined;
  
    Helper.newGame();
  });

  it("has correct width and height", function() {
    expect(UI.sideBar.w).toEqual(160);
    expect(UI.sideBar.h).toEqual(306);
  });

  it("is in correct position", function() {
    expect(UI.sideBar.x).toEqual(0);
    expect(UI.sideBar.y).toEqual(0);
  });

  it("has rows slider with number of rows param", function() {
    expect(UI.rowsSlider.getValue()).toEqual(8);
  });

  it("has columns slider with number of columns param", function() {
    expect(UI.columnsSlider.getValue()).toEqual(12);
  });

  it("has pits slider with number of pits param", function() {
    expect(UI.pitsSlider.getValue()).toEqual(6);
  });

  it("has bats slider with number of bats param", function() {
    expect(UI.batsSlider.getValue()).toEqual(4);
  });

  it("has arrows slider with number of arrows param", function() {
    expect(UI.arrowsSlider.getValue()).toEqual(2);
  });

  describe("on new game", function() {

    var oldSideBar;
    var oldRowsSlider;
    var oldColumnsSlider;
    var oldPitsSlider;
    var oldBatsSlider;
    var oldArrowsSlider;
    var oldNewGameButton;

    beforeEach(function() {

      // Change slider values.
      UI.rowsSlider.setValue(10);
      UI.columnsSlider.setValue(10);

      // Keep old bars, sliders and buttons.
      oldSideBar = UI.sideBar;
      oldRowsSlider = UI.rowsSlider;
      oldColumnsSlider = UI.columnsSlider;
      oldPitsSlider = UI.pitsSlider;
      oldBatsSlider = UI.batsSlider;
      oldArrowsSlider = UI.arrowsSlider;
      oldNewGameButton = UI.newGameButton;

      // Start new game.
      UI.newGameButton.click();
    });

    it("is resized", function() {
      expect(UI.sideBar.w).toEqual(160);
      expect(UI.sideBar.h).toEqual(370);
    });

    it("is persistent and its sliders and buttons are as well", function() {
      expect(UI.sideBar).toEqual(oldSideBar);
      expect(UI.rowsSlider).toEqual(oldRowsSlider);
      expect(UI.columnsSlider).toEqual(oldColumnsSlider);
      expect(UI.pitsSlider).toEqual(oldPitsSlider);
      expect(UI.batsSlider).toEqual(oldBatsSlider);
      expect(UI.arrowsSlider).toEqual(oldArrowsSlider);
      expect(UI.newGameButton).toEqual(oldNewGameButton);
    });
  });
});

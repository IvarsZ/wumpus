describe("Side Bar", function() {

  beforeEach(function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      GameModel.id = 1;
      Crafty.scene('GameModel');
    });

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
    GameModel.sideBar = undefined;
  
    Service.createGame();
  });

  it("has correct width and height", function() {
    expect(GameModel.sideBar.w).toEqual(160);
    expect(GameModel.sideBar.h).toEqual(306);
  });

  it("is in correct position", function() {
    expect(GameModel.sideBar.x).toEqual(0);
    expect(GameModel.sideBar.y).toEqual(0);
  });

  it("has rows slider with number of rows param", function() {
    expect(GameModel.rowsSlider.getValue()).toEqual(8);
  });

  it("has columns slider with number of columns param", function() {
    expect(GameModel.columnsSlider.getValue()).toEqual(12);
  });

  it("has pits slider with number of pits param", function() {
    expect(GameModel.pitsSlider.getValue()).toEqual(6);
  });

  it("has bats slider with number of bats param", function() {
    expect(GameModel.batsSlider.getValue()).toEqual(4);
  });

  it("has arrows slider with number of arrows param", function() {
    expect(GameModel.arrowsSlider.getValue()).toEqual(2);
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
      GameModel.rowsSlider.setValue(10);
      GameModel.columnsSlider.setValue(10);

      // Keep old bars, sliders and buttons.
      oldSideBar = GameModel.sideBar;
      oldRowsSlider = GameModel.rowsSlider;
      oldColumnsSlider = GameModel.columnsSlider;
      oldPitsSlider = GameModel.pitsSlider;
      oldBatsSlider = GameModel.batsSlider;
      oldArrowsSlider = GameModel.arrowsSlider;
      oldNewGameButton = GameModel.newGameButton;

      // Start new game.
      GameModel.newGameButton.click();
    });

    it("is resized", function() {
      expect(GameModel.sideBar.w).toEqual(160);
      expect(GameModel.sideBar.h).toEqual(370);
    });

    it("is persistent and its sliders and buttons are as well", function() {
      expect(GameModel.sideBar).toEqual(oldSideBar);
      expect(GameModel.rowsSlider).toEqual(oldRowsSlider);
      expect(GameModel.columnsSlider).toEqual(oldColumnsSlider);
      expect(GameModel.pitsSlider).toEqual(oldPitsSlider);
      expect(GameModel.batsSlider).toEqual(oldBatsSlider);
      expect(GameModel.arrowsSlider).toEqual(oldArrowsSlider);
      expect(GameModel.newGameButton).toEqual(oldNewGameButton);
    });
  });
});

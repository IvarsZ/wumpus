describe("Side Bar", function() {

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
    Game.params.numberOfPits = 6;
    Game.params.numberOfBats = 4;
    Game.params.numberOfArrrows = 2;

    // Reset sidebar.
    Game.sideBar = undefined;
  
    Scenes.createGame();
  });

  it("has correct width and height", function() {
    expect(Game.sideBar.w).toEqual(160);
    expect(Game.sideBar.h).toEqual(306);
  });

  it("is in correct position", function() {
    expect(Game.sideBar.x).toEqual(0);
    expect(Game.sideBar.y).toEqual(0);
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
    var oldRowsSlider;
    var oldColumnsSlider;
    var oldPitsSlider;
    var oldBatsSlider;
    var oldArrowsSlider;
    var oldNewGameButton;

    beforeEach(function() {

      // Change slider values.
      Game.rowsSlider.setValue(10);
      Game.columnsSlider.setValue(10);

      // Keep old bars, sliders and buttons.
      oldSideBar = Game.sideBar;
      oldRowsSlider = Game.rowsSlider;
      oldColumnsSlider = Game.columnsSlider;
      oldPitsSlider = Game.pitsSlider;
      oldBatsSlider = Game.batsSlider;
      oldArrowsSlider = Game.arrowsSlider;
      oldNewGameButton = Game.newGameButton;

      // Start new game.
      Game.newGameButton.click();
    });

    it("is resized", function() {
      expect(Game.sideBar.w).toEqual(160);
      expect(Game.sideBar.h).toEqual(370);
    });

    it("is persistent and its sliders and buttons are as well", function() {
      expect(Game.sideBar).toEqual(oldSideBar);
      expect(Game.rowsSlider).toEqual(oldRowsSlider);
      expect(Game.columnsSlider).toEqual(oldColumnsSlider);
      expect(Game.pitsSlider).toEqual(oldPitsSlider);
      expect(Game.batsSlider).toEqual(oldBatsSlider);
      expect(Game.arrowsSlider).toEqual(oldArrowsSlider);
      expect(Game.newGameButton).toEqual(oldNewGameButton);
    });
  });
});

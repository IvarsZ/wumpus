describe("Grid component", function() {

  var gridEntity;

  beforeEach(function() {

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    Helper.newGame();
    gridEntity = Crafty.e("Grid");
  });

  it("can be placed at row 0 and column 0", function() {
    gridEntity.placeAt(0, 0);
    expect(gridEntity.x).toEqual(160);
    expect(gridEntity.y).toEqual(50);
  });

  it("Can be placed at row 1 and column 3", function() {
    gridEntity.placeAt(1, 3);
    expect(gridEntity.x).toEqual(256);
    expect(gridEntity.y).toEqual(82);
  });

  describe("when game parameters change", function() {
   
    beforeEach(function() {

      GameModel.tile.width = 40;
      GameModel.tile.height = 50;
      GameModel.sideBarWidth = 100;
      GameModel.topBarHeight = 20;
    });
    
    it("can be placed at row 0 and column 0", function() {
      gridEntity.placeAt(0, 0);
      expect(gridEntity.x).toEqual(100);
      expect(gridEntity.y).toEqual(20);
    });

    it("can be placed at row 1 and column 3", function() {
      gridEntity.placeAt(1, 3);
      expect(gridEntity.x).toEqual(220);
      expect(gridEntity.y).toEqual(70);
    });
  });
});

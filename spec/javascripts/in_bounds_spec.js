describe("In Bounds", function() {

  var inBoundsEntity;

  beforeEach(function() {

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;

    Helper.newGame();
    inBoundsEntity = Crafty.e("Grid", "InBounds");
  });

  it("when going outside at the top of the grid appears at the bottom", function() {

    inBoundsEntity.placeAt(-1, 2);
    inBoundsEntity.trigger("Moved");

    expect(inBoundsEntity.getRow()).toEqual(7);
    expect(inBoundsEntity.getColumn()).toEqual(2);
  });

  it("when going outside at the bottom of the grid appears at the top", function() {

    inBoundsEntity.placeAt(8, 2);
    inBoundsEntity.trigger("Moved");

    expect(inBoundsEntity.getRow()).toEqual(0);
    expect(inBoundsEntity.getColumn()).toEqual(2);
  });

  it("when going outside on the left of the grid appears on the right", function() {

    inBoundsEntity.placeAt(2, -1);
    inBoundsEntity.trigger("Moved");

    expect(inBoundsEntity.getRow()).toEqual(2);
    expect(inBoundsEntity.getColumn()).toEqual(11);
  });

  it("when going outside on the right of the grid appears on the left", function() {

    inBoundsEntity.placeAt(2, 12);
    inBoundsEntity.trigger("Moved");

    expect(inBoundsEntity.getRow()).toEqual(2);
    expect(inBoundsEntity.getColumn()).toEqual(0);
  });

  it("doesn't check for bounds if moved isn't triggered", function() {
    
    inBoundsEntity.placeAt(-1, -1);

    expect(inBoundsEntity.getRow()).toEqual(-1);
    expect(inBoundsEntity.getColumn()).toEqual(-1);
  });
});

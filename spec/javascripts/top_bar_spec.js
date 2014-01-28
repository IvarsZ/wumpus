describe("Top Bar", function() {

  beforeEach(function() {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;
    GameModel.params.pitsCount = 6;
    GameModel.params.batsCount = 4;
    GameModel.params.numberOfArrrows = 2;

    Helper.newGame();
  });

  it("has correct width and height", function() {
    expect(UI.topBar.w).toEqual(384);
    expect(UI.topBar.h).toEqual(50);
  });

  it("is in correct position", function() {
    expect(UI.topBar.x).toEqual(160);
    expect(UI.topBar.y).toEqual(0);
  });

  it("has by default invisible nearby pits icon", function() {
    expect(UI.pitsIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby wumpus icon", function() {
    expect(UI.wumpusIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby treasure icon", function() {
    expect(UI.treasureIcon.visible).toEqual(false);
  });

  describe("with response pit notification", function() {

    beforeEach(Helper.newGameWithNotifications({
      "nearby_pits" : true
    }));
    
    it("makes pit icon visible", function() {
      expect(UI.pitsIcon.visible).toEqual(true);
    });
  });

  describe("with response wumpus notification", function() {

    beforeEach(Helper.newGameWithNotifications({
      "nearby_wumpus" : true
    }));
    
    it("makes wumpus icon visible", function() {
      expect(UI.wumpusIcon.visible).toEqual(true);
    });
  });

  describe("with response treasure notification", function() {

    beforeEach(Helper.newGameWithNotifications({
      "nearby_treasure" : true
    }));
    
    it("makes treasure icon visible", function() {
      expect(UI.treasureIcon.visible).toEqual(true);
    });
  });

  describe("on new game", function() {

    var oldTopBar;
    var oldPitsIcon;
    var oldWumpusIcon;
    var oldTreasureIcon;

    beforeEach(function() {

      // Change slider values.
      UI.rowsSlider.setValue(10);
      UI.columnsSlider.setValue(10);

      // Keep old bars and icons.
      oldTopBar = UI.topBar;
      oldPitsIcon = UI.pitsIcon;
      oldWumpusIcon = UI.wumpusIcon;
      oldTreasureIcon = UI.treasureIcon;

      // Start new game.
      UI.newGameButton.click();
    });

    it("is resized", function() {
      expect(UI.topBar.w).toEqual(320);
      expect(UI.topBar.h).toEqual(50);
    });

    it("is persistent and its notification icons are as well", function() {
      expect(UI.topBar).toEqual(oldTopBar);
      expect(UI.pitsIcon).toEqual(oldPitsIcon);
      expect(UI.wumpusIcon).toEqual(oldWumpusIcon);
      expect(UI.treasureIcon).toEqual(oldTreasureIcon);
    });

    describe("with response pit notification", function() {

      beforeEach(Helper.newGameWithNotifications({
        "nearby_pits" : true
      }));
      
      it("makes pit icon visible", function() {
        expect(UI.pitsIcon.visible).toEqual(true);
      });
    });

    describe("with response wumpus notification", function() {

      beforeEach(Helper.newGameWithNotifications({
        "nearby_wumpus" : true
      }));
      
      it("makes wumpus icon visible", function() {
        expect(UI.wumpusIcon.visible).toEqual(true);
      });
    });

    describe("with response treasure notification", function() {

      beforeEach(Helper.newGameWithNotifications({
        "nearby_treasure" : true
      }));
      
      it("makes treasure icon visible", function() {
        expect(UI.treasureIcon.visible).toEqual(true);
      });
    });
  });
});

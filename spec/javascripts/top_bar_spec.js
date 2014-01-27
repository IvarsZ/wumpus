describe("Top Bar", function() {

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

    Service.createGame();
  });

  it("has correct width and height", function() {
    expect(GameModel.topBar.w).toEqual(384);
    expect(GameModel.topBar.h).toEqual(50);
  });

  it("is in correct position", function() {
    expect(GameModel.topBar.x).toEqual(160);
    expect(GameModel.topBar.y).toEqual(0);
  });

  it("has by default invisible nearby pits icon", function() {
    expect(GameModel.pitsIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby wumpus icon", function() {
    expect(GameModel.wumpusIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby treasure icon", function() {
    expect(GameModel.treasureIcon.visible).toEqual(false);
  });

  describe("with response pit notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        GameModel.id = 1;
        data = {
          "nearby_pits" : true
        }

        Crafty.scene('GameModel');
        Service.update(data);
      });

      Service.createGame();
    });
    
    it("makes pit icon visible", function() {
      expect(GameModel.pitsIcon.visible).toEqual(true);
    });
  });

  describe("with response wumpus notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        GameModel.id = 1;
        data = {
          "nearby_wumpus" : true
        }

        Crafty.scene('GameModel');
        Service.update(data);
      });

      Service.createGame();
    });
    
    it("makes wumpus icon visible", function() {
      expect(GameModel.wumpusIcon.visible).toEqual(true);
    });
  });

  describe("with response treasure notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        GameModel.id = 1;
        data = {
          "nearby_treasure" : true
        }

        Crafty.scene('GameModel');
        Service.update(data);
      });

      Service.createGame();
    });
    
    it("makes treasure icon visible", function() {
      expect(GameModel.treasureIcon.visible).toEqual(true);
    });
  });

  describe("on new game", function() {

    var oldTopBar;
    var oldPitsIcon;
    var oldWumpusIcon;
    var oldTreasureIcon;

    beforeEach(function() {

      // Change slider values.
      GameModel.rowsSlider.setValue(10);
      GameModel.columnsSlider.setValue(10);

      // Keep old bars and icons.
      oldTopBar = GameModel.topBar;
      oldPitsIcon = GameModel.pitsIcon;
      oldWumpusIcon = GameModel.wumpusIcon;
      oldTreasureIcon = GameModel.treasureIcon;

      // Start new game.
      GameModel.newGameButton.click();
    });

    it("is resized", function() {
      expect(GameModel.topBar.w).toEqual(320);
      expect(GameModel.topBar.h).toEqual(50);
    });

    it("is persistent and its notification icons are as well", function() {
      expect(GameModel.topBar).toEqual(oldTopBar);
      expect(GameModel.pitsIcon).toEqual(oldPitsIcon);
      expect(GameModel.wumpusIcon).toEqual(oldWumpusIcon);
      expect(GameModel.treasureIcon).toEqual(oldTreasureIcon);
    });

    describe("with response pit notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          GameModel.id = 1;
          data = {
            "nearby_pits" : true
          }

          Crafty.scene('GameModel');
          Service.update(data);
        });

        Service.createGame();
      });
      
      it("makes pit icon visible", function() {
        expect(GameModel.pitsIcon.visible).toEqual(true);
      });
    });

    describe("with response wumpus notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          GameModel.id = 1;
          data = {
            "nearby_wumpus" : true
          }

          Crafty.scene('GameModel');
          Service.update(data);
        });

        Service.createGame();
      });
      
      it("makes wumpus icon visible", function() {
        expect(GameModel.wumpusIcon.visible).toEqual(true);
      });
    });

    describe("with response treasure notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          GameModel.id = 1;
          data = {
            "nearby_treasure" : true
          }

          Crafty.scene('GameModel');
          Service.update(data);
        });

        Service.createGame();
      });
      
      it("makes treasure icon visible", function() {
        expect(GameModel.treasureIcon.visible).toEqual(true);
      });
    });
  });
});

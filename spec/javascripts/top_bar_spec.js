describe("Top Bar", function() {

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

    Game.start();
  });

  it("has correct width and height", function() {
    expect(Game.topBar.w).toEqual(384);
    expect(Game.topBar.h).toEqual(50);
  });

  it("is in correct position", function() {
    expect(Game.topBar.x).toEqual(160);
    expect(Game.topBar.y).toEqual(0);
  });

  it("has by default invisible nearby pits icon", function() {
    expect(Game.pitsIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby wumpus icon", function() {
    expect(Game.wumpusIcon.visible).toEqual(false);
  });

  it("has by default invisible nearby treasure icon", function() {
    expect(Game.treasureIcon.visible).toEqual(false);
  });

  describe("with response pit notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        Game.id = 1;
        data = {
          "nearby_pit" : true
        }

        Crafty.scene('Game');          
        Scenes.updateNotifications(data);
      });

      Game.start();
    });
    
    it("makes pit icon visible", function() {
      expect(Game.pitsIcon.visible).toEqual(true);
    });
  });

  describe("with response wumpus notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        Game.id = 1;
        data = {
          "nearby_wumpus" : true
        }

        Crafty.scene('Game');          
        Scenes.updateNotifications(data);
      });

      Game.start();
    });
    
    it("makes wumpus icon visible", function() {
      expect(Game.wumpusIcon.visible).toEqual(true);
    });
  });

  describe("with response treasure notification", function() {

    beforeEach(function() {

      // Mock ajax request to pass notification data.
      $.ajax.and.callFake(function(options) {

        Game.id = 1;
        data = {
          "nearby_treasure" : true
        }

        Crafty.scene('Game');          
        Scenes.updateNotifications(data);
      });

      Game.start();
    });
    
    it("makes treasure icon visible", function() {
      expect(Game.treasureIcon.visible).toEqual(true);
    });
  });

  describe("on new game", function() {

    var oldTopBar;
    var oldPitsIcon;
    var oldWumpusIcon;
    var oldTreasureIcon;

    beforeEach(function() {

      // Change slider values.
      Game.rowsSlider.setValue(10);
      Game.columnsSlider.setValue(10);

      // Keep old bars and icons.
      oldTopBar = Game.topBar;
      oldPitsIcon = Game.pitsIcon;
      oldWumpusIcon = Game.wumpusIcon;
      oldTreasureIcon = Game.treasureIcon;

      // Start new game.
      Game.newGameButton.click();
    });

    it("is resized", function() {
      expect(Game.topBar.w).toEqual(320);
      expect(Game.topBar.h).toEqual(50);
    });

    it("is persistent and its notification icons are as well", function() {
      expect(Game.topBar).toEqual(oldTopBar);
      expect(Game.pitsIcon).toEqual(oldPitsIcon);
      expect(Game.wumpusIcon).toEqual(oldWumpusIcon);
      expect(Game.treasureIcon).toEqual(oldTreasureIcon);
    });

    describe("with response pit notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          Game.id = 1;
          data = {
            "nearby_pit" : true
          }

          Crafty.scene('Game');          
          Scenes.updateNotifications(data);
        });

        Game.start();
      });
      
      it("makes pit icon visible", function() {
        expect(Game.pitsIcon.visible).toEqual(true);
      });
    });

    describe("with response wumpus notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          Game.id = 1;
          data = {
            "nearby_wumpus" : true
          }

          Crafty.scene('Game');          
          Scenes.updateNotifications(data);
        });

        Game.start();
      });
      
      it("makes wumpus icon visible", function() {
        expect(Game.wumpusIcon.visible).toEqual(true);
      });
    });

    describe("with response treasure notification", function() {

      beforeEach(function() {

        // Mock ajax request to pass notification data.
        $.ajax.and.callFake(function(options) {

          Game.id = 1;
          data = {
            "nearby_treasure" : true
          }

          Crafty.scene('Game');          
          Scenes.updateNotifications(data);
        });

        Game.start();
      });
      
      it("makes treasure icon visible", function() {
        expect(Game.treasureIcon.visible).toEqual(true);
      });
    });
  });
});

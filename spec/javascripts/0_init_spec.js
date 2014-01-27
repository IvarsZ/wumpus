describe("Init", function() {

  beforeEach(function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      Crafty.scene('GameModel');
    });  

    GameModel.start();
  });

  it("inits tests to load assets", function() {});
});

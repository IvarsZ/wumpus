describe("Init", function() {

  beforeEach(function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      Crafty.scene('Game');
    });  

    Game.start();
  });

  it("inits tests to load assets", function() {});
});

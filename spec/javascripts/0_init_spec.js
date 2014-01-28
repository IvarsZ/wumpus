describe("Init", function() {

  beforeEach(function() {

    spyOn($, "ajax").and.callFake(function(options) {
      NewGameService.startNewGame({
        id: 1,
        row: 0,
        column: 0,
        notifications: {}
      })
    });

    Game.start();
  });

  it("inits tests to load assets", function() {});
});
describe("Game", function() {

  beforeEach(function() {
    Game.start();
  });

  afterEach(function() {
    Game.stop();
  });

  it("has correct width and height", function() {
    expect($(Crafty.stage.elem).width()).toEqual(544);
    expect($(Crafty.stage.elem).height()).toEqual(306);
  });
});

describe("Menu", function() {

  beforeEach(function() {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;    

    Game.start();
  });

  it("Side bar has correct width and height", function() {
    expect(Game.sideBar.w).toEqual(160);
    expect(Game.sideBar.h).toEqual(306);
  });

  it("Side bar is in correct position", function() {
    expect(Game.sideBar.x).toEqual(0);
    expect(Game.sideBar.y).toEqual(0);
  });

  it("Top bar has correct width and height", function() {
    expect(Game.topBar.w).toEqual(384);
    expect(Game.topBar.h).toEqual(50);
  });

  it("Top bar is in correct position", function() {
    expect(Game.topBar.x).toEqual(160);
    expect(Game.topBar.y).toEqual(0);
  });
});

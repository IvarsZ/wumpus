describe("Slide", function() {

  var slideEntity;

  beforeEach(function(done) {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      GameModel.id = 1;
      Crafty.scene('GameModel');
      GameModel.sendingMove = false;
    });

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    GameModel.start();
    slideEntity = Crafty.e("Slide", "Grid").placeAt(1, 2);

    done();
  });

  it("slides north by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY - GameModel.tile.height;

    slideEntity.trigger("Slide", {row: -1, column: 0});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("slides south by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY + GameModel.tile.height;

    slideEntity.trigger("Slide", {row: 1, column: 0});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("slides west by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX - GameModel.tile.width;
    var destinationY = startY;

    slideEntity.trigger("Slide", {row: 0, column: -1});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("slides east by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX + GameModel.tile.width;
    var destinationY = startY;

    slideEntity.trigger("Slide", {row: 0, column: 1});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

    it("doesn't slide if the previous slide is unfinished", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY - GameModel.tile.height;

    slideEntity.trigger("Slide", {row: -1, column: 0});
    slideEntity.trigger("Slide", {row: 1, column: 0});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });
});

describe("Slide", function() {

  var slideEntity;

  beforeEach(function(done) {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;   

    Game.start();
    slideEntity = Crafty.e("Slide", "Grid").placeAt(1, 2);

    done();
  });

  it("slides north by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY - Game.tile.height;

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
    var destinationY = startY + Game.tile.height;

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

    var destinationX = startX - Game.tile.width;
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

    var destinationX = startX + Game.tile.width;
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
    var destinationY = startY - Game.tile.height;

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

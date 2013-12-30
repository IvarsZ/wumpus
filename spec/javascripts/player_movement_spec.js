describe("Player movement", function() {

  var slideEntity;

  beforeEach(function(done) {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;   

    Game.start();
    slideEntity = Crafty.e("Slide", "Grid", "PlayerMovement").placeAt(1, 2);

    done();
  });

  it("W slides north by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY - Game.tile.height;

    Crafty.trigger("KeyDown", {key: "W"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

    it("UP_ARROW slides north by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY - Game.tile.height;

    Crafty.trigger("KeyDown", {key: "UP_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("S slides south by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY + Game.tile.height;

    Crafty.trigger("KeyDown", {key: "S"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("DOWN_ARROW slides south by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX;
    var destinationY = startY + Game.tile.height;

    Crafty.trigger("KeyDown", {key: "DOWN_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("A slides west by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX - Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "A"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("LEFT_ARROW slides west by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX - Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "LEFT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("D slides east by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX + Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "D"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("RIGHT_ARROW slides east by one tile", function(done) {

    var startX = slideEntity.x;
    var startY = slideEntity.y;

    var destinationX = startX + Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "RIGHT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(slideEntity.x).toEqual(destinationX);
      expect(slideEntity.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });
});

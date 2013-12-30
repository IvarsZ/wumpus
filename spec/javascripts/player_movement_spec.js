describe("Player movement", function() {

  beforeEach(function(done) {

    Game.tile.width = 32;
    Game.tile.height = 32;
    Game.sideBarWidth = 160;
    Game.topBarHeight = 50;   

    Game.start();
    Game.player.placeAt(1, 2);

    done();
  });

  it("W slides north by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX;
    var destinationY = startY - Game.tile.height;

    Crafty.trigger("KeyDown", {key: "W"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

    it("UP_ARROW slides north by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX;
    var destinationY = startY - Game.tile.height;

    Crafty.trigger("KeyDown", {key: "UP_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("S slides south by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX;
    var destinationY = startY + Game.tile.height;

    Crafty.trigger("KeyDown", {key: "S"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("DOWN_ARROW slides south by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX;
    var destinationY = startY + Game.tile.height;

    Crafty.trigger("KeyDown", {key: "DOWN_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("A slides west by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX - Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "A"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("LEFT_ARROW slides west by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX - Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "LEFT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("D slides east by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX + Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "D"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("RIGHT_ARROW slides east by one tile", function(done) {

    var startX = Game.player.x;
    var startY = Game.player.y;

    var destinationX = startX + Game.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "RIGHT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.x).toEqual(destinationX);
      expect(Game.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside at the top of the grid appears at the bottom", function(done) {

    Game.player.placeAt(0, 2);
    Crafty.trigger("KeyDown", {key: "UP_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.getRow()).toEqual(7);
      expect(Game.player.getColumn()).toEqual(2);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside at the bottom of the grid appears at the top", function(done) {

    Game.player.placeAt(7, 2);
    Crafty.trigger("KeyDown", {key: "DOWN_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.getRow()).toEqual(0);
      expect(Game.player.getColumn()).toEqual(2);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside on the left of the grid appears on the right", function(done) {

    Game.player.placeAt(2, 0);
    Crafty.trigger("KeyDown", {key: "LEFT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.getRow()).toEqual(2);
      expect(Game.player.getColumn()).toEqual(11);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside on the right of the grid appears on the left", function(done) {

    Game.player.placeAt(2, 11);
    Crafty.trigger("KeyDown", {key: "RIGHT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(Game.player.getRow()).toEqual(2);
      expect(Game.player.getColumn()).toEqual(0);
      done();
    }, 0.5 * 1000);
  });
});

describe("Player movement", function() {

  beforeEach(function(done) {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      GameModel.id = 1;
    });

    GameModel.tile.width = 32;
    GameModel.tile.height = 32;
    GameModel.sideBarWidth = 160;
    GameModel.topBarHeight = 50;

    GameModel.params.rowsCount = 8;
    GameModel.params.columnsCount = 12;

    Service.createGame();
    Crafty.scene('GameModel');
    GameModel.player = Crafty.e("Player");
    GameModel.player.placeAt(1, 2);
    GameModel.sendingMove = false;

    done();
  });

  it("W slides north by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX;
    var destinationY = startY - GameModel.tile.height;

    Crafty.trigger("KeyDown", {key: "W"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

    it("UP_ARROW slides north by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX;
    var destinationY = startY - GameModel.tile.height;

    Crafty.trigger("KeyDown", {key: "UP_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("S slides south by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX;
    var destinationY = startY + GameModel.tile.height;

    Crafty.trigger("KeyDown", {key: "S"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("DOWN_ARROW slides south by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX;
    var destinationY = startY + GameModel.tile.height;

    Crafty.trigger("KeyDown", {key: "DOWN_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("A slides west by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX - GameModel.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "A"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("LEFT_ARROW slides west by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX - GameModel.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "LEFT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("D slides east by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX + GameModel.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "D"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("RIGHT_ARROW slides east by one tile", function(done) {

    var startX = GameModel.player.x;
    var startY = GameModel.player.y;

    var destinationX = startX + GameModel.tile.width;
    var destinationY = startY;

    Crafty.trigger("KeyDown", {key: "RIGHT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.x).toEqual(destinationX);
      expect(GameModel.player.y).toEqual(destinationY);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside at the top of the grid appears at the bottom", function(done) {

    GameModel.player.placeAt(0, 2);
    Crafty.trigger("KeyDown", {key: "UP_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.getRow()).toEqual(7);
      expect(GameModel.player.getColumn()).toEqual(2);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside at the bottom of the grid appears at the top", function(done) {

    GameModel.player.placeAt(7, 2);
    Crafty.trigger("KeyDown", {key: "DOWN_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.getRow()).toEqual(0);
      expect(GameModel.player.getColumn()).toEqual(2);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside on the left of the grid appears on the right", function(done) {

    GameModel.player.placeAt(2, 0);
    Crafty.trigger("KeyDown", {key: "LEFT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.getRow()).toEqual(2);
      expect(GameModel.player.getColumn()).toEqual(11);
      done();
    }, 0.5 * 1000);
  });

  it("when sliding outside on the right of the grid appears on the left", function(done) {

    GameModel.player.placeAt(2, 11);
    Crafty.trigger("KeyDown", {key: "RIGHT_ARROW"});

    // Wait for sliding to finish.
    setTimeout(function() {
      expect(GameModel.player.getRow()).toEqual(2);
      expect(GameModel.player.getColumn()).toEqual(0);
      done();
    }, 0.5 * 1000);
  });
});

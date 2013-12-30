Grid = {

  rowToY: function(row) {
    return row * Game.tile.height + Game.topBarHeight;
  },

  columnToX: function(column) {
    return column * Game.tile.width + Game.sideBarWidth;
  }
}

// A Grid allows an element to be located on a grid of tiles.
Crafty.c("Grid", {

  init: function() {
    this.attr({
      w: Game.tile.width,
      h: Game.tile.height
    })
  },

  getRow: function() {
    return (this.y - Game.topBarHeight)/Game.tile.height;
  },

  getColumn: function() {
    return (this.x - Game.sideBarWidth)/Game.tile.width;
  },

  // Place this entity at the given row and column on the grid.
  placeAt: function(row, column) {

    this.x = Grid.columnToX(column);
    this.y = Grid.rowToY(row);

    return this; // Allow method chaining.
  }
});

// An Actor is drawn in 2D on canvas via the row, column grid.
Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  },
});

// An InBounds listens for moved events and keeps the entity in the bounds of the grid
// by assuming it's a torus and placing the entity on the opposite side.
Crafty.c("InBounds", {
  init: function() {
    this.requires("Grid");
    
    this.bind("Moved", function() {

      var row = this.getRow();
      var column = this.getColumn();

      if (column < 0) {
        column = Game.params.numberOfColumns - 1;
      }
      else if (column >= Game.params.numberOfColumns) {
        column = 0;
      }
      else if (row< 0) {
        row = Game.params.numberOfRows - 1;
      }
      else if (row >= Game.params.numberOfRows) {
        row = 0;
      }

      this.placeAt(row, column);
    });
  }
});

// A Slide listens for slide events and smoothly slides to another tile location.
Crafty.c("Slide", {
  init: function() {

    this.requires('Grid');

    var stepFrames = 5; // Change to adjust speed of sliding.

    var velocityX = 0;
    var velocityY = 0;
    var destinationX = 0;
    var destinationY;
    var framesLeft = 0;
    var sliding = false;
    var finishedSliding = false;

    this.bind("Slide", function(direction) {
        
      // Don't slide more if we're already sliding.
      if(sliding) { 
        return false;
      }
      sliding = true;

      destinationX = Grid.columnToX(this.getColumn() + direction.column);
      destinationY = Grid.rowToY(this.getRow() + direction.row);

      // Velocity is distance over time (frames).
      velocityX = (destinationX - this.x) / stepFrames;
      velocityY = (destinationY - this.y) / stepFrames;

      framesLeft = stepFrames;
    });

    this.bind("EnterFrame", function(e) {

      // Trigger 'moved' one frame after finishing sliding.
      if (finishedSliding) {
        
        this.trigger("Moved");
        finishedSliding = false;
      }
        
      if(!sliding) { 
        return false;
      }

      // Update position by per-frame velocity
      this.x += velocityX;
      this.y += velocityY;
      framesLeft--;

      if(framesLeft == 0) {

        // Move to destination to avoid rounding errors.
        this.x = destinationX;
        this.y = destinationY;

        sliding = false;
        finishedSliding = true;
      }
    });
  }
});

Crafty.c("PlayerMovement", {

  init: function() {

      // Maps keys to movement direction.
      var keys = { 
        UP_ARROW:     {row: -1, column:  0},
        W:            {row: -1, column:  0},
        DOWN_ARROW:   {row:  1, column:  0},
        S:            {row:  1, column:  0},
        LEFT_ARROW:   {row:  0, column: -1},
        A:            {row:  0, column: -1},
        RIGHT_ARROW:  {row:  0, column:  1},
        D:            {row:  0, column:  1}
      };
    
    for(var key in keys) {
      var keyCode = Crafty.keys[key] || key;
      keys[keyCode] = keys[key];
    }

    this.bind("KeyDown", function(e) {
      if(keys[e.key]) {
         
        var direction = keys[e.key];
        this.trigger('Slide', direction);
      }
    })
  }
});

// The player-controlled character.
Crafty.c("Player", {
  init: function() { 
  
    this.requires("Actor, Color, Slide, PlayerMovement, InBounds")
      .color('rgb(20, 75, 40)');
  }
});

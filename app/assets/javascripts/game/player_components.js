// The Grid component allows an element to be located on a grid of tiles.
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

  // Place this entity at the given row and column on the grid..
  placeAt: function(row, column) {

    this.x = Grid.columnToX(column);
    this.y = Grid.rowToY(row);

    return this; // Allow method chaining.
  }
});

Grid = {

  rowToY: function(row) {
    return row * Game.tile.height + Game.topBarHeight;
  },

  columnToX: function(column) {
    return column * Game.tile.width + Game.sideBarWidth;
  }
}

// An Actor is an entity that is drawn in 2D on canvas via the row, column grid.
Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  },
});

// The player-controlled character.
Crafty.c("Player", {
  init: function() {
    this.requires("Actor, Color")
    .color('rgb(20, 75, 40)');
  }
});

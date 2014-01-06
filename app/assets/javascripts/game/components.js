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

// An Actor is drawn in 2D on DOM via the row, column grid.
Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  },
});

Crafty.c("Icon", {
  init: function() {
    this.requires("2D, DOM");
  },
});

Crafty.c("WumpusIcon", {
  init: function() {
    this.requires("Icon, spr_wumpus");
  },
});

Crafty.c("PitIcon", {
  init: function() {
    this.requires("Icon, spr_pit");
  },
});

Crafty.c("Door", {
  init: function() {
    this.requires("Actor, spr_door");
  },
});

Crafty.c("Bat", {
  init: function() {
    this.requires("Actor, spr_bat")
      .attr({z: 100});
  },
});

Crafty.c("ChestIcon", {
  init: function() {
    this.requires("Icon, spr_closed_chest");
  },
  open: function() {
    if (this.has("spr_closed_chest")) {
      this.removeComponent("spr_closed_chest");
    }
    if (!this.has("spr_open_chest")) {
      this.addComponent("spr_open_chest");
    }
  },
  close: function() {
    if (this.has("spr_open_chest")) {
      this.removeComponent("spr_open_chest");
    }
    if (!this.has("spr_closed_chest")) {
      this.addComponent("spr_closed_chest");
    }
  }
});

Crafty.c("Tile", {
  init: function() {
    var i = Math.floor((Math.random()*3)+1);
    this.requires("Actor, spr_tile_" + i);
  },
});

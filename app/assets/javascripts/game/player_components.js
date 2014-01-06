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
      this.movementDone = true;
      this.trigger("Update");
    });
  }
});

// A Slide listens for slide events and smoothly slides to another tile location.
Crafty.c("Slide", {
  init: function() {

    this.requires("Grid");

    var stepFrames = 6; // Change to adjust speed of sliding

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

      this.movementDone = true

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

      if(keys[e.key] && !Game.sendingMove && this.movementDone && !Game.is_over) {
         
        var direction = keys[e.key];

        this.movementDone = false;
        this.trigger("SendMove", direction);
        this.trigger("Slide", direction);
      }
    })
  },
  
  directionToAjaxMove: function(direction) {
    return {
      "move" : {
        "row" : direction.row + this.getRow(),
        "column" : direction.column + this.getColumn(),
        "game_id" : Game.id
      }
    };
  }
});

Crafty.c("Sender", {
  init: function() {

    var that = this;

    this.bind("SendMove", function(direction) {

      Game.sendingMove = true

      $.ajax({
        url : Game.urls.sendMove,
        type : "POST",
        data : this.directionToAjaxMove(direction),
        success : function(response) {
          Game.sendingMove = false;
          that.trigger("Receive", response);
        },
        error: function(e) {
          // TODO pretty output
          alert(JSON.stringify(e.responseJSON.errors));
        }
      });
    });
  }
});

Crafty.c("Receiver", {
  init: function() {
    this.bind("Receive", function(response) {
      // Update only after movement is done.
      var updateNotifications = function() {
        Scenes.updateNotifications(response);
        this.unbind("Update", updateNotifications);
      }
      this.bind("Update", updateNotifications);
      if (this.movementDone) {
        this.trigger("Update");
      }
    });
  }
});

// The player-controlled character.
Crafty.c("Player", {
  init: function() { 
  
    this.requires("Actor, Slide, PlayerMovement, InBounds, Sender, spr_player, SpriteAnimation, Receiver")
      .attr({z: Game.order.player})
      .animate("PlayerMovingUp",    0, 0, 2)
      .animate("PlayerMovingRight", 0, 1, 2)
      .animate("PlayerMovingDown",  0, 2, 2)
      .animate("PlayerMovingLeft",  0, 3, 2); 

    // Watch for a change of direction and switch animations accordingly
    var frames_count = 6;
    this.bind("Slide", function(direction) {
      if (direction.column == 1) {
        this.animate("PlayerMovingRight", frames_count);
      }
      else if (direction.column == -1) {
        this.animate("PlayerMovingLeft", frames_count);
      }
      else if (direction.row == 1) {
        this.animate("PlayerMovingDown", frames_count);
      }
      else if (direction.row == -1) {
        this.animate("PlayerMovingUp", frames_count);
      }
      else {
        this.stop();
      }
    });
  }
});

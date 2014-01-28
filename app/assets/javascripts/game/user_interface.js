UI = {

  init: function() {

    var width = Game.tile.width * GameModel.params.columnsCount + Game.sideBarWidth;
    var height = Game.tile.height * GameModel.params.rowsCount + Game.topBarHeight;

    Crafty.init(width, height);

    // Resize canvas.
    $(Crafty.canvas._canvas).attr({width: width});
    $(Crafty.canvas._canvas).attr({height: height});

    // Create sidebar only once.
    if (this.sideBar === undefined) {
      this.sideBar = Crafty.e("SideBar").sideBar(height); // Take up the whole screen height wise.
    }
    else {
      this.sideBar.h = height;

      // Make the persist entities from previous scenes (menu elements) to be on top.
      $(Crafty.stage.elem).children().last().css({"z-index": "9"});
    }

    // Create topBar only once.
    if (UI.topBar === undefined) {
      this.topBar = Crafty.e("TopBar").topBar(width - Game.sideBarWidth); // Take up the whole screen width wise, except sidebar.
    }
    else {
      this.topBar.w = width - Game.sideBarWidth;
    }

    this.initTextLabel();

    UI.treasureIcon.close();

    // TODO proper binding to scene, unbind.
    Crafty.bind("OnDoor", this.drawDoor);
  },

  initTextLabel: function() {
    if (this.textLabel === undefined) {
      this.textLabel = Crafty.e("NotificationsLabel, 2D, DOM, Text")
        .attr({
          x: Game.sideBarWidth + 5,
          y: Game.topBarHeight - 18,
          z: Game.order.menuElements,
          h: 18,
          w: Game.tile.width * GameModel.params.columnsCount - 5})
        .textColor("#FFFFFF")
        .textFont({ family: "Arial", size: "15px"});
    }
  },

  drawDoor: function(position) {
    var door = Crafty.e("Door")
      .placeAt(position.row, position.column)
      .attr({z: Game.order.door});
  }
}
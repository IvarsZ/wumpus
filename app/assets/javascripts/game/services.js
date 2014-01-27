NewGameService = {

  execute: function() {
    this.updateGameParams();
    $.ajax({
      url : Game.urls.createGame,
      type : "POST",
      data : GameModel.params.toAjaxData(),
      success : this.startNewGame,
      error: Game.displayErrorResponse
    });
  },

  updateGameParams: function() {
    GameModel.params.rowsCount = UI.rowsSlider.getValue();
    GameModel.params.columnsCount = UI.columnsSlider.getValue();
    GameModel.params.pitsCount = UI.pitsSlider.getValue();
    GameModel.params.batsCount = UI.batsSlider.getValue();
    GameModel.params.arrowsCount = UI.arrowsSlider.getValue();
  },

  startNewGame: function(response) {

    Crafty.scene("Game");
    GameModel.id = response.id;
    GameModel.player = Crafty.e("Player");
    GameModel.player.placeAt(response.row, response.column);
    GameModel.player.arrowsCount = GameModel.params.arrowsCount;

    Service.update(response.notifications);
  }
}

MoveService = {

  sendMove: function(direction) {
    $.ajax({
      url : Game.urls.sendMove,
      type : "POST",
      data : this.directionToAjaxMove(direction),
      success : this.finishMove,
      error: Game.displayErrorResponse
    });
    GameModel.sendingMove = true;
  },

  finishMove: function(response) {

    GameModel.sendingMove = false;

    // Update only after movement is done.
    var updateNotifications = function() {
      Service.update(response);
      GameModel.player.unbind("Update", updateNotifications);
    }
    GameModel.player.bind("Update", updateNotifications);
    if (GameModel.player.movementDone) {
      GameModel.player.trigger("Update");
    }
  },

  directionToAjaxMove: function(direction) {
    return {
      "move" : {
        "row" : direction.row + GameModel.player.getRow(),
        "column" : direction.column + GameModel.player.getColumn(),
        "game_id" : GameModel.id
      }
    };
  }
}

ShootService = {

  sendShot: function(direction) {
    $.ajax({
      url : Game.urls.sendShot,
      type : "POST",
      data : this.directionToAjaxShot(direction),
      success : this.finishShot,
      error: Game.displayErrorResponse
    });
    GameModel.sendingMove = true;
  },

  finishShot: function(response) {

    GameModel.sendingMove = true;

    GameModel.arrowsCount--;

    if (response.wumpus_dead) {
      Service.showText("You shot the wumpus");
    }
    else {
      Service.showText("You missed, arrows left: " + GameModel.arrowsCount);
    }
    Service.update(response);
  },

  directionToAjaxShot: function(direction) {
    return {
      "shot" : {
        "row" : direction.row + this.getRow(),
        "column" : direction.column + this.getColumn(),
        "game_id" : GameModel.id
      }
    };
  }
}

Service = {

  update: function(data) {

    Crafty.trigger("WumpusNearby", data.nearby_wumpus);
    Crafty.trigger("PitsNearby", data.nearby_pits);
    Crafty.trigger("TreasureNearby", data.nearby_treasure);

    if (data.on_wumpus) {
      Crafty.trigger("onWumpus");
      GameModel.is_over = true;
    }

    if (data.on_pit) {
      Crafty.trigger("onPit");
      GameModel.is_over = true;
    }

    if (data.treasure_found) {
      Crafty.trigger("FoundTreasure");
    }

    if (data.on_door) {
      Crafty.trigger("OnDoor", GameModel.player.getRow(), GameModel.player.getColumn());
    }

    if (data.game_won) {
      Crafty.trigger("GameWon");
      GameModel.is_over = true;
    }

    if (!GameModel.isVisited[GameModel.player.getRow()][GameModel.player.getColumn()]) {
      GameModel.isVisited[GameModel.player.getRow()][GameModel.player.getColumn()] = true;
      Crafty.e("Tile").placeAt(GameModel.player.getRow(), GameModel.player.getColumn());
    }

    if (data.by_bat) {

      Crafty.e("Bat").placeAt(GameModel.player.getRow(), GameModel.player.getColumn());

      GameModel.player.placeAt(data.by_bat.row, data.by_bat.column);

      if (!GameModel.isVisited[GameModel.player.getRow()][GameModel.player.getColumn()]) {
        GameModel.isVisited[GameModel.player.getRow()][GameModel.player.getColumn()] = true;
        Crafty.e("Tile").placeAt(GameModel.player.getRow(), GameModel.player.getColumn());
      }

      GameModel.player.unbind("BatTeleport");
    }

    // TODO Bats and recording.
    AI.recordNotifications(data);
  }
}
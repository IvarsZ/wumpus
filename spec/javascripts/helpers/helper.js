Helper = {
  newGame: function() {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      NewGameService.startNewGame({
        id: 1,
        row: 0,
        column: 0,
        notifications: {}
      })
    });

    Game.start();
  },

  newGameWithNotifications: function(notifications) {

    // Mock ajax requests to server to start game.
    spyOn($, "ajax").and.callFake(function(options) {
      NewGameService.startNewGame({
        id: 1,
        row: 0,
        column: 0,
        notifications: notifications
      })
    });

    NewGameService.execute();
  }
}
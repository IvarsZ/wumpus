Game = {

  // Initialize and start the game.
  start: function() {

    // Init crafty and set background color.
    Crafty.init(544, 306);
    Crafty.background(Game.colors.background);

    Crafty.scene("Loading");
  },

  tile: {
    width: 32,
    height: 32
  },

  sideBarWidth: 160,
  topBarHeight: 55,
  
  colors: {
    background: "rgb(20, 20, 20)",
    sideBar: "rgb(60, 60, 60)",
    topBar: "rgb(40, 40, 40)",
    text: "rgb(256, 256, 256)"
  },

  urls: {
    createGame: "games/create",
    sendMove:   "games/make_move",
    sendShot:   "games/make_shot"
  },

  order: {
    menuElements: 2,
    player: 1,
    door: 2
  },

  displayErrorResponse: function(e) {
    alert(JSON.stringify(e.responseJSON.errors));
  }
}

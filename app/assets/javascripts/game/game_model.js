GameModel = {

  params: {

    rowsCount: 8,
    columnsCount: 12,
    pitsCount: 6,
    batsCount: 4,
    arrowsCount: 2,

    toAjaxData: function() {
      return {
        "game" : {
          "number_of_rows" : this.rowsCount,
          "number_of_columns" : this.columnsCount,
          "number_of_pits" : this.pitsCount,
          "number_of_bats" : this.batsCount,
          "number_of_arrows" : this.arrowsCount
        }
      };
    }
  },

  init: function() {
    this.treasureFound = false;
    this.isOver = false;

    this.isVisited = new Array(GameModel.params.rowsCount);
    for (var i = 0; i < GameModel.params.rowsCount; i++) {
      this.isVisited[i] = new Array(GameModel.params.columnsCount);
    }
  }
}
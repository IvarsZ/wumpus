// TODO new game bug, bats, go after treasure, go after door modes, proper distance calculation for torus shape.
AI = {

  NO_ALERT: -1,
  
  MAX_DANGER: 100000,
  WUMPUS_DANGER: 100,
  PIT_DANGER: 100,
  
  init: function() {
  
    // Init cells.
    this.cells = new Array(GameModel.params.rowsCount);
    for (var row = 0; row < GameModel.params.rowsCount; row++) {
      this.cells[row] = new Array(GameModel.params.columnsCount);
      for (var column = 0; column < GameModel.params.columnsCount; column++) {
        this.cells[row][column] = new AICell(row, column);
      }
    }
    
    this.pitNotifications = [];
    this.wasWumpusNearby = false;
    this.wasTreasureNearby = false;
    this.isDoorFound = false;
  },

  recordNotifications: function(notifications) {
  
    var row = GameModel.player.getRow();
    var column = GameModel.player.getColumn();
      
    var cell = this.getCell(row, column);
    if (!cell.isVisited) {
    
      cell.isVisited = true;
    
      cell.pitChance = AI.NO_ALERT;
      cell.wumpusChance = AI.NO_ALERT;
      cell.treasureChance = AI.NO_ALERT;
      
      if (notifications.on_door) {
        cell.hasDoor = true;
        this.isDoorFound = true;
      }
      
      // TODO BATS.
    
      var adjacentCells = this.getAdjacentCells(row, column);
    
      if (notifications.nearby_pits) {
        this.pitNotifications.push({row : row, column : column});
      }
      else {
        adjacentCells.forEach(function(adjacentCell) {
          adjacentCell.pitChance = AI.NO_ALERT;
        });
      }
      
      if (notifications.nearby_wumpus) {
        this.recordWumpusNotification(row, column);
      }
      else {
        adjacentCells.forEach(function(adjacentCell) {
          adjacentCell.wumpusChance = AI.NO_ALERT;
        });
      }
      
      if (notifications.nearby_treasure) {
        this.recordTreasureNotification(row, column);
      }
      else {
        adjacentCells.forEach(function(adjacentCell) {
          adjacentCell.treasureChance = AI.NO_ALERT;
        });
      }
    }
  },
  
  recordWumpusNotification: function(row, column) {
  
    var wumpusCells = [];
    var adjacentCells = this.getAdjacentCells(row, column);
    if (this.wasWumpusNearby) {
    
      // Only cells intersecting with previous notifications can have wumpus.
      adjacentCells.forEach(function(adjacentCell) {
        if (adjacentCell.wumpusChance > 0) {
          wumpusCells.push(adjacentCell);
        }
      });
      wumpusCells.forEach(function(wumpusCell) {
        wumpusCell.wumpusChance = 1/wumpusCells.length;
      });
    }
    else {
    
      // All unknown cells have equal chance.
      adjacentCells.forEach(function(adjacentCell) {
        if (adjacentCell.wumpusChance != AI.NO_ALERT) {
          wumpusCells.push(adjacentCell);
        }
      });
      wumpusCells.forEach(function(wumpusCell) {
        if (wumpusCell.wumpusChance != AI.NO_ALERT) {
          wumpusCell.wumpusChance = 1/wumpusCells.length;
        }
      });
    }
    this.wasWumpusNearby = true;
  },
  
  recordTreasureNotification: function(row, column) {
    
    var treasureCells = [];
    var adjacentCells = this.getAdjacentCells(row, column);  
    if (this.wasTreasureNearby) {
    
      // Only cells intersecting with previous notifications can have treasure.
      adjacentCells.forEach(function(adjacentCell) {
        if (adjacentCell.treasureChance > 0) {
          treasureCells.push(adjacentCell);
        }
      });
      treasureCells.forEach(function(treasureCell) {
        treasureCell.wumpusChance = 1/treasureCells.length;
      });
    }
    else {
    
      // All unknown cells have equal chance.
      adjacentCells.forEach(function(adjacentCell) {
        if (adjacentCell.treasureChance != AI.NO_ALERT) {
          treasureCells.push(adjacentCell);
        }
      });
      treasureCells.forEach(function(treasureCell) {
        if (treasureCell.treasureChance != AI.NO_ALERT) {
          treasureCell.treasureChance = 1/treasureCells.length;
        }
      });
    }
    this.wasTreasureNearby = true;
  },
  
  updatePitsChances: function() {
  
    that = this;
  
    console.log(this.pitNotifications);
    this.pitNotifications.forEach(function(pitNotification) {
    
      // Reset all cells except no pit ones.
      that.cells.forEach(function(cell) {
        if (cell.pitChance != AI.NO_ALERT) {
          cell.pitChance = 0;
        }
      });
      
      // All unknown cells have equal chance.
      var pitCells = [];
      var adjacentCells = that.getAdjacentCells(pitNotification.row, pitNotification.column);
      adjacentCells.forEach(function(adjacentCell) {
        if (adjacentCell.pitChance != AI.NO_ALERT) {
          pitCells.push(adjacentCell);
        }
      });
      pitCells.forEach(function(pitCell) {
        if (pitCell.pitChance != AI.NO_ALERT) {
          pitCell.pitChance += 1/pitCells.length;
        }
      });
    });
  },
  
  nextMove: function() {
  
    var that = this;
    
    this.updatePitsChances();
    
    // Use BFS to find safest unvisited reachable cells.
    var safestCells = [];
    var minDanger = AI.MAX_DANGER;
    
    this.cells.forEach(function(rowArray) {
      rowArray.forEach(function(cell) {
        cell.wasUsedInBFS = false;
      });
    });
    
    var q = new Queue();
    var playerCell = this.getCell(GameModel.player.getRow(), GameModel.player.getColumn());
    playerCell.parent = null;
    q.enqueue(playerCell);
    
    while (q.getLength() > 0) {
    
      var cell = q.dequeue();
      cell.wasUsedInBFS = true;
      console.log("Dequeue ", cell.row, cell.column);
      
      if (cell.isVisited) {
        var adjacentCells = this.getAdjacentCells(cell.row, cell.column);
        adjacentCells.forEach(function(adjacentCell) {
          if (!adjacentCell.wasUsedInBFS) {
            adjacentCell.parent = cell;
            q.enqueue(adjacentCell);
            adjacentCell.wasUsedInBFS = true;
          }
        });
      }
      else {
        var dangerValue = cell.getDangerValue();
        if (dangerValue < minDanger) {
          safestCells = [];
          safestCells.push(cell);
          minDanger = dangerValue;
        }
        else if (dangerValue == minDanger) {
          safestCells.push(cell);
        }
      }
        
        
    }
    console.log("Safest Cells", safestCells);
    
    // Pick the cell with the most information.
    var bestCells = [];
    var maxVisitValue = -1000;
    safestCells.forEach(function(safestCell) {
      
      var distance = Math.abs(safestCell.row - GameModel.player.getRow()) + Math.abs(safestCell.column - GameModel.player.getColumn()); // TODO use torus.
      var value = that.getVisitValue(safestCell.row, safestCell.column) - distance;
      if (value > maxVisitValue) {
        bestCells = [];
        bestCells.push(safestCell);
        maxVisitValue = value;
      }
      else if (value == maxVisitValue) {
        bestCells.push(safestCell);
      }
    });
    console.log("Best value", maxVisitValue);
    console.log("Best cells", bestCells);
    var bestCell = bestCells[Math.floor(Math.random() * bestCells.length)];
    
    // Find the move itself.
    var cell = bestCell;
    console.log("Move to", cell.row, cell.column);
    while (cell.parent != playerCell) {
      cell = cell.parent;
    }
    
    return this.getDirection(cell.row, playerCell.row, cell.column, playerCell.column)
  },
  
  getDirection: function (endRow, startRow, endColumn, startColumn) {
    var row = endRow - startRow;
    var column = endColumn - startColumn;
    
    if (row > 1) {
      row = -1;
    }
    else if (row < -1) {
      row = 1;
    }
    else if (column > 1) {
      column = -1;
    }
    else if (column < -1) {
      column = 1;
    }
    
    return { row: row, column: column };
  },
  
  getVisitValue: function(row, column) {
  
    var that = this;
  
    var value = 0;
    this.cells.forEach(function(rowArray) {
      rowArray.forEach(function(cell) {
        if (cell.row != row || cell.column != column) {
          var distance = Math.abs(cell.row - row) + Math.abs(cell.column - column);
          value += that.getInformationValue(cell.row, cell.column) / distance; // Take distance into account.
        }
        else {
          value += that.getInformationValue(cell.row, cell.column) * 2; // The cell itself is most important.
        }
      });
    });
    
    return value;
  },
  
  getInformationValue: function(row, column) {
    
    var cell = this.getCell(row, column);
    
    // Visited cells have no new information.
    if (cell.visited) {
      return 0;
    }
    
    // Has value if not everything is know about adjacent cells.
    var value = 0;
    var adjacentCells = this.getAdjacentCells(row, column);
    adjacentCells.forEach(function(adjacentCell) {
      if (adjacentCell.wumpusChance != AI.NO_ALERT) {
        value++;
      }
      if (adjacentCell.pitChance != AI.NO_ALERT) {
        value++;
      }
      if (adjacentCell.treasureChance != AI.NO_ALERT) {
        value++;
      }
    });
    
    return value;
  },
  
  getAdjacentCells: function(row, column) {
  
      var that = this;
  
      var adjacentCellsOffset = [
        {row: -1, column:  0},
        {row:  1, column:  0},
        {row:  0, column: -1},
        {row:  0, column:  1}
      ];
      
      var adjacentCells = [];
      adjacentCellsOffset.forEach(function(offset) {
        adjacentCells.push(that.getCell(row + offset.row, column + offset.column));
      });
      
      return adjacentCells;
  },
  
  getCell: function(row, column) {
  
    // Make inbounds.
    if (column < 0) {
      column = GameModel.params.columnsCount - 1;
    }
    else if (column >= GameModel.params.columnsCount) {
      column = 0;
    }
    else if (row< 0) {
      row = GameModel.params.rowsCount - 1;
    }
    else if (row >= GameModel.params.rowsCount) {
      row = 0;
    }
  
    return this.cells[row][column];
  }
}

function AICell(row, column) {

  this.row = row;
  this.column = column;

  this.isVisited = false;
	this.isBatInCell = false;
	this.hasDoor = false;

  // -1 for no pit for sure, 0 for unknown, n for n notifications
  this.pitChance = 0;
  this.wumpusChance = 0;
	this.treasureChance = 0;
}

AICell.prototype.getDangerValue = function() {
  value = this.pitChance * AI.PIT_DANGER;
  value += this.wumpusChance * AI.WUMPUS_DANGER;
  // TODO BATS.
  
  return value;
};

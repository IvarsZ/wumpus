#TODO better pattern?
module ActionConcern
  extend ActiveSupport::Concern

  include ActiveModel::Validations
  include ActiveModel::Naming

  attr_accessor :game, :row, :column, :errors, :action

  private

    def initialize_action_concern(action)
      @game = action.game
      @row = action.row
      @column = action.column
      @errors = ActiveModel::Errors.new(self)
      @action = action
    end

    def execute
      unless self.action.valid?
        self.errors = self.action.errors
        return false
      end

      unless self.valid?
        return false
      end

      result = self.execute_base

      unless self.game.save
        self.errors = self.game.errors
        return false
      end

      puts self.game.save

      self.action.save

      result
    end

    def to_adjacent_cell?
      if (self.row - self.game.player_row).abs + (self.column - self.game.player_column).abs != 1
        self.errors.add :base, "The action to do isn't to adjacent cell"
      end
    end

    def game_not_over?
      notifications = self.game.get_notifications
      if notifications[:on_pit] 
        self.errors.add :base, "Game over: player is on pit"
      end
      if notifications[:on_wumpus] 
        self.errors.add :base, "Game over: player is on wumpus"
      end
      if notifications[:game_won]
         self.errors.add :base, "Game won: can't make any moves"
      end
    end

    def make_in_bounds
      if self.row < 0
        self.row = self.game.number_of_rows - 1
      elsif self.row >= self.game.number_of_rows
        self.row = 0
      end
      if self.column < 0
        self.column = self.game.number_of_columns - 1
      elsif self.column >= self.game.number_of_columns
        self.column = 0
      end
    end
end

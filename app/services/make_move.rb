class MakeMove
  include ActiveModel::Validations
  include ActiveModel::Naming

  validate :orhtogonal_one_cell_move?
  validate :game_not_over?

  attr_accessor :move, :game, :errors

  def initialize(move)
    @move = move
    @game = move.game
    @errors = ActiveModel::Errors.new(self)
  end

  def make_move

    unless self.move.valid?
      self.errors = self.move.errors
      return false
    end

    unless self.valid?
      return false
    end

    row = self.move.row
    column = self.move.column

    if row < 0
      row = self.game.number_of_rows - 1
    elsif row >= self.game.number_of_rows
      row = 0
    elsif column < 0
      column = self.game.number_of_columns - 1
    elsif column >= self.game.number_of_columns
      column = 0
    end

    result = self.game.move_player(row, column)

    unless self.game.save
      self.errors = self.game.errors
      return false
    end

    result
  end

  private

    def orhtogonal_one_cell_move?
      if (self.move.row - self.game.player_row).abs + (self.move.column - self.game.player_column).abs != 1
        errors.add :base, "The move to make isn't orthogonal one cell move"
      end
    end

    def game_not_over?
      notifications = self.game.get_notifications
      if notifications[:on_pit] 
        errors.add :base, "Game over: player is on pit"
      end
      if notifications[:on_wumpus] 
        errors.add :base, "Game over: player is on wumpus"
      end
      if notifications[:game_won]
         errors.add :base, "Game won: can't make any moves"
      end
    end
end

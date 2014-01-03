class MakeMove
  include ActiveModel::Validations
  include ActiveModel::Naming

  validate :orhtogonal_one_cell_move?

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

    self.game.move_player(self.move.row, self.move.column)

    unless self.game.save
      self.errors = self.game.errors
      return false
    end

    self.move.save
  end

  private

    def orhtogonal_one_cell_move?
      if (self.move.row - self.game.player_row).abs + (self.move.column - self.game.player_column).abs != 1
        errors.add :base, "The move to make isn't orthogonal one cell move"
      end
    end
end

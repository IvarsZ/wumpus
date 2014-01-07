class MakeMove
  include ActionConcern

  validate :to_adjacent_cell?, :game_not_over?

  attr_accessor :move

  def initialize(move)
    @move = move
    initialize_action_concern(move)
  end

  def execute_base
    make_in_bounds
    self.game.move_player(self.row, self.column)
  end

  def make_move
    execute
  end
end

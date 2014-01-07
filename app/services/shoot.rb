class Shoot
  include ActionConcern

  validate :to_adjacent_cell?, :game_not_over?, :out_of_arrows?

  attr_accessor :shot

  def initialize(shot)
    @shot = shot
    initialize_action_concern(shot)
  end

  def execute_base
    make_in_bounds
    self.game.shoot(self.row, self.column)
  end

  def shoot
    execute
  end

  private

    def out_of_arrows?
      if self.game.number_of_arrows <= 0
        errors.add :base, "Out of arrows"
      end    
    end
end

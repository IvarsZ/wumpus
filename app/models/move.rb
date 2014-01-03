class Move < ActiveRecord::Base
  belongs_to :game

  validates :row, :column, :game_id, presence: true
end

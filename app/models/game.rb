class Game < ActiveRecord::Base

  validates :number_of_rows,
            :number_of_columns,
            :number_of_pits,
            :number_of_bats,
            :number_of_arrows, presence: true
end

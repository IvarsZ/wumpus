class Game < ActiveRecord::Base

  validates :number_of_rows,
            :number_of_columns, presence: true
end

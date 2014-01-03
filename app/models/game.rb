class Game < ActiveRecord::Base
  has_many :moves

  validates :number_of_rows,
            :number_of_columns,
            :number_of_pits,
            :number_of_bats,
            :number_of_arrows, presence: true

  before_create :generate_cave

  CONTENTS = {
    pit:      "P",
    bat:      "B",
    door:     "D",
    treasure: "T",
    wumpus:   "W",
    empty:    "."
  }

  def move_player(row, column)
    self.player_row = row
    self.player_column = column
  end
  
  def get_notifications

    notifications = {}
    adjacent_cells = get_adjacent_cells

    notifications[:nearby_wumpus] = adjacent_cells.include?(CONTENTS[:wumpus])
    notifications[:nearby_pits] = adjacent_cells.include?(CONTENTS[:pit])
    notifications[:nearby_treasure] = adjacent_cells.include?(CONTENTS[:treasure])

    notifications
  end

  private

    def generate_cave

      number_of_cells = number_of_rows * number_of_columns
      self.cave = CONTENTS[:empty] * number_of_cells

      @empty_cells = (0...number_of_cells).to_a

      generate_content(CONTENTS[:pit], number_of_pits)
      generate_content(CONTENTS[:bat], number_of_bats)
      generate_content(CONTENTS[:door], 1)
      generate_content(CONTENTS[:treasure], 1)
      generate_content(CONTENTS[:wumpus], 1)

      player_cell = pop_empty_cell
      self.player_row = player_cell / self.number_of_columns
      self.player_column = player_cell % self.number_of_columns
    end

    # Picks count cells from empty ones and generates the content there.
    def generate_content(content, count)
      count.times do
        self.cave[pop_empty_cell] = content
      end
    end

    def pop_empty_cell
      @empty_cells.delete_at(rand(@empty_cells.length))
    end

    def get_cell(row, column)
      return self.cave[row * number_of_columns + column] 
    end

    def get_adjacent_cells

      adjacentCellsOffset = [
        {row: 0, column: -1},
        {row: 0, column: 1},
        {row: -1, column: 0},
        {row: 1, column: 0}
      ]

      adjacent_cells = []

      adjacentCellsOffset.each do |adjacentCellOffset|
          
        adjacentCellRow = self.player_row + adjacentCellOffset[:row]
        adjacentCellColumn = self.player_column + adjacentCellOffset[:column]        

        adjacent_cells.push(get_cell(adjacentCellRow, adjacentCellColumn))
      end

    adjacent_cells
  end
end

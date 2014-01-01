class Game < ActiveRecord::Base

  validates :number_of_rows,
            :number_of_columns,
            :number_of_pits,
            :number_of_bats,
            :number_of_arrows, presence: true

  CONTENTS = {
    player:   "C",
    pit:      "P",
    bat:      "B",
    door:     "D",
    treasure: "T",
    wumpus:   "W"
  }

  def generate_cave

    number_of_cells = number_of_rows * number_of_columns
    self.cave = "." * number_of_cells

    @empty_cells = (0...number_of_cells).to_a

    generate_content(CONTENTS[:pit], number_of_pits)
    generate_content(CONTENTS[:bat], number_of_bats)
    generate_content(CONTENTS[:door], 1)
    generate_content(CONTENTS[:treasure], 1)
    generate_content(CONTENTS[:wumpus], 1)
    generate_content(CONTENTS[:player], 1)
  end

  private
    
    # Picks count cells from empty ones and generates the content there.
    def generate_content(content, count)
      
      count.times do
        cell_index = @empty_cells.delete_at(rand(@empty_cells.length))
        self.cave[cell_index] = content
      end
    end
end

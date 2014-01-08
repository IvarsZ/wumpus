class Game < ActiveRecord::Base
  has_many :actions

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

  def shoot(row, column)

    self.number_of_arrows -= 1

    if get_cell(row, column) == CONTENTS[:wumpus]
      self.cave_will_change!
      self.cave[self.cave.index(CONTENTS[:wumpus])] = CONTENTS[:empty]
      return { wumpus_dead: true }
    else
      return { wumpus_dead: false }
    end
  end

  def move_player(row, column)
    self.player_row = row
    self.player_column = column

    bat_notifications = {}
    if get_cell(self.player_row, self.player_column) == CONTENTS[:bat]
      teleport_by_bat
      bat_notifications[:by_bat] = {row: self.player_row, column: self.player_column }
    end
    
    get_notifications.merge(bat_notifications)
  end
  
  def get_notifications

    notifications = {}
    adjacent_cells = get_adjacent_cells

    notifications[:nearby_wumpus] = adjacent_cells.include?(CONTENTS[:wumpus])
    notifications[:nearby_pits] = adjacent_cells.include?(CONTENTS[:pit])

    notifications[:nearby_treasure] = !self.treasure_found? && adjacent_cells.include?(CONTENTS[:treasure])
    
    player_cell = get_cell(self.player_row, self.player_column)

    if (player_cell == CONTENTS[:wumpus])
      notifications[:on_wumpus] = true
    elsif (player_cell == CONTENTS[:pit])
      notifications[:on_pit] = true
    elsif (player_cell == CONTENTS[:treasure])
      unless self.treasure_found?
        notifications[:treasure_found] = true
        self.treasure_found = true
      end
    elsif (player_cell == CONTENTS[:door])
      notifications[:on_door] = true
      if self.treasure_found
        notifications[:game_won] = true
      end
    end

    notifications
  end

  private

    def teleport_by_bat

      no_bat_cells = []
      (0...self.number_of_rows).each do |row|
        (0...self.number_of_columns).each do |column|
          if get_cell(row, column) != CONTENTS[:bat]
            no_bat_cells.push({row: row, column: column})  
          end        
        end
      end

      cell = no_bat_cells.sample
      self.player_row = cell[:row]
      self.player_column = cell[:column]
    end

    def generate_cave

      number_of_cells = self.number_of_rows * self.number_of_columns
      self.cave = CONTENTS[:empty] * number_of_cells

      @empty_cells = (0...number_of_cells).to_a

      generate_content(CONTENTS[:pit], number_of_pits)
      generate_content(CONTENTS[:bat], number_of_bats)
      generate_content(CONTENTS[:door], 1)
      generate_content(CONTENTS[:treasure], 1)
      generate_content(CONTENTS[:wumpus], 1)

      add_player
    end

    def add_player

      player_cell = pop_empty_cell
      self.player_row = player_cell / self.number_of_columns
      self.player_column = player_cell % self.number_of_columns
      self.player_start_row = self.player_row
      self.player_start_column = self.player_column
    end

    def pop_empty_cell
      @empty_cells.delete_at(rand(@empty_cells.length))
    end

    def get_cell(row, column)
      return self.cave[row * number_of_columns + column] 
    end

    # Picks count cells from empty ones and generates the content there.
    def generate_content(content, count)
      count.times do
        self.cave[pop_empty_cell] = content
      end
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
          
        adjacentRow = self.player_row + adjacentCellOffset[:row]
        adjacentColumn = self.player_column + adjacentCellOffset[:column]
        if adjacentRow < 0
          adjacentRow = self.number_of_rows - 1
        elsif adjacentRow >= self.number_of_rows
          adjacentRow = 0
        elsif adjacentColumn < 0
          adjacentColumn = self.number_of_columns - 1
        elsif adjacentColumn >= self.number_of_columns
          adjacentColumn = 0
        end    

        adjacent_cells.push(get_cell(adjacentRow, adjacentColumn))
      end

    adjacent_cells
  end
end

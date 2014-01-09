class Game < ActiveRecord::Base
  has_many :actions
  has_many :moves
  has_many :shots
  has_many :wumpus_moves

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
    empty:    "."
  }

  def shoot(row, column)

    self.number_of_arrows -= 1

    if row == self.wumpus_row && column == self.wumpus_column
      self.wumpus_row = nil
      self.wumpus_column = nil # remove his position to "kill" wumpus
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

  def move_wumpus
    move_to = get_adjacent_cells(self.wumpus_row, self.wumpus_column).sample
    self.wumpus_row = move_to[:row]
    self.wumpus_column = move_to[:column]

    move_to
  end
  
  def get_notifications

    notifications = {}
    adjacent_cells_content = get_adjacent_cells_content(self.player_row, self.player_column)

    notifications[:nearby_wumpus] = get_adjacent_cells(self.player_row, self.player_column).include?({row: self.wumpus_row, column: self.wumpus_column})

    notifications[:nearby_pits] = adjacent_cells_content.include?(CONTENTS[:pit])
    notifications[:nearby_treasure] = !self.treasure_found? && adjacent_cells_content.include?(CONTENTS[:treasure])
    
    player_cell = get_cell(self.player_row, self.player_column)

    if (self.player_row == self.wumpus_row && self.player_column == self.wumpus_column)
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

      add_wumpus
      add_player
    end

    def add_player

      player_cell = pop_empty_cell
      self.player_row = player_cell / self.number_of_columns
      self.player_column = player_cell % self.number_of_columns
      self.player_start_row = self.player_row
      self.player_start_column = self.player_column
    end

    def add_wumpus

      wumpus_cell = pop_empty_cell # TODO Add posibility to appear on treasure.
      self.wumpus_row = wumpus_cell / self.number_of_columns
      self.wumpus_column = wumpus_cell % self.number_of_columns
      self.wumpus_start_row = self.wumpus_row
      self.wumpus_start_column = self.wumpus_column
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

    def get_adjacent_cells(row, column)
      adjacentCellsOffset = [
        {row: 0, column: -1},
        {row: 0, column: 1},
        {row: -1, column: 0},
        {row: 1, column: 0}
      ]

      adjacent_cells = []

      adjacentCellsOffset.each do |adjacentCellOffset|
          
        adjacentRow = row + adjacentCellOffset[:row]
        adjacentColumn = column + adjacentCellOffset[:column]
        if adjacentRow < 0
          adjacentRow = self.number_of_rows - 1
        elsif adjacentRow >= self.number_of_rows
          adjacentRow = 0
        elsif adjacentColumn < 0
          adjacentColumn = self.number_of_columns - 1
        elsif adjacentColumn >= self.number_of_columns
          adjacentColumn = 0
        end

        adjacent_cells.push({row: adjacentRow, column: adjacentColumn})
      end

      adjacent_cells
    end

    def get_adjacent_cells_content(row, column)
      get_adjacent_cells(row, column).map do |cell|
        get_cell(cell[:row], cell[:column])
      end
    end
end

class AddWumpusStartRowAndColumnToGame < ActiveRecord::Migration
  def change
    add_column :games, :wumpus_start_row, :integer
    add_column :games, :wumpus_start_column, :integer
  end
end

class AddWumpusRowAndColumnToGame < ActiveRecord::Migration
  def change
    add_column :games, :wumpus_row, :integer
    add_column :games, :wumpus_column, :integer
  end
end

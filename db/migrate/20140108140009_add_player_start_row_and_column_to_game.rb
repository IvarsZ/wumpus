class AddPlayerStartRowAndColumnToGame < ActiveRecord::Migration
  def change
    add_column :games, :player_start_row, :integer
    add_column :games, :player_start_column, :integer
  end
end

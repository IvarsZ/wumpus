class AddPlayerRowAndColumnToGame < ActiveRecord::Migration
  def change
    add_column :games, :player_row, :integer
    add_column :games, :player_column, :integer
  end
end

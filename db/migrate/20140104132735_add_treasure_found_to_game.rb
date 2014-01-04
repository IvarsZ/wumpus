class AddTreasureFoundToGame < ActiveRecord::Migration
  def change
    add_column :games, :treasure_found, :boolean, default: false
  end
end

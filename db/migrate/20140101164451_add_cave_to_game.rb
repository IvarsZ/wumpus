class AddCaveToGame < ActiveRecord::Migration
  def change
    add_column :games, :cave, :string
  end
end

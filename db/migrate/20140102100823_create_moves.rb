class CreateMoves < ActiveRecord::Migration
  def change
    create_table :moves do |t|
      t.integer :row
      t.integer :column
      t.integer :game_id

      t.timestamps
    end
  end
end

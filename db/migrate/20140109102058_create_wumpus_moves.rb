class CreateWumpusMoves < ActiveRecord::Migration
  def change
    create_table :wumpus_moves do |t|

      t.timestamps
    end
  end
end

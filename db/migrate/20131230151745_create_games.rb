class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :number_of_rows
      t.integer :number_of_columns
      t.integer :number_of_pits
      t.integer :number_of_bats
      t.integer :number_of_arrows

      t.timestamps
    end
  end
end

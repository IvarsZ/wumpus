class CreateActions < ActiveRecord::Migration
  def change
    create_table :actions do |t|
      t.string :type
      t.integer :row
      t.integer :column

      t.timestamps
    end
  end
end

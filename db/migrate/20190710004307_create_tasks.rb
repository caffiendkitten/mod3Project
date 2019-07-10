class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :item
      t.references :tasklist, foreign_key: true

      t.timestamps
    end
  end
end

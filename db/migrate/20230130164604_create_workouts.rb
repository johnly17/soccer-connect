class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.date :day
      t.string :name
      t.string :duration

      t.timestamps
    end
  end
end

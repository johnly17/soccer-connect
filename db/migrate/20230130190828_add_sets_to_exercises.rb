class AddSetsToExercises < ActiveRecord::Migration[6.1]
  def change
    add_column :exercises, :sets, :integer
  end
end

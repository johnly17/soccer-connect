class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :weight, :sets
  has_one :User
  has_one :Workout
end

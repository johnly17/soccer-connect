class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :day, :name, :duration
  has_many :exercises
end

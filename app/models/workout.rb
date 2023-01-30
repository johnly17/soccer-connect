class Workout < ApplicationRecord
    has_many :exercises, dependent: :destroy
    has_many :users, through: :exercises
end

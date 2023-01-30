class User < ApplicationRecord
    has_many :exercises, dependent: :destroy
    has_many :workouts, through: :exercises
end

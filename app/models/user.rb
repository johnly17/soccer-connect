class User < ApplicationRecord
    has_many :events
    has_many :attendances
    has_many :comments
end

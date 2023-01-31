class User < ApplicationRecord
    has_many :events
    has_many :attendances
    has_many :attending_events, through: :attendances, source: :event
    has_many :comments
    has_many :commented_events, through: :comments, source: :event

    has_secure_password
end

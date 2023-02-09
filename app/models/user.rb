class User < ApplicationRecord
    validates :first_name, :last_name, :email, :password, :image, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 4}


    has_many :events
    has_many :attendances
    has_many :attending_events, through: :attendances, source: :event
    has_many :comments, dependent: :destroy
    has_many :commented_events, through: :comments, source: :event

    has_secure_password
end

class Event < ApplicationRecord
  belongs_to :user
  
  has_many :attendances
  has_many :attending_users, through: :attendances, source: :user
  
  has_many :comments
  has_many :users_comments, through: :comments, source: :user
end

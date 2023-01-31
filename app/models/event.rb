class Event < ApplicationRecord
  belongs_to :user
  
  has_many :attendances
  has_many :users, through: :attendances
  
  has_many :comments
  has_many :users, through: :comments
end

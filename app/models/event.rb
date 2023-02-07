class Event < ApplicationRecord
  geocoded_by :city_state
  after_validation :geocode

  validates :name, :description, :date, :time, :address, :city, :state, :zipcode, presence: true



  belongs_to :user
  
  has_many :attendances, dependent: :destroy
  has_many :attending_users, through: :attendances, source: :user
  
  has_many :comments, dependent: :destroy
  has_many :users_comments, through: :comments, source: :user

  def city_state
    ["#{city}, #{state}"].compact.join(', ')
  end 

end
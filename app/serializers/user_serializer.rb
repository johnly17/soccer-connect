class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :image
  has_many :events

  has_many :attending_events, through: :attendances, source: :event
  has_many :comments
  has_many :commented_events, through: :comments, source: :event
end

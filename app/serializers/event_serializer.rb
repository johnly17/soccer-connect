class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :city, :state, :zipcode, :time, :date, :description
  has_one :user
end

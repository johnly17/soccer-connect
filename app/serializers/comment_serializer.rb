class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :body, :event
  has_one :user
  has_one :event
end

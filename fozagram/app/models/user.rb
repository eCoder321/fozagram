class User < ApplicationRecord
    has_many :images, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    validates_length_of :username, :minimum => 2
end

class Image < ApplicationRecord
  # commented code is from the blog post for uploading images to a server
  # include Rails.application.routes.url_helpers

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  # def get_image_url
  #   url_for(self.image)
  # end
end

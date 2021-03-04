class ImagesController < ApplicationController
    def index
        images = Image.all 
        render json: images, except: [:created_at, :updated_at]
    end
end

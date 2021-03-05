class LikesController < ApplicationController

    def create 
        prevLike = Like.find_by(params.permit(:user_id, :image_id))
        if prevLike
            prevLike.delete
            image = Image.find_by(id: params[:image_id])
        else
            like = Like.create(params.permit(:user_id, :image_id))
            image = like.image
        end
        render json: image, include: :likes
    end
end

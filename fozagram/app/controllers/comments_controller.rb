class CommentsController < ApplicationController
    def create 
        comment = Comment.create(params.require(:comment).permit(:content, :user_id, :image_id))
        render json: comment, except: [:created_at, :updated_at]
    end
end

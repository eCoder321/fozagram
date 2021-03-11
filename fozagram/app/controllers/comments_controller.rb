class CommentsController < ApplicationController
    def index
        comments = Comment.all 
        render json: CommentSerializer.new(comments).to_serialized_json
    end
    def create 
        comment = Comment.create(params.require(:comment).permit(:content, :user_id, :image_id))
        render json: CommentSerializer.new(comment).to_serialized_json
    end

    def update
        comment = Comment.find_by(id: params[:id])
        comment.update(params.require(:comment).permit(:content))
        render json: CommentSerializer.new(comment).to_serialized_json
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        if comment.destroy
            render json: {status: 200, message: "success!"}
        else
            render json: {staus: 500, message: "an error occured"}
        end
    end
end

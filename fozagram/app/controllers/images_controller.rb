class ImagesController < ApplicationController
    def index
        images = Image.all 
        render json: ImageSerializer.new(images).to_serialized_json
    end

    # code below is from blog post (modified by zed)

    def create
        @user = User.find_by(id: params[:user_id])
      
        @image = Image.new(image_params())
        respond_to_image
    end
      
    private def image_params
        params.require(:image).permit(:src, :alt, :user_id)
    end
      
    private def respond_to_image
        if @image.valid?

            @image.save 
           
            # image = Image.new(image: @image, user: @user)
            render json: ImageSerializer.new(@image).to_serialized_json
        else
            render json: { errors: post.errors }, status: 400
        end
    end
end

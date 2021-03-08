class ImagesController < ApplicationController
    def index
        images = Image.all 
        render json: images, include: {
            likes: {
                except: [:created_at, :updated_at]
            }, 
            comments: {},
            user: {
                except: [:created_at, :updated_at]
            }
            }, except: [:created_at, :updated_at]
    end

    # def update 
    #     byebug
    #     Image
    # end

    # code below is from blog post (modified by zed)

    def create
        @user = User.find_by(id: params[:user_id])
      
        @image = Image.create(image_params())
        respond_to_image
    end
      
    private def image_params
        params.permit(:src, :alt, :user_id)
    end
      
    private def respond_to_image
        if @image.valid?
            image_serializer = Image.new(image: @image, user: @user)
            render json: image_serializer.serialize_new_image
        else
            render json: { errors: post.errors }, status: 400
        end
    end
end

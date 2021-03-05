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
end

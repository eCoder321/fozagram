class UsersController < ApplicationController
    def get_user 
        user = User.find_or_create_by(username: params[:username].capitalize)
        render json: user
    end
    # def index
    #     users = User.all 
    #     render json: users, include: {
    #         images: {
    #             except: [:created_at, :updated_at]
    #         },
    #         likes: {
    #             except: [:created_at, :updated_at]
    #         },
    #         comments: {
    #             except: [:created_at, :updated_at]
    #         }
    #     }
    # end

end

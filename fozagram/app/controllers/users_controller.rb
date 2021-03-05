class UsersController < ApplicationController
    def get_user 
        user = User.find_or_create_by(username: params[:username].capitalize)
        render json: user
    end
end

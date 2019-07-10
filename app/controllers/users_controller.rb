class UsersController < ApplicationController
    def index
        users = User.all
        # render json: users
        render :json => users,
            :include => {
                :tasklists => { :include => :tasks }
            }
    end
end

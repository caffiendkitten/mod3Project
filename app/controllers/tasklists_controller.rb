class TasklistsController < ApplicationController
    def index
        tasklists = Tasklist.all
        render json: tasklists, include: :tasks
    end

    def create
        tasklist = Tasklist.create(title: params[:title], user_id: params[:user_id])
        render json: tasklist
    end

    def destroy
        tasklist = Tasklist.find(params[:id])
        tasklist.delete

    end


end

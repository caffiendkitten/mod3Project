class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: tasks
    end
    
    def destroy
        task = Task.find(params[:id])
        task.delete
    end
end

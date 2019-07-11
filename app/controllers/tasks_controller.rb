class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: tasks
    end

    def create
        # byebug
        # get task params
        # create Task
        # Render json
        # console.log("hello from the controller")
        task = Task.create(item: params[:item], tasklist_id: params[:tasklist_id])

        render json: task
    end

    def destroy
        task = Task.find(params[:id])
        task.delete
    end
end

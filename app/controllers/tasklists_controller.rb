class TasklistsController < ApplicationController
    def index
        tasklists = Tasklist.all
        render json: tasklists, include: :tasks
    end
end

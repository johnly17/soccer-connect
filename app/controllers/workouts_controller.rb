class WorkoutsController < ApplicationController
    def index
        render json: Workout.all, status: :ok
    end
end

class EventsController < ApplicationController
before_action :check_owner, only: [:update, :destroy]


    def index
        render json: Event.all
    end

    def create
        event = Event.create!(event_params)
        render json: event, status: :created
    rescue ActiveRecord::InvalidRecord => e
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end

    private

    def event_params
        params.permit(:name, :description, :address, :city, :state, :zipcode, :date, :time)
    end

    def check_owner
        unless Event.find(params[:id]).user_id == session[:user_id]
            head :forbidden
          end
    end

end

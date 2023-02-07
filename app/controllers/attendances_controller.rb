class AttendancesController < ApplicationController
    before_action :set_event
    # before_action :check_user, only: [:destroy]

    def index
        render json: Attendance.all
    end

    def show
        attendance = Attendance.find_by(id: params[:id])
        if attendance.present?
            render json: attendance, status: :ok
        else 
            render json: {error: "No attendances found"}, status: :not_found
        end
    end

    def create 
        attendance = Attendance.create!(user_id: session[:user_id], event_id: params[:event_id])
        render json: attendance, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: {errors: e.record.errors.full_messages}, status: 406
    end

    def destroy
        attendance = Attendance.find_by(id: params[:id])
        attendance.present?
            attendance.destroy
            head :no_content
    end

    private

    def set_event
        event = Event.find_by(id: params[:event_id])
    end

    def check_user
        unless Attendance.find(params[:id]).user_id == session[:user_id]
            head :forbidden
        end
    end

end

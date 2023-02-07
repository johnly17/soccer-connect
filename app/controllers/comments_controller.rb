class CommentsController < ApplicationController
    def index
        render json: Comment.all
    end

    def show
        comment = Comment.find_by(id: params[:id])
        render json: comment, status: :ok
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end

    def create
        comment = Comment.create!(user_id: session[:user_id], event_id: params[:event_id], body: params[:body])
        render json: comment, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        head :no_content
    end

end

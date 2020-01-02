class QueriesController < ApplicationController
  def index
    queries = Query.all
    render json: queries, except: [:created_at, :updated_at, :request_id]
  end
  

  def create
    query = Query.new
    query.request = params[:request]
    query.response = generate_response
    query.user_id = params[:user_id]
    query.save
    render json: query, except: [:created_at, :updated_at]
  end


  def generate_response
    req = params[:request]
    if req == "hello" || req == "hi"
      response = "Hi, how may I help you?"

    elsif req == "what's up" || req == "what is up"

      response = "Not much. What's up with you?"
    else 
      response = "Sorry, I don't know how to respond to that"
    end
  end

end

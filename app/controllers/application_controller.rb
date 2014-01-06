class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from Exception, with: :exception
  rescue_from ActionController::RoutingError, with: :not_found
  rescue_from ActionController::UnknownController, with: :not_found
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  # Respond with json to errors.
  def not_found
    if env["REQUEST_PATH"] =~ /(create|make_move)/
      render json: {errors: "not-found"}.as_json, status: 404
    else
      render file: File.join(Rails.root, "public", "404.html")
    end
  end

  def exception
    if env["REQUEST_PATH"] =~ /(create|make_move)/
      render json: {errors: "500 Internal Server Error"}.as_json, status: 500
    else
      render file: File.join(Rails.root, "public", "500.html")
    end
  end
end

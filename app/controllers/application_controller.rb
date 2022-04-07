class ApplicationController < ActionController::Base
    protected

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation, :account_types])
    end
end

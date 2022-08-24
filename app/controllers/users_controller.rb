class UsersController < ApplicationController   # defining the controller class

    def login       # starts the login function
        # in every single request, there exists the params hash
        # it contains all parameters of the request
        # we take those params and check the info

        user = User.find_by!(email: params[:email])
        # create a user variable that is returned 
        
        if user && user.password_digest == params[:password]
            render json: user, status: :ok
        else
            render json: {error: 'Invalid email or password'}, status: 404
        end
    end 

    def forgot_password
        user = User.find_by!(email: params[:email])
        render json: {password: user.password_digest}, status: :ok
    end
end

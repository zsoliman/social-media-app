class PostsController < ApplicationController

    # When someone types a url in the browser,
    # one of these functiosn will be invoced.

    # Which function is fired gets derermined
    # by config/routes.rb

    def index
        post = Post.all
        render json: post
    end

    def show    
        post = Post.find(params[:id])
        render json: post
    end
end

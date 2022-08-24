
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/post/:id', to: 'posts#show'
  get '/posts', to: 'posts#index'
  post '/login', to: 'users#login'
  post '/forgot_password', to: 'users#forgot_password'
end
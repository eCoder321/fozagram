Rails.application.routes.draw do
  resources :likes, only: [:create]
  resources :comments, only: [:create, :update, :index]
  resources :images
  resources :users
  post 'users/get_user' => 'users#get_user'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

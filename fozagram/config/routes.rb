Rails.application.routes.draw do
  post 'users/get_user' => 'users#get_user'
  resources :likes, only: [:create]
  resources :comments, only: [:create, :update, :index, :destroy]
  resources :images, only: [:index, :create]
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

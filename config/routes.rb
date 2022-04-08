Rails.application.routes.draw do
  resources :chats
  get 'users/index'
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  get 'static_page/home'
  root "static_page#home"
  resources :users, only: [:show, :index]
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

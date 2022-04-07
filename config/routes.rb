Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  get 'static_page/home'
  root "static_page#home"
  resources :users
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

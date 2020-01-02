Rails.application.routes.draw do
  get 'queries/index'
  post 'queries', to: 'queries#create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

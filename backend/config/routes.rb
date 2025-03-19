Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :geo_points, only: [:index, :show]
    end
  end
end

Spree::Core::Engine.routes.draw do
  namespace :api do
    get '/current_order', to: 'orders#current', as: "quick_current_order"
  end
end

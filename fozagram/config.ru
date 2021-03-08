# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

run Rails.application
Rails.application.load_server

# from blog post
cloudinary:
  service: Cloudinary


  ---
  development:
    cloud_name: flatironschool
    api_key: '221383615284921'
    api_secret: uQLGogumimMELL6hH0K3AFhUlFY
    enhance_image_tag: true
    static_file_support: false
  production:
    cloud_name: flatironschool
    api_key: '221383615284921'
    api_secret: uQLGogumimMELL6hH0K3AFhUlFY
    enhance_image_tag: true
    static_file_support: true
  test:
    cloud_name: flatironschool
    api_key: '221383615284921'
    api_secret: uQLGogumimMELL6hH0K3AFhUlFY
    enhance_image_tag: true
    static_file_support: false
  
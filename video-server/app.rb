require 'sinatra'
require "sinatra/json"
require "sinatra/reloader"

set :bind, '0.0.0.0'
set :port, 18650
set :root, File.dirname(__FILE__)
set :public_folder, Proc.new { File.join(root, "static") }

get '/' do
  'hi~'
end

get '/api/video' do
    json :file => 'demo.mp4'
end
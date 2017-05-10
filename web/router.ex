defmodule SneakyChat.Router do
  use SneakyChat.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SneakyChat do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", SneakyChat do
    pipe_through :api

    get "/history", RoomController, :history
  end
end

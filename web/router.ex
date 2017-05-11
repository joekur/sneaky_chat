defmodule SneakyChat.Router do
  use SneakyChat.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.EnsureAuthenticated, handler: SneakyChat.Token
    plug Guardian.Plug.LoadResource
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # unauthenticated routes
  scope "/", SneakyChat do
    pipe_through :browser

    get "/", PageController, :index
    resources "/registrations", RegistrationController, only: [:new, :create]
    resources "/sessions", SessionController, only: [:new, :create, :delete]
  end

  # authenticated routes
  scope "/", SneakyChat do
    pipe_through :browser
  end

  scope "/api", SneakyChat do
    pipe_through :api

    get "/history", RoomController, :history
  end
end

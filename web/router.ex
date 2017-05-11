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

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.EnsureAuthenticated, handler: SneakyChat.Token # TODO api handler
    plug Guardian.Plug.LoadResource
  end

  scope "/", SneakyChat do
    pipe_through :browser

    get "/", PageController, :index

    resources "/registrations", RegistrationController, only: [:new, :create]
    resources "/sessions", SessionController, only: [:new, :create, :delete]

    # authenticated routes
    scope "/", SneakyChat do
      pipe_through :browser_auth
    end
  end

  scope "/api", SneakyChat do
    pipe_through :api
    pipe_through :api_auth

    get "/history", Api.RoomController, :history
  end
end

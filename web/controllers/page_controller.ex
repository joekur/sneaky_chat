defmodule SneakyChat.PageController do
  use SneakyChat.Web, :controller

  def index(conn, _params) do
    if !logged_in?(conn) do
      redirect(conn, to: session_path(conn, :new))
    end

    render conn, "index.html"
  end
end

defmodule SneakyChat.PageController do
  use SneakyChat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

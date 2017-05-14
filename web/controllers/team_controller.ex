defmodule SneakyChat.Api.TeamController do
  use SneakyChat.Web, :controller

  def show(conn, _params) do
    render conn, "show.json", %{user: current_user(conn)}
  end
end

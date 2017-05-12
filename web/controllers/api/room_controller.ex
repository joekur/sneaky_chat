defmodule SneakyChat.Api.RoomController do
  use SneakyChat.Web, :controller

  alias SneakyChat.Message

  def history(conn, _params) do
    render conn, "history.json", %{user: current_user(conn)}
  end
end

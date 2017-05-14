defmodule SneakyChat.Api.RoomController do
  use SneakyChat.Web, :controller

  def show(conn, %{"id" => id}) do
    room = SneakyChat.Repo.get(SneakyChat.Room, id)
    render conn, "show.json", %{room: room}
  end
end

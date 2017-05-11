defmodule SneakyChat.Api.RoomController do
  use SneakyChat.Web, :controller

  alias SneakyChat.Message

  def history(conn, _params) do
    messages = Message
               |> where([m], m.room_id == 1)
               |> order_by([m], desc: m.inserted_at)
               |> Repo.all

    render conn, "history.json", messages: messages
  end
end

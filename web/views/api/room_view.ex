defmodule SneakyChat.Api.RoomView do
  use SneakyChat.Web, :view

  alias SneakyChat.Repo

  require Ecto.Query

  def render("show.json", %{room: room}) do
    room_details_json(room)
  end

  def room_details_json(room) do
    %{
      messages: Enum.map(messages(room), &message_json/1),
      users: Enum.map(users(room), fn(u) -> u.id end), # TODO only show users in room
    }
  end

  def message_json(message) do
    SneakyChat.MessageView.message_json(message)
  end

  def messages(room) do
    SneakyChat.Message
    |> Ecto.Query.where([m], m.room_id == ^room.id)
    |> Ecto.Query.order_by([m], asc: m.inserted_at)
    |> Repo.all
  end

  def users(_room) do
    SneakyChat.User
    |> Ecto.Query.order_by([m], asc: m.inserted_at)
    |> Repo.all
  end
end

defmodule SneakyChat.Api.RoomView do
  use SneakyChat.Web, :view

  alias SneakyChat.Repo

  require Ecto.Query

  def render("history.json", _) do
    %{
      messages: Enum.map(messages, &message_json/1),
      users: Enum.map(users, &user_json/1),
    }
  end

  def message_json(message) do
    SneakyChat.MessageView.message_json(message)
  end

  def user_json(user) do
    %{
      id: user.id,
      username: user.username,
    }
  end

  def messages do
    SneakyChat.Message
    |> Ecto.Query.where([m], m.room_id == 1)
    |> Ecto.Query.order_by([m], asc: m.inserted_at)
    |> Repo.all
  end

  def users do
    SneakyChat.User
    |> Ecto.Query.order_by([m], asc: m.inserted_at)
    |> Repo.all
  end
end

defmodule SneakyChat.Api.TeamView do
  use SneakyChat.Web, :view

  alias SneakyChat.Repo

  require Ecto.Query

  def render("show.json", %{user: user}) do
    %{
      user_id: user.id,
      users: Enum.map(users, &user_json/1),
      rooms: Enum.map(rooms, &room_json/1),
    }
  end

  def user_json(user) do
    %{
      id: user.id,
      username: user.username,
    }
  end

  def room_json(room) do
    %{
      id: room.id,
      name: room.name,
    }
  end

  def users do
    SneakyChat.User
    |> Ecto.Query.order_by([m], asc: m.inserted_at)
    |> Repo.all
  end

  def rooms do
    SneakyChat.Room
    |> Ecto.Query.order_by([r], asc: r.name)
    |> Repo.all
  end
end

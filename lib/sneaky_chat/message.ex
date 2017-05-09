defmodule SneakyChat.Message do
  use SneakyChat.Web, :model
  use Ecto.Schema

  alias SneakyChat.Repo

  schema "messages" do
    field :user_id, :integer
    field :room_id, :integer
    field :body, :string

    timestamps()
  end
end

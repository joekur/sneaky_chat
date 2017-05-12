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

  def changeset(message, params \\ %{}) do
    message
    |> cast(params, [:body, :user_id, :room_id])
    |> validate_required([:body, :user_id, :room_id])
  end
end

defmodule SneakyChat.User do
  use SneakyChat.Web, :model

  alias SneakyChat.Repo

  schema "users" do
    field :email, :string
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, [:username, :password])
    |> validate_required([:username, :password])
  end
end

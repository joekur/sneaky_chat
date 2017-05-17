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
    |> cast(params, [:username, :email])
    |> validate_required([:username, :email])
  end

  def registration_changeset(model, params \\ %{}) do
    model
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 6)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        changeset
        |> put_change(:password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end

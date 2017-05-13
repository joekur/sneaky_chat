defmodule SneakyChat.UserRoom do
  use SneakyChat.Web, :model

  schema "user_rooms" do
    belongs_to :user, SneakyChat.User
    belongs_to :room, SneakyChat.Room

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end
end

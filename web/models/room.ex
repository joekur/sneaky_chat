defmodule SneakyChat.Room do
  use SneakyChat.Web, :model

  schema "rooms" do
    field :name, :string
    field :default, :boolean

    has_many :messages, SneakyChat.Message

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end

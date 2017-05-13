defmodule SneakyChat.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :default, :boolean

      timestamps()
    end
  end
end

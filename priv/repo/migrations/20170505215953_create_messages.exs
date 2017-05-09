defmodule SneakyChat.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :text
      add :user_id, :integer
      add :room_id, :integer

      timestamps()
    end

    create index(:messages, [:user_id])
    create index(:messages, [:room_id])
  end
end

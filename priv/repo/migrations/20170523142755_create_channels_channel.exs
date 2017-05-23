defmodule TheNetwork.Repo.Migrations.CreateTheNetwork.Channels.Channel do
  use Ecto.Migration

  def change do
    create table(:channels_channels) do
      add :name, :string
      add :description, :text
      add :owner_id, references(:accounts_users, on_delete: :nothing)

      timestamps()
    end

    create index(:channels_channels, [:owner_id])
  end
end
